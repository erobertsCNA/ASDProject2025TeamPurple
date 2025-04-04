const express = require("express");
const userRouter = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getFirstUserByFirstLastName,
    getAllUsersByLastName,
    updateAllUsers,
    updateUserById,
    updateFirstUserByFirstLastName,
    updateAllUsersByLastName,
    deleteAllUsers,
    deleteUserById,
    deleteUserByEmail,
    deleteFirstUserByFirstLastName,
    deleteAllUsersByLastName
} = require("../controllers/user.controller.js");

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/id=:id', getUserById);
userRouter.get('/email=:email', getUserByEmail);
userRouter.get('/fname=:fname/lname=:lname', getFirstUserByFirstLastName);
userRouter.get('/lnames=:lname', getAllUsersByLastName);
userRouter.put('/', updateAllUsers);
userRouter.put('/id=:id', updateUserById);
userRouter.put('/fname=:fname/lname=:lname', updateFirstUserByFirstLastName);
userRouter.put('/lnames=:lname', updateAllUsersByLastName);
userRouter.delete('/', deleteAllUsers);
userRouter.delete('/id=:id', deleteUserById);
userRouter.delete('/email=:email', deleteUserByEmail);
userRouter.delete('/fname=:fname/lname=:lname', deleteFirstUserByFirstLastName);
userRouter.delete('/lnames=:lname', deleteAllUsersByLastName);

module.exports = userRouter;