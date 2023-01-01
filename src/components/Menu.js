import React, {  useState, useEffect } from 'react'
import { Card, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'


export default function Menu() {
  const navigate = useNavigate()
  
  const [name, setName] = useState("")
  useEffect(() => {
    setName(localStorage.getItem('cc_name'));
      
  }, [])
  return (
    <>
    <Card>
    <Card.Body>
          <h2 className="text-center mb-4">XML-ATM</h2>
          <h4 className="text-center mb-4">Hello, {name}</h4>
          <h4 className="text-center mb-4">Please Select an Option</h4>
          <Button onClick={() => navigate("/withdraw")} className="btn btn-primary w-100 mt-3">Withdraw</Button>
          <Button onClick={() => navigate("/about")} className="btn btn-primary w-100 mt-3">Deposit</Button>
          <Button onClick={() => navigate("/about")} className="btn btn-primary w-100 mt-3">Check Balance</Button>
          </Card.Body>

    </Card>
    </>
  )
}
