import React from 'react'
import './Product.css';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from '../../contextAPI/StateProvider';

export default function Product({ id, title, price, rating, image }) {

    const [{ cart }, dispatch] = useStateValue();

    const addToCart = () => { 
           // Add item to basket
           dispatch({
            type: 'ADD_TO_CART',
               payload: {
                   id: id,
                   title: title,
                   price: price,
                   rating: rating,
                   image: image
               }
        })

    }

  return (
    <div className="product">
        <img src={image} alt={title} />
        <div className="product__info">
            <p>{title}</p>
            <div className="product__group">
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(Math.floor(rating))
                            .fill()
                            .map((_, index) => (
                                <StarIcon key={index} />
                            ))
                    }
                    
                </div>
            </div>
        </div>

      <button onClick={addToCart}>Add to Cart</button>  
     </div>
)
}