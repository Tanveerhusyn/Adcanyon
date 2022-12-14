// reactstrap components
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Collapse,
  DropdownItem,
  CardFooter,
  CardTitle,
} from "reactstrap";
import { Switch, Avatar } from "@mui/material";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import { SidebarContext } from "components/context/SidebarContext";
import seller from "../../assets/img/brand/seller.png";
import ads from "../../assets/img/brand/ads.png";
import { dropDownData } from "./Data.js";
import { AdsDropDown } from "./AdsData.js";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";

const Profile = () => {
  const [CountrydropdownOpen, setCountryDropdownOpen] = React.useState(false);
  const [CountrydropdownOpen2, setCountryDropdownOpen2] = React.useState(false);
  const [RegiondropdownOpen, setRegionDropdownOpen] = React.useState(false);
  const [RegiondropdownOpen2, setRegionDropdownOpen2] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [select, setSelect] = React.useState("select");
  const [selectCountry2, setSelectCountry2] = React.useState("select");
  const [selectRegion2, setSelectRegion2] = React.useState("select");
  const [selectRegion, setSelectRegion] = React.useState("select");
  const [currentCode, setCurrentCode] = React.useState("");

  const [formData, setFormData] = React.useState([]);

  const [selectedSellerURL, setSelectedSellerURL] = React.useState("");
  const [selectedAdvertURL, setSelectedAdvertURL] = React.useState("");

  const toggleRegion = () => setRegionDropdownOpen((prevState) => !prevState);
  const Countrytoggle = () => setCountryDropdownOpen((prevState) => !prevState);
  const toggleRegion2 = () => setRegionDropdownOpen2((prevState) => !prevState);
  const Countrytoggle2 = () =>
    setCountryDropdownOpen2((prevState) => !prevState);
  const [isExOpen, setExIsOpen] = React.useState(false);
  const [isExOpen2, setExIsOpen2] = React.useState(false);

  const [sellerAuthCode, setSellerAuthCode] = React.useState("");
  const [sellerPartnerID, setSellerPartnerID] = React.useState("");
  const [advertAuthCode, setAdvertAuthCode] = React.useState("");

  // const [sellerRefToken,setSellerRefToken] = React.useState("");
  const [advertRefToken, setAdvertRefToken] = React.useState("");
  const [lock, setLock] = React.useState(false);
  const [lock2, setLock2] = React.useState(false);
  const toggleEx = () => setExIsOpen(!isExOpen);
  const toggleEx2 = () => setExIsOpen2(!isExOpen2);
  const { expand } = React.useContext(SidebarContext);

  const RegionDropDownArray = dropDownData.filter(
    (v, i, a) => a.findIndex((v2) => v2.region === v.region) === i
  );

  // const redirectedURL ="https://www.adcanyon.com/?spapi_oauth_code=RHLJmzuODUSSibZJFSBm&state=stateexample&selling_partner_id=A1GD1RU6SOL318";
  const redirectedURL = window.location.search;
  const getAuthCode = (urlArr) => {
    if (urlArr.includes("spapi_oauth_code")) {
      const oauth = urlArr.split("?")[1].split("&")[0].split("=")[1];
      const sellerID = urlArr.split("?")[1].split("&")[2].split("=")[1];

      return ["seller", oauth, sellerID];
    } else if (urlArr.includes("advertising")) {
      const code = urlArr.split("?")[1].split("&")[0].split("=")[1];
      return ["advert", code];
    }

    return [];
  };

  console.log(getAuthCode(redirectedURL));

  React.useEffect(() => {
    const resultUrl = getAuthCode(redirectedURL);
    if (resultUrl && resultUrl[0] == "seller") {
      setSellerAuthCode(resultUrl[1]);
      setSellerPartnerID(resultUrl[2]);
    } else if (resultUrl && resultUrl[0] == "advert") {
      setAdvertAuthCode(resultUrl[1]);
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("user", user);
      if (user.firstName)
        setCurrentUser({ userName: user.firstName, email: user.email });
      else if (user.userName)
        setCurrentUser({ userName: user.userName, email: user.email });
      else if (user.name)
        setCurrentUser({ userName: user.name, email: user.email });

      axios
        .post("https://adcanyonapinodejs.herokuapp.com/api/getaccount", {
          email: user.email,
        })
        .then((res) => {
          console.log("Response", res.data);
          if (res.data.sellerRefreshToken) {
            setSelect(res.data.country);
            setSelectRegion(res.data.region);
            setExIsOpen(true);
            setLock(true);
          }
          if (res.data.advertRefreshToken) {
            setSelectCountry2(res.data.country);
            setSelectRegion2(res.data.region);
            setExIsOpen2(true);
            setLock2(true);
          }
        })
        .catch((err) => console.error(err));
    }

    // if(localStorage.getItem("formData")){
    //  const formD =  JSON.parse( localStorage.getItem("formData"))

    //  setSelect(formD.country)
    //  setSelectRegion(formD.region)

    // }
  }, []);

  React.useEffect(() => {
    //   if(sellerAuthCode){
    //     setExIsOpen(true);

    // }

    if (sellerAuthCode) {
      let sellerRefToken = "";
      const data = {
        grant_type: "authorization_code",
        client_id:
          "amzn1.application-oa2-client.45d74ff4c2b548d9ba9eb13b4fa18107",
        client_secret:
          "21a9b62805f7ad0405d73eef8fd2e8f94580015f25861c26e036bf6d50ce8581",
        code: sellerAuthCode,
      };

      // let axiosConfig = {
      //   headers: {
      //       'Content-Type': 'application/json;charset=UTF-8',
      //       "Access-Control-Allow-Origin": "*",
      //   }
      // };

      let response = axios
        .post("https://api.amazon.com/auth/o2/token", data)
        .then((res) => res.data)
        .catch((err) => console.error(err));

      response.then((data) => {
        const userData = JSON.parse(localStorage.getItem("formData"));
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("Seller Auth", data);

        if (user && userData) {
          console.log("Response");
          const reqData = {
            userName: user?.userName || user.name || "",
            email: user?.email || "",
            brandName: userData?.brandName || "",
            sellerRefreshToken: data.refresh_token,
            advertRefreshToken: advertRefToken,
            country: userData?.country || "",
            region: userData?.region || "",
          };

          axios
            .post("https://adcanyonapinodejs.herokuapp.com/api/store", reqData)
            .then((res) => {
              console.log(res);
              setSelect(res.data.country);
              setSelectRegion(res.data.region);
              setExIsOpen(true);
              setLock(true);
              localStorage.removeItem("formData");
            })
            .catch((err) => console.error(err));
        }
      });
    }
    if (advertAuthCode) {
      console.log(advertAuthCode)
      setLock2(true)
      const data = {
        grant_type: "authorization_code",
        client_id:
          "amzn1.application-oa2-client.45d74ff4c2b548d9ba9eb13b4fa18107",
        client_secret:
          "21a9b62805f7ad0405d73eef8fd2e8f94580015f25861c26e036bf6d50ce8581",
        code: advertAuthCode,
      };

      // let axiosConfig = {
      //   headers: {
      //       'Content-Type': 'application/json;charset=UTF-8',
      //       "Access-Control-Allow-Origin": "*",
      //   }
      // };

      let response = axios
        .post("https://api.amazon.com/auth/o2/token", data)
        .then((res) => res.data)
        .catch((err) => console.error(err));

      response.then((data) => {
        const userData = JSON.parse(localStorage.getItem("formDataAdss"));
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && userData) {
          console.log("Response");
          const reqData = {
            userName: user?.userName || user.name || "",
            email: user?.email || "",
            brandName: userData?.brandName || "",
            advertRefreshToken: data.refresh_token,
            country: userData?.country || "",
            region: userData?.region || "",
          };

          axios
            .post(
              "https://adcanyonapinodejs.herokuapp.com/api/storeAds",
              reqData
            )
            .then((res) => {
              console.log(res);
              setSelectCountry2(res.data.country);
              setSelectRegion2(res.data.region);
              setExIsOpen2(true);
              setLock2(true);
              localStorage.removeItem("formDataAds");
            })
            .catch((err) => console.error(err));
        }
      });
    }
  }, [sellerAuthCode, advertAuthCode]);

  const handleFormData = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-7 " fluid>
        <Row style={{ marginLeft: "260px" }}>
          <Col className="order-xl-1" xl="5" md="8">
            <Card className="bg-secondary shadow" style={{ width: "100%" }}>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            User Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.userName}
                            id="input-last-name"
                            name="userName"
                            onChange={(e) => handleFormData(e)}
                            placeholder="user name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={currentUser.email}
                            onChange={(e) => handleFormData(e)}
                            name="email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            brand Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="brandName"
                            onChange={(e) => handleFormData(e)}
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="danger"
                          onClick={(e) => {
                            e.preventDefault();

                            formData["country"] = select;
                            formData["region"] = selectRegion;
                            localStorage.setItem(
                              "formData",
                              JSON.stringify(formData)
                            );

                            if (!localStorage.getItem("formData")) {
                              localStorage.setItem("formData", formData);
                            }
                          }}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Amazon Account
                  </h6>
                  
                  <hr className="my-4" /> */}
                  {/* Description */}
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="7">
            <div className="pl-lg-4">
              <Row>
                {/* <Col md="4">
                        <h3>
                          US-Akjfsoaidfasdf
                          <p style={{ fontSize: "13px" }}>Added 27-02-2022</p>
                        </h3>
                      </Col> */}
                {/* <Col>
                      <Button onClick={(e)=>{
                        e.preventDefault();
                        setShow(true);
                      }}>+</Button>
                      </Col> */}
              </Row>
              <Row>
                <Row style={{ display: "flex", flexDirection: "column" }}>
                  <Card
                    style={{ width: "45vw", marginRight: 0, height: "200px" }}
                  >
                    {/* <CardHeader style={{ fontSize: "13px" }}>
                            This is the top text which I will add later
                          </CardHeader> */}
                    <CardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar
                            alt="Seller"
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
                              height: "80px",
                              width: "80px",
                              margin: "5px",
                            }}
                            src={seller}
                          />
                          <strong>
                            <h3>Seller central</h3>
                          </strong>
                        </div>

                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Switch
                            checked={isExOpen}
                            disabled={lock}
                            onChange={toggleEx}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <small
                            style={{
                              color: "green",
                              display: `${lock ? "block" : "none"}`,
                            }}
                          >
                            Enabled
                          </small>
                        </div>
                      </div>
                      <p style={{ fontSize: "13px" }}>
                        The card footer contains Description of the actions that
                        we will be performing
                      </p>
                    </CardBody>
                  </Card>
                  <Collapse isOpen={isExOpen}>
                    <Card>
                      <CardBody>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Col lg="4">
                            <FormGroup
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Select Region
                              </label>
                              <Dropdown
                                isOpen={RegiondropdownOpen}
                                toggle={toggleRegion}
                                direction="down"
                              >
                                <DropdownToggle disabled={lock} caret>
                                  {selectRegion}
                                </DropdownToggle>

                                <DropdownMenu>
                                  {RegionDropDownArray.map((data) => (
                                    <DropdownItem
                                      onClick={(e) =>
                                        setSelectRegion(data.region)
                                      }
                                    >
                                      {data.region}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </Dropdown>
                            </FormGroup>
                          </Col>
                          <FormGroup
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Select Country
                            </label>
                            <Dropdown
                              isOpen={CountrydropdownOpen}
                              toggle={Countrytoggle}
                              direction="down"
                            >
                              <DropdownToggle disabled={lock} caret>
                                {select}
                              </DropdownToggle>

                              <DropdownMenu>
                                {dropDownData.map((data) => (
                                  <DropdownItem
                                    onClick={(e) => {
                                      setSelect(data.country);
                                      setCurrentCode(data.code);
                                      setSelectedSellerURL(data.url);
                                    }}
                                  >
                                    <Row>
                                      <Col>{data.country}</Col>
                                      <Col md="4">
                                        <ReactCountryFlag
                                          countryCode={data.code}
                                          svg
                                          style={{
                                            width: "1.5em",
                                            height: "1.5em",
                                          }}
                                          title="US"
                                        />
                                      </Col>
                                    </Row>
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>

                          <Col></Col>
                          <Col>
                            <button
                              onClick={(e) => {
                                formData["country"] = select;
                                formData["region"] = selectRegion;
                                formData["code"] = currentCode;
                                localStorage.setItem(
                                  "formData",
                                  JSON.stringify({
                                    country: select,
                                    region: selectRegion,
                                    code: currentCode,
                                  })
                                );

                                window.open(
                                  `${!sellerAuthCode ? selectedSellerURL : ""}`,
                                  "_self"
                                );
                              }}
                              className="btn btn-primary"
                              style={{
                                display: `${
                                  selectedSellerURL ? "block" : "none"
                                }`,
                              }}
                            >
                              Authenticate
                            </button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Collapse>
                </Row>
              </Row>

              <Row>
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Card style={{ width: "45vw", height: "200px" }}>
                    {/* <CardHeader style={{ fontSize: "13px" }}>
                            This is the top text which I will add later
                          </CardHeader> */}
                    <CardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar
                            alt="ads"
                            style={{
                              boxShadow:
                                "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",

                              height: "80px",
                              width: "80px",
                              margin: "8px",
                            }}
                            src={ads}
                          />
                          <strong>
                            <h3>Amazon Ads</h3>
                          </strong>
                        </div>
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Switch
                            checked={isExOpen2}
                            onChange={toggleEx2}
                            disabled={lock2}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <small
                            style={{
                              color: "green",
                              display: `${lock2 ? "block" : "none"}`,
                            }}
                          >
                            Enabled
                          </small>
                        </div>
                      </div>
                      <p style={{ fontSize: "13px" }}>
                        The card footer contains Description of the actions that
                        we will be performing
                      </p>
                    </CardBody>
                  </Card>
                  <Collapse isOpen={isExOpen2}>
                    <Card>
                      <CardBody>
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Col lg="4">
                            <FormGroup
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Select Region
                              </label>
                              <Dropdown
                                isOpen={RegiondropdownOpen2}
                                toggle={toggleRegion2}
                                direction="down"
                              >
                                <DropdownToggle disabled={lock2} caret>
                                  {selectRegion2}
                                </DropdownToggle>

                                <DropdownMenu>
                                  {RegionDropDownArray.map((data) => (
                                    <DropdownItem
                                      onClick={(e) =>
                                        setSelectRegion2(data.region)
                                      }
                                    >
                                      {data.region}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </Dropdown>
                            </FormGroup>
                          </Col>
                          <FormGroup
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Select Country
                            </label>
                            <Dropdown
                              isOpen={CountrydropdownOpen2}
                              toggle={Countrytoggle2}
                              direction="down"
                            >
                              <DropdownToggle disabled={lock2} caret>
                                {selectCountry2}
                              </DropdownToggle>

                              <DropdownMenu>
                                {AdsDropDown.map((data) => (
                                  <DropdownItem
                                  
                                    onClick={(e) => {
                                      setSelectCountry2(data.country);

                                      setSelectedAdvertURL(data.url);
                                    }}
                                  >
                                    <Row>
                                      <Col>{data.country}</Col>
                                      <Col md="4">
                                        <ReactCountryFlag
                                          countryCode={data.code}
                                          svg
                                          style={{
                                            width: "1.5em",
                                            height: "1.5em",
                                          }}
                                          title="US"
                                        />
                                      </Col>
                                    </Row>
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>

                          <Col></Col>
                          <Col>
                            <button
                              onClick={(e) => {
                                localStorage.setItem(
                                  "formDataAds",
                                  JSON.stringify({
                                    country: selectCountry2,
                                    region: selectRegion2,
                                  })
                                );

                                window.open(
                                  `${!advertAuthCode ? selectedAdvertURL : ""}`,
                                  "_self"
                                );
                              }}
                              className="btn btn-primary"
                              style={{
                                display: `${
                                  selectedAdvertURL ? "block" : "none"
                                }`,
                              }}
                            >
                              Authenticate
                            </button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Collapse>
                </Row>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
