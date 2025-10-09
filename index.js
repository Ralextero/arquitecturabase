const fs = require("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
let sistema = new modelo.Sistema();
app.use(express.static(__dirname + "/"));

// Servir index.html en la ruta raíz
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/cliente/index.html");
});

app.get("/agregarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let res = sistema.agregarUsuario(nick);
    response.send(res);
});

// Endpoint para obtener la lista de usuarios
app.get("/obtenerUsuarios", function(request, response) {
    let usuarios = sistema.obtenerUsuarios();
    response.send(usuarios);
});

// Endpoint para comprobar si un usuario está activo
app.get("/usuarioActivo/:nick", function(request, response) {
    let nick = request.params.nick;
    let activo = sistema.usuarioActivo(nick);
    response.send(activo);
});

app.get("/numeroUsuarios", function(request, response) {
    let numero = sistema.numeroUsuarios();
    response.send(numero);
});

app.get("/eliminarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let existia = sistema.usuarioActivo(nick).res;
    if (existia) {
        sistema.eliminarUsuario(nick);
        response.send(true);
    } else {
        response.send(false);
    }
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});