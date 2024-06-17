import { createContext } from 'react';
import './App.css';
import SignupPage from './pages/signup/SignupPage';
import HomePage from './pages/home/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const ClientDataContext = createContext();

/**
 * The main App component.
 * It provides the client data context and routes to the appropriate pages.
 */
export default function App() {
  // The client data object.
  const clientData = {};

  return (
    // Provide the client data context to all the nested components.
    <ClientDataContext.Provider value={clientData}>
      {/* Use the BrowserRouter for client-side routing. */}
      <BrowserRouter>
        {/* Define the routes for the application. */}
        <Routes>
          {/* Route for the signup page. */}
          <Route path="/" element={<SignupPage />} />
          {/* Route for the home page. */}
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ClientDataContext.Provider>
  );
}


