import jwt from "jsonwebtoken";

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  return { accessToken, refreshToken ,user};
};
