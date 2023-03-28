import React, { useState } from 'react';
import './App.css';

function Product(props) {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    setPrice(price + props.incrementPrice);
    props.onPriceUpdate(price + props.incrementPrice, count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setPrice(price - props.incrementPrice);
      props.onPriceUpdate(price - props.incrementPrice, count - 1);
    }
  };

  return (
    <div className='div-1'>
      {props.image && (
        <img src={props.image} alt={`Product ${props.id}`} width="100" height="100" />
      )}

    

      <div className='middle'>
        <button className='btn-1' onClick={handleIncrement}>+ </button>
        <p className='count'> {count}</p>
        <button className='btn-2' onClick={handleDecrement}>-</button>
        <p className='prices'>Price: {price}</p>
      </div>
    </div>
  );
}
   
      

function TotalPrice(props) {
  const { products } = props;
  const totalPrice = products.reduce((acc, cur) => acc + cur.price, 0);
  const gst = totalPrice * 0.18; 
  const totalPriceWithGst = totalPrice + gst ; 

  return (
    <div className='div-3'>
      <h2>Total Price: {Math.round(totalPrice)}</h2>
      <p>GST (18%) : {Math.round(gst)}</p>
       <hr/>

      <h3>Total Price (including GST): {Math.round(totalPriceWithGst)}</h3>
    </div>
  );
}


function ProductList() {
  const [products, setProducts] = useState([


    { id: 1, name: 'Product 1', incrementPrice: 1000, price: 0,  image: './images/image1.jpg' },
    { id: 2, name: 'Product 2', incrementPrice: 300, price: 0, image: './images/image2.jpg' },
    { id: 3, name: 'Product 3', incrementPrice: 20, price: 0, image: './images/image3.jpg' },

  ]);
    

  
const [totalQty, setTotalQty] = useState(0);  
const [totalPrice, setTotalPrice] = useState(0)
       

const handlePriceUpdate = (index, newPrice, newCount) => {
  const updatedProducts = [...products];
  const oldCount = updatedProducts[index].count;
  updatedProducts[index].price = newPrice;
  updatedProducts[index].count = newCount;
  const newProductPrice = (newCount * updatedProducts[index].incrementPrice);
  const oldProductPrice = (oldCount * updatedProducts[index].incrementPrice);
  const newTotalPrice = (totalPrice - oldProductPrice) + newProductPrice;
  setProducts(updatedProducts);
  setTotalQty(prevTotalQty => prevTotalQty - oldCount + newCount);

  setTotalPrice(totalPrice + (newCount - oldCount) * updatedProducts[index].incrementPrice);
};  
   

  return (
    <div className='div-4'>
      {products.map((product, index) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          incrementPrice={product.incrementPrice}
          onPriceUpdate={(newPrice, newCount) => handlePriceUpdate(index, newPrice, newCount)}
          image={product.image}
          count={product.count}
        />

  

      ))}
      <hr />
      <div className='total-qty'>
        <p>Total Qty: {totalQty}</p>
      </div>
      <TotalPrice products={products} />
    </div>
  );
}

export default ProductList;
        


 


