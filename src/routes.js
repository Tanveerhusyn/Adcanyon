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
import Index from "views/Index.js";
import Profile from "views/pages/Profile.js";
import Maps from "views/pages/Maps.js";
import Register from "views/pages/Register.js";
import Dashboard from "views/pages/Dashboard"
import Login from "views/pages/Login.js";
import ForgetPassword from "views/pages/ForgetPassword.js";
import ResetPassword from "views/pages/ResetPassword.js";
import Tables from "views/pages/Tables.js";
import Icons from "views/pages/Icons.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-key-25 text-info",
    component: Dashboard,
    layout: "/",
  },
  
  {
    path: "/user-profile/",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  
  
 
  
];
export default routes;
