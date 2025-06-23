import * as React from "react";
import { render } from "@react-email/components";
import { Resend } from "resend";
import { EMAIL_FROM, RESEND_API_KEY } from "../common/constant/email";

export async function sendEmail(to: string, subject: string, html: string) {
  const resend = new Resend(RESEND_API_KEY);
  const res = await resend.emails.send({
    from: EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  });

  if (res.error) {
    throw new Error(`${res.error.name} - ${res.error.message}`);
  }
  if (!res.data) {
    throw new Error("Email not sent");
  }
  return res.data;
}
