import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const getAllProduct = async (req, res) => {
    try {
        let qNew = req.query.new;
        let qCategory = req.query.category;

        let products;

        if (qNew) {
            products = await Product.find()
                .sort({ createdAt: 'asc', createdAt: -1 })
                .limit(4);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: qCategory,
                },
            });
        } else {
            products = await Product.find()
                .sort({ createdAt: 'asc', createdAt: -1 })
                .limit(8);
        }
        return res.status(200).json(products);
    } catch (err) {
        console.log(err);
    }
};
export const findProductById = async (req, res) => {
    try {
        let product = await Product.find({ _id: req.params.id });
        return res.status(200).json(product);
    } catch (error) {
        console.log(err);
    }
};
export const addProduct = async (req, res) => {
    try {
        console.log(req.body);

        let product = {};
        if (req.files) {
            product.img = BASE_URL + req.files['imgProduct'][0].path;
            let thumbs = [];
            if (req.files['thumbs']) {
                req.files['thumbs'].forEach((item) => {
                    thumbs.push(BASE_URL + item.path);
                });
                product.thumbs = thumbs;
            }
        }
        if (req.body.color) {
            let arrColor=[]
            for (let i = 0; i < req.body.color.length; i++) {
                arrColor.push(JSON.parse(req.body.color[i]));
            }
            product.color=arrColor
        }
        if (req.body.size) {
          let arrSize=[]
            for (let i = 0; i < req.body.size.length; i++) {
              arrSize.push(JSON.parse(req.body.size[i]));
            }
            product.size=arrSize
        }
        product.title = req.body.title;
        product.categories = req.body.categories;
        product.price = req.body.price;
        product.saleOff = req.body.saleOff;
        product.inStock = req.body.inStock;
        if (req.body.desc) {
            product.desc = req.body.desc;
        }
        if (req.body.content) {
            product.content = req.body.content;
        }

        const addProduct = new Product(product);
        await addProduct.save();
        return res.status(200).json(addProduct);
    } catch (err) {
        console.log(err);
    }
};
export const updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            $new: true,
        });
        return res.status(200).json(updateProduct);
    } catch (err) {
        console.log(err);
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove({ _id: req.params.id });
        return res.status(200).json({
            message: 'Delete product success',
        });
    } catch (err) {
        console.log(err);
    }
};
