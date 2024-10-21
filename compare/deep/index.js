import _ from "lodash";

const obj1 = {
  name: "박규성",
};
const obj2 = {
  name: "박규성",
};

console.log(JSON.stringify(obj1) === JSON.stringify(obj2));
console.log(_.isEqual(obj1, obj2));
