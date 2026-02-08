
/**
 * RAF Production Payment Service (PayPro)
 * Fetches the official PayPro payment URL from the backend.
 */

export interface DonationInitResponse {
  success: boolean;
  payment_url?: string;
  error?: string;
}

const BACKEND_API = 'http://localhost:3000/api';

export const initiateSecurePayProDonation = async (
  amount: number, 
  pkgName: string,
  donorName?: string
): Promise<DonationInitResponse> => {
  try {
    const response = await fetch(`${BACKEND_API}/create-donation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount, 
        pkgName,
        customerName: donorName || "Valued Donor"
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Server error");

    return {
      success: true,
      payment_url: data.payment_url
    };
  } catch (err: any) {
    console.error("PAYMENT_FETCH_ERROR:", err.message);
    return {
      success: false,
      error: err.message
    };
  }
};
