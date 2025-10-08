const modelo = require("./modelo.js");
describe('El sistema', function() {
 let sistema;
 beforeEach(function() {
 sistema=new modelo.Sistema()
 });
       it('inicialmente no hay usuarios', function() {
              expect(sistema.numeroUsuarios().num).toEqual(0);
       });
       it('se puede agregar un usuario', function() {
              sistema.agregarUsuario('pepe');
              expect(sistema.numeroUsuarios().num).toEqual(1);
       });
       it('se puede obtener los usuarios', function() {
              sistema.agregarUsuario('pepe');
              sistema.agregarUsuario('ana');
              const usuarios = sistema.obtenerUsuarios().usuarios;
              expect(Object.keys(usuarios).length).toEqual(2);
              expect(usuarios.hasOwnProperty('pepe')).toBeTrue();
              expect(usuarios.hasOwnProperty('ana')).toBeTrue();
       });
       it ('se puede comprobar si un usuario existe', function() {
              sistema.agregarUsuario('pepe');
              expect(sistema.usuarioActivo('pepe').res).toBeTrue();
              expect(sistema.usuarioActivo('ana').res).toBeFalse();
       });
       it('se puede eliminar un usuario', function() {
              sistema.agregarUsuario('pepe');
              sistema.agregarUsuario('ana');
              expect(sistema.numeroUsuarios().num).toEqual(2);
              expect(sistema.eliminarUsuario('pepe').res).toBeTrue();
              expect(sistema.numeroUsuarios().num).toEqual(1);
              expect(sistema.usuarioActivo('pepe').res).toBeFalse();
              expect(sistema.usuarioActivo('ana').res).toBeTrue();
       });
})