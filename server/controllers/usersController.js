const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user');

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Try to create the user
    await User.create({ email, password: hashedPassword });

    // Respond success
    res.sendStatus(200);
  } catch (error) {
    console.error(error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(400).json({ message: "Signup failed" });
  }
}


async function login(req, res) {
    try {
    //get email and password of req body
    const { email,password} = req.body
    //find user of req email
    const user =  await User.findOne({email});
    if (!user) res.sendStatus(401)
    
        
    //compare sent in data
    const passwordMatch = bcrypt.compareSync(password,user.password);
    if(!passwordMatch) return res.sendStatus(401)
    
    //create a JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign(
  { sub: user._id, exp, email: user.email },
  process.env.SECRET
);

    
    //set the cookie 
    res.cookie("Authorization",token,{
        expires: new Date(exp),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })
    //send it
    res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)    
    }
} 

function logout(req, res) {
  try {
    res.clearCookie("Authorization")
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
} 

function checkAuth(req, res) {
  try {
    res.status(200).json({ email: req.user.email });
  } catch (error) {
    return res.sendStatus(400);
  }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
}