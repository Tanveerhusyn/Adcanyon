import React from 'react'
import Profile from "views/examples/Profile.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import routes from "routes";
import AdminLayout from "layouts/Admin.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import AuthLayout from "layouts/Auth.js";
import Sidebar from 'components/Sidebar/Sidebar'
import ResetPassword from 'views/examples/ResetPassword'


function App() {
    const [trigger, setTrigger] = React.useState(true)
    React.useEffect(()=>{
      
        if(localStorage.getItem("user")=="[object Object]"){
            localStorage.removeItem("user")
            setTrigger(true)
        }

        if(localStorage.getItem("user")!=undefined){
     

            setTrigger(false)
        }
    
    },[])
  return (
    <>
 <BrowserRouter>
  

  {
    
    window.location.pathname.includes("auth")==false && window.location.pathname!="/" && !window.location.pathname.includes("reset")?
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
        trigger==true?<Redirect from="*" to="/auth/login" />:<Redirect from="*" to="/user-profile" />
    }  
    </Switch>
  </BrowserRouter>
    </>
  )
}

export default App