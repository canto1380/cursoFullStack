const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Usuario = require('../models/usuariosModel');
const { errorHandler} = require('../helpers/dberrorHandler');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Imagen no puede ser cargada"
            })
        }
        const { name, lastName, dni, email} = fields;
        let user = new Usuario(fields);
        if(files.photo) {
            if(files.photo.size >10000000) {
                return res.status(400).json ({
                    error: "Imagen demasiado grande"
                })
            }
            user.photo.data = fs.readFileSync (files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}

exports.list = (req, res) => {
   let order = req.query.order ? req.query.order: 'asc'
   let sortBy = req.query.sortBy ? req.query.sortBy : 'name';

    Usuario.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "Usuario not found"
            })
        }
        res.json(user)
    })
}

exports.remove = (req, res) => {
    let user = req.user
    user.remove((err, deletedUser) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json({
        message: "Videogame was deleted succesfully"
      })
    })
  }


exports.userById = (req, res, next, id) => {
    Usuario.findById(id)
      .exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "usuario not found"
          });
        }
        req.user = user;
        next();
      })
    }

    exports.photo = (req, res, next) => {
        if(req.user.photo.data) {
            res.set('Content-Type', req.user.photo.contentType);
            return res.send(req.user.photo.data)
        }
        next();
    }