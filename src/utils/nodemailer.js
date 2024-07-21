import nodemailer from "nodemailer";

export const globalEmailHandler = async (mailObj) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  });
  return await transporter.sendMail(mailObj);
};

export const emailVerification = async (to, fName, uniqueKey) => {
  return await globalEmailHandler({
    from,
    to,
  });
};
