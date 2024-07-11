import wineMakers from "./userSchema.js";

export const addUser = (item) => {
  return wineMakers(item).save();
};
export const getUser = (filter) => {
  return wineMakers.findOne(filter);
};
export const updateUser = (filter, obj) => {
  return wineMakers.findOneAndUpdate(filter, obj, { new: true });
};
export const deleteUser = () => {
  return wineMakers.findByIdAndDelete();
};
