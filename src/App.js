import React,{ useEffect } from 'react'
import './App.css';
import { auth } from './firebase/firebaseConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import { useStateValue } from './contextAPI/StateProvider';
import Orders from './components/Orders/Orders';
import Payment from './components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const promise = loadStripe('pk_test_51NcN2YJWINtnm5MayRLvuuXAZ8opVTLLpPpVrxBu9wLIRWPtcqscNKeqgd5avpsFvbt4uSAykIeLfDS3TdiQby2V00yrcnkUIp');
export default function App() { 
  const [{ user }, dispatch] = useStateValue();
 
 
  useEffect(() => {


    auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        
        // user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      }
      else {
        ////===the user is sign out from amazon web app====
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      
    });
}, [])


  return (
    <div>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/cart" element={ <Cart /> }></Route>
          </Routes>
          <Routes>
           <Route path="/login" element={ <Login /> }></Route>
          </Routes>
             
          <Routes>
            <Route path="/orders" element={<Orders/>}></Route>
          </Routes>
             
         
          <Routes>
            <Route
               path="/payment"
               element={
                 <Elements stripe={promise}>
                   <Payment />
                 </Elements>
               }
             />
            </Routes>
           
          
            <Routes>
            <Route path="/" element={ <Home /> }> </Route>
            </Routes>
        </div>
          <Footer />
          </Router>
     </div>
  );
}

