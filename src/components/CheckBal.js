import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import xml2js from 'xml2js'
import { Link } from 'react-router-dom'
const fs = window.require('fs')

var index = -1
export default function CheckBal() {
  const [data, setData] = useState(null)

  const [name, setName] = useState('')
  const [currbal, setcurrbal] = useState('')

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
            setName(localStorage.getItem('cc_name'))
          }
        })
      }
    })
  }, [])

  function getBalance() {
    for (let i = 0; i < data.cards.card.length; i++) {
      if (data.cards.card[i].number.includes(localStorage.getItem('cc_num'))) {
        index = i
        break
      }
    }
    if (index >= 0) {
      setcurrbal('Your current balance: ₹' + data.cards.card[index].balance[0])
    } else {
      console.log('Index is still -1')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">💸 XML-ATM</h2>

          <h4 className="text-center mb-4">Hello, {name}</h4>
          <h5 className="text-center mb-4">{currbal}</h5>
          <Button
            className="w-100 container my-3"
            onClick={() => {
              getBalance()
            }}
          >
            Get Balance
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/menu">Go Back</Link>
      </div>
    </>
  )
}
