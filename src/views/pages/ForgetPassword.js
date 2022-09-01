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
    Container,
    Col,
  } from "reactstrap";
  
  import axios from "axios";
  import React from "react";
  
  const ForgetPassword = () => {
    const [userDetails, setUserDetails] = React.useState({
      email: "",
    });
  
    const handleChange = (e) => {
      setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const [linkSent, setLinkSent] = React.useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("data before sumbision:", userDetails);
      axios({
        method: "post",
        url: "https://adcanyonapinodejs.herokuapp.com/accounts/forgot-password",
        data: userDetails,
      })
        .then((res) => {
          console.log("response:", res.data);
          setLinkSent(res.data.message);
  
        })
        .catch((er) => console.log(er));
    };
  
    return (
      <Container fluid style={{width:'100vw',height:'100vh',margin:0,paddingTop:"40px"}} className=" bg-blue">
          <Row style={{margin:0}} className="justify-content-center">
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 mt-7">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Please enter you email to get reset password link</small>
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
                      placeholder="Email"
                      type="email"
                      name="email"
                      autoComplete="new-email"
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
  
              <small style={{ color: "blue",textAlign:'center',textJustify:"revert" }}>{linkSent}</small>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </Container>
    );
  };
  
  export default ForgetPassword;
  