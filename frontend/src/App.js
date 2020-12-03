import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import PrivateRoute from "./hoc/PrivateRoute";
import AdminDashboard from "./containers/AdminDashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <Route path='/order/:id' component={OrderScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route
          path='/admin/productlist'
          component={ProductListScreen}
          exact
        />
        <Route
          path='/admin/productlist/:pageNumber'
          component={ProductListScreen}
          exact
        />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route path='/search/:keyword' component={HomeScreen} exact />
        <Route path='/page/:pageNumber' component={HomeScreen} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        />
        <Route path='/' component={HomeScreen} exact /> */}
            <PrivateRoute exact path="/dashboard" component={AdminDashboard} />

            <Route path="/" component={Home} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
