const express = require('express');

const {
    createProduct,
    getAllProducts,
    getProductbyID,
    updateProduct,
    deleteProduct,
} = require ('../controllers/productController');

const router = express.Router();

router.post('/',createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProductbyID);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


module.exports= router;