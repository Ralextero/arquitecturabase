function ClienteRest() {
	this.agregarUsuario = function(nick) {
		var cli = this;
		$.getJSON("/agregarUsuario/" + nick, function(data) {
			if (data.nick != -1) {
				console.log("Usuario " + nick + " ha sido registrado");
			} else {
				console.log("El nick ya está ocupado");
			}
		});
	}

	this.agregarUsuario2 = function(nick) {
		$.ajax({
			type: 'GET',
			url: '/agregarUsuario/' + nick,
			success: function(data) {
				if (data.nick != -1) {
					console.log("Usuario " + nick + " ha sido registrado");
				} else {
					console.log("El nick ya está ocupado");
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			},
			contentType: 'application/json'
		});
	}

	this.obtenerUsuarios = function() {
		$.ajax({
			type: 'GET',
			url: '/obtenerUsuarios',
			success: function(data) {
				console.log("Usuarios:", data.usuarios);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			},
			contentType: 'application/json'
		});
	}

	this.numeroUsuarios = function() {
		$.ajax({
			type: 'GET',
			url: '/numeroUsuarios',
			success: function(data) {
				console.log("Numero de usuarios:", data.num);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			},
			contentType: 'application/json'
		});
	}

	this.usuarioActivo = function(nick) {
		$.ajax({
			type: 'GET',
			url: '/usuarioActivo/' + nick,
			success: function(data) {
				console.log("Usuario activo:", data.res);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			},
			contentType: 'application/json'
		});
	}

	this.eliminarUsuario = function(nick) {
		$.ajax({
			type: 'GET',
			url: '/eliminarUsuario/' + nick,
			success: function(data) {
				console.log("Usuario eliminado:", data);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			},
			contentType: 'application/json'
		});
	}
}