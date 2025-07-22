import { Users } from "./user.model";
import { CreateUserProps } from "./user.types";

const createUser = async (payload: Partial<CreateUserProps>) => {
  return await Users.create(payload);
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
