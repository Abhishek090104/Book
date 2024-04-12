import express from "express";
import pg from "pg";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";



const app = express();
const PORT = 5555;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_store",
  password:"admin",
  port:"5432",
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err));

app.use(express.json());

app.use(cors());


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("welcome to tutorial");
});

app.use('/books' , booksRoute);

app.listen(PORT,() =>{
  console.log(`App is listening to port: ${PORT}`);
});
export default db;