import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

export default function DownloadCard({ title, desc, icon: Icon, fileType, fileSize }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-[2rem] p-6 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Top section */}
      <div>
        {/* Icon */}
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          {Icon && <Icon className="w-6 h-6 text-primary" />}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-navy text-lg leading-snug mb-1.5">
          {title}
        </h3>

        {/* Description */}
        <p className="text-navy/60 text-sm leading-relaxed mb-5">
          {desc}
        </p>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-4 border-t border-navy/5">
        <div className="flex items-center gap-2.5">
          {/* File type badge */}
          {fileType && (
            <span className="uppercase text-[10px] bg-gold/10 text-gold px-3 py-1 rounded-full font-bold tracking-wide select-none">
              {fileType}
            </span>
          )}
          {/* File size */}
          {fileSize && (
            <span className="text-navy/40 text-xs font-medium">
              {fileSize}
            </span>
          )}
        </div>

        {/* Download button */}
        <button className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300 hover:underline underline-offset-4 decoration-primary/30">
          Download
          <FiDownload className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
