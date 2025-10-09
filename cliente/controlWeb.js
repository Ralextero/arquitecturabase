function ControlWeb() {
    this.mostrarAgregarUsuario = function() {
        let cadena='<div class="form-group" id="mAU">';
        cadena += '<label for="nick">Name:</label>';
        cadena += '<input type="text" class="form-control" id="nick" />';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena += '<div id="resAgregarUsuario" class="mt-2"></div>';
        cadena += '</div>';
        $("#au").append(cadena);
        $("#btnAU").on("click",function(){
            let nick=$("#nick").val();
            rest.agregarUsuario = function(nick) {
                $.getJSON("/agregarUsuario/" + encodeURIComponent(nick), function(data) {
                    if (data.nick != -1) {
                        $("#resAgregarUsuario").html('<div class="alert alert-success">Usuario <b>' + nick + '</b> registrado correctamente.</div>');
                    } else {
                        $("#resAgregarUsuario").html('<div class="alert alert-danger">El nick <b>' + nick + '</b> ya está ocupado.</div>');
                    }
                }).fail(function() {
                    $("#resAgregarUsuario").html('<div class="alert alert-danger">Error al registrar usuario.</div>');
                });
            };
            rest.agregarUsuario(nick);
            // $("#mAU").remove(); // Comentado para que el input permanezca visible
        });
    }

    // Mostrar usuarios
    this.mostrarObtenerUsuarios = function() {
        let cadena = '<div class="form-group" id="mOU">';
        cadena += '<button id="btnObtenerUsuarios" class="btn btn-info mb-2">Obtener usuarios</button>';
        cadena += '<div id="listaUsuarios"></div>';
        cadena += '</div>';
        $("#au").append(cadena);
        $("#btnObtenerUsuarios").on("click", function() {
            rest.obtenerUsuarios = function() {
                $.ajax({
                    type: 'GET',
                    url: '/obtenerUsuarios',
                    success: function(data) {
                        let usuarios = Object.keys(data.usuarios);
                        if (usuarios.length === 0) {
                            $("#listaUsuarios").html('<div class="alert alert-info">No hay usuarios registrados.</div>');
                        } else {
                            let lista = '<ul class="list-group">';
                            usuarios.forEach(function(nick) {
                                lista += '<li class="list-group-item">' + nick + '</li>';
                            });
                            lista += '</ul>';
                            $("#listaUsuarios").html(lista);
                        }
                    },
                    error: function() {
                        $("#listaUsuarios").html('<div class="alert alert-danger">Error al obtener usuarios.</div>');
                    },
                    contentType: 'application/json'
                });
            };
            rest.obtenerUsuarios();
        });
    }

    // Mostrar número de usuarios
    this.mostrarNumeroUsuarios = function() {
        let cadena = '<div class="form-group" id="mNU">';
        cadena += '<button id="btnNumeroUsuarios" class="btn btn-secondary mb-2">Número de usuarios</button>';
        cadena += '<div id="numUsuarios"></div>';
        cadena += '</div>';
        $("#au").append(cadena);
        $("#btnNumeroUsuarios").on("click", function() {
            rest.numeroUsuarios = function() {
                $.ajax({
                    type: 'GET',
                    url: '/numeroUsuarios',
                    success: function(data) {
                        $("#numUsuarios").html('<div class="alert alert-primary">Número de usuarios: <b>' + data.num + '</b></div>');
                    },
                    error: function() {
                        $("#numUsuarios").html('<div class="alert alert-danger">Error al obtener el número de usuarios.</div>');
                    },
                    contentType: 'application/json'
                });
            };
            rest.numeroUsuarios();
        });
    }

    // Mostrar usuario activo
    this.mostrarUsuarioActivo = function() {
        let cadena = '<div class="form-group" id="mUA">';
        cadena += '<input type="text" id="nickActivo" class="form-control mb-1" placeholder="Nick a comprobar">';
        cadena += '<button id="btnUsuarioActivo" class="btn btn-warning mb-2">¿Usuario activo?</button>';
        cadena += '<div id="resUsuarioActivo"></div>';
        cadena += '</div>';
        $("#au").append(cadena);
        $("#btnUsuarioActivo").on("click", function() {
            let nick = $("#nickActivo").val();
            if (!nick) {
                $("#resUsuarioActivo").html('<div class="alert alert-warning">Introduce un nick para comprobar.</div>');
                return;
            }
            rest.usuarioActivo = function(nick) {
                $.ajax({
                    type: 'GET',
                    url: '/usuarioActivo/' + encodeURIComponent(nick),
                    success: function(data) {
                        if (data.res) {
                            $("#resUsuarioActivo").html('<div class="alert alert-success">El usuario <b>' + nick + '</b> está activo.</div>');
                        } else {
                            $("#resUsuarioActivo").html('<div class="alert alert-danger">El usuario <b>' + nick + '</b> NO está activo.</div>');
                        }
                    },
                    error: function() {
                        $("#resUsuarioActivo").html('<div class="alert alert-danger">Error al comprobar usuario.</div>');
                    },
                    contentType: 'application/json'
                });
            };
            rest.usuarioActivo(nick);
        });
    }

    // Mostrar eliminar usuario
    this.mostrarEliminarUsuario = function() {
        let cadena = '<div class="form-group" id="mEU">';
        cadena += '<input type="text" id="nickEliminar" class="form-control mb-1" placeholder="Nick a eliminar">';
        cadena += '<button id="btnEliminarUsuario" class="btn btn-danger mb-2">Eliminar usuario</button>';
        cadena += '<div id="resEliminarUsuario"></div>';
        cadena += '</div>';
        $("#au").append(cadena);
        $("#btnEliminarUsuario").on("click", function() {
            let nick = $("#nickEliminar").val();
            if (!nick) {
                $("#resEliminarUsuario").html('<div class="alert alert-warning">Introduce un nick para eliminar.</div>');
                return;
            }
            rest.eliminarUsuario = function(nick) {
                $.ajax({
                    type: 'GET',
                    url: '/eliminarUsuario/' + encodeURIComponent(nick),
                    success: function(data) {
                        if (data === true) {
                            $("#resEliminarUsuario").html('<div class="alert alert-success">Usuario <b>' + nick + '</b> eliminado correctamente.</div>');
                        } else {
                            $("#resEliminarUsuario").html('<div class="alert alert-danger">No existe el usuario <b>' + nick + '</b>.</div>');
                        }
                    },
                    error: function() {
                        $("#resEliminarUsuario").html('<div class="alert alert-danger">Error al eliminar usuario.</div>');
                    },
                    contentType: 'application/json'
                });
            };
            rest.eliminarUsuario(nick);
        });
    }
}