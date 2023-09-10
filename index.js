const express = require("express");

//Instancia de express
const app = express();

/*
Verbos HTTP
GET
POST
PATCH
PUT
DELETE
*/

app.get("/", (req, res, next)=>{
    res.status(200);
    res.send("Hola Mundo en Express!");
})

//Abrir un servidor especificando el puerto
app.listen(3000, () => {
    console.log("Server is running");
});
