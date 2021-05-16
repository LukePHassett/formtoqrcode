// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { route } from 'next/dist/next-server/server/router';
import qrcode from 'qrcode-generator'

import { useRouter } from 'next/router'

var typeNumber = 9;
var errorCorrectionLevel = 'L';
var qr = qrcode(typeNumber, errorCorrectionLevel);
const userData = []


export default function handler (req, res) {
  if (req.method === 'PUT'){
    console.log("POSTTTT")
    userData[0] = req.body
    req.local = userData[0]
    console.log("USER DATA")
    qr.addData(`http://localhost:3000/user/${req.body.phoneNo}`)
    qr.make()
    const qrURL = `${qr.createDataURL()}`
    console.log(qrURL)
    // res.status(200).json(userData)
    return new Promise ((resolve, reject) => {
      res.status = 200
      res.setHeader('Content-Type', 'application/json')
      res.send(qrURL)
    })
    
  }
  if (req.method === 'GET'){
    console.log("GETTTTTTTTTTTTTTTTT")
    console.log(userData[0])
    console.log(req.local)
    res.json(userData[0])
  }
    
  
  
}

