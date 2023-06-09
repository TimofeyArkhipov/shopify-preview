
import ProductsList from '../components/ProductsList'
import { getProductsInCollection } from '../lib/shopify'


export default function Home({ products }) {
 
  return (
   <div className='text-3xl'>
     <ProductsList products={products}/>
   </div>

  )
}

export async function getStaticProps() {
  const products = await getProductsInCollection()
  return {
    props: {products}, // will be passed to the page component as props
  }
}