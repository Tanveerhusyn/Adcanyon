/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SidebarContextProvider from './components/context/SidebarContext'
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Profile from "views/examples/Profile.js";

import routes from "routes";
import AdminLayout from "layouts/Admin.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import AuthLayout from "layouts/Auth.js";
import Sidebar from 'components/Sidebar/Sidebar'
import ResetPassword from 'views/examples/ResetPassword'

ReactDOM.render(
  <SidebarContextProvider>

  <BrowserRouter>

  {
    
    window.location.pathname.includes("auth")==false &&!window.location.pathname.includes("reset")?
 <>
    <AdminNavbar
         
         />
   <Sidebar
      
         routes={routes}
         logo={{
           innerLink: "/user-profile",
           imgSrc: require("./assets/img/brand/argon-react.png").default,
           imgAlt: "...",
         }}
       />
 
 </>:
    console.log(window.location)

  }
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/user-profile" component={Profile} />
      <Route path="/user-profile/:id" component={Profile} />
      <Route path="/reset-password/:id" component={ResetPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
    {
      !localStorage.getItem("user")?<Redirect from="*" to="/auth/login" />:<Redirect from="*" to="/user-profile" />
    }  
    </Switch>
  </BrowserRouter>
  </SidebarContextProvider>
  ,document.getElementById("root")
);
