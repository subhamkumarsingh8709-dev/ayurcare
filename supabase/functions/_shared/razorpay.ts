/* globalDeno */
import { requiredEnv } from "./http.ts";

export const razorpayKeyId = () => requiredEnv("RAZORPAY_KEY_ID");
export const razorpayKeySecret = () => requiredEnv("RAZORPAY_KEY_SECRET");

export const razorpayRequest = async (
  path: string,
  init: RequestInit = {},
) => {
  const credentials = btoa(
    `${razorpayKeyId()}:${razorpayKeySecret()}`,
  );
  return fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
};
