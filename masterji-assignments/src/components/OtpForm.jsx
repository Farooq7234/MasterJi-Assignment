import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


function OtpForm() {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      setOtpVerified(true);
      setOtpError(false);
      toast.loading("Redirecting to chaicode.com")
      setTimeout(() => {
         window.location.href = 'https://chaicode.com'
      }, 3000);

    } else {
        toast.error("Invalid OTP, try Again")
      setOtpVerified(false);
      setOtpError(true);
    }
  };

  const handleOtpResend = ()=>{
    toast.success("OTP is 1234")
  }

  return (
    <div className='bg-[#3F72AF] min-h-[100vh] flex flex-col gap-5 justify-center items-center'>
      <h2 className='text-3xl text-white font-bold'>OTP FORM 📜</h2>
      <div className='bg-[#F9F7F7] w-[700px] h-[450px] rounded-2xl flex flex-col justify-center items-center gap-7'>
        <h4 className='text-[#000000] text-2xl font-bold'>Mobile Phone verification</h4>
        <p className='text-[#BFBFBF]'>Enter the 4-digit verification code that was sent to your phone number.</p>

        <form className='flex flex-col justify-between items-center gap-5' onSubmit={handleSubmit}>
          <div className='flex gap-5'>
            {otp.map((value, index) => (
              <input
                className={`bg-[#DBE2EF] text-black text-2xl font-bold w-[90px] h-[100px] text-center rounded-xl ${otpError ? "border-2 border-red-400" : null}` }
                key={index}
                value={value}
                maxLength='1'
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button className='text-[#FFFFFF] bg-[#112D4E] w-[417px] h-[64px] rounded-xl text-lg' type='submit'>
            Verify Account
          </button>
        </form>
        <p>Didn't receive code? <span className='text-[#112D4E] font-bold cursor-pointer' onClick={handleOtpResend}>Resend</span></p>
      </div>
      <Toaster />
    </div>
  );
}

export default OtpForm;
