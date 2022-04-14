const Joi = require('joi');

exports.validateUserSchema = (usr:any) => {
   
    const schema = Joi.object({
        firstName: Joi.string().min(4).max(20).required(),
        lastName: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(4).max(6).required(),
        email: Joi.string().email().required(),
    });

    return schema.validate(usr);

}

exports.validateUserUpdate = (usr:any) => {
    const schema = Joi.object({
        firstName: Joi.string().min(4).max(20).required(),
        lastName: Joi.string().min(4).max(20).required()
    });

    return schema.validate(usr);
}

exports.validateChannelSchema = (usr:any) => {
    const schema = Joi.object({
        title: Joi.string().min(4).max(20).required(),
        userId: Joi.number().required()
    });

    return schema.validate(usr);
}

exports.validateLogincredentials = (usr:any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(usr);
}
