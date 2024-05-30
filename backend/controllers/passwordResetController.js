const nodemailer = require('nodemailer');
const PasswordReset = require('../models/passwordResetModel')
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD_EMAIL;

const PasswordResetController = {
    initiatePasswordReset: async (req, res) => {
    // user provides their email for the reset
    const { email } = req.body; 
    try {
       // Check if the user exists
    //    console.log('EMAIL:', EMAIL);
    //    console.log('PASSWORD_EMAIL:', PASSWORD_EMAIL);
       const user = await User.findOne({ email });

       if (!user) {
           return res.status(200).send('ok');
       }

       // Create token and link
       const resetToken = uuidv4();
       const resetLink = `http://localhost:3000/password-reset/complete?token=${resetToken}`;

       // Send the reset token to the user (e.g., via email)
       const transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: EMAIL,
               pass: PASSWORD,
           },
       });

       const mailOptions = {
           from: 'kusumchowdhury@gmail.com',
           to: email,
           subject: 'Password Reset',
           text: `To reset your password, use the following link: ${resetLink}`,
       };

       transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
               console.error(error);
           } else {
               console.log('Email sent: ' + info.response);
           }
       });

       // Create a new row in the PasswordReset table
       const expirationTime = new Date();
       expirationTime.setHours(expirationTime.getHours() + 1);

       await PasswordReset.create({
           userId: user.id,
           resetToken,
           expiresAt: expirationTime,
       });

       return res.status(200).json({ message: "reset password link is sent to your email" });
   } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Internal server error' });
   }
  },

  completePasswordReset:  async (req, res) => {
    console.log('password reset')
    const { token } = req.query; // Extract token from URL parameter
    const { newPassword } = req.body; // Get new password from request body

    console.log('Token:', token);

    try {
        // Validate the token (check if it exists and is not expired)
        const resetRequest = await PasswordReset.findOne({
                resetToken: token,
                expiresAt: { $gt: new Date() }, // Check if expiresAt is in the future
        });

        console.log('Reset Request:', resetRequest);

        if (!resetRequest) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Find the associated user and update their password
        const user = await User.findOne(resetRequest.userId);
        console.log('User:', user);

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Hash the newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Expire or delete the reset token
        await resetRequest.deleteOne();
        return res.status(200).send('Password reset successful');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
},
};


module.exports = PasswordResetController;