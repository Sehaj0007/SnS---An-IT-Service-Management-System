import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ServiceList from '../components/ServiceList';
import AppointmentForm from '../components/AppointmentForm';

const HomePage = () => {
  const { user } = useAuth();

  // This function decides what to show in the appointment section
  // based on the user's login status and role.
  const renderAppointmentSection = () => {
    // --- THIS IS THE FIX ---
    // Case 1: An Admin is logged in.
    // The check is updated to 'ROLE_ADMIN' to match the AuthContext.
    if (user && user.role === 'ROLE_ADMIN') {
      return null; // Nothing is displayed for admins.
    }

    // --- AND THIS IS THE FIX ---
    // Case 2: A regular USER is logged in.
    // The check is updated to 'ROLE_USER' to match the AuthContext.
    if (user && user.role === 'ROLE_USER') {
      return <AppointmentForm />; // The form is displayed for users.
    }

    // Case 3: No one is logged in (guest visitor).
    // We show a message asking them to log in.
    return (
      <section id="appointment" className="py-12 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Book a Consultancy Appointment</h2>
                <p className="text-gray-600 mb-6">
                    Please log in or create an account to schedule an appointment with our experts.
                </p>
                <Link 
                    to="/login" 
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login or Register to Book
                </Link>
            </div>
        </div>
      </section>
    );
  };

  return (
    <div className="homepage">
      <ServiceList />
      {renderAppointmentSection()}
    </div>
  );
};

export default HomePage;

