import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";

import {CustomButton} from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropdown = ({ cartItems, dispatch }) => {
  const navigateto = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {
          cartItems.length ?
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
          :
          <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <CustomButton onClick={() => {
        navigateto("/checkout");
        dispatch(toggleCartHidden())
      }}>GO TO CHECKOUT</CustomButton>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);