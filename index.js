const fs = require("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
let sistema = new modelo.Sistema();
app.use(express.static(__dirname + "/"));

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
    response.json({ res: activo });
});

app.get("/numeroUsuarios", function(request, response) {
    let numero = sistema.numeroUsuarios();
    response.json({ num: numero });
});

app.get("/eliminarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let existia = sistema.usuarioActivo(nick);
    if (existia) {
        sistema.eliminarUsuario(nick);
        response.json({ eliminado: true });
    } else {
        response.json({ eliminado: false });
    }
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});