import axios from 'axios';

export const sendTelegramNotification = async (name: string, email: string, phone: string | undefined, message: string) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram not configured');
    return false;
  }

  const text = [
    '🔔 <b>New Contact Message</b>',
    '',
    `👤 <b>Name:</b> ${name}`,
    `📧 <b>Email:</b> ${email}`,
    `📞 <b>Phone:</b> ${phone || 'Not provided'}`,
    `💬 <b>Message:</b> ${message}`,
    '',
    `<i>Received at ${new Date().toLocaleString()}</i>`,
  ].join('\n');

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    });
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};
