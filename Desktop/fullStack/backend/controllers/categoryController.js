const Category = require('../models/categoryModel');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  })
}

exports.create = (req, res) => {
  console.log('req.body', req.body)
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({data});
  })
}

exports.remove = (req, res) => {
  let category = req.category
  category.remove((err, data) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Category succesfully deleted"
    })
  })
}

exports.update = async (req, res) => {
  const {name} = req.body;
  const categoryUpdate = {name};
  await Category.findByIdAndUpdate(req.params.categoryId, categoryUpdate); 
  console.log(req.params.categoryId)
  res.json({status: 'Actualizado'})
}

//Sirve para encontrar un id (parametro id) para poder eliminarlo
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      });
    }
    req.category = category;
    next();
  })
}