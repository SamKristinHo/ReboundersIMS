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
 *
 */

import { Fragment, useState } from "react";
import { Button, Box, TextField } from "@mui/material";

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
      onLoggedIn(); // TODO:only trigger this when firebase auth is successful
      console.log(email);
      console.log(password);
      // send to firebase authentication here
      // handle errors: login account not found, password incorrect etc
    }
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "lightblue",
          margin: 50,
        }}
      >
        <img src="https://rebounders.com/wp-content/uploads/2024/06/Untitled-design-21.png"></img>
      </div>
      <h1>Rebounders</h1>
      <h2>Internal Management System</h2>
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
