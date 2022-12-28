const express = require('express');
const {addBookValidationMW, UpdateBookValidationMW} = require("../validators/books.validator");
const bookcontroller = require("../controllers/book.controller");

const bookRouter = express.Router();

bookRouter.get('/', bookcontroller.getAllBooks);

bookRouter.get('/:id', bookcontroller.getBookById);

bookRouter.post('/', addBookValidationMW, bookcontroller.addBook);

bookRouter.put('/:id', UpdateBookValidationMW, bookcontroller.updateBook);

bookRouter.delete('/:id', bookcontroller.deleteBookByID)

module.exports = bookRouter