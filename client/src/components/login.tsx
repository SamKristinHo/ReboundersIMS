/**
 * @returns "Login" Component
 * @description This component is meant to be used as the entryway into
 * the web app. It will serve as the communication point with Firebase Authentication
 * to reveal account data that is associated with a valid login id and password
 * upon authentication (which will trigger this component to be invisiible)
 * and the main calendar page to be visible)
 *
 * @import MaterialUI for styling
 * TODO:
 * 1.) Firebase connection
 * 2.) Create "Forgot password" functionality
 * 3.) Create Google, Facebook, Apple etc login functionality
 * 4.) Create admin privileges where they can approve of an email
 * for an employee to do read-only account signup
 */

import { Fragment, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { onAuthStateChanged } from "firebase/auth";

interface loginProps {
  children: string;
  onLoggedIn: () => void;
}

function Login({ children, onLoggedIn }: loginProps) {
  /**
   * useStates for Login Form
   * 1. email entered
   * 2. password entered
   * 3. email + password submitted
   */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  /**
   * Local Event Handler for credentials submit (Login Button Press)
   * This function
   * 1. sets the local useState for credentials to true
   * 2. communicates with App.tsx consumer to show that login was successful
   * 3. handles Firebase authentication
   */

  const handleLoginPress = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const user = userCredential.user;
          setInvalidLogin(false);
          onLoggedIn();
        })
        .catch((error) => {
          setInvalidLogin(true);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Login Error Code:" + errorCode);
          console.log("Login Error Message:" + errorMessage);
          console.log("Credentials Entered:");
          console.log(email);
          console.log(password);
        });
    }
  };

  /**
   *
   *
   */

  return (
    <Fragment>
      <div
        className="flex items-center justify-center h-64 w-full bg-gray-100"
        style={{
          backgroundColor: "lightblue",
          margin: 50,
        }}
      >
        <img src="https://rebounders.com/wp-content/uploads/2024/06/Untitled-design-21.png"></img>
      </div>
      <h1>Rebounders</h1>
      <h2>Internal Resource Management System</h2>
      <h3>{children}</h3>

      <Box
        component="form"
        onSubmit={handleLoginPress}
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={submitted && !email}
            helperText={submitted && !email ? "Email is required!" : ""}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={submitted && !password}
            helperText={submitted && !password ? "Password is required!" : ""}
          />
        </div>
      </Box>
      <div>
        {invalidLogin ? (
          <p style={{ color: "red" }}>
            Invalid credentials entered. Please enter correct admin credentials.
          </p>
        ) : null}
      </div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleLoginPress}
        type="submit"
      >
        Login
      </Button>
    </Fragment>
  );
}

export default Login;
