import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart'
import Orders from './components/Order'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login';
import { useStateValue } from './context/product/ProductState';
import { useEffect } from 'react';
import { auth } from './firebase';
import Payment from './components/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KUrPtSJMMQQJFOHik3zjuYRK5TcnQP8bDLIkOg5xx6sIClawCzgx1xvPvZul3ShjCiEymWu9QevYFE0n98AJSmG00s3JIbpHB');

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      //if user was logged in
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/orders' element={<><Header /> <Orders /></>} />
          <Route exact path='/cart' element={<><Header /> <Cart /></>} />
          <Route exact path='/payment' element={<>
          <Header />
          <Elements stripe={stripePromise}>
          <Payment />
          </Elements></>} />
          <Route exact path='/' element={<><Header /> <Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
