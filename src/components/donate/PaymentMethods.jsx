import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiChevronRight, FiCopy, FiDownload, FiCheck } from 'react-icons/fi';

const methods = [
  { id: 'upi', name: 'UPI (GPay / PhonePe)', logo: 'UPI' },
  { id: 'qrcode', name: 'UPI QR Code', logo: 'QR' },
  { id: 'card', name: 'Credit / Debit Card', logo: 'CARD' },
  { id: 'netbanking', name: 'Net Banking', logo: 'NET' },
  { id: 'wallet', name: 'Digital Wallet', logo: 'WL' },
  { id: 'razorpay', name: 'Razorpay Instant', logo: 'RZP' }
];

const PaymentMethods = ({ selectedMethod, onSelectMethod, amount }) => {
  const [copied, setCopied] = useState(false);

  const upiVpa = 'ajaysinhfoundation@upi';
  const displayAmount = amount || 1000;
  const upiPayload = `upi://pay?pa=${upiVpa}&pn=Ajaysinh%20Foundation&am=${displayAmount}&cu=INR&tn=Donation%20to%20Ajaysinh%20Foundation`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiPayload)}`;

  const handleCopyVPA = () => {
    navigator.clipboard.writeText(upiVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-navy/5 shadow-soft">
      <div>
        <h3 className="font-heading font-bold text-navy text-lg mb-1 flex items-center gap-2">
          <span>Choose Payment Method</span>
        </h3>
        <p className="text-navy/50 text-xs font-medium">
          Select your preferred payment gateway channel.
        </p>
      </div>

      {/* Payment methods row list */}
      <div className="space-y-3">
        {methods.map((m) => {
          const isActive = selectedMethod === m.id;
          return (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => onSelectMethod(m.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full rounded-2xl p-4 flex items-center justify-between border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-primary/5 border-primary shadow-sm'
                  : 'bg-cream/40 border-navy/5 hover:border-primary/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                  {m.logo}
                </span>
                <span className="text-sm font-bold text-navy">
                  {m.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isActive && (
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                    Selected
                  </span>
                )}
                <FiChevronRight className={`text-navy/40 transition-transform ${isActive ? 'rotate-90 text-primary' : ''}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic QR Code display */}
      {selectedMethod === 'qrcode' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col items-center text-center space-y-4"
        >
          <div className="w-full flex justify-between items-center pb-2 border-b border-navy/5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">UPI QR Code</span>
            <span className="text-sm font-extrabold text-navy">₹{Number(displayAmount).toLocaleString('en-IN')}</span>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-soft relative group">
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              className="w-48 h-48 rounded-xl"
            />
          </div>

          <div className="space-y-1 w-full">
            <p className="text-xs font-semibold text-navy/70">
              Scan with any UPI app to pay
            </p>
            <p className="text-[10px] text-navy/40">
              Google Pay, PhonePe, Paytm, BHIM, etc.
            </p>
          </div>

          <div className="w-full pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleCopyVPA}
              className="flex-1 bg-white hover:bg-cream text-navy rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5 border border-navy/5 transition-all cursor-pointer"
            >
              {copied ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
              <span>{copied ? 'Copied VPA' : 'Copy VPA'}</span>
            </button>
            <a
              href={qrCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary hover:bg-emerald-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <FiDownload />
              <span>Open/Save QR</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* SSL security notice */}
      <div className="bg-emerald-50 rounded-2xl p-4 flex items-start gap-3 border border-emerald-100 mt-4">
        <FiLock className="text-emerald-600 text-lg mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
            100% Secure Transaction
          </h4>
          <p className="text-emerald-700/80 text-[11px] leading-tight font-medium">
            SSL encrypted connection. Your personal details are completely safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
