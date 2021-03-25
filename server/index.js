const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employees'
})

app.use(cors())
app.use(express.json())
app.post('/create', (req, res) => {
    let name = req.body.name
    let age = req.body.age
    let country = req.body.country
    let position = req.body.position
    let salary = req.body.salary

    db.query('INSERT INTO adat (name, age, country, position, salary) VALUES (?,?,?,?,?)',
        [name, age, country, position, salary], (error, result) => {
            if (error) {
                console.log(error)
            } else {
                res.send("Values Inserted")
            }
        }
    );

});
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM adat", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            setTimeout(() => {
                res.send(result);
            }, 500);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id
    const salary = req.body.salary
    db.query("UPDATE adat SET salary = ? WHERE id = ?", [salary, id],
        (error, result) => {
            if (error) {
                console.log(error)
            } else {
                res.send(result);
            }

        })
})
app.delete('/delete/:employeeId', (req, res)=> {
    db.query("DELETE FROM adat WHERE id=?", [req.params.employeeId], (error, result) => {
        if (error) {
            console.log(asd)
        } else {
            res.send({ id: req.params.employeeId });
        }
    });
})


app.listen(3001, () => {
})