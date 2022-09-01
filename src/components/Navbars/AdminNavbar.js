
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
import ReactCountryFlag from "react-country-flag"

import {GiHamburgerMenu} from 'react-icons/gi';
import AdCanBrand from "../../assets/img/brand/AdCanBrand.png"
import { Avatar } from '@mui/material';
const AdminNavbar = (props) => {
  const {expand,setExpand} = React.useContext(SidebarContext);
  const [currentUser, setCurrentUser] = React.useState("")
  const [country,setCountry] = React.useState("")
  
  
  React.useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const formData = JSON.parse(localStorage.getItem("formData"))  
     
    if(user){
      if(user.firstName)setCurrentUser(user.firstName)
      else if(user.userName)setCurrentUser(user.userName)
      else if(user.name)setCurrentUser(user.name)
     
    }
    if(formData){
      setCountry(formData.code)
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
     
          </Link>
        
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {country?(<ReactCountryFlag
                countryCode={country}
                svg
                style={{
                    width: '2.6em',
                    height: '2.6em',
                  
                }}
                title="US"
            />  
                  ):currentUser?currentUser:<Avatar/>}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
               
                <DropdownItem divider />
                
                 
                <a onClick={()=>{
                  localStorage.removeItem("user")
                  window.location.assign("/auth/login")
                }}>
                  <DropdownItem >
                  <i className="ni ni-user-run" />
                 
                  <span>Logout</span> </DropdownItem></a>
               
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
