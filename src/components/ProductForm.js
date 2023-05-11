
import { formatter } from "@/utils/helpers"
import { useState, useContext } from "react"
import ProductOptions from "./ProductOptions"
import { CartContext } from "@/context/context"


export default function ProductForm({product}) {

  const {addToCart} = useContext(CartContext)

  const allVarianOptions = product.variants.edges?.map(variant=> {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name]= item.value
    })
    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1,
    }
  })

  const defaultValues = {}
  product.options.map(item=>{
    defaultValues[item.name] = item.values[0]
  })


  const [selectedVariant, setSelectedVariant] = useState(allVarianOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)


  function setOptions (name, value) {
    setSelectedOptions(prevState =>{
      return{...prevState, [name]: value}
    })

    const selection = {
      ...selectedOptions,
      [name]: value,
    }

    allVarianOptions.map(item=>{
      if(JSON.stringify(item.options)===JSON.stringify(selection)){
        setSelectedVariant(item)
      }
    })

  }
 

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(product.variants.edges[0].node.price.amount)}</span>
      {
        product.options.map(({name, values})=>(
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions = {setOptions}
            
          />
        ))
      }
      <button 
        onClick={()=>{
          addToCart(selectedVariant)
        }}
        className="bg-black rounded-lg mt-3 text-white px-2 py-3 hover:bg-gray-800">Add to cart
      </button>
    </div>
  )
}
