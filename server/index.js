const express =require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require("cors");
const app= express();

app.use(cors());
const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myreactsqlcrud"
});
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
//Connecting database
db.connect((err)=>{
    if(err)
    {
        throw err;
    }
    console.log("Connection Successful!");
});


//Creating Database
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE myreactsqlcrud";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Database Created");
    });
  });

  //Creating new table

app.get("/basicdetails", (req, res) => {
    let sql =
      "CREATE TABLE details(id int AUTO_INCREMENT,name VARCHAR(255),email VARCHAR(255),PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Details table crated");
    });
  });

  //Inserting Data
  app.post("/insertintotable", (req, res) => {
    const name= req.body.name;
    const email= req.body.email;
    const insertQuery = "INSERT INTO details ( name, email) VALUES (?,?)";
    db.query(insertQuery, [name, email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data Added to Database");
      }
    });
  });

  //Reading Data
app.get("/getdetails", (req, res) => {
    let sql = "SELECT * FROM details";
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });

  //Update post
  app.put("/updatedetails/:id", (req, res) => {
    const name= req.body.name;
    const email= req.body.email;
    const id= req.body.id;
    let sql =
    `UPDATE details SET name = ?, email = ? WHERE id = ${req.params.id}`;
    let query= db.query( sql, [name, email], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  //Delete post
  app.get("/deletedetails/:id", (req, res) => {
    let sql = `DELETE FROM details WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

  //Get Single user
  app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM details WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
  

app.listen("4000", ()=>{
    console.log("Server is successfully running on port 4000")
})