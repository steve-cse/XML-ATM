import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import xml2js from 'xml2js'
import { useNavigate } from 'react-router-dom'
const fs = window.require('fs')
export default function Landing() {
  const cardNumRef = useRef()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    fs.readFile('xmls/blacklist.xml', 'utf8', (error, data) => {
      if (error) {
        console.error(error);
      } else {
        xml2js.parseString(data, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            setData(result)
          }
        });
      }
    });
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    let index = -1
    for (let i = 0; i < data.cards.card.length; i++) {
      if (data.cards.card[i].number.includes(cardNumRef.current.value)) {
        index = i
        break
      }
    }
    if (index >= 0) {
      if (data.cards.card[index].blacklisted.includes('true')) {
        setError('This card has been blacklisted')
      } else {
        localStorage.setItem('cc_num', data.cards.card[index].number[0])
        console.log('Card number written to local storage')
        navigate('/pin')
      }
    } else {
      setError('Card number not found')
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">💸 XML-ATM</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="cc_num">
              <Form.Label>Enter Card Number</Form.Label>
              <Form.Control ref={cardNumRef} required />
            </Form.Group>

            <Button className="w-100 container my-3" type="submit">
              Proceed
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
