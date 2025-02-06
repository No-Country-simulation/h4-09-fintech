import { useEffect } from 'react';
import './App.css';

import Router from './Router';
import { useUser } from './context/UserContext';

function App() {
  const { fetchUserData } = useUser();
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
