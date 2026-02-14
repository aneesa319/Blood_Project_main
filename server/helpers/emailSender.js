const nodemailer = require("nodemailer");

const senderEmail = "muhammadashiq431@gmail.com";
const pass = process.env.PASS;
console.log("pass:",pass)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadibraheem8567@gmail.com",
      pass: "keiqqqlfgkbxojiz",
    },
});


function sendIneligibilityEmail(to) {
    const mailOptions = {
      from: senderEmail,
      to,
      subject: "Eligibility Notice from LifeSaver System",
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #fef2f2; padding: 30px;">
        <table style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
              <h2>LifeSaver System</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <h3 style="color: #dc2626;">You are not eligible to register 😔</h3>
              <p>Unfortunately, your age does not fall within the eligible range of 18-65 years.</p>
              <p>We appreciate your interest in the <strong>LifeSaver System</strong>.</p>
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
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Ineligibility email failed:", err);
      else console.log("Ineligibility email sent to", to);
    });
  }


  function sendSuccessEmail({ name, email, bloodGroup, city, phone, zipcode, role, age, availability }) {
    const mailOptions = {
      from: senderEmail,
      to: email,
      subject: "Welcome to LifeSaver System",
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #f0fdf4; padding: 30px;">
        <table style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
              <h2>LifeSaver System</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h3 style="color: #16a34a; text-align: center;">🎉 Registration Successful!</h3>
              <p style="text-align: center;">Thank you for joining the <strong>LifeSaver System</strong>, <strong>${name}</strong>!</p>
              <p style="margin-top: 20px;">Here are your registration details:</p>
              <ul style="line-height: 1.8; padding-left: 20px;">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Blood Group:</strong> ${bloodGroup}</li>
                <li><strong>City:</strong> ${city}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Zipcode:</strong> ${zipcode}</li>
                ${role === 'donor' ? `<li><strong>Availability:</strong> ${availability ? "Available to Donate" : "Not Available"}</li>` : ""}
                <li><strong>Role:</strong> ${role}</li>
                <li><strong>Age:</strong> ${age}</li>
              </ul>
              <p style="margin-top: 20px;">You are now part of a life-saving mission. ❤️❤️❤️</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f3f4f6; text-align: center; font-size: 12px; padding: 20px;">
              &copy; ${new Date().getFullYear()} LifeSaver System. For support: <a href="mailto:support@lifesaver.com" style="color:#16a34a;">support@lifesaver.com</a>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `
};
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Success email failed:", err);
      else console.log("Success email sent to", email);
    });
  }
  
  module.exports = {
    sendIneligibilityEmail,
    sendSuccessEmail,
  };
  