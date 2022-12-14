import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div>
      {user? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
