import React from 'react';
import { Container } from 'react-bootstrap';

export const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return <Container>{children}</Container>;
};
