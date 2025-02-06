import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import transporter from "./nodemailer.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

  try {
    const emailHTML = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const emailHTML = WELCOME_SUCCESS_TEMPLATE.replace("{NAME}", name);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to AdvAUth",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);

    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const emailHTML = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reset Link Email sent successfully");
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const emailHTML = PASSWORD_RESET_SUCCESS_TEMPLATE;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

// export const sendVerificationEmail = async (email, verificationToken) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace(
//         "{verificationCode}",
//         verificationToken
//       ),
//       category: "Email Verification",
//     });

//     console.log("Email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending verification`, error);

//     throw new Error(`Error sending verification email: ${error}`);
//   }
// };

// export const sendWelcomeEmail = async (email, name) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
//       template_variables: {
//         company_info_name: "Auth Company",
//         name: name,
//       },
//     });

//     console.log("Welcome email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending welcome email`, error);

//     throw new Error(`Error sending welcome email: ${error}`);
//   }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Reset your password",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//       category: "Password Reset",
//     });
//   } catch (error) {
//     console.error(`Error sending password reset email`, error);

//     throw new Error(`Error sending password reset email: ${error}`);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Password Reset Successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset",
//     });

//     console.log("Password reset email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending password reset success email`, error);

//     throw new Error(`Error sending password reset success email: ${error}`);
//   }
// };
