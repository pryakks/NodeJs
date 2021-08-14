const express = require('express');
const app = express();
const employees = require('./employee.json');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// app.get(url, callback)
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/employees', (req, res) => {
    res.send(employees);
});

app.get('/api/employees/:id', (req, res) => {
    // const emp = employees.find(c => c.id === parseInt(req.params.id));
    // if (!emp) {
    //     res.status('404').send(`Employe with ${req.params.id} not found. `)
    // } else {
    //     res.send(emp);
    // }
    var key = req.params.id;
    var empFound = false;
    for (var emp in employees) {
        if (employees[emp].id == key) {
            empFound = true;
            res.send(employees[emp]);
        }
    }
    if (!empFound) {
        res.status('404').send(`Employe with ${req.params.id} not found. `);
    }
});

app.post('/api/employees', (req, res) => {
    employees.push(req.body);
    res.send(employees);
});

app.put('/api/employees/:id', (req, res) => {
    var key = req.params.id;
    var empFound = false;
    for (var emp in employees) {
        if (employees[emp].id == key) {
            empFound = true;
            employees[emp].Name = req.body.Name;
            employees[emp].Designation = req.body.Designation;
            res.send(employees);
        }
    }
    if (!empFound) {
        res.status('404').send(`Employe with ${req.params.id} not found. `);
    }
});

app.delete('/api/employees/:id', (req, res) => {
    var key = req.params.id;
    var empFound = false;
    for (var emp in employees) {
        if (employees[emp].id == key) {
            empFound = true;
            const index = employees.indexOf(employees[emp]);
            employees.splice(index, 1);
            res.send(employees); 
        }
    } 
    if (!empFound) {
        res.status('404').send(`Employe with ${req.params.id} not found. `);
    }
});
 
//PORT = environmenr variable its value is set outside the application
//on cmd use set PORT=5000
const port = process.env.PORT || 3000;
//listen to given port
app.listen(port, () => console.log(`Listening on port ${port}...`));

// app.post();
// app.put();
// app.delete();

