export function isEmptyWeekData(data) {
  return Object.keys(data).every(v => data[v] === '');
}

export function createEmptyWeek() {
  return {
    mon1: "",
    mon2: "",
    tue1: "",
    tue2: "",
    wed1: "",
    wed2: "",
    thu1: "",
    thu2: "",
    fri1: "",
    fri2: "",
  };
}

export function toWeekData(state) {
  return {
    mon1: state.mon1,
    mon2: state.mon2,
    tue1: state.tue1,
    tue2: state.tue2,
    wed1: state.wed1,
    wed2: state.wed2,
    thu1: state.thu1,
    thu2: state.thu2,
    fri1: state.fri1,
    fri2: state.fri2,
  };
}

export function storeData(data) {
  console.log("storeData", data);
  return new Promise((resolve) => {
    localStorage.setItem("data", JSON.stringify(data));
    resolve(data);
  });
}

export function getData() {
  return new Promise((resolve) => {
    const data = localStorage.getItem("data");
    if (data === null || data === undefined) {
      console.log("creating first data");
      resolve(createEmptyWeek());
    }
    resolve(JSON.parse(data));
  });
}
