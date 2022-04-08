const {User, Channel} = require('../models');
const {successResponse, errorResponse} = require('../helpers/responseHelper');
const {validateUserUpdate} = require('../validations/validation')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         firstName:
 *           type: string
 *           description: first name of the user
 *         lastName:
 *           type: string
 *           description: last name of the user
 *         email:
 *           type: string
 *           descripton: email of the user
 *         password:
 *           type: string
 *           descripton: password of the user
 *       example:
 *         id: 1
 *         firstName: test
 *         lastName: test
 *         email: test@test.com
 *         password: asd123
 *
 */

/**
 * 
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 */

/**
 * 
 * @swagger
 * 
 * /users:
 *  get:
 *   tags: [User]
 *   description: Use get all users
 *   parameters:
 *     - in : header
 *       name: x-access-token
 *       description: Authentication token
 *       schema:
 *         type: string
 *       required: true
 *   responses:
 *    200:
 *     description: All users are fetched
 *     content:
 *      application/json:
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/User'
 */

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


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: gets users by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *       - in : header
 *         name: x-access-token
 *         description: Authentication token
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: users by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
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


/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: gets users by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *       - in : header
 *         name: x-access-token
 *         description: Authentication token
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *        application/json: 
 *         schema:
 *          type: object
 *          required:
 *           - firstName
 *           - lastName
 *          properties:
 *           firstName:
 *            type: string
 *           lastName:
 *            type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
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




/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: gets users by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *       - in : header
 *         name: x-access-token
 *         description: Authentication token
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User can not be found
 */
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