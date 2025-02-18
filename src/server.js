const employees = require('/src/employees.cjs')
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('dist'));

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

app.post('/api/v1/employees', (req, res, next) => {
  const { name } = req.body;
  if(!name) {
    const error = new Error("Name not provided");
    next(error);
  } else {
    employees.push({
      id: idNumber, 
      name
    });
    idNumber++;
    res.send(employees);
  }
});

app.use((err, req, res, next) => {
  console.log('ERROR MESSAGE', err.message);
  res.status(400).send(err.message)
});

app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
