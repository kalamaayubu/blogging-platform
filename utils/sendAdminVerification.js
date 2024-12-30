import nodemailer from 'nodemailer'

export async function sendAdminVerificationEmail(toEmail, verificationToken) {
    const verificationLink = `http://localhost:3000/authentication/admin/verify-email?token=${verificationToken}`

    // Configure transporter
    const transporter = nodemailer.createTransport({
        port: 465,
        host: process.env.EMAIL_HOST,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        } 
    });

    // Define the email options
    const mailOptions = {
        from: `'💫JavaScriptMate' <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Email verification',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
                        <tr>
                            <td style="text-align: center; font-size: 24px; color: #333;">
                                <h2>Account verification</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #555;">
                                <p style="color: #333;">Here we go. Click the button below to verify your 💫 SoftWhere account.</p>
                                <p style="text-align: center;">
                                    <a 
                                        href="${verificationLink}"
                                        style="background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 16px;"
                                    >
                                        Verify
                                    </a>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px; color: #aaa; text-align: center; padding-top: 20px;">
                                <p>If you did not attemp to register on 💫 SoftWhere, please ignore this email.</p>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `,
    };

    // Send the verification email
    try {
        await transporter.sendMail(mailOptions)
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.log('Email transportation error:',error)
    }
}