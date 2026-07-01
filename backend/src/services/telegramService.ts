import axios from 'axios';

export const sendTelegramNotification = async (name: string, email: string, phone: string | undefined, message: string) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram not configured');
    return false;
  }

  const phoneDisplay = phone && phone.trim().length > 0 ? phone.trim() : 'Not provided';

  const text = `🔔 New Contact Message\n\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phoneDisplay}\n💬 Message: ${message}\n\nReceived at ${new Date().toLocaleString()}`;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text,
    });
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};
