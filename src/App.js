import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ViewProducts from "./Pages/ViewProducts/ViewProducts";
import Home from "./Pages/Home/HomeScreen";
import SignIn from "./Pages/User/SignIn";
import SignUp from "./Pages/User/SignUp";
import UserForgotPassword from "./Pages/User/UserForgotPassword";
import Cart from "./Pages/Cart/CartScreen";
import CartPlaceOrder from "./Components/Cart/CartPlaceOrder";
import CartOrderSuccess from "./Components/Cart/CartOrderSuccess";
import CartCheckout from "./Components/Cart/CartCheckout";
import CartShopping from "./Components/Cart/CartShopping";
import SingleProduct from "./Components/Products/SingleProduct";
import CustReview from "./Components/Customer/CustReview";
import UserProfile from "./Pages/User/UserProfile";
import UserProtectedRoute from "./Pages/User/UserProtectedRoute";
import UserOtp from "./Pages/User/UserOtp";
import UserChangeForgetPassword from "./Pages/User/UserChangeForgetPassword";
import MyCart from "./Components/Cart/CartShopping";
import PaymentByCard from "./Components/Card/PaymentByCard";
import UserOrdersDetails from "./Pages/User/UserOrdersDetails";
import PayPal from "./Components/Card/PayPal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<ViewProducts />} />
          <Route path="/shop/:id" element={<ViewProducts />} />
          <Route path="/product-details/:id" element={<SingleProduct />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/my-cart" element={<CartShopping />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/place-order" element={<CartPlaceOrder />} />
          <Route path="/order-success" element={<CartOrderSuccess />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<UserProtectedRoute />}>
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route
              path="/user-order-details/:id"
              element={<UserOrdersDetails />}
            />
          </Route>
          <Route path="/user-otp" element={<UserOtp />} />
          <Route path="/reset-password" element={<UserForgotPassword />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route
            path="change-forget-password"
            element={<UserChangeForgetPassword />}
          />
          <Route path="/customer-review" element={<CustReview />} />
          <Route path="/payment" element={<PaymentByCard />} />
          <Route path="/paypal" element={<PayPal />} />
          {/* <Route path="/contactInfo" element={<ContactInfo />} /> */}
          {/* <Route path="reviewsrating" element={<ReviewsRating />} /> */}
          {/* <Route path="/placeorder" element={<PlaceOrder />} /> */}
          {/* <Route path="/filters" element={<Filters />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
