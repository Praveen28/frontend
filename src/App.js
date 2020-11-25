import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import MainContainer from "./components/MainContainer/MainContainer";
import Login from "./components/LoginPage/Login";
import Admin from "./Admin/AdminPages/Admin";
import Order from "./navigationComponents/OrderPage/orderPage";
import Orders from "./navigationComponents/OrderedPage/orderedPage";
import Profile from "./navigationComponents/ProfilePage/profilePage";
import Cart from "./navigationComponents/CartPage/cart";

import AddVegetable from "./Admin/VegetablesPages/AddVegetable/addVegetable";
import UpdateVegetable from "./Admin/VegetablesPages/UpdateVegetables/updateVegetable";
import DeleteVegetable from "./Admin/VegetablesPages/DeleteVegetables/deleteVegetables";
import AddFruits from "./Admin/FruitPages/AddFruits/addFruits";
import DeleteFruits from "./Admin/FruitPages/DeleteFruits/deleteFruits";
import UpdateFruit from "./Admin/FruitPages/UpdateFruits/updateFruits";
import AllVegetables from "./navigationComponents/AllVegetables/allVegetables";
import AllFruits from "./navigationComponents/AllFruits/allFruits";
import OneVegetable from "./navigationComponents/DispOneVegetable/oneVegetable";
import OneFruit from "./navigationComponents/DispOneFruit/oneFruit";
import ViewOrder from "./Admin/OrderPages/orderPage";

import Reset from "./navigationComponents/ResetPassword/resetPassword";
import NewPassword from "./navigationComponents/NewPassword/newPassword";

class App extends React.Component {
  render() {
    const value = localStorage.getItem("loggedin");
    return (
      <React.Fragment>
        <div className='main'>
          {JSON.parse(value) !== null ? (
            JSON.parse(value).status === "1" ? (
              <Switch>
                <Route path='/' component={MainContainer} exact />
                <Route path='/allvegetables' component={AllVegetables} exact />
                <Route path='/allfruits' component={AllFruits} exact />
                <Route path='/profile' component={Profile} exact />
                <Route path='/account/cart' component={Cart} exact />
                <Route
                  path='/onevegetable/:id'
                  component={OneVegetable}
                  exact
                />
                <Route path='/onefruit/:id' component={OneFruit} exact />
                <Route path='/login' component={Login} exact />
                <Route path='/login/admin' component={Admin} exact />
                <Route
                  path='/login/admin/addveg'
                  component={AddVegetable}
                  exact
                />
                <Route
                  path='/login/admin/deleteveg'
                  component={DeleteVegetable}
                  exact
                />
                <Route
                  path='/login/admin/updateveg'
                  component={UpdateVegetable}
                  exact
                />
                <Route
                  path='/login/admin/addfruit'
                  component={AddFruits}
                  exact
                />
                <Route
                  path='/login/admin/deletefruit'
                  component={DeleteFruits}
                  exact
                />
                <Route
                  path='/login/admin/updatefruit'
                  component={UpdateFruit}
                  exact
                />
                <Route
                  path='/login/admin/viewOrder'
                  component={ViewOrder}
                  exact
                />
                <Route path='/order' component={Order} exact />
                <Route path='/account/orders' component={Orders} exact />
              </Switch>
            ) : (
              <Switch>
                <Route path='/' component={MainContainer} exact />
                <Route path='/allvegetables' component={AllVegetables} exact />
                <Route path='/allfruits' component={AllFruits} exact />
                <Route path='/account/cart' component={Cart} exact />

                <Route
                  path='/onevegetable/:id'
                  component={OneVegetable}
                  exact
                />
                <Route path='/onefruit/:id' component={OneFruit} exact />
                <Route path='/login' component={Login} exact />
                <Route path='/order' component={Order} exact />
                <Route path='/profile' component={Profile} exact />
                <Route path='/account/orders' component={Orders} exact />
              </Switch>
            )
          ) : (
            <Switch>
              <Route path='/' component={MainContainer} exact />
              <Route path='/allvegetables' component={AllVegetables} exact />
              <Route path='/allfruits' component={AllFruits} exact />
              <Route path='/onevegetable/:id' component={OneVegetable} exact />
              <Route path='/onefruit/:id' component={OneFruit} exact />
              <Route path='/login' component={Login} exact />
              <Route path='/order' component={Order} exact />
              <Route path='/profile' component={Profile} exact />
              <Route path='/account/orders' component={Orders} exact />
              <Route path='/account/cart' component={Cart} exact />
              <Route path='/reset-password' component={Reset} exact />
              <Route path='/new-password/:token' component={NewPassword} exact />
            </Switch>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
