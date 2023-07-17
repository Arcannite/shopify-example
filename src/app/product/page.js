'use client'; // for using window object & useState

import { useState } from 'react';
import { getSingleProduct, checkout } from "../../../utils/index"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  async function Checkout() {
    setIsLoading(true)
    let green = await getSingleProduct("green")
    let greenID = green.productByHandle.variants.edges[0].node.id
  
    const data = await checkout(greenID)
    const { webUrl } = data.checkoutCreate.checkout
    window.location.href = webUrl;
  }
  
  return (
    <div className="flex justify-center">
      <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-16 py-6 hover:opacity-75" disabled={isLoading} onClick={Checkout}>
        Pay
      </button>
    </div>
  )
}