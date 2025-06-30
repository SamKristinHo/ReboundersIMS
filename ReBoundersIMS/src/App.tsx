import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Fragment, useState } from "react";
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
  //const [loginPageView, setLoginPageView] = useState(true);
  const [loginStatus, setLoggedInStatus] = useState(false);
  const [calendarPageView, setCalendarPageView] = useState(false);
  const [resourcePageView, setResourcePageView] = useState(false);

  /**
   * @description This section defines event handlers that interacts from
   * components
   */

  return (
    // Head Level: START Parent Element
    <div>
      <section id="topOfPage">
        <div>
          {!loginStatus ? (
            <Fragment>
              <Login onLoggedIn={() => setLoggedInStatus(true)}>
                Welcome! Please Login.
              </Login>
            </Fragment>
          ) : (
            <h1>successful login placeholder</h1>
          )}
        </div>
      </section>

      <section id="middleOfPage">
        <div>
          <h1>second section first div</h1>
        </div>
      </section>
    </div> // Head Level: END Parent Element
  );
}

export default App;
