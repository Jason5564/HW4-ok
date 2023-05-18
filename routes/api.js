var express = require('express');
var router = express.Router();


const sqlite = require('sqlite3').verbose();

db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
// 電影台詞
sql = 'CREATE TABLE IF NOT EXISTS quote (ID INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, names TEXT, price INT)'
db.run(sql);

router.post('/', (req, res) => {
    const {date, names, price}=req.body;
    sql = "INSERT INTO quote (date, names, price) VALUES (?, ?, ?)";
    db.run(sql, [date, names, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/data.html');
    return res.status(200).send('inserted');
})


router.get('/', function(req, res, next) {

    const Q = req.query;
    console.log(Q);

    sql = "SELECT * FROM quote WHERE price <= ? AND date <= ? AND names = ? ";

    db.all(sql, [Q['P'],Q['D'],Q['V']], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});




module.exports = router;