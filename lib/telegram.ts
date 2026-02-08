// Telegram notification service

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

interface OrderNotification {
    fullName: string;
    phoneNumber: string;
    universityName: string;
    courseName: string;
    quantity: number;
    orderId: number;
}

export async function sendTelegramNotification(order: OrderNotification): Promise<boolean> {
    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('Telegram credentials not configured');
        return false;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('ar-JO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const message = `
📦 طلب جديد وصل!

🔢 رقم الطلب: #${order.orderId}
👤 الاسم: ${order.fullName}
📞 الهاتف: ${order.phoneNumber}
🏫 الجامعة: ${order.universityName}
📘 المادة: ${order.courseName}
📊 الكمية: ${order.quantity}
🕒 الوقت: ${formattedDate}
`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            }
        );

        if (!response.ok) {
            console.error('Telegram API error:', await response.text());
            return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
        return false;
    }
}
