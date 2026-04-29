import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

// Initialize EmailJS once
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

export interface OrderEmailParams {
  toEmail: string;
  toName: string;
  orderId: string;
  orderDate: string;
  paymentMethod: string;
  itemsList: string;
  orderTotal: string;
}

export const sendOrderConfirmationEmail = async (params: OrderEmailParams): Promise<boolean> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured. Add VITE_EMAILJS_* values to your .env file.");
    return false;
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: params.toEmail,
        to_name: params.toName,
        order_id: params.orderId,
        order_date: params.orderDate,
        payment_method: params.paymentMethod,
        items_list: params.itemsList,
        order_total: params.orderTotal,
      }
    );
    console.log("Email sent:", response.status, response.text);
    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return false;
  }
};
