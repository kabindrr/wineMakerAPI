import nodemailer from "nodemailer";

export const globalEmailHandler = async (mailObj) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return await transporter.sendMail(mailObj);
};

export const emailVerification = async (to, fName, uniqueKey) => {
  return await globalEmailHandler({
    from: `"WineCollector Management 👻" <${process.env.SMTP_USER}>`, // sender address
    to: `${to}`, // list of receivers
    subject: "Verify Email", // Subject line
    text: `Hello ${fName}, Please follow the link to verify email`, // plain text body
    html: `<div>
    <b>Hello ${fName}, Ready to verify your email? Click button </b>
    <a href = "http://localhost:5174/verify-email?ukey=${uniqueKey}&e=${to}" type="_blank"> 
    <button>Verify Now</button>
    </a>
    </div>`,
  });
};
