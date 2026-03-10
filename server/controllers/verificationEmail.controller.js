const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");

// Function to generate a random 4-digit code
const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// Sending the email function 
const verificationByEmail = async (req, res) => {
    const user = process.env.EMAIL_USER || "muhammadibraheem8567@gmail.com";
    const pass = process.env.PASS;
    const registrationEmail = req.body.email;

    try {
        // Check if user already exists
        const isUserAlreadyExist = await userModel.findOne({ email: registrationEmail });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: user,
                pass: pass
            }
        });

        if (isUserAlreadyExist) {
            // Send "already registered" email
            const mailOptions = {
                from: process.env.EMAIL_USER || 'muhammadibraheem8567@gmail.com',
                to: registrationEmail,
                subject: 'You Are Already Registered with LifeSaver System',
                html: `
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
                  <table style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                    <tr>
                      <td style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">LifeSaver System</h2>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; text-align: center;">
                        <h3 style="color: #dc2626;">You are already registered!</h3>
                        <p>Thank you for your interest in <strong>LifeSaver System</strong>.</p>
                        <p>It looks like your email is already registered in our system.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #f3f4f6; text-align: center; font-size: 12px; padding: 20px;">
                        &copy; ${new Date().getFullYear()} LifeSaver System. For support: <a href="mailto:support@lifesaver.com" style="color:#dc2626;">support@lifesaver.com</a>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending already registered email:", error);
                    return res.status(500).json({ message: 'Failed to send email' });
                }
                return res.status(200).json({ status:400, message: 'User already exists. Email sent to user.' });
            });
        } else {
            // New user: Send verification code
            const verificationCode = generateVerificationCode();

            const mailOptions = {
                from: process.env.EMAIL_USER || 'muhammadibraheem8567@gmail.com',
                to: registrationEmail,
                subject: 'Your Verification Code for LifeSaver System',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Verification Code</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8;">
                  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 20px auto; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <tr>
                      <td style="background-color: #dc2626; padding: 24px 32px; text-align: center; color: #ffffff;">
                        <h1 style="margin: 0; font-size: 26px;">LifeSaver System</h1>
                        <p style="margin: 8px 0 0; font-size: 14px;">Secure Verification Process</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 32px; color: #333;">
                        <h2 style="font-size: 20px; margin-bottom: 12px; color: #dc2626;">Email Verification</h2>
                        <p style="font-size: 16px; margin: 12px 0;">
                          Please enter the following verification code to complete your registration:
                        </p>
                        <p style="
                            font-size: 28px;
                            font-weight: bold;
                            background-color: #fee2e2;
                            color: #b91c1c;
                            padding: 16px 24px;
                            border-radius: 8px;
                            text-align: center;
                            letter-spacing: 4px;
                            margin: 24px 0;">
                          ${verificationCode}
                        </p>
                        <p style="font-size: 14px; color: #555;">
                          <strong>Note:</strong> This code is confidential and should not be shared.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #f3f4f6; padding: 20px 30px; text-align: center; font-size: 12px; color: #777;">
                        &copy; ${new Date().getFullYear()} LifeSaver System. For support: <a href="mailto:support@lifesaver.com" style="color: #dc2626;">support@lifesaver.com</a>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending verification email:", error);
                    return res.status(500).json({ message: 'Failed to send email' });
                }
                return res.status(200).json({ 
                    status:200,
                    message: 'Verification code sent successfully', 
                    code: verificationCode, 
                    email: registrationEmail 
                });
            });
        }

    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    verificationByEmail
};
