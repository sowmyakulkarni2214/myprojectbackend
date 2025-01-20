// Function to generate OTP with expiration
import crypto from "crypto"
let otpStore = {};  // Temporary storage for OTPs

const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999);  // Generate 6-digit OTP
    // const expiresAt = Date.now() + 10 * 60 * 1000;  // OTP expires in 10 minutes 
 
    return otp;
  };

  export default generateOTP