const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


//sign up REGISTRO
/*
nombre - email - clave
chequear que email no este en al DB, para crear un nuevo usuario
chequear longitud y caracteres de la clave
*/
exports.signup = (req, res) => {
    console.log('req.body', req.body); // { "name": "Arturo Filio", "email": "test@test.com", "password":"test123" }
    const user = new User(req.body);
    user.save((error, user) => {
      console.log("reached signup endpoint")
      if (error) {
        return res.status(400).json({
          error: "Please check fields, there was an Error"
        })
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user
      })
    })
  }


//sign in --- log in (INGRESAR)

exports.signin = (req, res) => {
const {email,password} = req.body
User.findOne({email}, (error, user) => {
    if(error||!user) {
        return res.status(400).json({
            error: 'No existe un usuario con este email'
        });
    }
    if(!user.authenticate(password)) {
        return res.status(400).json ({
            error: 'El email y clave no coinciden'
        });
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    res.cookie('t', token, {expire: new Date() + 1})
    const {_id, name, email, role} = user
    
    return res.json({
        token, user: {_id, email, name, role}
    })
});
}

exports.signout = (req, res) => {
  res.clearCookie ('t')
  res.json({message: "Sign Out success"});
  console.log('salido')
}

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err,user) =>{
    if(err||!user) {
      return res.status(400).json({
        error: "No existe el usuarios"
      });
      req.profile = user;
      next();
    }
  })
}
/*exports.isAdmin = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(400).json ({
            error: 'acceso denegado'
        });
    }
    next();
}*/