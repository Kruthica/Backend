import {User} from '../models/user.model.js';

const registerUser = async (req, res) => {

    try{
        const {username, email, password} = req.body;
        
        if(!username || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        const user = await  User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {id:user._id,username: user.username, email: user.email}
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare passwords (in production, use bcrypt.compare with hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    }
};

export { registerUser, loginUser };
