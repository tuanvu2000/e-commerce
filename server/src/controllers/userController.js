const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CryptoJS = require('crypto-js');

exports.register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    try {
        // Kiểm tra username đã tồn tại hay chưa ?
        let user = await User.findOne({ username: username });
        if (user) return res.status(403).json('Username already registered for another account');

        user = await User.findOne({ email: email });
        if (user) return res.status(403).json('Email already registered for another account');

        // Khởi tạo User
        const newUser = new User({
            ...req.body,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            )
        });
        // Lưu giá trị đã tạo
        const savedUser = await newUser.save();

        // Hiển thị kết quả
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        // Tìm user cố tồn tại hay không ?
        const user = await User.findOne({
            username: req.body.username
        });
        // Nếu không tồn tại username thì báo lỗi
        if (!user) {
            return res.status(401).json('Tài khoản không tồn tại');
        }
        // Giải mã password để kiểm tra password đầu vào có giống hay không ?
        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPass !== req.body.password) {
            return res.status(401).json('Mật khẩu không đúng, vui lòng thử lại');
        }
        // Khởi tạo token khi login
        const token = jwt.sign(
            { id: user._id },
            process.env.TOKEN_SECRET_KEY,
        );
        user.password = undefined;
        // Hiển thị kết quả
        res.status(200).json({
            token,
            user
        })
    } catch (error) {
        console.Console(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        // // Check roles are admin or mod
        // const manager = await User.findById(
        //     req.admin._id,
        //     { role: 1 }
        // )
        // // If it's admin then execute
        // if (manager.role === 'admin') {
        //     const list = await User.find(
        //         { role: 'user' },
        //         { password: 0 }
        //     ).sort('createdAt')
        //     res.status(200).json(list)
        // }
        // // If it's mod then execute
        // if (manager.role === 'mod') {
        //     const list = await User.find(
        //         { role: { $in: ['user', 'admin'] } },
        //         { password: 0}
        //     ).sort('createdAt')
        //     res.status(200).json(list)
        // }
        const list = await User.find({}, { password: 0 }).sort('createdAt')
        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id, 
            { password: 0 }
        );
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        );
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}