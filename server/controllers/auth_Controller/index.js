import User from "../../models/user_Model/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configuration from "../../config/config.js";

// USER _ SIGNUP
const user_SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // CHECKING USER
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email Already Exists !",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // NEW USER CREATED
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // NEW USER SAVED
    await newUser.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Signed Up Successfully !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something Occurred !",
    });
  }
};

// USER _ SIGNIN
const user_SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // CHECKING USER EXISTS IN DATABASE
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({
        success: false,
        message: "User Not Exists !",
      });
    }

    // CHECKING PASSWORD
    const passwordMatch = bcrypt.compareSync(password, userExists?.password);
    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials !",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: userExists?._id,
        email: userExists?.email,
        role: userExists?.role,
        username: userExists?.username,
      },
      configuration?.secretKey,
      { expiresIn: 24 * 60 * 60 * 1000 }
    );

    // GETTING USER INFO
    const { password: pass, ...userInfo } = userExists?._doc;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: configuration?.mode === "production",
        sameSite: "Strict",
        maxAge: 23 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Signed In Successfully !",
        userInfo,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something Occurred !",
    });
  }
};

// USER SIGN OUT
const user_SignOut = async (req, res) => {
  res
    .clearCookie("token", {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    })
    .json({
      success: true,
      message: "Signed Out Successfully !",
    });
};

// CHECK AUTH
const auth_Check = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User Authenticated !",
    user,
  });
};

export { user_SignUp, user_SignIn, user_SignOut, auth_Check };
