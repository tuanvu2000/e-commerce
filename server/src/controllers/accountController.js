const jwt = require('jsonwebtoken');
const { Account } = require('../models');
const CryptoJS = require('crypto-js');

exports.create = async (req, res) => {
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
        // Lưu giá trị đã tạo
        const savedAccount = await newAccount.save();

        // Hiển thị kết quả
        res.status(201).json(savedAccount.id);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        );
        res.status(200).json(account);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}