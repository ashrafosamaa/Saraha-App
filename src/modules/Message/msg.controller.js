import Msg from "../../../DB/models/msg.model.js";
import User from "../../../DB/models/user.model.js";

export const sendMsg = async (req, res, next)=>{
    const {content} = req.body
    const {sendTo} = req.params
    const isUserExist = await User.findById(sendTo)
    if(!isUserExist){
        return res.status(404).json({msg: "user not found"})
    }
    const createdMsg = await Msg.create({content, sendTo}) 
    if(!createdMsg){
        return res.status(500).json({msg: "message sent fail"})
    }
    return res.status(201).json({msg: "message sent succes"})
}

export const deleteMsg = async(req, res, next)=>{
    const {loggedInId, msgId} = req.query
    const deletedMsg = await Msg.findOneAndDelete({_id: msgId, sendTo: loggedInId})
    if(!deletedMsg){
        return res.status(400).json({msg: "cannot delete this message"})
    }
    return res.status(200).json({msg: "delted message"})
}

export const markAsRead = async(req, res, next)=>{
    const {loggedInId, msgId} = req.query
    const updateMsg = await Msg.findOneAndUpdate(
        {_id: msgId, sendTo: loggedInId, isViewed: false},
        {isViewed: true, $inc:{__v: 1}},
        {new: true}
    )
    if(!updateMsg){
        return res.status(500).json({msg: "updated failed"})
    }
    return res.status(200).json({msg: "updated done", updateMsg})
}

export const listUserMsg = async (req, res, next)=>{
    const {loggedInId, isViewed} = req.query
    const msg = await Msg.find({sendTo: loggedInId, isViewed})
    .sort({createdAt: -1})
    if(!msg.length){
        return res.status(200).json({msg: "no data found"})
    }
    return res.status(200).json({msg: "your messages: ", msg})
}
