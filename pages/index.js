import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react'
import {Form, Button, Card, Row, Col} from 'react-bootstrap'
import { Formik, FormikHelpers } from 'formik'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import qrcode from 'qrcode-generator'

import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup'

// const fetcher = (url) => fetch(url).then((res) => res.json())

var typeNumber = 0;
var errorCorrectionLevel = 'L';
var qr = qrcode(typeNumber, errorCorrectionLevel);

export default function Home() {

  // const { data, error } = useSwr('/api/users', fetcher)
  const [qrcodeGen, setQRCodeGen] = React.useState()
  const [userFormData, setUserFormData] = React.useState()
  const [userStore, setUserStore] = React.useState([])
  // if (error) return <div>{error}</div>
  // if (!data) return <div>Loading...</div>

  
  return (

    <div className="container">
        <Row>    
      <Formik 
      FormikHelpers
      initialValues={{ fname: undefined, lname:undefined, dob:undefined, email:undefined, phoneNo:undefined, submitted:undefined }}
      onSubmit={(
          values,
          { setSubmitting}
      ) => {
        const dt = new Date()
        values.submitted = dt
          setUserFormData(values)
          const formData = (async () => { 
            const qrCodeData = await fetch('/api/users',{
            method:'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(values)
          }
          
          )
          const qrCodeURL = await qrCodeData.text()
          setQRCodeGen(qrCodeURL)
          const userArray = userStore

          Object.assign(userFormData,{qrURL : qrCodeURL})


          setUserStore([...userStore,userFormData])
          // userArray.push(userFormData)
 
          // setUserStore(userArray)
          {setSubmitting(false)}
      })
    formData()
  }}
      >
      {({

values,
touched,
errors,
isValid,
isSubmitting,
handleChange,
handleBlur,
handleSubmit,
handleReset
}) => (
  
  <Col>
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <Form.Group controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name = "fname"
              type = "text"
              placeholder= "Please Enter First Name"
              value = {values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name = "lname"
              type = "text"
              placeholder= "Please Enter Last Name"
              value = {values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              name = "dob"
              type = "Date"
              value = {values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          
          <Form.Group controlId="phoneNo">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput autoFormat="true" onChange={(phone) => {
              var newUser = values
              console.log(values)
              newUser.phoneNo = phone 
              setUserFormData(newUser),
          values.phoneNo = phone}} name="phoneNo"></PhoneInput>
            
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name = "email"
              type = "email"
              placeholder= "Please Enter Email"
              value = {values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Button type="button">
            Reset
          </Button>
          <Button type="submit" >
            Submit
          </Button>
          
        </Form>
        </Col>)}        
      </Formik>
      <Col>
          {userStore && userStore.map((u) => {


            return(
              <Row>
              <div className="container">
                
                {/* <img src={u.qrURL}></img> */}
            <Card style={{width:'50%'}}>
              
              <Card.Body>
                <Card.Text>
                <div className="container">
                  <Row>
              <img src={u.qrURL} ></img>
              <a href={`http://localhost:3000/user/${u.phoneNo}`}>{`http://localhost:3000/user/${u.phoneNo}`}</a>
                  </Row>
                </div>
                 
                </Card.Text>
              </Card.Body>
            </Card>
            
            </div>
            </Row>)
          })}
          </Col>
          </Row>
    </div>
  )
}
