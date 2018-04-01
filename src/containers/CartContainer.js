import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

//still need to write function that will remove items from the cart
const CartContainer = ({ products, productName, total, removeFromCart, checkout }) => (
  <div>
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onRemoveFromCartClicked={() => removeFromCart(product.id)} />
    )}

  </ProductsList>
  <Cart
    products={products}
    productName={products.title}
    total={total}
    // onAddToCartClicked={() => addToCart(product.id)}
   // onRemoveFromCartClicked={() => removeFromCart(product.id)}
    onCheckoutClicked={() => checkout(products)} />
    </div>
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

/*
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: product => dispatch(removeFromCart(product)),
  }
}
*/
export default connect(
  mapStateToProps, { checkout })(CartContainer);
