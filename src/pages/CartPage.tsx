import CartComponent from "../components/CartComponent";

const CartPage = () => {
  return (
    <div>
      <div className="spacer-container">
        <h1>Your List</h1>
        <CartComponent />
      </div>
    </div>
  );
};

export default CartPage;