export default function userHandler(req, res) {
    const {
      query: {id, fname, lname, dob, email, phoneNo, submitted, qrURL},
      method,
    } = req
  
    switch (method) {
      case 'GET':
        // Get data from your database
        console.log("MIDDLEWARE")
        console.log({ id, fname, lname, dob, phoneNo})
        res.status(200).json({ id, fname: fname, lname: lname, dob: dob, phoneNo:phoneNo, submitted:submitted, qrURL:qrURL,email:email })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ id, fname: fname, lname: lname, dob: dob, phoneNo:phoneNo, submitted:submitted, email:email })
        break
      case 'POST':
        res.status(200).json({ id, fname: fname, lname: lname, dob: dob, phoneNo:phoneNo, submitted:submitted, email:email })
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }