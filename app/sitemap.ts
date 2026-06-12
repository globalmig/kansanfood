import type { MetadataRoute } from 'next';
import { getProducts, getNotices } from '@/lib/data';

const BASE_URL = 'https://kansanfood.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, notices] = await Promise.all([getProducts(), getNotices()]);

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const noticeUrls: MetadataRoute.Sitemap = notices.map((n) => ({
    url: `${BASE_URL}/notice/${n.id}`,
    lastModified: new Date(n.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    { url: BASE_URL,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/products`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/about`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/notice`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/contact`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
    ...noticeUrls,
  ];
}
