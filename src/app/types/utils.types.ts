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

export interface SendMailProps {
  subject: string;
  to: string;
  template: string;
  data?: Record<string, unknown>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}
