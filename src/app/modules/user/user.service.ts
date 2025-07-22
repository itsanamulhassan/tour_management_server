import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import resMessage from "../../utils/resMessage";
import { Users } from "./user.model";
import { AuthProviderProps, CreateUserProps } from "./user.types";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<CreateUserProps>) => {
  const { email, password, ...rest } = payload as CreateUserProps;

  const isUserExist = await Users.findOne({ email });
  if (isUserExist) {
    throw new AppError(
      resMessage("user").alreadyExists,
      StatusCodes.BAD_REQUEST
    );
  }

  const hashPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: AuthProviderProps = {
    provider: "CREDENTIAL",
    providerId: email,
  };
  return await Users.create({
    email,
    ...rest,
    auths: [authProvider],
    password: hashPassword,
  });
};

const retrieveUsers = async () => {
  const users = await Users.find();

  return users;
};

const userServices = {
  createUser,
  retrieveUsers,
};

export default userServices;
