const {User, Channel} = require('../models');
const {successResponse, errorResponse} = require('../helpers/responseHelper');
const {validateChannelSchema} = require('../validations/validation')


// Get all Channel 
exports.getAllChannels = async (req, res) => {

    try {
        const channels = await Channel.findAll({
            include:[
                {
                    model: User,
                }
            ]
        });
        return successResponse(
            req,
            res,
            "All channels are fetched",
            channels,
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

// Get one Channel 
exports.showChannel = async (req, res) => {

    try {
        const {id} = req.params
        const users = await Channel.findAll({
            include:[
                {
                    model: User,
                }
            ],
            where:{
                id: id,
            }
        });
        return successResponse(
            req,
            res,
            "One Channel is fetched",
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

// Create Channel
exports.createChannel =  async (req, res) => {
    
    try {
        
        const {error} = validateChannelSchema(req.body);
        
        if(error) return errorResponse(req, res, error.details[0].message, 400);

        const payload = {
            title: req.body.title,
            User_id: req.body.userId
        }
        const oldChannel = await Channel.findOne({
            where:{
                title: payload.title
            }
        });
        if(oldChannel) return errorResponse(req, res, "This name is already used", 400);

        const newChannel = await Channel.create(payload);

        return successResponse(req, res, "Channel created successfully", newChannel);

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}

// Update Channel
exports.updateChannel =  async (req, res) => {
    
    try {
        const {id} = req.params;
        const channel = await Channel.findOne({
            where:{
                id: id
            }
        });

        if(!channel) return errorResponse(req, res, "Channel not found", 400);

        const {error} = validateChannelSchema(req.body);
        
        if(error) return errorResponse(req, res, error.details[0].message, 400);

        const payload = {
            title: req.body.title,
            User_id: req.body.userId
        }

        const oldChannel = await Channel.update(payload, {
            where:{
                id: id
            }
        });

        

        return successResponse(req, res, "Channel updated successfully");

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}


// delete Channel 

exports.deleteChannel = async (req, res) => {
    
    try {
        const {id} = req.params;
        const channel = await Channel.findOne({
            where:{
                id: id
            }
        });

        if(!channel) return errorResponse(req, res, "Channel not found", 400);

        const oldChannel = await Channel.destroy({
            where:{
                id: id
            }
        });

        

        return successResponse(req, res, "Channel deleted successfully");

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}