const { Product } = require('../models');

exports.add = async (req, res) => {
    try {
        // kiểm tra tên sản phẩm đã tồn tại chưa
        let product = await Product.findOne({ namePd: req.body.namePd });
        if (product) return res.status(403).json('Product is already in the list');

        const newProduct = new Product({
            ...req.body
        });

        // Lưu giá trị đã tạo
        const savedProduct = await newProduct.save();

        // hiển thị kết quả
        res.status(201).json({
            product: savedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Product.find({});
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}