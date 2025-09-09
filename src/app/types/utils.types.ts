import { Types } from "mongoose";
import { UserRoleStatusEnumProps } from "../modules/user/user.types";

export interface SetCookiesProps {
  accessToken?: string;
  refreshToken?: string;
}
export interface RemoveCookiesProps {
  accessToken?: boolean;
  refreshToken?: boolean;
}

export interface CreateAccessRefreshTokenProps {
  credentialId: Types.ObjectId;
  email: string;
  role: UserRoleStatusEnumProps;
}
export type MongooseResponseProps<T> = { _id: Types.ObjectId } & T;

export interface FileSchema {
  url: string;
  public_id: string;
}
