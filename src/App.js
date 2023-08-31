import React from 'react';
import AllRoutes from './AllRoutes';
import './App.css';


function App() {
  return (
    
      <div className="App">
   
        <AllRoutes />
      </div>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Navbar from './Components/AllPages/Navbar/Navbar';
// import LeftSideBar from './Components/LeftSideRouteBar/LeftSideBar';
// import { useShouldRenderNavAndSidebar } from './useShouldRenderNavAndSidebar';
// import SignUpPage from './Components/AllPages/signup/SignUpPage';
// import LoginPage from './Components/AllPages/login/LoginPage';
// import AllRoutes from './AllRoutes'; // Make sure AllRoutes is correctly imported

// function App() {
//   const shouldRenderNavAndSidebar = useShouldRenderNavAndSidebar();

//   return (
//     <Router>
//       <div className="App">
//         {shouldRenderNavAndSidebar && (
//           <>
//             <Navbar />
//             <LeftSideBar />
//           </>
//         )}
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/*" element={<AllRoutes />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
