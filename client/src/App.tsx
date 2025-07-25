import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Fragment, useState } from "react";
import "./App.css";
import Login from "./components/login";
import Calendar from "./components/calendar";
import NewClassForm from "./components/newClassForm";
import { Button } from "@mui/material";
//import type { User } from "firebase/auth";

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

  const [loginStatus, setLoggedInStatus] = useState(false);
  const [calendarPageView, setCalendarPageView] = useState(false);
  const [createClassView, setcreateClassView] = useState(false);

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
              <Login
                onLoggedIn={() => {
                  setLoggedInStatus(true);
                  setCalendarPageView(true);
                }}
              >
                Welcome! Please Login.
              </Login>
            </Fragment>
          ) : null}

          {calendarPageView ? (
            <>
              <div className="flex items-center bg-blue-200 justify-between text-white px-10 py-8">
                {/* Left - Logo or Image */}
                <img
                  src="https://rebounders.com/wp-content/uploads/2024/06/Untitled-design-21.png"
                  alt="Logo"
                  className="h-20 w-48 object-contain"
                />

                {/* Right - Buttons From MaterialUI*/}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => {
                      setCalendarPageView(false);
                      setcreateClassView(true);
                    }}
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    Create New Class
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setLoggedInStatus(false);
                      setCalendarPageView(false);
                      setcreateClassView(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>

              <div>
                <p></p>
              </div>

              <div>
                <h2>Class Calendar</h2>
                <Calendar></Calendar>
              </div>
            </>
          ) : null}

          {createClassView ? (
            <>
              <div className="flex items-center bg-blue-200 justify-between text-white px-10 py-8">
                {/* Left - Logo or Image */}
                <img
                  src="https://rebounders.com/wp-content/uploads/2024/06/Untitled-design-21.png"
                  alt="Logo"
                  className="h-20 w-48 object-contain"
                />

                {/* Right - Buttons From MaterialUI*/}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => {
                      setCalendarPageView(true);
                      setcreateClassView(false);
                    }}
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    Back To Calendar
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setLoggedInStatus(false);
                      setCalendarPageView(false);
                      setcreateClassView(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
              <NewClassForm
                onBack={() => {
                  setcreateClassView(false);
                  setCalendarPageView(true);
                }}
              ></NewClassForm>
            </>
          ) : null}
        </div>
      </section>
    </div> // Head Level: END Parent Element
  );
}

export default App;
