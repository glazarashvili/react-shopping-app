import React, { useState } from "react"
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal'
import styled from 'styled-components'

const StyledBottomFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  margin-top: 15px;
` 

const StyledP = styled.p`
  margin-left: 50px;
  font-size: 20px;
`

const StyledButton = styled.button`
  border: 0.1rem #c0c0c0 solid;
  outline: none;
  background-color: #f0c040;
  cursor: pointer;
  height: 50px;
  padding: 0px 25px;
  font-size: 16px;

  :hover {
  border: 0.1rem #808080 solid;
  }
`

const StyledProductContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;

  li {
    margin: 10px 20px;
  }

  img {
    width: 290px;
    height: 370px;
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  color: #551A8B;
  cursor: pointer;

  :hover {
    color: orange;
    transition: 0.3s ease-in;
  }
`

const StyledModalContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledPriceContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

   p {
    margin-top: 20px;
    margin-left: 200px;
    font-weight: bold;
  }
`

const StyledModalText = styled.div`
  padding-top: 50px;
  padding-left: 20px;

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const StyledH1 = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
`

const StyledSizeButton = styled.button`
  border: none;
  padding: 10px;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0f0f0;
  font-size: 16px
  outline: none;
  margin: 0px 2px;
  cursor: pointer;
    :hover {
    border: 0.1rem #808080 solid;
  }
`

const StyledCloseButton = styled.button`
    height: 30px;
    border: none;
    width: 60px;
    font-size: 18px;
    margin-left: 20px;
    cursor: pointer;
    border: 0.1rem #c0c0c0 solid;
    background-color: #f0f0f0;
    :hover {
      border: 0.1rem #808080 solid;
    }
`

const Products = ( props ) => {
  const { products } = props
  const [modal, setModal] = useState(null)

  return (
    <div>
      <Fade bottom cascade>
        <StyledProductContainer>
          {props.products.map(product => (
            <li key={product._id}>
              <section>
                <StyledLink href={"#" + product._id} 
                onClick={() => setModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </StyledLink>
                <StyledBottomFlex>
                  <StyledP>${product.price}</StyledP>
                  <StyledButton
                    onClick={() => props.addToCart(product)}
                  >
                    Add to Cart
                  </StyledButton>
                </StyledBottomFlex>
              </section>
            </li>
          ))}
        </StyledProductContainer>
      </Fade>
      {
        modal && (
        <Modal isOpen={true}>
          <Zoom>
            <StyledModalContent>
              <img src={modal.image} />
              <StyledModalText>
                <div>
                  <StyledH1>{modal.title}</StyledH1>
                  <p>{modal.description}</p>
                  <p>Available Sizes: 
                      {
                      modal.availableSizes.map(item => (
                        <StyledSizeButton>{item}</StyledSizeButton>
                          )
                        )
                      }
                  </p>
                </div>
                <StyledPriceContent>
                  <p>${modal.price}</p>
                  <StyledButton onClick={() => {
                    props.addToCart(products)
                    setModal(false)
                  }}>Add To Cart</StyledButton>
                </StyledPriceContent>
              </StyledModalText>
              <StyledCloseButton onClick={() => setModal(false)}>x</StyledCloseButton>
            </StyledModalContent>
          </Zoom>
        </Modal>
        )
      }
    </div>
  )
}

export default Products;