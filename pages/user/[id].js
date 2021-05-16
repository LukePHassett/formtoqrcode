import { useRouter } from 'next/router'
import useSwr from 'swr'
import qrcode from 'qrcode-generator'

import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { Table } from 'react-bootstrap'

const fetcher = (url) => fetch(url).then((res) => res.json())

var code = undefined

export default function User() {

const [qrGEN, setQrGEN] = React.useState()
 
const x = (async () => { 
  const result = await fetch('/api/users',{
  method:'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
)
const text = await result.text()
setQrGEN(text)
console.log()
})().catch(er => {console.error(er)})


  return (<div>
    {qrGEN}
   
    

  

    </div>)
}