import React, { useState } from "react"
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'

const StyledCartContent = styled.div`
  border-bottom: 1px solid #c0c0c0;
  margin-top: 20px;
  padding-bottom: 10px;
  padding-left: 15px;
`

const StyledUl = styled.ul`
  padding: 10px;
  margin: 10px;
  list-style-type: none;
`

const StyledImg = styled.img`
  width: 50px;
  height: 63px;
  margin-right: 10px;
`
const StyledP = styled.p`
  margin-right: 5px;
`

const StyledH1 = styled.h1`
  :hover {
    transition: 0.3s ease-in;
    color: orange;
    cursor: pointer;
  }
`

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`

const StyledFlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const StyledButton = styled.button`
  padding: 1rem;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0f0f0;
  cursor: pointer;
  margin-left: 5px;
  font-size: 16px;
  outline: none;
`

const StyledPriceContent = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 20px;
  }
`

const StyledPrimaryButton = styled.button`
  padding: 1rem;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0f0f0;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  background-color: #f0c040;
  width: ${props => props.primary ? "300px" : "180px"};

 :hover {
  border: 0.1rem #808080 solid;
`

const StyledForm = styled.div`
  margin-top: 20px;
  padding: 0px 10px;
  display: flex;
  justify-content: center;  

  ul {
    margin-top: 20px;
  }

  li {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const StyledInput = styled.input`
  height: 20px;
  margin-top: 5px;
  padding: 5px 10px;
  width: 275px;
`

const Cart = (props) => {
  const {cartItems} = props
  const [shown, setShown] = useState(false)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    address: ""
  })

  const createOrder = (e) => {
    e.preventDefault()
    const order = {
      name: userForm.name,
      email: userForm.email,
      address: userForm.address,
      cartItems: props.cartItems
    }
    props.createOrder(order)
  }

  const handleInput = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      {cartItems.length === 0 
        ? <StyledCartContent>Cart is empty</StyledCartContent>
        : <StyledCartContent>You have {cartItems.length} in the cart</StyledCartContent>
      }
      <div>
        <div>
         <Fade left cascade>
          <StyledUl>
            {cartItems.map(item => (
              <li key={item._id}>
                <StyledFlex>
                  <StyledImg src={item.image} alt={item.title} />
                  <StyledH1>{item.title}</StyledH1>
                </StyledFlex>
                <StyledFlexEnd>
                  <StyledP>${(item.price)} x {item.count}</StyledP>
                  <StyledButton onClick={() => props.removeFromCart(item)}>
                    Remove
                  </StyledButton>
                </StyledFlexEnd>
              </li>
            ))}
          </StyledUl>
          </Fade> 
        </div>
        {cartItems.length !== 0 && (
          <React.Fragment>
          <StyledPriceContent>
              <p>Total: ${cartItems.reduce((a, b) => a + (b.price * b.count), 0)}</p>
              <StyledPrimaryButton onClick={() => setShown(true)}>Proceed</StyledPrimaryButton>
          </StyledPriceContent>
          {
            shown && (
             <Fade right cascade>
              <StyledForm>
                <form onSubmit={createOrder}>
                  <ul>
                    <li>
                      <label>Email</label>
                      <StyledInput
                        type="email" 
                        name="email"
                        onChange={handleInput}
                        required 
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <StyledInput 
                        type="text"
                        name="name" 
                        onChange={handleInput}
                        required 
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <StyledInput 
                        type="text" 
                        name="address"
                        onChange={handleInput}
                        required 
                      />
                    </li>
                    <li>
                      <StyledPrimaryButton primary type="submit">Checkout</StyledPrimaryButton>
                    </li>
                  </ul>
                </form>
              </StyledForm>
             </Fade>
            )
          }
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

// const mapStateToProps = (globalStore) => {
//   return {
//   };
// };

// const mapDispatchToProps = {
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);

export default Cart;