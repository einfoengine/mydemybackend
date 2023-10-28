import User from '../models/user';
import { hassPassword, comparePassword } from '../utils/auth';

export const register = async (req, res) => {
    const {name, email, number, pass}=req.body;
    const isNotCorrect = (item) => item === '' || item === undefined || item === null;
    const incorrectData = [name, email, number, pass].some(isNotCorrect);
    try {
        if(incorrectData) {
            console.log("Error: Incorrect credential denial!");
            return res.status(400).send("Error: Incorrect credential denial!");
        }
        const hashed = await hassPassword(pass);
        const user = new User({
            name, email, number, pass: hashed
        }).save();
        console.log("Register user successful! ", user);
        res.send({
            success: true,
            user
        })
    } catch (err) {
        console.log("Auth error: ", err);
        return res.status(400).send("Auth error: ", err);
    }
}