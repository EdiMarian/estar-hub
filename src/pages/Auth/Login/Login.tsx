import { Col, Row } from "react-bootstrap";
import { AuthMethod } from "../shared";

const Login = () => {
  return <>
    <Row>
      <Col sm={12}>
        <h1 className="text-center">Login</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <AuthMethod method="login"/>
      </Col>
    </Row>
  </>;
};

export { Login };
