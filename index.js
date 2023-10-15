const express = require("express");

//Instancia de express
const app = express();

//Routers
const pokemon = require("./routes/pokemon");
const user = require("./routes/user")
const morgan = require("morgan");

//Middleware
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors")

app.use(cors);
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


// "/" Se refiere a la raiz
app.get("/", index);

//Ruta user
app.use("/user", user);

//Obtener y decodificar el token de autenticacion del usuario de su peticion
app.use(auth);

//Ruta pokemon
app.use("/pokemon", pokemon);

//Ruta no encontrada
app.use(notFound);

//Abrir un servidor especificando el puerto
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});


