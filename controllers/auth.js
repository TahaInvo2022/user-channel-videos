const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {successResponse, errorResponse} = require('../helpers/responseHelper');
const {validateLogincredentials, validateUserSchema} = require('../validations/validation')


// Get all Users 
exports.doLogin = async (req, res) => {

      // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        const {error} = validateLogincredentials(req.body);
        if(error) return errorResponse(req, res, error.details[0].message, 400);

        // Validate if user exist in our database
        const user = await User.findOne({ 
            where:{
                email
            }
        });

        console.log("user console =====> ", user);
        
        

        if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );

        
        return successResponse(req, res, "User loggedin  successfully", user, token);
        }
        return errorResponse(req, res, "Invalid Credentials", 400);
    } catch (err) {
        if(error) return errorResponse(req, res, error.message, 400);
    }
    // Our register logic ends here
}
// Create User
exports.registerUser =  async (req, res) => {
    
    try {
        
        const {error} = validateUserSchema(req.body);
        
        if(error) return errorResponse(req, res, error.details[0].message, 400);

        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 6)
        }
        const oldUser = await User.findOne({
            where:{
                email: payload.email
            }
        });
        if(oldUser) return errorResponse(req, res, "This email is already used", 400);

        const newUser = await User.create(payload);

        // Create token
        const token = jwt.sign(
            { user_id: newUser.id, email: newUser.email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );
        

        return successResponse(req, res, "User created successfully", newUser, token);

    } catch (error) {
        if(error) return errorResponse(req, res, error.message, 400);
    }

}

