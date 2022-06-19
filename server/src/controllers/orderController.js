const { Order, Product, User, Account } = require('../models')

exports.postNewOrder = async (req, res) => {
    try {
        const { info, products, total, transport } = req.body;
        const { fullName, phoneNumber, address, notes } = info;
        let userId = info.id;
        //Kiểm tra sản phẩm trong kho còn hay không ?
        for (let product of products) {
            const checkProduct = await Product.findById(product.productId)
            if (checkProduct.inventory === 0) {
                return res.status(403).json({ message: 'Sản phẩm đã hết hàng, vui lòng chọn sản phẩm khác' })
            }
            if (checkProduct.inventory < product.quantity) {
                return res.status(403).json({ message: 'Sản phẩm trong cửa hàng không đủ với yêu cầu của bạn' })
            }
        }
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

        // Tạo thông tin đơn hàng
        const newOrder = new Order({
            orderId: orderId,
            customer: userId,
            products: products,
            transportFee: transport,
            note: notes,
            total: total
        });
        const createOrder = await newOrder.save()

        // Giảm sản phầm sẽ bán trong table sản phẩm
        for (let product of products) {
            await Product.findByIdAndUpdate(
                product.productId,
                { 
                    $inc: { inventory: -(product.quantity) }
                }
            )
        }

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
    const {
        status
    } = req.body
    try {
        const checkOrder = await Order.findById(req.params.id)

        if (checkOrder.status === 'Chờ xử lý') {
            if (status === 'Hủy đơn hàng') {
                const findOrder = await Order.findById(req.params.id)
                findOrder.products.forEach(async (item) => 
                    await Product.findByIdAndUpdate(
                        item.productId,
                        {
                            $inc: { inventory: +(item.quantity) }
                        }
                    )
                )
            }
            if (status === 'Đã hoàn thành') {
                const findOrder = await Order.findById(req.params.id)
                findOrder.products.forEach(async (item) => 
                    await Product.findByIdAndUpdate(
                        item.productId,
                        {
                            $inc: { quantitySell: +(item.quantity) }
                        }
                    )
                )
            }
        }
        if (checkOrder.status === 'Hủy đơn hàng') {
            if (status === 'Chờ xử lý') {
                const findOrder = await Order.findById(req.params.id)
                findOrder.products.every(async (item) => {
                    const findProduct = await Product.findById(item.productId)
                    return findProduct.inventory > item.quantity
                })
                findOrder.products.forEach(async (item) => 
                    await Product.findByIdAndUpdate(
                        item.productId,
                        {
                            $inc: { inventory: -(item.quantity) }
                        }
                    )
                )
            }
        }

        await Order.findByIdAndUpdate(
            req.params.id,
            { status: status }
        );

        return res.status(200).json({ message: 'Cập nhật đơn hàng thành công' });
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