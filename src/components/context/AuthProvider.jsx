//state management tool
import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    const [_employees, setEmployees] = useState(null); // defined this state for holding employees data.
    const [test, setTest] = useState(false);

    useEffect(() => {
        setLocalStorage()
        const {employees} = getLocalStorage();
        setEmployees(employees);
        setUserData(employees)
    }, [])   
    

    // created below effect for appending new data... 
    useEffect(() => {
        if(_employees !=null)
       setUserData(_employees)
    }, [setEmployees, test]);



    return (
        <div>
            <AuthContext.Provider value={{userData,setUserData, _employees, setEmployees, setTest}}> 
                {/* // converted into object */}
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider 