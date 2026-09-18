import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Full name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
  phone: { type: String, required: [true, 'Phone number is required'], trim: true },
  age: { type: Number },
  dob: { type: Date },
  city: { type: String, trim: true },
  occupation: { type: String, trim: true },
  interests: { type: String, trim: true },
  skills: [{ type: String }],
  availability: { type: String, trim: true },
  motivation: { type: String },
  message: { type: String }, // Legacy/alternative
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected', 'pending', 'approved', 'rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.model('Volunteer', volunteerSchema);
