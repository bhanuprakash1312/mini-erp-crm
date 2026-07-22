const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        });
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            role
        }
    });

    const token = generateToken(user);

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        token,
         user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}
const login = async (req, res) => {
    try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        })
    }
    const user = await prisma.user.findUnique({
        where:{
            email
        },
    })

    if(!user){
        return res.status(400).json({
            success:false,
            message:"User does not exist"
        })
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
        return res.status(400).json({
            success:false,
            message:"Invalid password"
        })
    }

    const token = generateToken(user);

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
    });

}catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
const profile = async (req,res)=>{
    res.json({
        success:true,
        user:req.user
    })
}

module.exports = {
  register,
  login,
  profile
};