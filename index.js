const express = require("express");

//Instancia de express
const app = express();
const pokemon = require("./routes/pokemon");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
Verbos HTTP
GET - Obtener Recursos
POST - Almacenar/Crear recursos
PATCH - Modificar una parte de un recurso
PUT - Modificar un recurso completo
DELETE - Eliminar un recurso
*/

app.use("/pokemon", pokemon);

// "/" Se refiere a la raiz
app.get("/", (req, res, next)=>{
    return res.status(200).send("Bienvenido al Pokedex!");
});


//Abrir un servidor especificando el puerto
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});


