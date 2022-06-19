const { Product } = require('../models');

const convertData = {
    "non-bao-hiem": "Nón",
    "phu-kien": "Phụ kiện",
    "non-34": "Nón bảo hiểm 3/4",
    "non-fullface": "Nón bảo hiểm full-face",
    "non-nua-dau": "Nón nửa đầu",
    "non-tre-em": "Nón trẻ em",
    "mu-xe-dap": "Mũ xe đạp",
    "kinh": "Kính",
    "gang-tay": "Găng tay",
    "other": "Khác",
    "royal": 'Royal',
    "roc": 'ROC',
    "balder": 'Balder',
    "kyt": 'KYT',
    "rona": 'Rona',
    "andes": 'Andes',
    "torc": 'TORC',
    "jc": 'JC',
    "asia": 'Asia',
    "sunda": 'Sunda',
}

const handleSale = (price, sale) => {
    const salePercent = (price * sale) / 100;
    const priceSale = price - salePercent;

    return Math.round(priceSale / 1000) * 1000;
}

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
        
        res.status(200).json({
            ...product._doc,
            priceSale: handleSale(product.price, product.sale)
        });
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

exports.bestSale = async (req, res) => {
    try {
        const list = await Product
        .find({ sale: { $gt: 0 } })
        .sort('-sale');
        const newList = list.map(item => ({
            ...item._doc,
            priceSale: handleSale(item.price, item.sale)
        }))
        res.status(200).json(newList);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.listType = async (req, res) => {
    const {
        page,
        pageSize,
        type,
        value,
        sort,
        // filter
    } = req.body
    try {
        // Lấy danh sách cần sort
        const list = await Product
            .find({ [type]: convertData[value] })
            .skip((pageSize * page) - pageSize)
            .limit(pageSize)
            .sort(sort);
        if (sort === 'price') 
            list.sort((a, b) => handleSale(a.price, a.sale) - handleSale(b.price, b.sale))
        if (sort === '-price')
            list.sort((a, b) => handleSale(b.price, b.sale) - handleSale(a.price, a.sale))
        if (sort === '-quantitySell')
            list.sort((a, b) => b.quantitySell - a.quantitySell)
        if (sort === '-createdAt')
            list.sort((a, b) => b.createdAt - a.createdAt)
        const newList = list.map(item => ({
            ...item._doc,
            priceSale: handleSale(item.price, item.sale)
        }))
        // Tính tổng số product đã sort theo điều kiện
        const count = await Product
            .find({ [type]: convertData[value] })
            .count();
        // Trả về kết quả
        res.status(200).json({
            products: newList,
            current: page,
            total: count,
            pageStart: (page * pageSize) - pageSize + 1,
            pageEnd: Math.floor(count / (pageSize * page))
                ? (pageSize * page)
                : (pageSize * (page - 1)) + (count - (pageSize * (page - 1)))
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.putAddProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(
            req.body.id,
            {
                $inc: { inventory: +(req.body.quantity) }
            }
        )
        res.status(200).json({ message: 'Thêm sản phẩm thành công' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// exports.bestSell = async (req, res) => {
//     try {
//         const list = await Product.find({}).sort('-quantitySell').limit(8);
//         const newList = list.map(item => ({
//             ...item._doc,
//             priceSale: handleSale(item.price, item.sale)
//         }))
//         res.status(200).json(newList);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }


// exports.listSubCategory = async (req, res) => {
//     try {
//         const list = req.params.category.split('+');

//         switch (list[0]) {
//             case 'non':
//                 if (list[1] === 'non-34') {
//                     const products = await Product
//                         .find({ subCategory: 'Nón bảo hiểm 3/4'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'non-fullface') {
//                     const products = await Product
//                         .find({ subCategory: 'Nón bảo hiểm full-face'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'non-nua-dau') {
//                     const products = await Product
//                         .find({ subCategory: 'Nón nửa đầu'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'non-tre-em') {
//                     const products = await Product
//                         .find({ subCategory: 'Nón trẻ em'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'mu-xe-dap') {
//                     const products = await Product
//                         .find({ subCategory: 'Mũ xe đạp'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//             case 'phukien':
//                 if (!list[1]) {
//                     const products = await Product
//                         .find({ category: 'Phụ kiện' })
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'kinh') {
//                     const products = await Product
//                         .find({ subCategory: 'Kính'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'gang-tay') {
//                     const products = await Product
//                         .find({ subCategory: 'Găng tay'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//                 if (list[1] === 'orther') {
//                     const products = await Product
//                         .find({ subCategory: 'Khác'})
//                         .sort('-price')
//                     res.status(200).json(products)
//                 }
//             default:
//                 return []
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }


// exports.listHatSub = async (req, res) => {
//     try {
//         const list = await Product
//             .find({ subCategory: convertData[req.params.subCategory] })
//             .sort('-price')
//         res.status(200).json(list)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// }

// exports.listAccessorySub = async (req, res) => {
//     try {
//         const list = await Product
//             .find({ subCategory: convertData[req.params.subCategory] })
//             .sort('-price')
//         res.status(200).json(list)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// }

// exports.listBrand = async (req, res) => {
//     try {
//         const list = await Product
//             .find({ brand: req.params.brand })
//             .sort('-price')
//         res.status(200).json(list)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// }

