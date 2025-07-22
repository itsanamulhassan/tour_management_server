type MessageType =
  | "create"
  | "update"
  | "delete"
  | "get"
  | "signIn"
  | "signUp"
  | "signOut"
  | "notFound"
  | "alreadyExists"
  | "unauthorized"
  | "forbidden"
  | "badRequest";

const resMessage = (
  type: MessageType,
  entity: string,
  note = "" as string
): string => {
  const entityCapitalized =
    entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase();

  const messages: Record<MessageType, string> = {
    create: `${entityCapitalized} was successfully created.`,
    update: `${entityCapitalized} was successfully updated.`,
    delete: `${entityCapitalized} was successfully deleted.`,
    get: `${entityCapitalized} details were successfully retrieved.`,
    signIn: `${entityCapitalized} was successfully signed in.`,
    signUp: `${entityCapitalized} was successfully signed up.`,
    signOut: `${entityCapitalized} was successfully signed out.`,
    notFound: `${entityCapitalized} not found.`,
    alreadyExists: `${entityCapitalized} already exists.`,
    unauthorized: `You are not authorized to perform this action on ${entityCapitalized}.`,
    forbidden: `Access to this ${entityCapitalized.toLowerCase()} resource is forbidden.`,
    badRequest: `Invalid request for ${entityCapitalized.toLowerCase()}.`,
  };

  return `${messages[type]} ${note}`.trim();
};

export default resMessage;
