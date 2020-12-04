import React from "react"
import styled from 'styled-components'

const StyledFilterCompo = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #c0c0c0;
  padding: 15px;
  align-items: center;
  margin-right: 20px;
`

const StyledSelect = styled.select`
  font-weight: bold;
  outline: none;
  font-size: 12px;
  padding: 5px;
  margin-left: 10px;
  
  > option {
    font-weight: bold;
    font-size: 12px;
  }
`

const Filter = (props) => {
  return (
    <StyledFilterCompo>
      <div>
        {props.count} Products
      </div>
      <div> Order
        <StyledSelect value={props.sort} onChange={props.sortProducts}>  
          <option>LATEST</option>
          <option value="lowest">LOWEST</option>
          <option value="highest">HIGHEST</option>
        </StyledSelect>
      </div>
      <div> Filter
        <StyledSelect value={props.size} onChange={props.filterProducts}>
          <option value="ALL">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </StyledSelect>
      </div>
    </StyledFilterCompo>
  )
}

export default Filter;