'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { contactDetails } from '@/lib/data/mock-data';

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSuccess(false);
    } else {
      setErrors({});
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#060709] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Contact"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="08"
          eyebrowText="CONTACT"
          titleWhite="GET IN"
          titleGold="TOUCH."
        />

        {/* Two-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Contact Details & Social Buttons */}
          <div className="space-y-8">
            <dl className="space-y-6">
              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  PHONE
                </dt>
                <dd className="text-base font-semibold text-cinema-pure-white mt-1">
                  {contactDetails.phone ? (
                    <a
                      href={`tel:${contactDetails.phone.replace(/[\s+]/g, '')}`}
                      className="hover:text-brand-gold transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <span>{contactDetails.phone}</span>
                    </a>
                  ) : (
                    'To be supplied'
                  )}
                </dd>
              </div>

              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  EMAIL
                </dt>
                <dd className="text-base font-semibold text-cinema-pure-white mt-1">
                  To be supplied
                </dd>
              </div>

              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  LOCATION
                </dt>
                <dd className="text-base font-semibold text-cinema-pure-white mt-1">
                  Kochi, Keralam
                </dd>
              </div>
            </dl>

            {/* Social Buttons */}
            <div className="pt-4 space-y-3">
              <span className="block text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-cyan">
                CONNECT WITH US
              </span>
              <div className="flex flex-wrap gap-3">
                {contactDetails.socials.map((platform) => (
                  platform.href ? (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-[#273244] bg-[#0C1017] text-xs font-bold uppercase tracking-wider text-cinema-gray-300 hover:border-brand-cyan hover:text-cinema-pure-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan inline-flex items-center gap-2"
                    >
                      <span>{platform.label}</span>
                      <svg className="w-3 h-3 text-cinema-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  ) : null
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form Card */}
          <div className="bg-[#0C1017] border border-[#1E2631] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* YOUR NAME Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-[0.65rem] font-bold tracking-wider uppercase text-cinema-gray-300">
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-4 py-3 text-xs sm:text-sm font-semibold text-cinema-pure-white placeholder:text-cinema-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 font-semibold mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-[0.65rem] font-bold tracking-wider uppercase text-cinema-gray-300">
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-4 py-3 text-xs sm:text-sm font-semibold text-cinema-pure-white placeholder:text-cinema-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 font-semibold mt-1">{errors.email}</p>
                )}
              </div>

              {/* MESSAGE Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[0.65rem] font-bold tracking-wider uppercase text-cinema-gray-300">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your enquiry message here..."
                  className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-4 py-3 text-xs sm:text-sm font-semibold text-cinema-pure-white placeholder:text-cinema-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-400 font-semibold mt-1">{errors.message}</p>
                )}
              </div>

              {/* Gold Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                SEND ENQUIRY
              </button>

              {/* Client-Side Validation Confirmation Toast */}
              {isSuccess && (
                <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold tracking-wide flex items-center justify-center gap-2.5 animate-fade-in shadow-[0_0_15px_rgba(0,216,246,0.15)]">
                  <svg className="w-4 h-4 text-brand-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Enquiry validated successfully! Form data logged.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
