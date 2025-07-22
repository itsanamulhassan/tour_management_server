const resMessage = (entity: string, note = "" as string) => {
  const entityCapitalized =
    entity.toLowerCase().charAt(0).toUpperCase() +
    entity.slice(1).toLowerCase();

  return {
    create: `${entityCapitalized} was successfully created.${note}`,
    update: `${entityCapitalized} was successfully updated.${note}`,
    delete: `${entityCapitalized} was successfully deleted.${note}`,
    get: `${entityCapitalized} details were successfully retrieved.${note}`,
    notFound: `${entityCapitalized} not found.${note}`,
    alreadyExists: `${entityCapitalized} already exists.${note}`,
    unauthorized: `You are not authorized to perform this action on ${entityCapitalized}.${note}`,
    forbidden: `Access to this ${entityCapitalized.toLowerCase()} resource is forbidden.${note}`,
    badRequest: `Invalid request for ${entityCapitalized.toLowerCase()}.${note}`,
  };
};

export default resMessage;
