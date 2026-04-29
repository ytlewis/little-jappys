import emailjs from "@emailjs/browser";

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// To activate real email sending:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template with these variables:
//      {{to_email}}, {{to_name}}, {{order_id}}, {{order_date}},
//      {{payment_method}}, {{items_list}}, {{order_total}}
//    Copy the Template ID
// 4. Go to Account → API Keys → copy your Public Key
// 5. Replace the values below with your real IDs
// ─────────────────────────────────────────────────────────────────────────────

const SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz789"
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // e.g. "abcDEFghiJKL123"

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
  // If not configured, skip silently
  if (
    SERVICE_ID === "YOUR_SERVICE_ID" ||
    TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
    PUBLIC_KEY === "YOUR_PUBLIC_KEY"
  ) {
    console.warn("EmailJS not configured. See src/lib/email.ts to set up real email sending.");
    return false;
  }

  try {
    await emailjs.send(
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
      },
      PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return false;
  }
};
