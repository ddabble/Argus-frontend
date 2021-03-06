/* eslint-disable */
import React from "react";
import { TextField } from "@material-ui/core";
import Select from "react-select";
import "./timeintervalselector.css";
import Button from "@material-ui/core/Button";

const days = [
  { value: "MO", label: "Monday" },
  { value: "TU", label: "Tuesday" },
  { value: "WE", label: "Wednesday" },
  { value: "TH", label: "Thursday" },
  { value: "FR", label: "Friday" },
  { value: "SA", label: "Saturday" },
  { value: "SU", label: "Sunday" },
];
type TimeIntervalProp = {
  deleteTimeInterval: any;
  handleStartChange: any;
  handleEndChange: any;
  handleDayChange: any;
  startTime: any;
  endTime: any;
  daysValue: any;
  dictKey: string;
};

const TimeIntervalSelector: React.FC<TimeIntervalProp> = (props: TimeIntervalProp) => {
  return (
    <div className="timeslot-interval">
      <div className="timeslot-interval-settings">
        <div className="timeslot-interval-day">
          <p>Days:</p>

          <Select
            isMulti
            value={props.daysValue}
            onChange={(e) => props.handleDayChange(e, props.dictKey)}
            name="filters"
            label="Single select"
            options={days}
          />
        </div>
        <div className="timeslot-interval-times">
          <TextField
            label="Start Time"
            type="time"
            margin="normal"
            variant="outlined"
            value={props.startTime}
            onChange={(e) => props.handleStartChange(e.target.value, props.dictKey)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
          <TextField
            label="End Time"
            type="time"
            margin="normal"
            variant="outlined"
            value={props.endTime}
            onChange={(e) => props.handleEndChange(e.target.value, props.dictKey)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
        </div>
      </div>
      <div className="time-interval-delete">
        <Button
          className="time-interval-delete-button"
          variant={"contained"}
          onClick={(e) => props.deleteTimeInterval(e, props.dictKey)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default TimeIntervalSelector;
