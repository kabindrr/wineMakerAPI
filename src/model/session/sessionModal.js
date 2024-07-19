import sessionSchema from "./sessionSchema.js";

export const addToken = (item) => {
  return sessionSchema(item).save();
};
export const getToken = (token) => {
  return sessionSchema.findOne({ token, associate });
};
