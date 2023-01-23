const { raw } = require("express");
const res = require("express/lib/response");
const User = require("../model/User");

const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find();

    }catch(err) {
        return next(err);
    }

    if(!users) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    return res.status(200).json({users});
};


const addUser = async(req, res, next) =>{
    const {name, email, password} = req.body;
    if(!name && name.trim() == "" && !email && email.trim() === "" && !password && password.trim()) {
        return res.status(422).json({
            message: "Invalid Data"
        })
    }
    let user;
    try {
        user = new User({
            name,
            email,
            password
        });
        user = await  user.save();
    }catch(err) {
        return next(err);
    }

    if(!user) {
        return res.status(500).json({
            message: "Unable to save user"
        })
    }
    return res.status(201).json({
        user
    })
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() == "" && !email && email.trim() === "" && !password && password.trim()) {
        return res.status(422).json({
            message: "Invalid Data"
        })
    }

    let user; 
    try{
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password
        });

    }catch(err) {
        next(err);
    }

    if(!user) {
        return res.status(500).json({
            message: "Unable to save User"
        })
    }
    return res.status(200).json({
        message: "Updated Successfully"
    });

}

const deleteUser = async(req, res, next) =>{
    const id = req.params.id;
    let user; 

    try{
        user = await User.findByIdAndRemove(id);
    }catch (err) {
        next(er);
    }
    if(!user) {
        return res.status(500).json({
            message: "Unable to delete user"
        });
    }

    return res.status(200).json({
        message: "Successfully Deleted"
    });
}

const getUserById = async (req, res, next) => {
     const id = req.params.id;
     let user;

     try{
        user = await User.findById(id);
     }catch(err) {
        next(err);
     }

    if (!user) {
        return res.status(404).json({
            message: "Unable to find user"
        });
    }
    return res.status(200).json({
        user
    })

}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser ;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
//