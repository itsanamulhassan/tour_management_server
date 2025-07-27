import { CreateUserProps } from "../user/user.types";
import { Users } from "../user/user.model";
import AppError from "../../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import bcrypt from "bcryptjs";
import { jwt } from "../../utils/jwt";
const credentialSignIn = async (payload: Partial<CreateUserProps>) => {
  const { email: inputEmail, password: inputPassword } = payload;

  const user = await Users.findOne({ email: inputEmail }).select("+password");

  if (!user || !user.password) {
    throw new AppError(message("notFound", "user"), StatusCodes.BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(inputPassword as string, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }

  const { _id, email, role } = user.toObject();
  const credential = {
    credentialId: _id,
    email,
    role,
  };
  const accessToken = jwt.signAccessToken(credential);
  const refreshToken = jwt.signRefreshToken(credential);

  return { accessToken, refreshToken, user };
};

export const authServices = {
  credentialSignIn,
};
