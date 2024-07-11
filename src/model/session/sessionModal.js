import sessionSchema from "./sessionSchema.js";

export const addToken = (item) => {
  return sessionSchema(item).save();
};
