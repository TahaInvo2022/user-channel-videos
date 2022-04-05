const {User, Channel} = require('../models');
const {successResponse, errorResponse} = require('../helpers/responseHelper');
const {validateUserUpdate} = require('../validations/validation')


// Get all Users 
exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.findAll({
            include:[
                {
                    model: Channel,
                }
            ]
        });
        return successResponse(
            req,
            res,
            "All users are fetched",
            users,
          )
    } catch (error) {
        return errorResponse(
            req,
            res,
            error.message,
            400
        );
    }

}

// Get one User 
exports.showUser = async (req, res) => {

    try {
        const {id} = req.params
        const users = await User.findAll({
            include:[
                {
                    model: Channel,
                }
            ],
            where:{
                id: id,
            }
        });
        return successResponse(
            req,
            res,
            "One user is fetched",
            users,
          )
    } catch (error) {
        return errorResponse(
            req,
            res,
            error.message,
            400
        );
    }

}



// Update user
exports.updateUser =  async (req, res) => {
    
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where:{
                id: id
            }
        });

        if(!user) return errorResponse(req, res, "User not found", 400);

        const {error} = validateUserUpdate(req.body);
        
        if(error) return errorResponse(req, res, error.details[0].message, 400);

        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
        const oldUser = await User.update(payload, {
            where:{
                id: id
            }
        });

        

        return successResponse(req, res, "User updated successfully");

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}


// delete user 

exports.deleteUser = async (req, res) => {
    
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where:{
                id: id
            }
        });

        if(!user) return errorResponse(req, res, "User not found", 400);

        const oldUser = await User.destroy({
            where:{
                id: id
            }
        });

        

        return successResponse(req, res, "User deleted successfully");

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}