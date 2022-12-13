import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';

import { HomePage } from './pages/HomePage/homepage.component';
import ShopPage from './pages/shop/shop.componenet';
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CollectionPage from './pages/collection/collection.component';

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/shop">
            <Route index element={<ShopPage />} />
            <Route path=":collectionId" element={<CollectionPage />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signIn" element={ this.props.currentUser ? (<Navigate replace to="/" />) : (<SignInAndSignUpPage />) } />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
