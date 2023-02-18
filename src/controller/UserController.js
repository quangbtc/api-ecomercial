import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config();

import { verifyToken } from '../midleware/verifyToken.js';
export const updateUser = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC,
        ).toString();
    }
    if (req.file) {
        req.body.avatar = process.env.BASE_URL + req.file.path;
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
            },
        );
        return res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json('Account was deleted.');
    } catch (err) {
        next(err);
    }
};
export const getAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const results = {};
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await User.countDocuments().exec();
        const totalPages = Math.ceil(total / limit);
        results.total = totalPages;
        if (endIndex < (await User.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        // const users = await User.find().sort({ _id: -1 });
        results.data = await User.find()
            .limit(limit)
            .skip(startIndex)
            .sort({ _id: -1 })
            .exec();
        console.log(results);
        res.status(200).json(results);
    } catch (error) {
        res.status(401).json(error);
    }
};
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(201).json({
                message: 'User not found!',
            });
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        res.status(401).json(error);
    }
};
