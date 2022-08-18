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
import React from 'react';
import { SidebarContext } from "components/context/SidebarContext";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import {GiHamburgerMenu} from 'react-icons/gi';
import AdCanBrand from "../../assets/img/brand/AdCanBrand.png"
const AdminNavbar = (props) => {
  const {expand,setExpand} = React.useContext(SidebarContext);
  const [currentUser, setCurrentUser] = React.useState("")
  
  React.useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      if(user.firstName)setCurrentUser(user.firstName)
      else if(user.userName)setCurrentUser(user.userName)
      else if(user.name)setCurrentUser(user.name)
      console.log(user)
    }
  })
  return (
    <>
      <Navbar className="navbar-top navbar-dark" style={{background:'#11cdef',position:'fixed',zIndex:"999",width:'100%'}} expand="md" id="navbar-main">
        <Container fluid>
          {
            !expand?
          <GiHamburgerMenu style={{color:"white",height:'40px',width:'80px',cursor:'pointer',marginRight:'30px',marginLeft:'-20px'}} onClick={()=>setExpand(!expand)}/>
:null
          }
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
        <img src={AdCanBrand} style={{width:'110px',height:'30px',background:"white",borderRadius:'10px'}}/>
          </Link>
        
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                   
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {currentUser}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                  <i className="ni ni-user-run" />
                <a onClick={()=>{
                  localStorage.removeItem("user")
                  window.location.assign("/auth/login")
                }}> <span>Logout</span></a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
