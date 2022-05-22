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

exports.getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        )
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.bestSell = async (req, res) => {
    try {
        const list = await Product.find({}).sort('-quantitySell').limit(8);
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.listCategory = async (req, res) => {
    try {
        const list = req.params.category.split('+');

        switch (list[0]) {
            case 'non':
                if (list[1] === 'non-34') {
                    const products = await Product
                        .find({ subCategory: 'Nón bảo hiểm 3/4'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'non-fullface') {
                    const products = await Product
                        .find({ subCategory: 'Nón bảo hiểm full-face'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'non-nua-dau') {
                    const products = await Product
                        .find({ subCategory: 'Nón nửa đầu'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'non-tre-em') {
                    const products = await Product
                        .find({ subCategory: 'Nón trẻ em'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'mu-xe-dap') {
                    const products = await Product
                        .find({ subCategory: 'Mũ xe đạp'})
                        .sort('-price')
                    res.status(200).json(products)
                }
            case 'phukien':
                if (!list[1]) {
                    const products = await Product
                        .find({ category: 'Phụ kiện' })
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'kinh') {
                    const products = await Product
                        .find({ subCategory: 'Kính'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'gang-tay') {
                    const products = await Product
                        .find({ subCategory: 'Găng tay'})
                        .sort('-price')
                    res.status(200).json(products)
                }
                if (list[1] === 'orther') {
                    const products = await Product
                        .find({ subCategory: 'Khác'})
                        .sort('-price')
                    res.status(200).json(products)
                }
            default:
                return []
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}