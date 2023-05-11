import '@/styles/globals.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

import Layout from '@/components/Layout'
import ShopProvider from '@/context/context'
import { useRouter } from 'next/router'


import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath}/>
      </Layout>
    </ShopProvider>
    
  )
  
}
