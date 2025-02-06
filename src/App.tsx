import { useEffect } from 'react';
import './App.css';

import Router from './Router';
import { useUser } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
function App() {
  const { fetchUserData } = useUser();
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-center"
        closeOnClick
        autoClose={1500}
        hideProgressBar
        theme="dark"
        stacked
      />
    </>
  );
}

export default App;
