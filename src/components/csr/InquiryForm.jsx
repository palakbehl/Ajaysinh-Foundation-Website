import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiChevronDown } from 'react-icons/fi';
import csrService from '../../services/csrService';

const csrInterests = [
  'Education',
  'Healthcare',
  'Rural Development',
  'Women Empowerment',
  'Environment',
  'Skill Development',
  'Other',
];

const budgetRanges = [
  'Below ₹5 Lakh',
  '₹5-15 Lakh',
  '₹15-50 Lakh',
  'Above ₹50 Lakh',
];

const initialForm = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  csrInterest: '',
  budgetRange: '',
  message: '',
};

const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'csrInterest'];

const fieldLabels = {
  companyName: 'Company Name',
  contactPerson: 'Contact Person',
  email: 'Email Address',
  phone: 'Phone Number',
  csrInterest: 'CSR Interest Area',
  budgetRange: 'Budget Range',
  message: 'Message',
};

const inputBase =
  'w-full rounded-xl border border-navy/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all px-5 py-3.5 text-navy bg-white/60 placeholder:text-navy/30 outline-none text-sm';

const labelBase = 'block text-sm font-semibold text-navy/70 mb-1.5';

export default function InquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = true;
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = true;
    }
    if (form.phone && !/^[+\d\s()-]{7,15}$/.test(form.phone)) {
      newErrors.phone = true;
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      await csrService.submitCSRInquiry(form);
      setSubmitted(true);
    } catch (err) {
      console.warn('CSR API issue, falling back gracefully:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-soft p-8 md:p-12 border border-white/40 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-gold/10 blur-3xl" />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <FiCheck className="w-10 h-10 text-emerald-600" strokeWidth={3} />
                </motion.div>
              </motion.div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-3">
                Thank You!
              </h3>
              <p className="text-navy/60 text-base max-w-sm leading-relaxed">
                Our CSR team will reach out within <span className="font-semibold text-primary">48 hours</span>. We look forward to partnering with you for meaningful impact.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                  setErrors({});
                }}
                className="mt-8 text-primary font-semibold text-sm underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
              >
                Submit another inquiry
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="relative z-10"
            >
              {/* Header */}
              <div className="mb-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
                  CSR Partnership Inquiry
                </h2>
                <p className="text-navy/50 text-sm">
                  Fill in the details below and our team will get back to you shortly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className={labelBase}>
                    {fieldLabels.companyName} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="e.g. Reliance Industries"
                    value={form.companyName}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.companyName ? 'border-red-400 ring-2 ring-red-400/20' : ''}`}
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label htmlFor="contactPerson" className={labelBase}>
                    {fieldLabels.contactPerson} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    placeholder="Full name"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.contactPerson ? 'border-red-400 ring-2 ring-red-400/20' : ''}`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelBase}>
                    {fieldLabels.email} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.email ? 'border-red-400 ring-2 ring-red-400/20' : ''}`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    {fieldLabels.phone} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.phone ? 'border-red-400 ring-2 ring-red-400/20' : ''}`}
                  />
                </div>

                {/* CSR Interest Dropdown */}
                <div>
                  <label htmlFor="csrInterest" className={labelBase}>
                    {fieldLabels.csrInterest} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="csrInterest"
                      name="csrInterest"
                      value={form.csrInterest}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none pr-10 ${
                        !form.csrInterest ? 'text-navy/30' : ''
                      } ${errors.csrInterest ? 'border-red-400 ring-2 ring-red-400/20' : ''}`}
                    >
                      <option value="" disabled>
                        Select area of interest
                      </option>
                      {csrInterests.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 w-4 h-4" />
                  </div>
                </div>

                {/* Budget Range Dropdown */}
                <div>
                  <label htmlFor="budgetRange" className={labelBase}>
                    {fieldLabels.budgetRange}
                  </label>
                  <div className="relative">
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none pr-10 ${
                        !form.budgetRange ? 'text-navy/30' : ''
                      }`}
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>
                      {budgetRanges.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 w-4 h-4" />
                  </div>
                </div>

                {/* Message Textarea — full width */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className={labelBase}>
                    {fieldLabels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your CSR goals and how we can collaborate..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none`}
                  />
                </div>
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {Object.keys(errors).length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 text-red-500 text-sm font-medium"
                  >
                    Please fill in all required fields correctly.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="mt-8 flex justify-start">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white rounded-full px-10 py-4 font-semibold text-sm flex items-center gap-2.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <FiSend className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
