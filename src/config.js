const _slugify = require('./helpers/slugify')

module.exports = {

  seo: {
    useUrlDispatcher: JSON.parse(process.env.SEO_USE_URL_DISPATCHER || true),
    productUrlPathMapper: (product) => {
      let destPath = ''
      if (product.category && product.category.length > 0) {
        const firstCat = product.category[0]
        destPath = (firstCat.path ? (firstCat.path) : _slugify(firstCat.name)) + '/' + (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      } else {
        destPath = (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      }
      destPath += '.html'
      console.log('Dest. product path = ', destPath)
      return destPath
    },
    categoryUrlPathMapper: (category) => {
      const destSlug = (category.url_path ? category.url_path + '/': '') + category.url_key
      console.log('Dest. cat path = ', destSlug)
      return destSlug
    },    
  },

  magento: {
    url: process.env.MAGENTO_URL || 'http://smokin.info/rest/',
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'wahzebppzs79ynwnxjm0iijxmowxff1a',
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || '9afup3159cnonj1sw3jvtmm476zrrups',
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || 'h8uj4j4ovgmtw5042gli1bjw4ckwbquk',
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || 'p70ssmxqawkjqta5vu7ynv57tkvlma6h',
    storeId: process.env.MAGENTO_STORE_ID || 1,
    currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'USD'
  },

  vuestorefront: {
    invalidateCache: JSON.parse(typeof process.env.VS_INVALIDATE_CACHE === 'undefined' ? false : process.env.VS_INVALIDATE_CACHE),
    invalidateCacheUrl: process.env.VS_INVALIDATE_CACHE_URL || 'http://localhost:3000/invalidate?key=aeSu7aip&tag='
  },

  product: {
    expandConfigurableFilters: ['manufacturer'],
    synchronizeCatalogSpecialPrices: process.env.PRODUCTS_SPECIAL_PRICES || false,
    renderCatalogRegularPrices: process.env.PRODUCTS_RENDER_PRICES || false,
    excludeDisabledProducts: process.env.PRODUCTS_EXCLUDE_DISABLED || false
  },

  kue: {}, // default KUE config works on local redis instance. See KUE docs for non standard redis connections

  db: {
    driver: 'elasticsearch',
    url: process.env.DATABASE_URL || 'https://a395b5f74f054ea68c2d8a5dab00d72d.us-east-1.aws.found.io:9243',
    indexName: process.env.INDEX_NAME || 'vue_storefront_catalog'
  },

  elasticsearch: {
    apiVersion: process.env.ELASTICSEARCH_API_VERSION || '5.6'
  },

  redis: {
    host: process.env.REDIS_HOST || 'ec2-54-146-26-239.compute-1.amazonaws.com',
    password: process.env.REDIS_HOST || 'p02f2beae2ea52cd084b071357d628bb603398a9ae796fc59f2178b920feea588',
    port: process.env.REDIS_PORT || 23269,
    db: process.env.REDIS_DB || 0
  },

  passport: {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
      session: false
    }
  }

}
