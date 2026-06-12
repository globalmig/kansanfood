import type { MetadataRoute } from 'next';

const BASE_URL = 'https://kansanfood.com';

// admin·api는 모든 봇 차단, 공개 콘텐츠는 전체 허용
const DISALLOW = ['/admin/', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 일반 검색 엔진
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      // Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Google 이미지
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: DISALLOW,
      },
      // Bing / Microsoft Copilot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Naver
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: DISALLOW,
      },
      // Daum
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: DISALLOW,
      },

      // ── AI 크롤러 ──────────────────────────────────────────
      // OpenAI ChatGPT (학습 데이터 수집)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // OpenAI ChatGPT (실시간 검색/브라우징)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: DISALLOW,
      },
      // OpenAI SearchBot
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Anthropic Claude (학습 데이터 수집)
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: DISALLOW,
      },
      // Anthropic Claude (실시간 검색)
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Anthropic Claude Web
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: DISALLOW,
      },
      // Google Gemini / AI Overviews
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: DISALLOW,
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Meta AI
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: DISALLOW,
      },
      // Meta AI (Facebook 크롤러)
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Apple (Siri, Spotlight)
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: DISALLOW,
      },
      // Apple AI 확장 크롤러
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: DISALLOW,
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: DISALLOW,
      },
      // Common Crawl (다수 AI 모델 학습에 사용)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // You.com AI 검색
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // DuckDuckGo AI
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
