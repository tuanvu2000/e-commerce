const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    try {
        if (usename === '' || email === '' || password === '') {
            return res.status(403).json('Please enter all required fields');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
