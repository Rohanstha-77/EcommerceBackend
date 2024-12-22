import bcrypt from "bcrypt"
import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
export const register = async(req,res)=>{
    try {
        const {username,email,password} = req.body

        const findEmail = await User.findOne({email:email})
        if(findEmail) return res.status(409).send("Email already exist. Try Again")
        
        //hashing password
        const hasHashed = await bcrypt.hash(password,10)

        const newUser = new User({
            username: username,
            email: email,
            password: hasHashed
        })
        await newUser.save()
        res.status(200).send("New User is Registered Sucessfully")

        // console.log(hasHashed)
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send("Error While Registring")
    }
}

export const logIn = async(req,res)=>{
    const {email,password} = req.body

    try {
        
        const user = await User.findOne({email})
        if(!user) return res.status(404).send("Invalid Username and password")
    
    
        const comaparePassword = await bcrypt.compare(password,user.password)
        if(!comaparePassword) return res.status(404).send("Invalid Username and password")
        
        
    
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        },process.env.SECRET_API_KEY,{expiresIn: '7d'})

        res.cookie("token",token,{
            httpOnly: true,
            maxAge:7 * 24 * 60 * 60 * 1000
        }).status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }).send("Login Sucessfull")

    } catch (error) {
        console.log(error.message)
        res.status(400).send("Error while loging in",)
    }

}

export const logOut = (req,res) => {
    res.clearCookie("token").status(200).send("Logout Sucessfully")
}