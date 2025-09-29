export interface SetCookiesProps {
  accessToken?: string;
  refreshToken?: string;
}
export interface RemoveCookiesProps {
  accessToken?: boolean;
  refreshToken?: boolean;
}

export interface SendMailProps<T> {
  subject: string;
  to: string;
  template: string;
  data?: T;
  attachments?: {
    filename: string;
    content: string | Buffer<ArrayBufferLike>;
    contentType: string;
  }[];
}
