import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import xml2js from 'xml2js'
import pins from './../xmls/pins.xml'
import { useNavigate } from 'react-router-dom'

export default function PinVerify() {
  const pinNumRef = useRef()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    fetch(pins)
      .then((response) => response.text())
      .then((xml) => {
        xml2js.parseString(xml, (err, result) => {
          if (err) {
            console.error(err)
          } else {
            setData(result)
          }
        })
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    let index = -1
    for (let i = 0; i < data.cards.card.length; i++) {
      if (data.cards.card[i].number.includes(localStorage.getItem('cc_num'))) {
        index = i
        break
      }
    }
    if (index >= 0) {
      if (data.cards.card[index].pin.includes(pinNumRef.current.value)) {
        console.log('Yay')
        localStorage.setItem('cc_name', data.cards.card[index].name[0])
        navigate('/menu')
      } else {
        setError('Invalid PIN try again')
      }
    } else {
      setError('Index is still -1')
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">XML-ATM</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="pin_num">
              <Form.Label>Enter PIN Number</Form.Label>
              <Form.Control type="password" ref={pinNumRef} required />
            </Form.Group>

            <Button className="w-100 container my-3" type="submit">
              OK
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
