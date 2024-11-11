const student = {
  name: "박규성",
  age: 25,
  address:{
    country:"대한민국",
    city:"경기도",
    town:"성남시"
  }
};

function update(object, key, modify) {
  const value = object[key];
  const newValue = modify(value);
  const newObject = { ...object, [key]: newValue };
  return newObject;
}

function updateX(object,keys,modify){
  const key1 = object[keys];
  const leftObject = object[key1]
}

const newStudent = update(student, 'age', (age) => age + 1);


// const cityChangeStudent = update
