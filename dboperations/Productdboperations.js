const { Product } = require('../model/ProductModel');

//create a new Product
const CreateProduct = async (req, res) => {
    const Productdetails = req.body;
    const product = new Product(Productdetails)
    const result = await product.save();
    return result;
}

//

