import { Users } from "./user.model";
import { CreateUserProps } from "./user.types";

const createUser = async (payload: Partial<CreateUserProps>) => {
  // throw new Error("Hello");
  return await Users.create(payload);
};

const userServices = {
  createUser,
};

export default userServices;
