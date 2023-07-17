// const NEXT_PUBLIC_API_URL = "https://test-app-nextjs-2096.myshopify.com/api/2023-07/graphql.json"
// const NEXT_PUBLIC_ACCESS_TOKEN = "1cb53f6db0c5a52298f3d79de58d8136"
// old

const NEXT_PUBLIC_API_URL = "https://shopnext-6604.myshopify.com/api/2023-07/graphql.json"
const NEXT_PUBLIC_ACCESS_TOKEN = "4ecd3b5d6327b3961d76d1c303410f20"
// new

const gql = String.raw

const productsQuery = gql`
  query Products {
    products(first:6) {
      edges {
        node {
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first:1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first:1) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      variants(first:1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const createCheckoutMutation = gql`
  mutation CheckoutCreate ($variantId: ID!) {
    checkoutCreate(input: {
      lineItems: {
        variantId: $variantId,
        quantity: 1
      }
    }) {
      checkout {
        webUrl
      }
    }
  }
`

async function storefront(query, variables = {}) {
  const response = await fetch ( NEXT_PUBLIC_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": NEXT_PUBLIC_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables })
    }
  )
  console.log("status =", response.status)
  return response.json()
}

export async function getStaticProps() {
  const { data } = await storefront(productsQuery)
  return ( data["products"] )
}

export async function getSingleProduct(handle) {
  const { data } = await storefront(singleProductQuery, { "handle": handle })
  return ( data )
}

export async function checkout(variantId) {
  const { data } = await storefront(createCheckoutMutation, {"variantId": variantId})
  return ( data )
}