import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    //if even one field out of them is empty we will return an error
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    };

    // Convert phoneNumber to number
    const phoneNumberNum = parseInt(phoneNumber, 10);
    if (isNaN(phoneNumberNum)) {
      return res.status(400).json({
        message: "Phone number must be a valid number",
        success: false,
      });
    }

    const file= req.file;
    console.log("File received:", file);
    let cloudResponse;
    if(file) {
      try {
        console.log("Processing file upload...");
        const fileUri= getDataUri(file);
        console.log("File URI created:", fileUri);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Cloudinary response:", cloudResponse);
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({
          message: "Error uploading file to Cloudinary",
          success: false,
          error: cloudinaryError.message
        });
      }
    } else {
      console.log("No file received in request");
    }
    //to check if the user is already registered or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    //converting password to hashed
    //10-length of password
    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber: phoneNumberNum,
      password: hashedpassword,
      role,
      profile: {
        profilePhoto: cloudResponse?.secure_url || ""
      },
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //to match the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    //creating token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    //for cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({ 
        message: `welcome back ${user.fullname}`, 
        success: true,
        user: user 
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log(fullname, email, phoneNumber, bio, skills);
    const file = req.file;  
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // skills have to be converted from strings to array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    //updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume comes later here...
    if(cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;  //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save the original name
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
