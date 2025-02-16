const employees = require('./employees.js')
const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send(`<h1>Welcome</h1>`);
  res.send(`Hello Employees`);
  return console.log(`Hello Employees`);
}).listen3000;

app.get('/employees', (req, res) => {
  res.send(employees);
});

app.get('/api/v1/employees/:id', (req, res) => {
  const id = req.params.id;
  const foundEmployee = employees.find((Employee) => {
    return Employee.id === Number(id);
  });
  res.send(foundEmployee);
  console.log(foundEmployee);
});

app.get('/api/v1/employees/random', (req, res) => {
  function getRandomEmployee(employees) {
    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex];
  }console.log(`working`)
  const randomEmployee= getRandomEmployee(employees);
  res.send(randomEmployee)
});   //keeps coming back undefined

app.listen(3000, () => {
  console.log(`listening to P3000`);
});
