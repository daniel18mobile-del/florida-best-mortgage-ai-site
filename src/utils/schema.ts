import { site } from '@data/site';

type Faq = {
  question: string;
  answer: string;
};

const address = {
  '@type': 'PostalAddress',
  ...(site.address.street ? { streetAddress: site.address.street } : {}),
  ...(site.address.city ? { addressLocality: site.address.city } : {}),
  ...(site.address.region ? { addressRegion: site.address.region } : {}),
  ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
  ...(site.address.country ? { addressCountry: site.address.country } : {})
};

const advisorImageUrl = new URL(site.advisor.image.src, site.url).toString();

export function mortgageBrokerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MortgageBroker',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address,
    areaServed: {
      '@type': 'State',
      name: 'Florida'
    },
    employee: {
      '@type': 'Person',
      name: site.advisor.name,
      identifier: `NMLS #${site.advisor.nmls}`,
      image: advisorImageUrl
    },
    identifier: [
      `NMLS #${site.companyNmls}`,
      `NMLS #${site.advisor.nmls}`
    ]
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  publishDate: Date;
  updatedDate?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.publishDate.toISOString(),
    dateModified: (post.updatedDate ?? post.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: site.advisor.name,
      identifier: `NMLS #${site.advisor.nmls}`,
      image: advisorImageUrl
    },
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url
    }
  };
}
