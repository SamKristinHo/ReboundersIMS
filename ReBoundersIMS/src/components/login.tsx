/**
 * @returns "Login" Component
 * @description This component is meant to be used as the entryway into
 * the web app. It will serve as the communication point with Firebase Authentication
 * to reveal account data that is associated with a valid login id and password
 * upon authentication.
 * TODO:
 * 1.) need to figure out styling for this (own .css or bootstrap?)
 * 2.) Firebase connection
 * 3.) create login fields and rest of buttons
 *
 */

import { Fragment } from "react";

interface loginProps {
  children: string;
  onLoggedIn: () => void;
}

function Login({ children, onLoggedIn }: loginProps) {
  return (
    <Fragment>
      <h1>Rebounders</h1>
      <h2>Internal Management System</h2>
      <h3>{children}</h3>

      <button className="btn btn-primary" onClick={onLoggedIn}>
        Login
      </button>
    </Fragment>
  );
}

export default Login;
