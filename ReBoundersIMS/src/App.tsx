import { Fragment, use, useState } from "react";
import "./App.css";
import Login from "./components/login";

function App() {
  /**
   *
   * @description This following section will define all the necessary
   * states that are being actively managed by App.tsx. It will be used
   * to control which components are shown and will be dependent on
   * actions taken:
   *  1. Login view (true/false)
   *  2. Calendar view (true/false)
   *  3. Resource view (true/false)
   *
   */
  const [loginPageView, setLoginPageView] = useState(true);
  const [loginStatus, setLoggedInStatus] = useState(false);
  const [calendarPageView, setCalendarPageView] = useState(false);
  const [resourcePageView, setResourcePageView] = useState(false);
  return (
    <Fragment>
      <Login onLoggedIn={() => setLoggedInStatus(true)}>
        Welcome! Please Login.
      </Login>
      ;
    </Fragment>
  );
}

export default App;
