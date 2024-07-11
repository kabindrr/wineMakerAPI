import bcryptjs from "bcryptjs";

const saltRound = 5;

// encrypt password
export const hashPassword = (plainPassword) => {
  return bcryptjs.hashSync(plainPassword, saltRound);
};

//compare password
export const comparePassword = (plainPassword, hashPassword) => {
  return bcryptjs.compareSync(plainPassword, hashPassword);
};
