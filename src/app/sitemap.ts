
import type { MetadataRoute } from 'next';

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || ''
).replace(/\/+$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  if (!BASE_URL) return [];

  const routes = [
    '/',
    '/services',
    '/services/customer-support-outsourcing',
    '/services/customer-support-outsourcing/inbound-call-support',
    '/services/customer-support-outsourcing/outbound-call-support',
    '/services/customer-support-outsourcing/customer-service',
    '/services/customer-support-outsourcing/customer-retention',
    '/services/customer-support-outsourcing/complaint-query-handling',
    '/services/bpo-back-office-outsourcing',
    '/services/bpo-back-office-outsourcing/data-entry-processing',
    '/services/bpo-back-office-outsourcing/document-processing',
    '/services/bpo-back-office-outsourcing/data-verification-validation',
    '/services/bpo-back-office-outsourcing/compliance-kyc-aml-support',
    '/services/bpo-back-office-outsourcing/lead-generation',
    '/services/bpo-back-office-outsourcing/back-office-operations',
    '/services/bpo-back-office-outsourcing/virtual-assistant-services',
    '/services/it-services',
    '/services/it-services/web-development',
    '/services/it-services/website-maintenance',
    '/services/it-services/it-support',
    '/services/it-services/technical-support',
    '/about',
    '/how-we-hire',
    '/work-with-us',
    '/book-a-free-call',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
