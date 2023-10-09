const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");

//Base de datos de pokemmon
const db = require("../config/database");

// Crear un nuevo usuario
user.post("/", async (req, res, next) => {
    const {user_name, user_mail, user_password} = req.body;

    if (user_name && user_mail && user_password){
        const query = `INSERT INTO user (user_name, user_mail, user_password) VALUES('${user_name}', '${user_mail}', '${user_password}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});

//Autenticacion de usuario
user.post("/login", async (req, res, next)=>{
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;
    const rows = await db.query(query);

    if (user_mail && user_password){
        if (rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        } else {
            return res.status(401).json({code: 401, message: "Usuario y/o contraseña incorrectos"})
        }
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});


//Todos los usuarios
user.get("/", async (req, res, next)=>{
    const usr = await db.query("SELECT * FROM user");
    return res.status(200).json({code: 200, message: usr});
});

module.exports = user;