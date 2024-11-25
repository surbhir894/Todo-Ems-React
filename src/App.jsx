import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './components/context/AuthProvider.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const {userData, setUserData, _employees} = useContext(AuthContext) || [null, null];

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsedData = JSON.parse(loggedInUser);
      setUser(parsedData.role);
      setLoggedInUserData(parsedData.data || null);
    }
  }, []);

  const handleLogin = (email, password) => {
    console.log(email ,password)
    if (email === 'surbhir894@gmail.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } 
    else if (userData && userData.length > 0) {
      const employee = userData.find((e) => email === e.email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard changeUser={setUser} />}
      {user === 'employee' && <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />}
    </>
  );
};

export default App;
