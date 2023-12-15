import User from "../../../DB/models/user.model.js";
import bcrybt from "bcryptjs"

export const singUp = async (req, res, next)=>{
    const {username, email, password} =  req.body
    const usernameChecker = await User.findOne({username})
    if(usernameChecker){
        return res.status(409).json({msg: "username used before"})
    }
    const emailChecker = await User.findOne({email})
    if(emailChecker){
        return res.status(409).json({msg: "email used before"})
    }
    const hashPassword = bcrybt.hashSync(password, +process.env.SALT_ROUNDS)
    const newUser = await User.create({username, email, password: hashPassword})
    if(!newUser){
        return res.status(500).json({msg: "user registration failed"})
    }
    return res.status(201).json({msg: "user registration success"})
}

export const signIn = async (req, res, next)=>{
    const {username, email, password} = req.body
    const user = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({msg: "invalid login credentials"})
    }
    const isPasswordCorrect = bcrybt.compareSync(password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({msg: "invalid login credentials"})
    }
    return res.status(200).json({msg: "login success"})
}

export const updateAccount = async (req, res, next)=>{
    const {username, email, password} = req.body
    const {_id} = req.query
    let updateObj = {}
    const userr = await User.findById(_id)
    if(!userr){
        return res.status(400).json({msg: "user not found"})
    }
    if(username){
        const usernameChecker = await User.findOne({username})
        if(usernameChecker){
            return res.status(409).json({msg: "username is used before"})
        }
        updateObj.username = username
    }
    if(email){
        const emailChecker = await User.findOne({email})
        if(emailChecker){
            return res.status(409).json({msg: "email is used before"})
        }
        updateObj.email = email
    }
    if(password){
        const hashPassword = bcrybt.hashSync(password, 10)
        updateObj.password = hashPassword
    }
    const updatedUser = await User.updateOne({_id}, updateObj)
    if(!updatedUser.modifiedCount){
        return res.status(500).json({msg: "Invalid userId"})
    }
    return res.status(200).json({msg: "updated done"})
}

export const deleteAccount = async (req, res, next)=>{
    const {_id, loggedInId} = req.query
    if(_id !== loggedInId){
        return res.status(403).json({msg: "deleted falied"})
    }
    const user = await User.findByIdAndDelete(_id)
    if(!user){
        return res.status(403).json({msg: "deleted falied"})
    }
    return res.status(200).json({msg: "user deleted success"})
}

export const getUserData = async (req, res, next)=>{
    const {_id} = req.params
    const user = await User.findById(_id, 'username email -_id')
    if(!user){
        return res.status(400).json({msg: "invalid userId"})
    }
    return res.status(200).json({user})
}
