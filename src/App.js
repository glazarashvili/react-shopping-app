import React, { useState } from 'react'
import data from "./data.json"
import Products from "./components/Products.jsx"
import Filter from './components/Filter.jsx'
import Cart from './components/Cart.jsx'
import styled from 'styled-components'
import './index.css'

const StyledMain = styled.div`
`

const StyledHeader = styled.header`
  background: #203040;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;

  a {
    text-decoration: none;
    color: white;

    :hover {
      transition: 0.3s ease-in;
      color: orange;
    }
  }
`

const StyledMainContainer = styled.div`
  display: flex;
  align-items: space-between;
`

const StyledCartContiner = styled.div`
  flex: 1;
`

const StyledProductContiner = styled.div`
  flex: 3;
`

const StyledFooter = styled.footer`
  bottom: 0;
  background: #203040;
  padding: 20px;
  color: #ffffff;
  text-align: center;
  margin-top: 40px;
`

const App = () => {

  const [shoppingCarts, setshoppingCarts] = useState({ 
    products: data.products,
    cartItems: localStorage.getItem("cartItems")
               ? JSON.parse(localStorage.getItem("cartItems"))
               : [],
    size: "",
    sort: ""
  })

  const filterProducts = (event) => {
    if(event.target.value === "") {
      setshoppingCarts({
        ...shoppingCarts,
        size: event.target.value,
        products: shoppingCarts.products})
    }
    else {
      setshoppingCarts({
        ...shoppingCarts,
        size: event.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  const createOrder = () => {
    alert("HEY MAN")
  }

  const removeFromCart = (product) => {
    const cartItems = shoppingCarts.cartItems.slice()
    setshoppingCarts({
      ...shoppingCarts,
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    localStorage.setItem("cartItems", 
    JSON.stringify(cartItems.filter(item => item._id !== product._id)))      
  }


  const addToCart = (product) => {
    const cartItems = shoppingCarts.cartItems.slice()
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if(item._id === product._id) {
        item.count++
        alreadyInCart = true;
      }
    })
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    setshoppingCarts({...shoppingCarts, cartItems: cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  const sortProducts = (event) => {
    const sort = event.target.value
    setshoppingCarts((shoppingCarts) => ({
      ...shoppingCarts,
      sort: sort,
      products: shoppingCarts.products.slice().sort((a,b) => (
        sort === "lowest" ?
        ((a.price > b.price) ? 1 : -1) :
        sort === "highest" ? 
        ((a.price < b.price) ? 1 : -1) :
        ((a._id < b._id) ? 1: -1)
      ))
    }))
  }

  return (
    <StyledMain>
      <StyledHeader>
        <a href="/">React Shopping Cart</a>
        <a href="/">Admin</a>
      </StyledHeader>
      <StyledMainContainer>
          <StyledProductContiner>
              <Filter 
                count={shoppingCarts.products.length} 
                size={shoppingCarts.size}
                sort={shoppingCarts.sort}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
              />
              <Products 
                products={shoppingCarts.products} 
                addToCart={addToCart}
              />
          </StyledProductContiner>
          <StyledCartContiner> 
            <Cart cartItems={shoppingCarts.cartItems} c
                  reateOrder={createOrder} 
                  removeFromCart={removeFromCart} 
            />
          </StyledCartContiner>
      </StyledMainContainer>
      <StyledFooter>
        All right is reserved
      </StyledFooter>
    </StyledMain>
  );
}

export default App;
