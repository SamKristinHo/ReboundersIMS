/**
 * @returns New Class Form Component: to be shown when user presses "
 * Create New Class" from the Full Calendar component
 */

// TODO: after creating a new event, should call refreshEvents() to grab events again to render

import { Fragment, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
  fetchEvents,
  //fetchTest,
  //createEvent,
  //updateEvent,
  //deleteEvent,
} from "../api/events";

interface NewClassFormProps {
  onBack: () => void;
}

function NewClassForm({ onBack }: NewClassFormProps) {
  const [preSelection, setPreSelection] = useState(true);
  const [oneTimeClass, setOneTimeClass] = useState(false);
  const [recurringClass, setRecurringClass] = useState(false);

  return (
    <Fragment>
      <div>
        <Button onClick={onBack}>Back To Calendar</Button>
      </div>
      <div>
        {preSelection ? (
          <div>
            <h1>New Class Form</h1>
            <h2>
              Are you looking to create a one-time class or a recurring class?
            </h2>
            <Button
              variant="contained"
              onClick={() => {
                setPreSelection(false);
                setOneTimeClass(true);
              }}
            >
              One-Time
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setPreSelection(false);
                setRecurringClass(true);
              }}
            >
              Recurring
            </Button>
          </div>
        ) : null}
      </div>

      <div>
        {oneTimeClass ? (
          <div>
            <h3>
              Please query the intended class time to see which classes can be
              created:
            </h3>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="Basic date time picker" />
                </DemoContainer>
              </LocalizationProvider>

              <TextField
                required
                id="outlined-required"
                label="Name Of Class*"
                defaultValue="New Class Name"
              />
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />
            </Box>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}

export default NewClassForm;
