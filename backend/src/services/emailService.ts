import axios from 'axios';

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'Elyas Yenealem (Software Developer)', email: 'portfolio9594@gmail.com' },
        to: [{ email }],
        subject: 'Password Reset OTP',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Password Reset Request</h2>
            <p>You requested to reset your password. Use the OTP below to proceed:</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #f97316; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
            </div>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">Portfolio Admin Dashboard</p>
          </div>
        `
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }
    );
    console.log('Email sent successfully:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error sending email:', error.response?.data || error.message);
    return false;
  }
};
