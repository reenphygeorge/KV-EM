// // let day = "Thursday";
// // let msg = "";

// // switch (day) {
// //   case "Monday":
// //     msg = "it's Monday";
// //     break;
// //   case "Tuesday":
// //     msg = "it's Tuesday";
// //     break;
// //   case "Wednessday":
// //     msg = "it's Wednessday";
// //     break;
// //   case "Thursday":
// //     msg = "it's Thursday";
// //     break;
// //   case "Friday":
// //     msg = "it's Friday";
// //     break;
// //   case "Saturday":
// //     msg = "it's Weekend :)";
// //     break;
// //   case "Sunday":
// //     msg = "it's Weekend :)";
// //     break;
// //   default:
// //     msg = "it's a no day";
// //     break;
// // }

// // const result = 4 < 5 ? true : false;
// // const data = {
// //   name: "Reenphy",
// //   company: "KV",
// //   loc: "Kochi",
// // };

// // const nos = [1, 2, 3, 4];

// // // const printing = (value) => {
// // //   console.log(value);
// // // };
// // // arr.forEach(printing);

// // // for (k in arr) {
// // //   console.log(k);
// // // }

// // // const obj = {
// // //   value: 2,
// // //   multiply: function (a) {
// // //     console.log(this);
// // //     return a;
// // //   },
// // // };

// // // const multiply = console.log(obj.multiply(2, 3));

// // // const sum = (a, b) => a + b;

// // // console.log(obj.multiply(2));

// // const arr = [
// //   { name: "Ben", id: "010" },
// //   { name: "Gwen", id: "101" },
// //   { name: "Ralph", id: "100" },
// // ];
// // const doubleArr = arr.map((value) => value * 2);
// // // console.log(arr.find((value) => value.name === "Ben"));
// // // console.log(doubleArr);
// // // console.log(arr.filter((value) => value.id === "100"));

// // // console.log(
// // //   nos.reduce((accumulator, currentValue) => accumulator * currentValue, 2)
// // // );

// // function Employee(name, id) {
// //   this.name = name;
// //   this.id = id;
// // }

// // const obj = new Employee("Reenphy", "0101");
// // // obj.name = "Reenphy";
// // // obj.id = "0101";

// // // console.log(obj);

// // // console.log(Math.PI);
// // let str = "1";
// // let temp = str;
// // str = "2";

// // const person = {
// //   id: "010",
// //   name: "Reenphy",
// // };

// // person.name = "RxG";

// // Object.freeze(person);

// // person.name = "R.";

// // console.log(person);

// // const newPerson = { ...person };

// // newPerson.name = "R.";

// // const rest = [5, 6, 7, 8, 9];
// // console.log([1, 2, ...rest]);
// // console.log(newPerson);

// const changeValue = (object) => {
//   const newObject = { ...object };
//   newObject.name = "Reenphy George";
//   return newObject;
// };

// const object = {
//   id: "102",
//   name: "Reenphy",
//   loc: "Kochi",
// };

// // console.log(changeValue(object));
// // console.log(object);

// // const originalObject = { a: 1, b: { c: 2, d: undefined } };
// // const newObj = structuredClone(originalObject);
// // // const cloneObj = JSON.parse(JSON.stringify(originalObject));
// // originalObject.a = 10;
// // originalObject.b.c = 5;
// // console.log(newObj);
// // // console.log(cloneObj);

// // function createCounter(value) {
// //   let initial = 1;
// //   return function () {
// //     initial += value;
// //     console.log(initial);
// //   };
// // }

// // const counter1 = createCounter(1);
// // const counter2 = createCounter(5);

// // counter1();
// // counter1();

// // counter2();
// // counter2();

// const startMovie = async () => {
//   return new Promise((resolve) => {
//     console.log("Movie is started");
//     resolve();
//     setTimeout(() => {}, 1500);
//   });
// };

