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
      <div className="container">
        <div className="row">
          <button
            type="button"
            onClick={handleNewWeek}
            className="col-2"
            disabled={!enableNewWeek}
          >
            New Week
          </button>
        </div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {/* top bar */}
          <div className="row">
            <div className="col-3">&nbsp;</div>
            <div className="col-3 text-center">
              <strong>monday</strong>
            </div>
            <div className="col-3 text-center">
              <strong>tuesday</strong>
            </div>
            <div className="col-3 text-center">
              <strong>wednesday</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-3 align-self-center text-center">
              9:00 - 13:00
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.mon1}
                onChange={handleMon1}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.tue1}
                onChange={handleTue1}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.wed1}
                onChange={handleWed1}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-3 align-self-center text-center">
              14:00 - 18:00
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.mon2}
                onChange={handleMon2}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.tue2}
                onChange={handleTue2}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.wed2}
                onChange={handleWed2}
              ></textarea>
            </div>
          </div>
          {/* bottom bar */}
          <div className="row">
            <div className="col-3 text-center">
              <strong>&nbsp;</strong>
            </div>
            <div className="col-3 text-center">
              <strong>thursday</strong>
            </div>
            <div className="col-3 text-center">
              <strong>friday</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-3 align-self-center text-center">
              9:00 - 13:00
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.thu1}
                onChange={handleThu1}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.fri1}
                onChange={handleFri1}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-3 align-self-center text-center">
              13:00 - 18:00
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.thu2}
                onChange={handleThu2}
              ></textarea>
            </div>
            <div className="col-3">
              <textarea
                className="form-control"
                rows="3"
                value={state.fri2}
                onChange={handleFri2}
              ></textarea>
            </div>
          </div>
          <div className="row justify-content-between">
            <button type="submit" className="col-2" disabled={!enableSave}>
              Save
            </button>
            <button type="reset" className="col-2" disabled={!enableRestore}>
              Restore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
