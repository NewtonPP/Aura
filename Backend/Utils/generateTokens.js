import jwt from "jsonwebtoken";

export const GenerateAccessToken = (user) => {
  try {
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, {
      algorithm: 'HS256',
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    console.log("Error in Generating the Access Token", error);
  }
};

export const GenerateRefreshToken = (user) => {
  try {
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, {
      algorithm: 'HS256',
      expiresIn: "7d",
    });

    return refreshToken;
  } catch (error) {
    console.log("Error in Generating the Refresh Token", error);
  }
};
