import React, { useState, useEffect } from "react";
import "./App.css";
import {
  createEmptyWeek,
  getData,
  isEmptyWeekData,
  storeData,
  toWeekData,
} from "./data";

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
      <div className="flex-grow p-1 flex flex-col justify-center">9:00 - 13:00</div>
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
  const [state, setState] = useState({
    ...createEmptyWeek(),
    status: StatusEnum.IDLE,
  });

  const handleRetrieve = (data) => {
    console.log("retrieved data", data);
    setState({
      ...state,
      ...data,
      status: isEmptyWeekData(data) ? StatusEnum.EMPTY : StatusEnum.WITH_DATA,
    });
  };

  const retrieve = () =>
    getData().catch((err) => {
      setState({
        ...state,
        ...createEmptyWeek(),
        status: StatusEnum.ERROR_LOAD,
      });
    });

  useEffect(() => {
    setState({ ...state, status: StatusEnum.LOADING });
    retrieve().then((data) => handleRetrieve(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, status: StatusEnum.SAVING });
    storeData(toWeekData(state))
      .then((data) => handleRetrieve(data))
      .catch(() => {
        setState({ ...state, status: StatusEnum.ERROR_SAVE });
      });
  };

  const handleNewWeek = () => {
    setState({ ...state, status: StatusEnum.CHANGED, ...createEmptyWeek() });
  };

  const handleReset = () => {
    retrieve().then((data) => handleRetrieve(data));
  };

  const handleMon1 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      mon1: event.target.value,
    }));

  const handleMon2 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      mon2: event.target.value,
    }));

  const handleTue1 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      tue1: event.target.value,
    }));

  const handleTue2 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      tue2: event.target.value,
    }));

  const handleWed1 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      wed1: event.target.value,
    }));

  const handleWed2 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      wed2: event.target.value,
    }));

  const handleThu1 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      thu1: event.target.value,
    }));

  const handleThu2 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      thu2: event.target.value,
    }));

  const handleFri1 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      fri1: event.target.value,
    }));

  const handleFri2 = (event) =>
    setState((s) => ({
      ...s,
      status: StatusEnum.CHANGED,
      fri2: event.target.value,
    }));

  const enableSave = [StatusEnum.CHANGED, StatusEnum.ERROR_SAVE].includes(
    state.status
  );

  const enableRestore = [StatusEnum.ERROR_LOAD, StatusEnum.CHANGED].includes(
    state.status
  );

  const enableNewWeek = [StatusEnum.CHANGED, StatusEnum.WITH_DATA].includes(
    state.status
  );

  return (
    <div>
      <div className="md:container md:mx-auto md:px-4">
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
              morning={state.mon1}
              afternoon={state.mon2}
              morningChange={handleMon1}
              afternoonChange={handleMon2}
            ></Day>
            <Day
              className="col-start-4 col-end-6"
              dayName="tuesday"
              morning={state.tue1}
              afternoon={state.tue2}
              morningChange={handleTue1}
              afternoonChange={handleTue2}
            ></Day>
            <Day
              className="col-start-6 col-end-8"
              dayName="wednesday"
              morning={state.wed1}
              afternoon={state.wed2}
              morningChange={handleWed1}
              afternoonChange={handleWed2}
            ></Day>
          </div>
          <div className="grid grid-cols-7">
            <RowHeader></RowHeader>
            <Day
              className="col-start-2 col-end-4"
              dayName="thursday"
              morning={state.thu1}
              afternoon={state.thu2}
              morningChange={handleThu1}
              afternoonChange={handleThu2}
            ></Day>
            <Day
              className="col-start-4 col-end-6"
              dayName="friday"
              morning={state.fri1}
              afternoon={state.fri2}
              morningChange={handleFri1}
              afternoonChange={handleFri2}
            ></Day>
            <div className="flex-grow"></div>
          </div>
          <div className="flex justify-between">
            <button className="btn btn-blue" type="submit" disabled={!enableSave}>
              Save
            </button>
            <button className="btn btn-blue" type="reset" disabled={!enableRestore}>
              Restore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
