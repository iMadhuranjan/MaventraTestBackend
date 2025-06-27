import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
        email: email
    })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hasPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
}


export const login = async (req, res) => {
    const { email, password } = req.body;


    const isUser = await User.findOne({ email: email });

    if (!isUser) {
        res.status(400).json({
            success: false,
            messsage: "User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, isUser.password);

    if (!isPasswordValid) {
        res.status(400).json({
            success: false,
            messsage: "Invalid Crediantials"
        })
    }

    try {
        const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res .cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000,
            }) 

            console.log("Cookei Saved")
        res.status(200).json(
            { token, user: { id: isUser._id, name: isUser.name, email: isUser.email }, success:true }
        )
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: "Someting Wen Wrong form the Server" + error
        })
    }

}