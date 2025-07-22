import { CreateUserProps } from "../user/user.types";
import { Users } from "../user/user.model";
import AppError from "../../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
import resMessage from "../../utils/resMessage";
import bcrypt from "bcryptjs";
const credentialSignIn = async (payload: Partial<CreateUserProps>) => {
  const { email, password: inputPassword } = payload;

  const user = await Users.findOne({ email }).select("+password");

  if (!user || !user.password) {
    throw new AppError(resMessage("notFound", "user"), StatusCodes.BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(inputPassword as string, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

export const authServices = {
  credentialSignIn,
};
