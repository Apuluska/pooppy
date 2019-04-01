const jwt= require('jwt');
const moment= require('moment');
const jwt = require('./services/jwt');

function isAuth(req,res,next){
    //esto comprueba si en el header de la peticion hay un campo llamado auorization
    if(!req.headers.autorization){
        return res.status(403).send({message: "No tienes autorizacion"} )
    }
    //split convierte la cabecera en un array
    const token= req.headers.autorization.split(" ")[1];
    const payload= jwt.decode(token, secret);

    if(payload.exp< moment().unix()){
        return res.status(401).send({message: "El token ha expirado"})
    }
    req.user=payload.sub
    next();
}
module.exports= isAuth;

//en el min 6 del video Cómo proteger rutas en tu API REST con JSON Web Tokens explica como proteger cada una de las rutas de la app