import axios from 'axios';

export const sendTelegramNotification = async (name: string, email: string, message: string) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram not configured');
    return false;
  }

  const text = `
🔔 *New Contact Message*

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}

_Received at ${new Date().toLocaleString()}_
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown'
    });
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};
