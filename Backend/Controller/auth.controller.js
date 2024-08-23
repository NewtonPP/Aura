import UserModel from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { GenerateAccessToken, GenerateRefreshToken } from "../Utils/generateTokens.js";

export const Signup = async (req, res) => {
  try {
    const { FullName, Email, Password, ConfirmPassword } = req.body;

    if (!FullName || !Email || !Password || !ConfirmPassword) {
      return res.status(400).json({ message: "You must enter all the fields" });
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Your passwords do not match" });
    }

    const ifUserExist = await UserModel.findOne({ Email });
    if (ifUserExist) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = new UserModel({
      FullName,
      Email,
      Password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();

      const accessToken = GenerateAccessToken({ email: savedUser.Email });
      const refreshToken = GenerateRefreshToken({ email: savedUser.Email });

      res.status(200).json({
        user: savedUser,
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in the Signup Controller", error);
  }
};


export const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "You must enter all the credentials" });
    }

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "No user found with this email address" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "The password you entered is incorrect" });
    }

    const accessToken = GenerateAccessToken({ email: user.Email });
    const refreshToken = GenerateRefreshToken({ email: user.Email });

    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("Error in the Login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const Logout = async(req,res)=>{
    try {
        const cookie = req.cookies;
        if(!cookie.refreshToken) throw new Error ("No Refresh Token in Cookies")
        const RefreshToken = cookie.refreshToken;
        const user = await UserModel.findOne({RefreshToken})
        if(!user){
            await res.clearCookie("refreshToken",{
                httpOnly:true,
                secure:true
        })
        return res.sendStatus(204);
    }
    await UserModel.findOneAndUpdate({RefreshToken},{
        RefreshToken:"",
    })
    await res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    })
    return res.sendStatus(204)
    } catch (error) {
        console.log("Error in the Logout controller", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}