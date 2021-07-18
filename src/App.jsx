import React, { useState, useEffect } from "react";
import "./App.css";
import { createEmptyWeek, getData, isEmptyWeekData, storeData } from "./data";

const StatusEnum = Object.freeze({
  CHANGED: "changed",
  EMPTY: "empty",
  ERROR_LOAD: "errorLoad",
  ERROR_SAVE: "errorSave",
  IDLE: "idle",
  LOADING: "loading",
  SAVING: "saving",
  WITH_DATA: "withData",
});

function RowHeader() {
  return (
    <div className="flex flex-col text-center">
      <div className="flex-none h-8"></div>
      <div className="flex-grow p-1 flex flex-col justify-center">
        9:00 - 13:00
      </div>
      <div className="flex-grow p-1 flex flex-col justify-center">
        14:00 - 18:00
      </div>
    </div>
  );
}

function Day(props) {
  const { dayName, morning, afternoon, morningChange, afternoonChange } = props;
  return (
    <div className={`flex flex-col ${props.className}`}>
      <div className="text-center flex-none h-8">
        <strong>{dayName}</strong>
      </div>
      <div className="flex-grow p-1">
        <textarea
          className="resize-none overflow-hidden p-1 rounded focus:outline-none focus:ring focus:border-green-200 h-20 w-full"
          value={morning}
          onChange={morningChange}
        ></textarea>
      </div>
      <div className="flex-grow p-1">
        <textarea
          className="resize-none overflow-hidden p-1 rounded focus:outline-none focus:ring focus:border-green-200 h-20 w-full"
          value={afternoon}
          onChange={afternoonChange}
        ></textarea>
      </div>
    </div>
  );
}

function App() {
  const [status, setStatus] = useState(StatusEnum.IDLE);
  const [mondayMorning, setMondayMorning] = useState("");
  const [tuesdayMorning, setTuesdayMorning] = useState("");
  const [wednesdayMorning, setWednesdayMorning] = useState("");
  const [thursdayMorning, setThursdayMorning] = useState("");
  const [fridayMorning, setFridayMorning] = useState("");
  const [mondayAfternoon, setMondayAfternoon] = useState("");
  const [tuesdayAfternoon, setTuesdayAfternoon] = useState("");
  const [wednesdayAfternoon, setWednesdayAfternoon] = useState("");
  const [thursdayAfternoon, setThursdayAfternoon] = useState("");
  const [fridayAfternoon, setFridayAfternoon] = useState("");

  const fillForm = (data) => {
    setMondayMorning(data.mon1);
    setTuesdayMorning(data.tue1);
    setWednesdayMorning(data.wed1);
    setThursdayMorning(data.thu1);
    setFridayMorning(data.fri1);
    setMondayAfternoon(data.mon2);
    setTuesdayAfternoon(data.tue2);
    setWednesdayAfternoon(data.wed2);
    setThursdayAfternoon(data.thu2);
    setFridayAfternoon(data.fri2);
  };

  const toWeekData = () => {
    return {
      mon1: mondayMorning,
      mon2: mondayAfternoon,
      tue1: tuesdayMorning,
      tue2: tuesdayAfternoon,
      wed1: wednesdayMorning,
      wed2: wednesdayAfternoon,
      thu1: thursdayMorning,
      thu2: thursdayAfternoon,
      fri1: fridayMorning,
      fri2: fridayAfternoon,
    };
  };

  const handleRetrieve = (data) => {
    setStatus(isEmptyWeekData(data) ? StatusEnum.EMPTY : StatusEnum.WITH_DATA);
    fillForm(data);
  };

  useEffect(() => {
    setStatus(StatusEnum.LOADING);
    getData()
      .then(handleRetrieve)
      .catch((err) => {
        setStatus(StatusEnum.ERROR_LOAD);
        fillForm(createEmptyWeek());
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(StatusEnum.SAVING);
    storeData(toWeekData())
      .then((data) => handleRetrieve(data))
      .catch(() => {
        setStatus(StatusEnum.ERROR_SAVE);
      });
  };

  const handleNewWeek = () => {
    fillForm(createEmptyWeek());
    setStatus(StatusEnum.CHANGED);
  };

  const handleReset = () => {
    getData().then((data) => handleRetrieve(data));
  };

  const enableSave = [StatusEnum.CHANGED, StatusEnum.ERROR_SAVE].includes(
    status
  );

  const enableRestore = [StatusEnum.ERROR_LOAD, StatusEnum.CHANGED].includes(
    status
  );

  const enableNewWeek = [StatusEnum.CHANGED, StatusEnum.WITH_DATA].includes(
    status
  );

  return (
    <div>
      <div className="md:container md:mx-auto md:px-4">
        <h1 className="my-4 text-5xl text-blue-600 text-opacity-70">Weekly Scheduler</h1>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleNewWeek}
            disabled={!enableNewWeek}
          >
            New Week
          </button>
        </div>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="grid grid-cols-7">
            <RowHeader></RowHeader>
            <Day
              className="col-start-2 col-end-4"
              dayName="monday"
              morning={mondayMorning}
              afternoon={mondayAfternoon}
              morningChange={(e) => {
                setMondayMorning(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
              afternoonChange={(e) => {
                setMondayAfternoon(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
            ></Day>
            <Day
              className="col-start-4 col-end-6"
              dayName="tuesday"
              morning={tuesdayMorning}
              afternoon={tuesdayAfternoon}
              morningChange={(e) => {
                setTuesdayMorning(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
              afternoonChange={(e) => {
                setTuesdayAfternoon(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
            ></Day>
            <Day
              className="col-start-6 col-end-8"
              dayName="wednesday"
              morning={wednesdayMorning}
              afternoon={wednesdayAfternoon}
              morningChange={(e) => {
                setWednesdayMorning(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
              afternoonChange={(e) => {
                setWednesdayAfternoon(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
            ></Day>
          </div>
          <div className="grid grid-cols-7">
            <RowHeader></RowHeader>
            <Day
              className="col-start-2 col-end-4"
              dayName="thursday"
              morning={thursdayMorning}
              afternoon={thursdayAfternoon}
              morningChange={(e) => {
                setThursdayMorning(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
              afternoonChange={(e) => {
                setThursdayAfternoon(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
            ></Day>
            <Day
              className="col-start-4 col-end-6"
              dayName="friday"
              morning={fridayMorning}
              afternoon={fridayAfternoon}
              morningChange={(e) => {
                setFridayMorning(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
              afternoonChange={(e) => {
                setFridayAfternoon(e.target.value);
                setStatus(StatusEnum.CHANGED);
              }}
            ></Day>
            <div className="flex-grow"></div>
          </div>
          <div className="flex justify-between">
            <button
              className="btn btn-blue"
              type="submit"
              disabled={!enableSave}
            >
              Save
            </button>
            <button
              className="btn btn-blue"
              type="reset"
              disabled={!enableRestore}
            >
              Restore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
