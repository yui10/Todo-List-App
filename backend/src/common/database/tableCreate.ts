import * as mysql from "mysql"


const db = mysql.createConnection({
  host: "db",
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

db.query(`CREATE TABLE IF NOT EXISTS task (
  id TEXT NOT NULL,
  content TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status = 'running' or status = 'completed'),
  PRIMARY KEY(id(32))
  )`);
db.end();