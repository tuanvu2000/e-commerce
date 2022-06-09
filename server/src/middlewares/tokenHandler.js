const jwt = require('jsonwebtoken');
const { User, Account } = require('../models');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jwt.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            )
            return tokenDecoded
        } catch (error) {
            return false
        }
    } else {
        return false
    }
}

exports.verifyModToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const admin = await User.findById(tokenDecoded.id);
        const role = admin.role;
        if (role !== 'mod')
            return res.status(403).json('Require Mod Role!');
        req.admin = admin;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}

exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const admin = await User.findById(tokenDecoded.id);
        const role = admin.role;
        if (role !== 'admin')
            return res.status(403).json('Require Admin Role!');
        req.admin = admin;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}

exports.verifyAdToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const admins = await User.findById(tokenDecoded.id);
        const role = admins.role;
        if (role === 'user')
            return res.status(403).json('Require Higher Role!');
        req.admins = admins;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        // const account = await Account.findById(tokenDecoded.id, { password: 0 });
        const user = await User
            .findOne({ accountId: tokenDecoded.id })
            .populate({
                path: 'accountId',
                select: '-password'
            })
        if (!user)
            return res.status(403).json('Not allowed!');
        req.user = user;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}