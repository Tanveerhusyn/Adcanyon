
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {TiInfo} from 'react-icons/ti'
const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 h-full pt-md-8" style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Card>
      <CardBody>
        <CardTitle style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <TiInfo style={{color:"red",height:"50px",width:'50px'}}/>
         Not Development Yet</CardTitle>
      </CardBody>
    </Card>
      </div>
    </>
  );
};

export default Header;
