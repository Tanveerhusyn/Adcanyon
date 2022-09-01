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
  FormFeedback,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Spinner
} from "reactstrap";
import jwt_decode from "jwt-decode";
import AdCanBrand from "../../assets/img/brand/AdCanBrand.png";

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
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
  });

  const [error, setError] = React.useState("");
  // message: "Validation error: \"title\" is required, \"firstName\" is required, \"lastName\" is required, \"email\" is required, \"password\" is required, \"confirmPassword\" is required, \"acceptTerms\" is required"

  const handleChange = (e) => {
    if (e.target.name.includes("password") && e.target.value.length < 6) {
      setError("Password length must be at least 6 characters long");
    } else setError("");
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // .post("https://adcanyonapinodejs.herokuapp.com/accounts/register", {
  const [reg, setReg] = React.useState(false);
  const [loading,setLoading] = React.useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);

  if(!error){
      setLoading(true)
      axios({
      method: "post",
      url: "https://adcanyonapinodejs.herokuapp.com/accounts/register",
      data: userDetails,
    })
      .then((res) => {
        console.log("response:", res.data);
      setLoading(false)
        window.location.assign("/auth/login");
        setReg(true);
      })
      .catch((er) => {console.log(er)
      
        setLoading(false)});
  }
  };
  // setReg ? location.replace("http://localhost:3000/auth/login") : null;

  return (
    <Container fluid style={{width:'100vw',height:'100vh',margin:0,paddingTop:'10px'}} className=" bg-blue">
    <Row style={{margin:0}} className="justify-content-center">
      <Col lg="5" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "5px 2px",
              }}
            >
              <img
                src={AdCanBrand}
                style={{ width: "150px", height: "60px" }}
              />
            </div>
            <div
              className="text-center"
              style={{ marginRight: "auto", marginLeft: "auto" }}
            >
              <div
                id="singInWithGoogle"
                style={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            </div>
          </CardHeader>
          <CardBody
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="  py-lg-1"
          >
            <div className="text-center text-muted mb-2">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" style={{ width: "80%" }}>
              <FormGroup>
                <InputGroup className="  mb-3">
                  
                  <Input
                    placeholder="User Name"
                    name="userName"
                    type="text"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="  mb-3">
                  
                  <Input
                    placeholder="Account ID"
                    name="accountID"
                    type="text"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className=" mb-3">
                  
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
                <Input
                  invalid={error}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                <FormFeedback>{error}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <InputGroup className="">
                 
                  <Input
                    invalid={error}
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormFeedback>{error}</FormFeedback>
              </FormGroup>

              <Row className="my-2">
                <Col xs="12">
                  <div className="text-start">
                    <small className="text-muted">
                      Already have account? <a href="/auth/login">Login</a>
                    </small>
                  </div>
                </Col>
                {/* {
                      error?<p className="" style={{color:'red',textAlign:'center',fontSize:"15px",marginTop:'3px'}}>{error}</p>:null
                    } */}
              </Row>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="mt-4"
                  color="primary"
                  type="button"
                >
                  {loading?<Spinner className="mr-2" size="sm">
    Loading...
  </Spinner>:null}
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </Container>
  );
};

export default Register;
