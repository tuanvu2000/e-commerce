const { Order, Product, User, Account } = require('../models')

exports.postNewOrder = async (req, res) => {
    try {
        const { info, products, total, transport } = req.body;
        const { fullName, phoneNumber, address, notes } = info;
        let userId = info.id;
        // Nếu không có user id thì tạo User là anonymous
        if (!userId) {
            const newUser = new User({
                isUser: false,
                fullName: fullName,
                phoneNumber: phoneNumber,
                address: address
            });
            // Lưu và lấy giá trị id của User anonymous
            const createUser = await newUser.save();
            userId = createUser.id;
        }
        const orderId = "O" + Date.now();

        const newOrder = new Order({
            orderId: orderId,
            customer: userId,
            products: products,
            transportFee: transport,
            note: notes,
            total: total
        });
        const createOrder = await newOrder.save()

        res.status(200).json(createOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Order
            .find({})
            .sort('-createdAt')
            .populate('customer');
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        const order = await Order
            .findById(req.params.id)
            .populate('customer')
            .populate({
                path: 'products',
                populate: 'productId'
            });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getHistoryOrder = async (req, res) => {
    try {
        const list = await Order
            .find({ customer: req.params.id})
            .sort('-createdAt')
            .populate('customer')
            .populate({
                path: 'products',
                populate: 'productId'
            });
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getNewOrder = async (req, res) => {
    try {
        const list = await Order
            .find({ status: 'Chờ xử lý' })
            .sort('-createdAt')
            .limit(5)
            .populate('customer')
            .populate({
                path: 'products',
                populate: 'productId'
            });
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.putStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }
        );

        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}





exports.getSummary = async (req, res) => {
    try {
        const totalUser = await Account.find({ role: 'user'}).count();
        const totalProduct = await Product.find({}).count();
        const totalOrder = await Order.find({}).count();
        const listOrder = await Order.find({  status: 'Đã hoàn thành' }).sort('-createdAt');
        const totalMoney = listOrder.reduce((total, value) => total + value.total, 0)


        res.status(200).json({
            totalUser: totalUser ? totalUser : 0,
            totalProduct: totalProduct ? totalProduct : 0,
            totalOrder: totalOrder ? totalOrder : 0,
            totalMoney: totalMoney ? totalMoney : 0
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}