
import { getAllProducts, getProduct } from '../../lib/shopify';
import ProductPageContent from '../../components/ProductPageContent';
import React from 'react';

export default function ProductPage({ product }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20"> 
        <ProductPageContent product={product}/>
    </div>
  )
}


export async function getStaticPaths() {
    const products = await getAllProducts();

    const paths = products.map(item => {
        const product = String(item.node.handle)
        console.log(product)
        return {
            params: { product }
        }
    })

    return {
        paths,
        fallback: false
    }
  }


  export async function getStaticProps({ params }){
    const product = await getProduct(params.product)
    return {
        props: {
            product
        }
    }
  }