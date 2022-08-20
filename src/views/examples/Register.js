import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import jwt_decode from "jwt-decode";
import AdCanBrand from '../../assets/img/brand/AdCanBrand.png'

const Register = () => {
  function handleCallBackResponse(response) {
    var userData = jwt_decode(response.credential);
    window.location.assign("/user-profile");
  }

  window.document.body.style.overflow = "hidden";

  React.useEffect(() => {
    /*global google */

    google.accounts.id.initialize({
      client_id:
        "128282856462-lobjejm1a8bnna711kktsuah49v5p8i8.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("singInWithGoogle"),
      { theme: "outline", siez: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  const [userDetails, setUserDetails] = React.useState({
    userName:"",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
  });


  const [error,setError] = React.useState("")
  // message: "Validation error: \"title\" is required, \"firstName\" is required, \"lastName\" is required, \"email\" is required, \"password\" is required, \"confirmPassword\" is required, \"acceptTerms\" is required"

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // .post("http://localhost:4000/accounts/register", {
  const [reg, setReg] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(userDetails);
     
    axios({
      method: "post",
      url: "https://adcanyonapinodejs.herokuapp.com/accounts/register",
      data: userDetails,
    })
      .then((res) => {
        console.log("response:", res.data);
        window.location.assign("/auth/login");
        setReg(true);
      })
      .catch((er) => setError(er.response.data.message));
  };
  // setReg ? location.replace("http://localhost:3000/auth/login") : null;

  return (
    <>
      <Col lg="5" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:"7px 2px"}}>
              <img src={AdCanBrand} style={{width:"150px",height:"60px"}} />
            </div>
            <div className="text-center" style={{marginRight:'auto', marginLeft:'auto'}}>
              <div id="singInWithGoogle" style={{width:'95%',  display:'flex', justifyContent:'center', alignItems:'center'}}></div>
            </div>
          </CardHeader>
          <CardBody style={{width:"100%",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} className="  py-lg-2">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" style={{width:"80%"}}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="User Name"
                    name="userName"
                    type="text"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>



              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <Row className="my-2">
                <Col xs="12">
                  <div className="text-start">
          
                      <small className="text-muted">
                        Already have account?{" "}
                        <a href="/auth/login">
                         Login
                        </a>
                      </small>
              
                   
                  </div>
                </Col>
                {
                      error?<p className="" style={{color:'red',textAlign:'center',fontSize:"15px",marginTop:'3px'}}>{error}</p>:null
                    }
              </Row>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="mt-4"
                  color="primary"
                  type="button"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
