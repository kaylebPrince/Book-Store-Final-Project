const express = require('express');
const {addAuthorValidationMW, UpdateAuthorValidationMW} = require("../validators/authors.validator");
const authorController = require("../controllers/author.controller");

const authorRouter = express.Router();

authorRouter.get('/', authorController.getAllAuthors);

authorRouter.get('/:id', authorController.getAuthorById);

authorRouter.post('/', addAuthorValidationMW, authorController.addAuthor);

authorRouter.put('/:id', UpdateAuthorValidationMW, authorController.updateAuthor);

authorRouter.delete('/:id', authorController.deleteAuthorByID)

module.exports = authorRouter