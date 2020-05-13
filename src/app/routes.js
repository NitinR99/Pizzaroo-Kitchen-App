import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../account/homePage";
import NotFound from "./layout/NotFound";
import Login from "../account/login";
import Orders from "../orders";
import Protected from "./protected";
import Signup from '../account/signup';
import Loading from './layout/loading'

export default function Routes() {
  return (
    <Switch>

      {/* <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <Protected exact path="/orders" component={Orders}/> */}

      <Route exact path="/loading" component={Loading}/>

      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
}
// export default Routes = {

//   '/': ()=> <Home/>,
//   '/login': ()=> <Login/>,
//   '/signup': ()=> <Signup/>,
//   '/orders': ()=> <Orders/>,
//   '/NotFound': ()=> <NotFound/>
// }
