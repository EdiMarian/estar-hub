import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore from '../../../store/AccountStore';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../../routes';
import { Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ESTAR_API } from '../../../config';
import jwtDecode from 'jwt-decode';

const CreateAccount = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (accountStore.isLoggedIn) return <Navigate to={routeNames.home} />;
  if (!accountStore.getAccessToken) return <Navigate to={routeNames.login} />;

  const createAccount = async () => {
    if (!accountStore.getAccessToken) {
      setError('Try again later!');
      return;
    }
    const accountDecoded: { email: string } = jwtDecode(
      accountStore.getAccessToken
    );
    if (!accountDecoded.email) {
      setError('Try again later! email');
      return;
    }

    try {
      const { data } = await axios.post(ESTAR_API + '/users', {
        email: accountDecoded.email,
        username: username.replaceAll(' ', '').toUpperCase()
      });
      if (typeof data === 'string') {
        setError(data);
        return;
      }
      accountStore.loadAccount();
    } catch {
      setError('An error!');
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h4 className='text-center'>
            To create account you need to set an username!
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='string'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && <Form.Text className='text-danger'>{error}</Form.Text>}
            </Form.Group>
            <Button variant='primary' onClick={createAccount}>
              Submit
            </Button>
            <Button
              variant='secondary'
              onClick={() => accountStore.resetAccessToken()}
              className='mx-2'
            >
              Abandon
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
});

export { CreateAccount };
