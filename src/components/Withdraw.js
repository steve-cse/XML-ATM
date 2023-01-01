import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import xml2js from 'xml2js'
import balance from './../xmls/balance.xml'
import { useNavigate } from 'react-router-dom'
import BrowserFS from 'browserfs';
import { useBrowserFS } from 'browserfs';
BrowserFS.configure({
  fs: 'LocalStorage',
  options: {}
});


var index = -1
export default function Withdraw() {
  const balNumRef = useRef()
  const { fs, loading } = useBrowserFS();
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    fetch(balance)
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

   function handleSubmit(e) {
    e.preventDefault()
    
    for (let i = 0; i < data.cards.card.length; i++) {
      if (data.cards.card[i].number.includes(localStorage.getItem('cc_num'))) {
        index = i
        break
      }
    }
    if (index >= 0) {
      if (1) {
        modifyXml();
      } else {
        setError('Invalid PIN try again')
      }
    } else {
      setError('Index is still -1')
    }
  }

  function modifyXml() {
    

    data.cards.card[index].balance[0]="189634";

    

      const builder = new xml2js.Builder();
      const newXml = builder.buildObject(data);

      fs.writeFile('modified.xml', newXml, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('XML saved to modified.xml');
        }
      });
   
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">XML-ATM</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="pin_num">
              <Form.Label>Enter Amount to Withdraw</Form.Label>
              <Form.Control  ref={balNumRef} required />
            </Form.Group>

            <Button className="w-100 container my-3" type="submit">
              GO
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
