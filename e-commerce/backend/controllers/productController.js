const Product = require('../models/Product');

// Create a new Product
const createProduct = async(req,res) => {
    try {
        const { name, description,price,category,stock,image} = req.body;
    const newProduct = new Product ({
        name,
        description,
        price,
        category,
        stock,
        image,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({message: 'Error Creating the Product',error});
    }
};

const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Error fetching the Products',error});
    }
};

const getProductbyID = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({message: 'The Product is unavailable at the moment'})
        }
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: 'Error fetching the product',error});
    }
};

const updateProduct = async (req,res) => {
    try {
        const {name,description,price,category,stock,image} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {name,description,price,category,stock,image},
            {new: true}
        )
    }
    catch (error) {
        res.status(500).json({message: 'Error updating the Product',error});
    }
};

const deleteProduct = async (req,res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) {
            return res.status(404).json({message: 'Product not Found'});
        }
        res.status(200).json({message: 'Product Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message : 'Error Deleting the Product',error});
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductbyID,
    updateProduct,
    deleteProduct,
}