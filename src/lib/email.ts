import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const RESET_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_RESET_TEMPLATE_ID as string;
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

export interface PasswordResetEmailParams {
  toEmail: string;
  toName: string;
  tempPassword: string;
}

export const sendPasswordResetEmail = async (params: PasswordResetEmailParams): Promise<boolean> => {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured.");
    return false;
  }

  // Use reset template if configured, otherwise fall back to order template
  const templateId = RESET_TEMPLATE_ID || TEMPLATE_ID;
  if (!templateId) return false;

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      {
        to_email: params.toEmail,
        to_name: params.toName,
        temp_password: params.tempPassword,
        // Provide fallback values so order template variables don't break
        order_id: "N/A",
        order_date: new Date().toLocaleString(),
        payment_method: "N/A",
        items_list: "N/A",
        order_total: "N/A",
      }
    );
    console.log("Reset email sent:", response.status);
    return true;
  } catch (error) {
    console.error("Failed to send reset email:", error);
    return false;
  }
};
