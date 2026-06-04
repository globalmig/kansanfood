function isValidEnvValue(val: string): boolean {
  return !val.startsWith('FILL_IN') && !/[^\x00-\xFF]/.test(val);
}

export function isCloudflareConfigured(): boolean {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  return Boolean(accountId && databaseId && apiToken &&
    isValidEnvValue(accountId) && isValidEnvValue(databaseId) && isValidEnvValue(apiToken));
}

interface D1Meta {
  served_by: string;
  duration: number;
  changes: number;
  last_row_id: number;
  changed_db: boolean;
  rows_read: number;
  rows_written: number;
}

interface D1Result<T> {
  results: T[];
  success: boolean;
  meta: D1Meta;
}

export async function queryD1<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<D1Result<T>> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !apiToken) {
    throw new Error('Cloudflare D1 환경변수가 설정되지 않았습니다. .env.local을 확인하세요.');
  }

  // 플레이스홀더 값 또는 비ASCII 문자가 포함된 경우 즉시 오류 반환
  for (const [key, val] of [
    ['CLOUDFLARE_ACCOUNT_ID', accountId],
    ['CLOUDFLARE_D1_DATABASE_ID', databaseId],
    ['CLOUDFLARE_API_TOKEN', apiToken],
  ] as const) {
    if (val.startsWith('FILL_IN') || /[^\x00-\xFF]/.test(val)) {
      throw new Error(
        `${key} 값이 올바르지 않습니다. .env.local에서 실제 Cloudflare 값을 입력해주세요.`
      );
    }
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`D1 API 오류 (${response.status}): ${text}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`D1 쿼리 실패: ${JSON.stringify(data.errors)}`);
  }

  return data.result[0] as D1Result<T>;
}
