/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/--dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <div style={{height:'20px'}}>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
        height: "20px",
        maxHeight:'40px', 
   
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span style={{background:'#11cdef'}} className="mask default" />
        {/* Header container */}
     
      </div>
    </div>
  );
};

export default UserHeader;
