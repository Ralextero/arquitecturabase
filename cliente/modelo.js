function Sistema(){
    this.usuarios={};
    this.agregarUsuario=function(nick){
    this.usuarios[nick]=new Usuario(nick);
    }
    this.obtenerUsuarios=function(){
        return this.usuarios;
    }
}
function Usuario(nick){
    this.nick=nick;
}