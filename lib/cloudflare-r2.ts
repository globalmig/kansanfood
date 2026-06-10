import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

function getR2Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Cloudflare R2 환경변수가 설정되지 않았습니다.');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    process.env.CLOUDFLARE_R2_BUCKET_NAME
  );
}

export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string> {
  const client = getR2Client();
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  return `/api/images/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function getFromR2(key: string): Promise<{ body: ReadableStream; contentType: string } | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return null;

  const { GetObjectCommand } = await import('@aws-sdk/client-s3');
  const client = getR2Client();
  const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

  if (!res.Body) return null;

  return {
    body: res.Body.transformToWebStream(),
    contentType: res.ContentType ?? 'application/octet-stream',
  };
}
