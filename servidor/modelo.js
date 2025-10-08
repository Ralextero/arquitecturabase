function Sistema() {
    this.usuarios = {};

    this.agregarUsuario = function(nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
        } else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
    }

    this.obtenerUsuarios = function() {
        return { usuarios: this.usuarios };
    }

    this.usuarioActivo = function(nick) {
        return { res: this.usuarios.hasOwnProperty(nick) };
    }

    this.eliminarUsuario = function(nick) {
        let existia = this.usuarios.hasOwnProperty(nick);
        if (existia) {
            delete this.usuarios[nick];
        }
        return { res: existia };
    }

    this.numeroUsuarios = function() {
        return { num: Object.keys(this.usuarios).length };
    }
}

function Usuario(nick) {
    this.nick = nick;
}

module.exports.Sistema = Sistema;