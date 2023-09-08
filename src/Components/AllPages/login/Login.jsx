import React from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UseCommonState } from "../../Reducers/UseCommonState";
import axiosInstance from "../../Reducers/AxiosConfig";

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const{username,setUsername,password,setPassword,errorMessage,setErrorMessage}=UseCommonState();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {

console.log(username);
console.log(password);

       await axiosInstance.post(
        "/mails/authenticate",
        {
          username,
          password
        }
      ).then((res)=>console.log(res))
      
      
//       const token = response.data.jwtToken;
//         console.log(token)


//         Cookies.set("token",token);

// console.log(Cookies.get('token'))

      // localStorage.setItem("token", token);
        // console.log(response);
      navigate("/Inbox");
    } catch (error) {
      setErrorMessage("Invalid username or password Check it!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="Login-div">
      <h2> HIT Login</h2>
      <form onSubmit={handleLogin} className="Login">
        <div>
          <label>Email-Id:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email-Id"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
        <NavLink to="/SignUp">
          <p className="link">Sign Up</p>
        </NavLink>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;
