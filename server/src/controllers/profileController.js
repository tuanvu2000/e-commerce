const jwt = require('jsonwebtoken');
const { Profile, Account } = require('../models');
const CryptoJS = require('crypto-js');

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

        // Khởi tạo Profile
        const newProfile = new Profile({
            ...req.body,
            accountId: savedAccount.id
        })
        const savedProfile = await newProfile.save();

        // Hiển thị kết quả
        res.status(201).json(savedProfile);
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
        const list = await Profile
            .find({})
            .sort('-createAt')
            .populate({
                path: 'accountId',
                select: '-password'
            })
        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await Profile
            .find({ accountId: req.params.id })
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

exports.putProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        );
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);
        await Profile.findOneAndDelete({
            accountId: req.params.id
        });
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}