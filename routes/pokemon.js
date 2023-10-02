const express = require("express");
const pokemon = express.Router();

//Base de datos de pokemmon
const db = require("../config/database");

// Crear un nuevo pokemon
pokemon.post("/", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;


    if (pok_name && pok_height && pok_weight && pok_base_experience){
        const query = `INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience) VALUES('${pok_name}', '${pok_height}', '${pok_weight}', '${pok_base_experience}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Pokemon insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});

//Borrar un pokemon
pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    let id = req.params.id
    const query = `DELETE FROM pokemon WHERE pok_id = ${id}`;
    const pkmn = await db.query(query);
    if (pkmn.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Pokemon eliminado correctamente"});
    } else{
        return res.status(404).json({code:404, message: "Pokemon no encontrado"});
    }
})

//Actualizar todos los valores de un pokemon
pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name = '${pok_name}', pok_height = ${pok_height}, pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience} WHERE pok_id = ${id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});

//Actualizar uno o varios valores, pero no todos
pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id
    
    if(req.body.pok_name){
        let query = `UPDATE pokemon SET pok_name = '${req.params.pok_name}' WHERE pok_id = ${id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
  
});

//Todos los pokemon
pokemon.get("/", async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pkmn});
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next)=>{
    const id = req.params.id;
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id}`);
    if (pkmn.length > 0) {
        return res.status(200).json({code: 200, message: pkmn});
    } else {
        return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
    }
    
});

pokemon.get("/:name([A-Za-z]+)", async (req, res, next) =>{
    const name =  req.params.name;
    console.log(name);
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_name = '${name}'`);
    if (pkmn.length > 0) {
        return res.status(200).json({code: 200, message: pkmn});;
    } else {
        return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
    }
});

module.exports = pokemon;