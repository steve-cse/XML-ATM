import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import xml2js from 'xml2js'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const fs = window.require('fs')

var index = -1
export default function Withdraw() {
  const balNumRef = useRef()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    fs.readFile('xmls/balance.xml', 'utf8', (error, data) => {
      if (error) {
        console.error(error)
      } else {
        xml2js.parseString(data, (error, result) => {
          if (error) {
            console.error(error)
          } else {
            setData(result)
          }
        })
      }
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    for (let i = 0; i < data.cards.card.length; i++) {
      if (data.cards.card[i].number.includes(localStorage.getItem('cc_num'))) {
        index = i
        break
      }
    }
    if (index >= 0) {
      if (
        balNumRef.current.value <= 50000 &&
        data.cards.card[index].balance[0] - balNumRef.current.value > 0 &&
        balNumRef.current.value > 0
      ) {
        console.log(
          data.cards.card[index].balance[0] -
            balNumRef.current.value +
            ' is the current balance',
        )
        modifyXml()
      } else {
        setError('Amount doesn\'t match with set threshold. Please check your balance.')
      }
    } else {
      setError('Index is still -1')
    }
  }

  function modifyXml() {
    data.cards.card[index].balance[0] =
      data.cards.card[index].balance[0] - balNumRef.current.value

    const builder = new xml2js.Builder()
    const newXml = builder.buildObject(data)

    fs.writeFile('xmls/balance.xml', newXml, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('balance.xml has been modified')
        setError('')
        setMessage('You withdrew ₹' + balNumRef.current.value)
        setTimeout(() => navigate("/"), 3500);
      }
    })
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">💸 XML-ATM</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="withdraw_num">
              <Form.Label>Enter Amount to Withdraw</Form.Label>
              <Form.Control ref={balNumRef} required />
            </Form.Group>

            <Button className="w-100 container my-3" type="submit">
              Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/balance">Check Balance</Link>
      </div>
    </>
  )
}
