import React from 'react';
import ServiceList from '../components/ServiceList';
import AppointmentForm from '../components/AppointmentForm';

const HomePage = () => {
  return (
    <div className="homepage">
      <ServiceList />
      <AppointmentForm />
    </div>
  );
};

export default HomePage;
