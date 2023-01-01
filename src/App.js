import { Container } from 'react-bootstrap'
import Landing from './components/Landing'
import PinVerify from './components/PinVerify'
import Menu from './components/Menu';
import Withdraw from './components/Withdraw'
import CheckBal from './components/CheckBal';
import Deposit from './components/Deposit';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
      <Router>
      <Routes>
            <Route exact path="/" element={<Landing/>} />
            <Route path="/pin" element={<PinVerify/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/withdraw" element={<Withdraw/>} />
            <Route path="/deposit" element={<Deposit/>} />
            <Route path="/balance" element={<CheckBal/>} />
            </Routes>  
        </Router>
      </div>
    </Container>
  )
}

export default App
