import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    //console.log(email, name, password);

    try {
        const found = await User.findOne({ email });

        if (found) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashed
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User registered",
            newUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    //console.log(email, password);

    try {
        const found = await User.findOne({ email });

        if (!found) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatched = bcrypt.compareSync(password, found.password);

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const secret = process.env.SECRET;

        const token = jwt.sign({ id: found._id, email: found.email }, secret, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 86400000,
            secure: false,
        });

        return res.status(201).json({
            success: true,
            message: "User logged in",
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const getUser = async (req, res) => {
    const { token } = req.query;

    const secret = process.env.SECRET;

    const decoded = jwt.verify(token, secret);
    const id = decoded.id;

    try {
        const found = await User.findById(id);

        if (!found) {
            return res.status(404).json({
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            data: found
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const updateProfile = async (req, res) => {
    const { id, email, name } = req.body;

    try {
        const found = await User.findOne({ email });

        if (found && found._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;

        const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const changePassword = async (req, res) => {
    const { id, password, currentPassword } = req.body;

    try {
        const found = await User.findById(id);

        const userPass = found.password;

        const matched = await bcrypt.compare(currentPassword, userPass);

        if (!matched) {
            return res.status(400).json({
                success: false,
                message: "Current password is invalid"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        found.password = hashed;

        await found.save();

        return res.status(201).json({
            success: true,
            message: "Password changed"
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}