import React, { useState, useEffect } from 'react'
import {
  useSEO,
  applyMetaConfig,
  applyOpenGraph,
  applyTwitterCards,
  addJSONLD,
  createOrganizationSchema,
  createArticleSchema,
  createProductSchema,
  generateSitemap,
  generateRobotsTxt,
  analyzeSEO
} from '@upendra.manike/seo-boost'
import './Demo.css'

function SeoBoostDemo() {
  const [metaTitle, setMetaTitle] = useState('My Awesome App | Home')
  const [metaDescription, setMetaDescription] = useState('The best platform for SEO automation and optimization')
  const [ogImage, setOgImage] = useState('https://example.com/og-image.jpg')
  const [seoAnalysis, setSeoAnalysis] = useState(null)

  // Use the React hook for SEO
  useSEO({
    title: metaTitle,
    description: metaDescription,
    keywords: ['SEO', 'React', 'Next.js', 'Meta Tags'],
    canonical: window.location.href,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      image: ogImage,
      type: 'website',
      url: window.location.href,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      image: ogImage,
    },
    jsonLd: createOrganizationSchema({
      name: 'My Awesome App',
      url: 'https://myapp.com',
      logo: 'https://myapp.com/logo.png',
      description: metaDescription,
    }),
  })

  const handleAnalyze = () => {
    const analysis = analyzeSEO({
      checkTitle: true,
      checkDescription: true,
      checkOpenGraph: true,
      checkTwitter: true,
      checkCanonical: true,
      checkStructuredData: true,
    })
    setSeoAnalysis(analysis)
  }

  // Example sitemap URLs
  const sitemapUrls = [
    { loc: 'https://myapp.com/', lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1.0 },
    { loc: 'https://myapp.com/about', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: 'https://myapp.com/products', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://myapp.com/contact', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
  ]

  const sitemapXml = generateSitemap({ urls: sitemapUrls })
  const robotsTxt = generateRobotsTxt({
    userAgents: [
      { agent: '*', allow: ['/'], disallow: ['/admin', '/private'] }
    ],
    sitemap: 'https://myapp.com/sitemap.xml'
  })

  // Example schemas
  const articleSchema = createArticleSchema({
    headline: 'How to Boost Your SEO',
    description: 'Learn the best practices for SEO optimization',
    image: 'https://example.com/article-image.jpg',
    datePublished: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'John Doe',
      url: 'https://example.com/author/john'
    },
    publisher: {
      '@type': 'Organization',
      name: 'My Awesome App',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myapp.com/logo.png'
      }
    }
  })

  const productSchema = createProductSchema({
    name: 'Premium SEO Tool',
    description: 'The ultimate SEO optimization tool',
    image: 'https://example.com/product.jpg',
    brand: 'My Awesome App',
    offers: {
      '@type': 'Offer',
      price: '99.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150'
    }
  })

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>🎯 SEO Boost - Complete SEO Optimization</h3>
        <p>Automatic meta tags, JSON-LD schema, OpenGraph, Twitter cards, sitemap generation, and SEO analysis</p>
      </div>

      <div className="demo-section">
        <h3>⚛️ React Hook - useSEO</h3>
        <p>Automatically manages all SEO tags when component mounts</p>
        <div className="interactive-demo">
          <div className="input-group">
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Page Title"
              className="demo-input"
            />
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="demo-input"
            />
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="OG Image URL"
              className="demo-input"
            />
          </div>
          <div className="result-box">
            <strong>✅ SEO tags are automatically updated in the document head!</strong>
            <br />
            <small>Check the page source or browser DevTools to see the meta tags</small>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📊 SEO Analyzer</h3>
        <p>Analyze your page SEO quality and get recommendations</p>
        <div className="interactive-demo">
          <button onClick={handleAnalyze} className="demo-button">
            Analyze Current Page SEO
          </button>
          {seoAnalysis && (
            <div style={{ marginTop: '20px' }}>
              <div className="result-box" style={{ background: seoAnalysis.score >= 80 ? '#efe' : seoAnalysis.score >= 60 ? '#fff3e0' : '#fee' }}>
                <strong>SEO Score: {seoAnalysis.score}/100</strong>
              </div>
              {seoAnalysis.issues.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4>Issues Found:</h4>
                  {seoAnalysis.issues.map((issue, idx) => (
                    <div key={idx} className="result-box" style={{ 
                      borderLeftColor: issue.type === 'error' ? '#dc3545' : issue.type === 'warning' ? '#ffc107' : '#17a2b8',
                      marginTop: '8px'
                    }}>
                      <strong>{issue.type.toUpperCase()}:</strong> {issue.message}
                      {issue.fix && <div style={{ marginTop: '5px', fontSize: '12px' }}>💡 Fix: {issue.fix}</div>}
                    </div>
                  ))}
                </div>
              )}
              {seoAnalysis.recommendations.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4>Recommendations:</h4>
                  <ul style={{ marginTop: '10px' }}>
                    {seoAnalysis.recommendations.map((rec, idx) => (
                      <li key={idx} style={{ marginBottom: '5px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>🗺️ Sitemap Generator</h3>
        <p>Generate XML sitemaps for better search engine indexing</p>
        <div className="code-block">
          <div className="code-label">Generated Sitemap XML:</div>
          <div className="code-result" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {sitemapXml}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Generated robots.txt:</div>
          <div className="code-result">
            {robotsTxt}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📦 JSON-LD Structured Data</h3>
        <p>Add structured data for better search engine understanding</p>
        <div className="code-block">
          <div className="code-label">Organization Schema:</div>
          <div className="code-result">
            {JSON.stringify(createOrganizationSchema({
              name: 'My Awesome App',
              url: 'https://myapp.com',
              logo: 'https://myapp.com/logo.png',
              description: 'The best platform for SEO automation',
              sameAs: ['https://twitter.com/myapp', 'https://facebook.com/myapp']
            }), null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Article Schema:</div>
          <div className="code-result">
            {JSON.stringify(articleSchema, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Product Schema:</div>
          <div className="code-result">
            {JSON.stringify(productSchema, null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📱 React/Next.js App</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`import { useSEO } from '@upendra.manike/seo-boost'

function ProductPage({ product }) {
  useSEO({
    title: \`\${product.name} | My Store\`,
    description: product.description,
    openGraph: {
      image: product.image,
      type: 'product'
    },
    jsonLd: createProductSchema({
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD'
      }
    })
  })
  
  return <div>{product.name}</div>
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🌐 Vanilla JavaScript</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`import { 
  applyMetaConfig, 
  applyOpenGraph,
  addJSONLD 
} from '@upendra.manike/seo-boost'

// Set meta tags
applyMetaConfig({
  title: 'Home | My App',
  description: 'Best platform for SEO',
  canonical: 'https://myapp.com/'
})

// Set Open Graph
applyOpenGraph({
  title: 'My App',
  image: 'https://myapp.com/og.jpg',
  type: 'website'
})

// Add structured data
addJSONLD({
  '@type': 'WebSite',
  name: 'My App',
  url: 'https://myapp.com/'
})`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Blog Post</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`import { useSEO, createArticleSchema } from '@upendra.manike/seo-boost'

function BlogPost({ post }) {
  useSEO({
    title: \`\${post.title} | Blog\`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      image: post.featuredImage,
      publishedTime: post.publishedAt
    },
    jsonLd: createArticleSchema({
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author.name
      },
      publisher: {
        '@type': 'Organization',
        name: 'My Blog'
      }
    })
  })
  
  return <article>{post.content}</article>
}`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Dynamic SEO for E-commerce</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { useSEO, createProductSchema } from '@upendra.manike/seo-boost'

function ProductPage({ product }) {
  useSEO({
    title: \`\${product.name} - \$${product.price} | Store\`,
    description: product.shortDescription,
    keywords: product.tags,
    canonical: \`https://store.com/products/\${product.id}\`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      image: product.images[0],
      type: 'product',
      url: \`https://store.com/products/\${product.id}\`
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      image: product.images[0]
    },
    jsonLd: createProductSchema({
      name: product.name,
      description: product.fullDescription,
      image: product.images,
      brand: product.brand,
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: 'USD',
        availability: product.inStock 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock'
      },
      aggregateRating: product.rating ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating.average.toString(),
        reviewCount: product.rating.count.toString()
      } : undefined
    })
  })
  
  return <ProductDetails product={product} />
}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeoBoostDemo

