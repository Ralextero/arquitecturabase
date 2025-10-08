const modelo = require("./modelo.js");
describe('El sistema', function() {
 let sistema;
 beforeEach(function() {
 sistema=new modelo.Sistema()
 });
  it('inicialmente no hay usuarios', function() {
 expect(sistema.numeroUsuarios()).toEqual(0);
 });
  it('se puede agregar un usuario', function() {
 sistema.agregarUsuario('pepe');
 expect(sistema.numeroUsuarios()).toEqual(1);
 });
  it('se puede obtener los usuarios', function() {
 sistema.agregarUsuario('pepe');
 sistema.agregarUsuario('ana');
 const usuarios = sistema.obtenerUsuarios();
 expect(Object.keys(usuarios).length).toEqual(2);
        expect(usuarios.hasOwnProperty('pepe')).toBeTrue();
        expect(usuarios.hasOwnProperty('ana')).toBeTrue();
 });
  it ('se puede comprobar si un usuario existe', function() {
 sistema.agregarUsuario('pepe');
 expect(sistema.usuarioActivo('pepe')).toBeTrue();
 expect(sistema.usuarioActivo('ana')).toBeFalse();
 });
  it('se puede eliminar un usuario', function() {
 sistema.agregarUsuario('pepe');
 sistema.agregarUsuario('ana');
 expect(sistema.numeroUsuarios()).toEqual(2);
 sistema.eliminarUsuario('pepe');
 expect(sistema.numeroUsuarios()).toEqual(1);
 expect(sistema.usuarioActivo('pepe')).toBeFalse();
 expect(sistema.usuarioActivo('ana')).toBeTrue();
 });
})