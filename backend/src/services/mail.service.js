import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../configs/env.config.js";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

const sendEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sender = {
  name: "ResuNex Support",
  email: config.BREVO_SENDER_EMAIL
};


export const sendResetPasswordMail = async (
  email,
  resetPasswordUrl,
  firstName,
  lastName
) => {

  const emailData = {
    sender,
    to: [{ email }],
    subject: "Reset Your ResuNex Password",
    htmlContent: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:30px;">
      
      <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
        
        <h2 style="color:#2c3e50; text-align:center;">ResuNex Password Reset</h2>
        
        <p>Hello <strong>${firstName || ""} ${lastName || ""}</strong>,</p>
        
        <p>
          We received a request to reset your password. 
          Click the button below to set a new password.
        </p>

        <div style="text-align:center; margin:30px 0;">
          <a href="${resetPasswordUrl}" 
             style="
               background-color:#4CAF50;
               color:white;
               padding:12px 25px;
               text-decoration:none;
               border-radius:5px;
               font-weight:bold;
               display:inline-block;
             ">
             Reset Password
          </a>
        </div>

        <p style="font-size:14px; color:#555;">
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p style="font-size:14px; color:#555;">
          If you did not request this, please ignore this email.
        </p>

        <hr style="margin:30px 0;">

        <p style="font-size:12px; color:#888; text-align:center;">
          © ${new Date().getFullYear()} ResuNex. All rights reserved.
        </p>

      </div>
    </div>
    `
  };

  await sendEmailApi.sendTransacEmail(emailData);
};
