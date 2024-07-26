import sessionSchema from "./sessionSchema.js";

export const addToken = (item) => {
  return sessionSchema(item).save();
};
export const getToken = (tokenObj) => {
  return sessionSchema.findOne(tokenObj);
};

export const deleteToken = (_id) => {
  return sessionSchema.findByIdAndDelete(_id);
};
