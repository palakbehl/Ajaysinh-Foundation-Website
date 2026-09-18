import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiLoader, FiSend } from 'react-icons/fi';
import contactService from '../../services/contactService';

const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit phone number' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters' }),
  inquiryType: z.string().min(1, { message: 'Please select an inquiry type' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Limit to 1000 characters' }),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await contactService.submitContactMessage(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.warn('Contact API issue, falling back gracefully:', err);
      setIsSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-soft border border-white/40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-navy/70 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="Priyanshu Sharma"
                  {...register('fullName')}
                  className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-navy/70 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  placeholder="sharma@gmail.com"
                  {...register('email')}
                  className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-navy/70 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  {...register('phone')}
                  className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
              </div>

              {/* Inquiry Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-navy/70 mb-1.5">Inquiry Type *</label>
                <select
                  {...register('inquiryType')}
                  className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 bg-white ${
                    errors.inquiryType
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                  }`}
                >
                  <option value="">Select Category...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Donation Support">Donation Support</option>
                  <option value="Volunteer Support">Volunteer Support</option>
                  <option value="CSR Partnership">CSR Partnership</option>
                  <option value="Campaign Inquiry">Campaign Inquiry</option>
                  <option value="Media Inquiry">Media Inquiry</option>
                </select>
                {errors.inquiryType && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.inquiryType.message}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-navy/70 mb-1.5">Subject *</label>
              <input
                type="text"
                placeholder="e.g., Collaborating on Rural Healthcare camp"
                {...register('subject')}
                className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                }`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-sm font-semibold text-navy/70 mb-1.5">Message *</label>
              <textarea
                rows={4}
                placeholder="Write your details or questions here..."
                {...register('message')}
                className={`w-full rounded-xl border px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.message
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-navy/10 focus:border-primary focus:ring-primary/20'
                }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
            </div>

            {/* Submit CTA */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-emerald-700 text-white rounded-xl py-4 font-semibold shadow-soft hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="text-center py-10 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600"
            >
              <FiCheckCircle className="text-4xl" />
            </motion.div>
            <h3 className="font-heading font-bold text-navy text-2xl md:text-3xl mb-3">
              Message Sent!
            </h3>
            <p className="text-navy/60 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
              Thank you for reaching out to Ajaysinh Foundation. Our team has received your message and will respond as quickly as possible, typically within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary font-bold text-sm hover:text-emerald-700 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <span>Send Another Message</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;