// const intervalStarted = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Interval Started");
//     }, 1500);
//     setTimeout(() => {
//       resolve();
//       console.log("Interval Ended");
//     }, 3000);
//   });
// };

// const showCredits = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Showing Credits");
//       resolve();
//     }, 1500);
//   });
// };

// const endMovie = () => {
//   setTimeout(() => {
//     console.log("Thankyou for watching");
//   }, 1500);
// };

// // startMovie().then(() =>
// //   intervalStarted()
// //     .then(() => showCredits().then(() => endMovie()))
// //     .catch(() => {
// //       console.error("Error:", err);
// //     })
// // );

// // (async () => {
// //   try {
// //     await startMovie();
// //     await intervalStarted();
// //     await showCredits();
// //     endMovie();
// //   } catch (err) {
// //     console.error("Error:", err);
// //   }
// // })();

// const getCountry = (countryCode) => {
//   const countries = {
//     0: "india",
//     1: "usa",
//     2: "uk",
//   };
//   return new Promise((resolve, reject) => {
//     const country = countries[countryCode];
//     setTimeout(() => {
//       if (!country) reject("Country Not found!");
//       resolve(country);
//     }, 2000);
//   });
// };

// const getState = (country) => {
//   console.log(country);
//   const states = {
//     india: "kerala",
//     usa: "texas",
//     uk: "london",
//   };
//   return new Promise((resolve, reject) => {
//     const state = states[country];
//     setTimeout(() => {
//       if (!state) reject("State not found!");
//       resolve(state);
//     }, 2000);
//   });
// };

// const getDistrict = (state) => {
//   console.log(state);
//   const districts = {
//     kerala: "EKLM",
//     texas: "God knows!",
//     london: "Qweens",
//   };
//   return new Promise((resolve, reject) => {
//     const district = districts[state];
//     setTimeout(() => {
//       if (!district) reject("District not found!");
//       resolve(district);
//     }, 2000);
//   });
// };

// // getCountry("india", () => {
// //   getState("Kerala", () => {
// //     getDistrict("EKLM");
// //   });
// // });

// // getCountry(0).then((country) =>
// //   getState(country)
// //     .then((state) =>
// //       getDistrict(state).then((district) => {
// //         console.log(district);
// //       })
// //     )
// //     .catch((err) => {
// //       console.log(err);
// //     })
// // );

// // getCountry(1)
// //   .then((value) => {
// //     return getState(value);
// //   })
// //   .then((value) => {
// //     return getDistrict(value);
// //   })
// //   .then((value) => {
// //     console.log(value);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// (async () => {
//   try {
//     const date1 = Date.now();
//     const country = await getCountry(2);
//     const state = await getState(country);
//     const district = await getDistrict(state);
//     console.log(Date.now() - date1);
//     console.log(district);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// // (async () => {
// //   const data = await (await fetch("sample.txt")).text();
// //   console.log(data);
// // })();
// const function2 = () => {
//   console.log("inside function 2");
//   setTimeout(() => {
//     console.log("1");
//   }, 1000);
//   setTimeout(() => {
//     console.log("2");
//   }, 0);
//   setTimeout(() => {
//     console.log("3");
//   }, 5000);
//   setTimeout(() => {
//     console.log("4");
//   });
//   console.log("function 2 end");
// };
// const function1 = () => {
//   console.log("inside function 1");
//   function2();
//   console.log("function 1 end");
// };
// function1();

// Save data to sessionStorage
// sessionStorage.setItem("trainingTopic", "Session Storage Example");

// // Get saved data from sessionStorage
// const data = sessionStorage.getItem("trainingTopic");
// console.log(data);
// Remove saved data from sessionStorage
// sessionStorage.removeItem("trainingTopic");

// Remove all saved data from sessionStorage
// sessionStorage.clear();

localStorage.setItem("myCat", "Tom");

const cat = localStorage.getItem("myCat")
console.log(cat);
// localStorage.removeItem("myCat")
