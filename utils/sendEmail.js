import nodemailer from 'nodemailer'


export async function sendEmail(recipientEmail, securityKey, emailSubject, emailInfo ) {
    // Create the dynamic link based on the type of email (e.g., verification or password recovery)
    const emailLink = `http://localhost:3000/${emailInfo?.route}?email=${recipientEmail}&token=${securityKey}`;

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

    // Define the email content dynamically based on emailInfo
    const htmlContent = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
                    <tr>
                        <td style="text-align: center; font-size: 24px; color: #333;">
                            <h2>${emailInfo?.heading}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #555;">
                            <p style="color: #333;">${emailInfo?.message}</p>
                            <p style="text-align: center;">
                                <a 
                                    href="${emailLink}"
                                    style="background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 16px;"
                                >
                                    ${emailInfo?.actionText}
                                </a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 12px; color: #aaa; text-align: center; padding-top: 20px;">
                            <p>If you did not attempt to take action, please ignore this email.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;

    // Define the email options
    const mailOptions = {
        from: `'💫JavaScriptMate' <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        subject: emailSubject,
        html: htmlContent,
    };

    // Send the email
    try {
        const res = await transporter.sendMail(mailOptions);
        if (res.accepted) {
            console.log(`${emailSubject} email sent successfully!`);
        } else {
            console.log(`Could not send ${emailSubject} email`);
        }
    } catch (error) {
        console.log('Email transportation error:', error);
    }
}