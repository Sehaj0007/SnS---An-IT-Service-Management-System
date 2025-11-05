import React from 'react';
import { Container } from 'react-bootstrap';
import PcBuilder from '../components/PcBuilder';

const CustomPCPage = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center my-4">Build Your Custom PC</h2>
      <PcBuilder />
    </Container>
  );
};

export default CustomPCPage;
