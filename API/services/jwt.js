var jwt = require('jwt-simple'); // libreria de encriptacion para generar token
var moment = require('moment'); // para tratar fechas de modo más amigable
var secret = 'clave_secreta_curso'; // clave que se usa en el algoritmo de encriptación

// generar token exclusivo y asociado a cada usuario
exports.createToken = function(user){
    // parámetros que vamos a utilizar para generar el token
    // normalmente solo necesitaríamos el id de usuario referente al user
    var payload = {
        sub: user._id,
        name: user.userName, // opcional
        iat: moment().unix(), // fecha de creación del token, en timestamp en formato unix
        exp: moment().add(1, 'm').unix(), // tiempo de expiración del token
    };

    // nos forma el token como en el ejemplo de la página jwt
    return jwt.encode(payload, secret)
};