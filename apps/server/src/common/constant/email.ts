import "dotenv/config";

export const EMAIL_FROM = process.env.EMAIL_FROM || "PlaceHolder <support@placeholder>";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
