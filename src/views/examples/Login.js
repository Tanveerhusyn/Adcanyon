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

import axios from "axios";
import React from "react";
import jwt_decode from "jwt-decode";

import adCanBrand from '../../assets/img/brand/AdCanBrand.png'

import { Link,useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });

  window.document.body.style.overflow = "hidden";

  const [error, setError] = React.useState("")
  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleCallBackResponse(response) {
    var userData = jwt_decode(response.credential);
    console.log(userData)
    // window.location.assign("/user-profile");
   if(userData) {
    
    window.location.replace("/user-profile")

    localStorage.setItem("user",JSON.stringify(userData))
   }
    
  }

  React.useEffect(() => {
    /*global google */

    google.accounts?.id.initialize({
      client_id:
        "128282856462-lobjejm1a8bnna711kktsuah49v5p8i8.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts?.id.renderButton(
      document.getElementById("singInWithGoogle"),
      { theme: "outline", siez: "large" }
    );
    google.accounts?.id.prompt();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data before sumbision:", userDetails);
    axios({
      method: "post",
      url: "https://adcanyonapinodejs.herokuapp.com/accounts/authenticate",
      data: userDetails,
    })
      .then((res) => {
        console.log("response:", res.data);

        console.log("token", res.data);
        localStorage.setItem("user",JSON.stringify(res.data))
        window.location.replace("/user-profile")
        console.log("Successfull Login!");
      })
      .catch((er) => setError(er.response.data.message));
  };

  return (
    <>
      <Col lg="5" md="7" className="mt-5">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          {/* <h1 className="text-center mb-4">Welcome to Adcanyon</h1> */}
          <img style={{width:'120px',height:"50px"}} src={adCanBrand} />

            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
             
                <div className="text-center" style={{marginRight:'auto', marginLeft:'auto'}}>
              <div id="singInWithGoogle" style={{width:'95%',  display:'flex', justifyContent:'center', alignItems:'center'}}></div>
            </div>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-3">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
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
                    name="password"
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              {error?<p className="" style={{color:'red',textAlign:'center',fontSize:"15px",marginTop:'3px'}}>{error}</p>:null}
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            {/* <a
              className="text-light"
              href="/resetPassword"
              onClick={(e) => e.preventDefault()}
            > */}
              <Link to="/auth/forget-password">
                <small style={{color:"white"}}>Forgot password?</small>
              </Link>
            {/* </a> */}
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <Link to="/auth/register">
                <small style={{color:"white"}}>Create new account</small>
              </Link>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
