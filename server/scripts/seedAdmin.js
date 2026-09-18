import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Campaign from '../models/Campaign.js';
import Blog from '../models/Blog.js';

dotenv.config();

const initialCampaigns = [
  {
    title: 'Bright Futures Education Program',
    slug: 'bright-futures-education-program',
    description: 'Providing quality education, books, and learning resources to underprivileged children across rural villages.',
    shortDescription: 'Providing quality education, books, and learning resources to underprivileged children across rural villages.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 2000000,
    raisedAmount: 1250000,
    category: 'Education',
    beneficiaries: '350+',
    daysLeft: 45,
    status: 'Active',
    featured: true,
  },
  {
    title: 'Safe Shelter Initiative',
    slug: 'safe-shelter-initiative',
    description: 'Building and maintaining safe, hygienic, and dignified living spaces for children and elders.',
    shortDescription: 'Building and maintaining safe, hygienic, and dignified living spaces for children and elders.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 3000000,
    raisedAmount: 1820000,
    category: 'Elder Care',
    beneficiaries: '120+',
    daysLeft: 60,
    status: 'Active',
    featured: true,
  },
  {
    title: 'Health & Wellness Support',
    slug: 'health-and-wellness-support',
    description: 'Organizing health camps, providing medical aid, and ensuring better healthcare access.',
    shortDescription: 'Organizing health camps, providing medical aid, and ensuring better healthcare access.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 1500000,
    raisedAmount: 875000,
    category: 'Healthcare',
    beneficiaries: '600+',
    daysLeft: 30,
    status: 'Active',
    featured: false,
  },
  {
    title: 'Nutritious Meals for All',
    slug: 'nutritious-meals-for-all',
    description: 'Distributing nutritious meals to children, elders, and families in need every day.',
    shortDescription: 'Distributing nutritious meals to children, elders, and families in need every day.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 1800000,
    raisedAmount: 960000,
    category: 'Community Welfare',
    beneficiaries: '2000+',
    daysLeft: 25,
    status: 'Active',
    featured: false,
  },
];

const initialBlogs = [
  {
    title: 'How Quality Education Opens Doors to a Better Future',
    slug: 'quality-education-better-future',
    category: 'Education',
    excerpt: 'Education is more than books. It is the key to confidence, independence, and a life full of possibilities for underprivileged children.',
    content: 'Education builds knowledge, self-confidence, and life skills. It empowers children to make informed decisions, pursue their dreams, and contribute positively to society.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Ajaysinh Foundation',
      title: 'Education Lead',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=60&q=80',
    },
    tags: ['Learning', 'Rural Schools', 'Empowerment'],
    readTime: '5 min read',
    published: true,
  },
  {
    title: 'Nurturing Hope: Reclaiming Childhoods in Marginalized Slums',
    slug: 'nurturing-hope-childhood-slums',
    category: 'Child Welfare',
    excerpt: 'Street children face severe neglect. Our Child Welfare program provides nutritional support, counseling, and safe havens to reclaim their innocence.',
    content: 'In crowded urban slums, thousands of young children are forced into early scrap-sorting or street vending due to extreme family deprivation. Re-enrolling them in secure daycare and childhood wellness facilities is critical.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Dr. Alok Verma',
      title: 'Child Welfare Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80',
    },
    tags: ['Child Rights', 'Nutrition', 'Safe Havens'],
    readTime: '6 min read',
    published: true,
  },
  {
    title: 'Dignity in Golden Years: Providing Shelter and Care to Abandoned Elders',
    slug: 'dignity-golden-years-elder-care',
    category: 'Elder Care',
    excerpt: 'Abandoned by families, elderly mothers and fathers deserve dignity, nutritious meals, and warm shelter. Here is how we build a home for them.',
    content: 'Economic migration often leaves older parents destitute in remote villages or railway stations. Our Residential Elder Care Initiative constructs spaces where they receive medical aid and community living.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Sunita Sharma',
      title: 'Resident Shelter Head',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=60&q=80',
    },
    tags: ['Elderly Care', 'Shelter', 'Healthcare'],
    readTime: '7 min read',
    published: true,
  },
];

const seedDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajaysinh_foundation';
  
  try {
    console.log(`Connecting to MongoDB at: ${mongoUri.split('@').pop()} ...`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connection established successfully.');

    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@ajaysinhfoundation.org').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const adminName = process.env.ADMIN_NAME || 'Ajaysinh Admin';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(`Default Admin created: ${adminEmail} (password: ${adminPassword})`);
    } else {
      console.log(`Admin account already exists: ${adminEmail}`);
    }

    // 2. Seed Campaigns if empty
    const campaignCount = await Campaign.countDocuments();
    if (campaignCount === 0) {
      await Campaign.insertMany(initialCampaigns);
      console.log(`Seeded ${initialCampaigns.length} initial campaigns.`);
    } else {
      console.log(`Campaigns collection already has ${campaignCount} records.`);
    }

    // 3. Seed Blogs if empty
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(initialBlogs);
      console.log(`Seeded ${initialBlogs.length} initial blogs.`);
    } else {
      console.log(`Blogs collection already has ${blogCount} records.`);
    }

    console.log('Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
