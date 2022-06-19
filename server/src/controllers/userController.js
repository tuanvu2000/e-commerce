const jwt = require('jsonwebtoken');
const { User, Account } = require('../models');
const CryptoJS = require('crypto-js');
const { findById } = require('../models/user');

exports.postRegister = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    try {
        // Kiểm tra username đã tồn tại hay chưa ?
        let account = await Account.findOne({ username: username });
        if (account) return res.status(403).json('Username already registered for another account');

        account = await Account.findOne({ email: email });
        if (account) return res.status(403).json('Email already registered for another account');

        // Khởi tạo Account
        const newAccount = new Account({
            ...req.body,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            )
        });
        // Lưu giá trị đã tạo để lấy id đưa vào profile
        const savedAccount = await newAccount.save();

        // Khởi tạo User
        const newUser = new User({
            ...req.body,
            accountId: savedAccount.id
        })
        const savedUser = await newUser.save();

        // Hiển thị kết quả
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.postLogin = async (req, res) => {
    try {
        // Tìm user cố tồn tại hay không ?
        const account = await Account.findOne({
            username: req.body.username
        });
        // Nếu không tồn tại username thì báo lỗi
        if (!account) {
            return res.status(401).json('Tài khoản không tồn tại');
        }
        // Giải mã password để kiểm tra password đầu vào có giống hay không ?
        const decryptedPass = CryptoJS.AES.decrypt(
            account.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPass !== req.body.password) {
            return res.status(401).json('Mật khẩu không đúng, vui lòng thử lại');
        }
        // Khởi tạo token khi login
        const token = jwt.sign(
            { id: account._id },
            process.env.TOKEN_SECRET_KEY,
        );
        account.password = undefined;
        // Hiển thị kết quả
        res.status(200).json({
            token,
            account
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getUserList = async (req, res) => {
    try {
        const ad = req.admins.role;
        const roleAdmin = ['user', 'admin'];
        const list = await User
            .find({ isUser: true })
            .sort('-createdAt')
            .populate({
                path: 'accountId',
                select: '-password'
            });
        
        const newList = list.filter(user =>
            ad === 'admin'
            ? roleAdmin.includes(user.accountId.role)
            : user
        );
        res.status(200).json(newList);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User
            .findOne({ accountId: req.params.id })
            .populate({
                path: 'accountId',
                select: '-password'
            })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.putUser = async (req, res) => {
    try {
        const role = req.user.accountId.role
        const roleUser = await User.findById(req.params.id).populate({ path: 'accountId', select: '-password' })
        const priory = {
            user: 1,
            admin: 2,
            mod: 3
        } 

        if (priory[role] < priory[roleUser.accountId.role]) {
            res.status(500).json('Role current not allowed edit')
        } else {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }
            );
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.putChangeRole = async (req, res) => {
    try {
        const user = await Account.findByIdAndUpdate(
            req.body.userId,
            { role: req.body.role }
        )
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const admin = req.admins.role
        if (admin === 'user') return false

        await Account.findByIdAndDelete(req.params.id);
        await User.findOneAndDelete({
            accountId: req.params.id
        });
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
