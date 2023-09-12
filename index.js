const express = require("express");

//Base de datos de pokemmon
const { pokemon } = require("./pokedex.json");

//Instancia de express
const app = express();

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
app.get("/", (req, res, next)=>{
    return res.status(200).send("Bienvenido al Pokedex!");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send("Estás en /pokemon POST");
});

//Variables en la ruta
app.get("/pokemon/all", (req, res, next)=>{
    return res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next)=>{
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[id]);
    } else {
        return res.status(404).send("Pokemon no encontrado")
    }
    
});

app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) =>{
    const name =  req.params.name;
    const pk = pokemon.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    });
    (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");
});

//Abrir un servidor especificando el puerto
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});


