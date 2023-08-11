import React from 'react'
import './Header.css';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from '../../contextAPI/StateProvider';
import { auth } from '../../firebase/firebaseConfig';
export default function Header() {
  // profile here after
  const [{ cart, user }, dispatch] = useStateValue();

  //////here possible to signin signout by calling handleAuthentication
  const handleAuth = () => {
    if (user)
      auth.signOut();
  };
  return (
      <nav className="header">
          <div className="header__top">
      {/* Logo on left */}
      <Link to="/">
          <img className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>
          <div className="header__search">
                  <input type="search" className="header__searchInput" />
                  <SearchIcon className="header__searchIcon" />
          </div>
        <div className="header__nav">
        {/* If the user is not logged in, the link will point to the login page.
         If the user is logged in, the link will not be rendered. */}
          <Link to={!user && "/login" }>
          <div onClick={handleAuth} className="header__option">
              <span className="header__optionLineOne">
                {/* ////if there is user it displays email unless guest  */}
              Hello, {!user ? 'Guest' : user.email}
              </span>
              
              <span className="header__optionLineTwo">
                {/* =====if there is user it shows signout option otherwise signin===  */}
              {user ? "Sign Out" : "Sign In"}
              </span>
             </div>
          </Link>
          
           {/*  Return Order */}
           <Link to="/orders" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
         
              <div className="header__option">
                  <span className="header__optionLineOne">your</span>
                  <span className="header__optionLineTwo">prime</span>
                  </div>
                  {/* //the link which proceeds to cart  */}
                  <Link to="/cart">
                  <div className="header__optionBasket">
                      <ShoppingCartIcon />
                      <span className="header__optionLineTwo basket__count">
                      {cart?.length}
                      </span>
                      </div>
                      </Link>
            </div>
      </div>


      {/* ========Header nav======  */}
      <div className="header__bottom">
        
        {/* Nav */}
        <div className="header__bottom-nav">
          <span className="getspan">
            <Link to="/products" className="header__link">
              All
            </Link>
          </span>
          <span className="getspan">Customer Service</span>
          <span className="getspan">Gift Cards</span>
          <span className="getspan">Buy Again</span>
          <span className="getspan">Browsing History</span>
          <span className="getspan">Coupons</span>
          <span className="getspan">Subscribe & Save</span>
          <span className="getspan">Find a Gift</span>
          </div>
       <div className="header__bottom-app">
          <img
            className="header__bottom-image"
            alt="Amazon Home"
            src="https://www.freeiconspng.com/uploads/amazon-icon-8.png" width="35"  
          />
        </div>
      </div>
   </nav>
  )
}
