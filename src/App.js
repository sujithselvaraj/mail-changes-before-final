import React, { useEffect } from 'react';
import AllRoutes from './AllRoutes';
import './App.css';
import { keycloak } from './keycloak';

function App() {


useEffect(()=>{

  if(!keycloak.authenticated){
    keycloak.login()
  
  }
 
},[])
  return (
    
      <div className="App">
   
        <AllRoutes />
      </div>
  );
}

export default App;


