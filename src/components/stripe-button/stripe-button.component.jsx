import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51MEGZtJBF8CHlq4NgEqAt3JIxU3P4yMzva4cw8LlJpq7pz4S8fkIWw8xyjKts7DuqjphOYq403JW7XkdKmZmwAAc00Ku4RYwnf';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout 
      label="Pay Now"
      name="CROWN CLOTHES"
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;