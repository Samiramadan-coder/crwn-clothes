import "./header.styles.scss";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import logo from "../../assets/images/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <NavLink className="logo-container" to="/">
      <img src={logo} alt="Logo" />
    </NavLink>
    <div className="options">
      <NavLink className="option" to="/shop">
        SHOP
      </NavLink>
      <NavLink className="option" to="/shop">
        CONTACT
      </NavLink>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ): (
        <NavLink className="option" to="/signIn">
          SIGN IN
        </NavLink>
      )}
      <CartIcon />
    </div>
    {
      hidden ? null : <CartDropdown />
    }
    
  </div>
);

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
