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
// import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
// import { useShouldRenderNavAndSidebar } from './useShouldRenderNavAndSidebar';
// import SignUp from './Components/AllPages/SignUp/SignUp';
// import Login from './Components/AllPages/Login/Login';
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
//           <Route path="/Login" element={<Login />} />
//           <Route path="/SignUp" element={<SignUp />} />
//           <Route path="/*" element={<AllRoutes />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
