const express = require('express');
const { listProducts, createProduct, updateProduct, deleteProduct } = require('./productController');

const router = express.Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
