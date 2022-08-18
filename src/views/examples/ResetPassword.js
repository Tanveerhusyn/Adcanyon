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
  
  const ResetPassword = () => {

    const url = window.location.search.split("=");


    const [tokenCode, setTokenCode] = React.useState(url[1])
    const [userDetails, setUserDetails] = React.useState({
        token:tokenCode,
    });
  

   
    const handleChange = (e) => {
      setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const [linkSent, setLinkSent] = React.useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("dslfjks",userDetails)
    //   console.log("data before sumbision:", userDetails);
      axios({
        method: "post",
        url: "https://adcanyonapinodejs.herokuapp.com/accounts/reset-password",
        data: userDetails,
      })
        .then((res) => {
          console.log("response:", res.data);
          
          setLinkSent(res.data?.message || "Successful");

          window.location.assign("/auth/login")
          
  
        })
        .catch((er) => console.log(er));
    };
  
    return (
      <>
        <Col lg="5" md="7" style={{marginLeft:"300px"}}>
          <Card className="bg-secondary shadow border-0 mt-7">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Please enter a new Password</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="text"
                      name="password"
                      onChange={handleChange}
                    />
                    
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="text"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                    
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox"></div>
                <div className="text-center d-flex flex-column">
                
                  <Button
                    onClick={handleSubmit}
                    className="my-4"
                    color="primary"
                    
                    type="button"
                  >
                    Reset Password
                  </Button>
                  <a
                    href="/auth/login"
                    className="my-4"
                    color="primary"
                    type="button"
                  >
                   <small>Back to Login</small> 
                  </a>
                </div>
              </Form>
  
              <h5 style={{ color: "green" }}>{linkSent}</h5>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default ResetPassword;
  