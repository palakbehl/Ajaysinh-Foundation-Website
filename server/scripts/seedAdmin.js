import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Admin from '../models/Admin.js';
import Campaign from '../models/Campaign.js';
import Blog from '../models/Blog.js';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import CSRInquiry from '../models/CSRInquiry.js';
import ContactMessage from '../models/ContactMessage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const initialCampaigns = [
  {
    title: 'Bright Futures Education Program',
    slug: 'bright-futures-education-program',
    description: 'Providing quality education, books, and digital learning resources to underprivileged children across rural villages. We bridge the educational gap by establishing smart classrooms and tuition support centers.',
    shortDescription: 'Providing quality education, books, and learning resources to underprivileged children across rural villages.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 2000000,
    raisedAmount: 1450000,
    category: 'Education',
    beneficiaries: '350+',
    daysLeft: 45,
    status: 'Active',
    featured: true,
  },
  {
    title: 'Safe Shelter & Dignified Living Initiative',
    slug: 'safe-shelter-initiative',
    description: 'Building and maintaining safe, hygienic, and dignified living spaces for abandoned elders and orphaned children with complete medical supervision, warm bedding, and daily nourishment.',
    shortDescription: 'Building and maintaining safe, hygienic, and dignified living spaces for children and elders.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 3000000,
    raisedAmount: 2120000,
    category: 'Elder Care',
    beneficiaries: '120+',
    daysLeft: 60,
    status: 'Active',
    featured: true,
  },
  {
    title: 'Mobile Health & Medical Wellness Vans',
    slug: 'health-and-wellness-support',
    description: 'Deploying equipped mobile medical vans with diagnostic kits, primary medicine dispensaries, pediatric checks, and doctor consultations to underserved remote communities.',
    shortDescription: 'Organizing health camps, providing medical aid, and ensuring better healthcare access.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 1500000,
    raisedAmount: 975000,
    category: 'Healthcare',
    beneficiaries: '600+',
    daysLeft: 30,
    status: 'Active',
    featured: false,
  },
  {
    title: 'Nutritious Meals & Hunger Relief Campaign',
    slug: 'nutritious-meals-for-all',
    description: 'Serving hot, hygienic, freshly prepared wholesome meals daily to children, daily-wage laborers, and underprivileged families facing food insecurity.',
    shortDescription: 'Distributing nutritious meals to children, elders, and families in need every day.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 1800000,
    raisedAmount: 1160000,
    category: 'Community Welfare',
    beneficiaries: '2000+',
    daysLeft: 25,
    status: 'Active',
    featured: false,
  },
  {
    title: 'Women Livelihood & Vocational Training Centers',
    slug: 'women-livelihood-vocational-training',
    description: 'Empowering marginalized rural women through certified tailoring, handicrafts, micro-enterprise coaching, and financial literacy to achieve sustainable independence.',
    shortDescription: 'Skill training and micro-enterprise support to enable sustainable livelihood for women.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    goalAmount: 1200000,
    raisedAmount: 780000,
    category: 'Women Empowerment',
    beneficiaries: '450+',
    daysLeft: 40,
    status: 'Active',
    featured: true,
  },
];

const initialBlogs = [
  {
    title: 'How Quality Education Opens Doors to a Better Future',
    slug: 'quality-education-better-future',
    category: 'Education',
    excerpt: 'Education is more than books. It is the key to confidence, independence, and a life full of possibilities for underprivileged children.',
    content: 'At Ajaysinh Foundation, we believe that education has the power to break the cycle of poverty and create a brighter tomorrow for every child. When a child learns to read and write, they gain the foundational tools to understand the world around them, make healthy choices, and build a productive career.\n\nThrough our education programs, we provide books, school supplies, tuition support, mentorship, and digital learning resources to underprivileged children across rural areas. We work closely with government schools in rural areas to set up interactive learning labs, recruit qualified teachers, and conduct remedial classes for children falling behind.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Ajaysinh Foundation',
      title: 'Education Lead',
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
    content: 'In crowded urban slums, thousands of young children are forced into early scrap-sorting or street vending due to extreme family deprivation. Re-enrolling them in secure daycare and childhood wellness facilities is critical.\n\nOur team works round the clock to ensure access to warm meals, basic medical exams, and psycho-social trauma counseling so that childhood innocence is preserved.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Dr. Alok Verma',
      title: 'Child Welfare Director',
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
    content: 'Economic migration often leaves older parents destitute in remote villages or railway stations. Our Residential Elder Care Initiative constructs spaces where they receive medical aid, recreational activities, and warm, respectful community living.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Sunita Sharma',
      title: 'Resident Shelter Head',
    },
    tags: ['Elderly Care', 'Shelter', 'Healthcare'],
    readTime: '7 min read',
    published: true,
  },
  {
    title: 'Clean Drinking Water Collective: Transforming Kalyanpur Village',
    slug: 'clean-drinking-water-kalyanpur',
    category: 'Community',
    excerpt: 'How community mobilization and engineering borehole wells brought potable, fluorosis-free water to 1,500 villagers.',
    content: 'Water scarcity is not just an inconvenience—it stunts education and health. When girls walk 5 kilometers each morning for water, school attendance drops to zero. By establishing a solar borehole well in Kalyanpur, daily life has transformed permanently.',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Rajesh Nair',
      title: 'Infrastructure Specialist',
    },
    tags: ['Clean Water', 'Rural Health', 'Infrastructure'],
    readTime: '4 min read',
    published: true,
  },
];

const seedDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajaysinh_foundation';

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri.split('@').pop()} ...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('MongoDB connection established successfully.');

    // 1. Seed Superadmin
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

    // 2. Seed Campaigns
    const existingCampaigns = await Campaign.find();
    let savedCampaigns = existingCampaigns;
    if (existingCampaigns.length === 0) {
      savedCampaigns = await Campaign.insertMany(initialCampaigns);
      console.log(`Seeded ${initialCampaigns.length} initial campaigns.`);
    } else {
      console.log(`Campaigns collection already has ${existingCampaigns.length} records.`);
    }

    // 3. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(initialBlogs);
      console.log(`Seeded ${initialBlogs.length} initial blogs.`);
    } else {
      console.log(`Blogs collection already has ${blogCount} records.`);
    }

    // 4. Seed Donations
    const donationCount = await Donation.countDocuments();
    if (donationCount === 0) {
      const sampleDonations = [
        {
          donorName: 'Vikram Malhotra',
          email: 'vikram.malhotra@gmail.com',
          phone: '+91 98201 23456',
          pan: 'ABCDE1234F',
          amount: 15000,
          paymentMethod: 'UPI',
          paymentId: 'pay_UPI_9823491021',
          transactionId: 'TXN-UPI-9823491',
          status: 'successful',
          claim80G: true,
          message: 'Wishing all the children a bright and inspiring academic year!',
          campaignId: savedCampaigns[0]?._id,
          campaignTitle: savedCampaigns[0]?.title || 'Bright Futures Education Program',
          createdAt: new Date(Date.now() - 3600000 * 5),
        },
        {
          donorName: 'Ananya Singhania',
          email: 'ananya.singh@outlook.com',
          phone: '+91 98102 34567',
          pan: 'FGHIJ5678K',
          amount: 25000,
          paymentMethod: 'NetBanking',
          paymentId: 'pay_NB_48102941',
          transactionId: 'TXN-HDFC-48102',
          status: 'successful',
          claim80G: true,
          message: 'Donation on behalf of Singhania Family for elder healthcare.',
          campaignId: savedCampaigns[1]?._id,
          campaignTitle: savedCampaigns[1]?.title || 'Safe Shelter & Dignified Living Initiative',
          createdAt: new Date(Date.now() - 3600000 * 24),
        },
        {
          donorName: 'Anonymous Donor',
          email: 'supporter@gmail.com',
          phone: '+91 97111 88990',
          amount: 5000,
          paymentMethod: 'Card',
          paymentId: 'pay_CARD_102948',
          transactionId: 'TXN-CARD-10294',
          status: 'successful',
          anonymous: true,
          campaignId: savedCampaigns[2]?._id,
          campaignTitle: savedCampaigns[2]?.title || 'Mobile Health & Medical Wellness Vans',
          createdAt: new Date(Date.now() - 3600000 * 48),
        },
        {
          donorName: 'Rohan Deshmukh',
          email: 'rohan.d@deshmukhengg.in',
          phone: '+91 99220 33445',
          pan: 'LMNOP9012Q',
          amount: 10000,
          paymentMethod: 'UPI',
          paymentId: 'pay_UPI_847192',
          transactionId: 'TXN-UPI-847192',
          status: 'successful',
          claim80G: true,
          message: 'Happy to support monthly nutritious meals initiative.',
          campaignId: savedCampaigns[3]?._id,
          campaignTitle: savedCampaigns[3]?.title || 'Nutritious Meals & Hunger Relief Campaign',
          createdAt: new Date(Date.now() - 3600000 * 72),
        },
        {
          donorName: 'Dr. Meera Nambiar',
          email: 'dr.meera@apollohealth.org',
          phone: '+91 98450 11223',
          amount: 20000,
          paymentMethod: 'Card',
          paymentId: 'pay_CARD_992104',
          transactionId: 'TXN-CARD-99210',
          status: 'successful',
          claim80G: true,
          message: 'For medical supplies and diagnostics in rural camps.',
          campaignId: savedCampaigns[2]?._id,
          campaignTitle: savedCampaigns[2]?.title || 'Mobile Health & Medical Wellness Vans',
          createdAt: new Date(Date.now() - 3600000 * 96),
        },
        {
          donorName: 'Kunal Kapoor',
          email: 'kunal.kapoor@techinnovate.com',
          phone: '+91 98710 44556',
          amount: 50000,
          paymentMethod: 'NetBanking',
          paymentId: 'pay_NB_771920',
          transactionId: 'TXN-ICICI-77192',
          status: 'successful',
          claim80G: true,
          message: 'Annual corporate matching donation for women livelihood centers.',
          campaignId: savedCampaigns[4]?._id,
          campaignTitle: savedCampaigns[4]?.title || 'Women Livelihood & Vocational Training Centers',
          createdAt: new Date(Date.now() - 3600000 * 120),
        },
      ];
      await Donation.insertMany(sampleDonations);
      console.log(`Seeded ${sampleDonations.length} initial donation records.`);
    } else {
      console.log(`Donations collection already has ${donationCount} records.`);
    }

    // 5. Seed Volunteers
    const volunteerCount = await Volunteer.countDocuments();
    if (volunteerCount === 0) {
      const sampleVolunteers = [
        {
          fullName: 'Aarav Mehta',
          email: 'aarav.mehta@gmail.com',
          phone: '+91 98980 12345',
          age: 26,
          city: 'New Delhi',
          occupation: 'High School Mathematics Teacher',
          interests: 'Education, Remedial Teaching, Digital Literacy',
          availability: 'Weekends (Saturday & Sunday mornings)',
          motivation: 'I want to volunteer my weekends to teach basic math and science to first-generation students in rural learning centers.',
          status: 'Accepted',
          createdAt: new Date(Date.now() - 3600000 * 20),
        },
        {
          fullName: 'Dr. Shalini Gupta',
          email: 'dr.shalini.g@maxhealthcare.com',
          phone: '+91 98111 22334',
          age: 34,
          city: 'Noida',
          occupation: 'Pediatric General Physician',
          interests: 'Healthcare Camps, Child Immunization, Nutrition',
          availability: 'Twice a month on Sundays',
          motivation: 'Passionate about diagnosing pediatric malnutrition early and providing free clinical consultations for rural children.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 3600000 * 8),
        },
        {
          fullName: 'Rhea Patel',
          email: 'rhea.patel@designstudio.in',
          phone: '+91 97234 56789',
          age: 24,
          city: 'Ahmedabad',
          occupation: 'UI/UX Designer & Content Creator',
          interests: 'Social Media, Storytelling, Women Empowerment',
          availability: 'Flexible (5-8 hours per week remotely)',
          motivation: 'I can help design impact flyers, photograph on-ground beneficiary stories, and amplify foundation campaigns.',
          status: 'Reviewed',
          createdAt: new Date(Date.now() - 3600000 * 35),
        },
        {
          fullName: 'Karan Mehra',
          email: 'karan.mehra@fmcglogistics.com',
          phone: '+91 98333 44556',
          age: 29,
          city: 'Gurugram',
          occupation: 'Supply Chain Executive',
          interests: 'Meal Distribution, Warehouse Logistics, Food Drives',
          availability: 'Saturdays full day',
          motivation: 'Experienced in bulk food logistics and ready to supervise daily hunger relief meal packaging and dispatch.',
          status: 'Accepted',
          createdAt: new Date(Date.now() - 3600000 * 50),
        },
        {
          fullName: 'Pooja Verma',
          email: 'pooja.verma@delhiuniversity.ac.in',
          phone: '+91 96500 77889',
          age: 21,
          city: 'Delhi',
          occupation: 'Undergraduate Student (Social Work)',
          interests: 'Elderly Care, Recreational Therapy, Community Visits',
          availability: 'Weekday afternoons',
          motivation: 'Looking to spend time with abandoned senior citizens in shelter homes, reading and organizing recreational events.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 3600000 * 12),
        },
      ];
      await Volunteer.insertMany(sampleVolunteers);
      console.log(`Seeded ${sampleVolunteers.length} volunteer applications.`);
    } else {
      console.log(`Volunteers collection already has ${volunteerCount} records.`);
    }

    // 6. Seed CSR Inquiries
    const csrCount = await CSRInquiry.countDocuments();
    if (csrCount === 0) {
      const sampleCSR = [
        {
          companyName: 'Apex Tech Solutions Pvt Ltd',
          contactPerson: 'Suresh Nambiar',
          email: 'suresh.nambiar@apextech.com',
          phone: '+91 98100 99887',
          csrInterest: 'Education & Digital Classrooms',
          budgetRange: '₹10L - ₹25L',
          proposedBudget: '₹15,00,000',
          message: 'Our corporate CSR committee has approved grants for setting up 5 digital computer labs in rural government schools. We would like to partner with Ajaysinh Foundation for on-ground execution and periodic audit reporting.',
          status: 'In Progress',
          createdAt: new Date(Date.now() - 3600000 * 15),
        },
        {
          companyName: 'Horizon Pharmaceuticals India',
          contactPerson: 'Priyanka Sen',
          email: 'priyanka.sen@horizonpharma.in',
          phone: '+91 98222 33445',
          csrInterest: 'Healthcare & Mobile Medical Vans',
          budgetRange: '₹25L+',
          proposedBudget: '₹30,00,000',
          message: 'We want to sponsor the manufacturing and 1-year operating expense of a specialized mobile medical van equipped for diabetes and cardiology screening in low-income districts.',
          status: 'Contacted',
          createdAt: new Date(Date.now() - 3600000 * 40),
        },
        {
          companyName: 'Greenfield Retail & Logistics',
          contactPerson: 'Amitabh Choudhary',
          email: 'amitabh@greenfieldretail.com',
          phone: '+91 99110 55667',
          csrInterest: 'Women Skill Centers & Sustainable Livelihood',
          budgetRange: '₹5L - ₹10L',
          proposedBudget: '₹8,50,000',
          message: 'Proposal to establish a 40-seat industrial sewing machine workshop to train village women and source eco-friendly cloth shopping bags directly for our retail supermarket chain.',
          status: 'New',
          createdAt: new Date(Date.now() - 3600000 * 6),
        },
        {
          companyName: 'Vanguard Solar Power Corp',
          contactPerson: 'Rajiv Khanna',
          email: 'r.khanna@vanguardsolar.in',
          phone: '+91 97180 22334',
          csrInterest: 'Solar Energy for Elder Shelter Homes',
          budgetRange: '₹10L - ₹25L',
          proposedBudget: '₹12,00,000',
          message: 'We provide end-to-end rooftop solar installation and battery backups for non-profit elderly shelter homes to reduce electricity expenditure to near zero.',
          status: 'Completed',
          createdAt: new Date(Date.now() - 3600000 * 120),
        },
      ];
      await CSRInquiry.insertMany(sampleCSR);
      console.log(`Seeded ${sampleCSR.length} CSR partnership inquiries.`);
    } else {
      console.log(`CSR Inquiries collection already has ${csrCount} records.`);
    }

    // 7. Seed Contact Messages
    const messageCount = await ContactMessage.countDocuments();
    if (messageCount === 0) {
      const sampleMessages = [
        {
          name: 'Nitin Gadkari',
          email: 'nitin.g@gmail.com',
          phone: '+91 98333 77889',
          subject: '80G Tax Exemption Certificate Query',
          inquiryType: 'Donation Inquiry',
          message: 'Hello, I made a donation of ₹10,000 last Tuesday. Could you please email me the official 80G tax receipt for my income tax filing? Thanks!',
          read: false,
          createdAt: new Date(Date.now() - 3600000 * 3),
        },
        {
          name: 'Sunaina Bose',
          email: 'sunaina.bose@rotarydelhi.org',
          phone: '+91 98111 66778',
          subject: 'Collaborative Eye Screening Camp on World Sight Day',
          inquiryType: 'Partnership',
          message: 'Dear Foundation Team, Rotary Club of Delhi Central wishes to collaborate with your team to host a free cataract and refractive error screening camp next month. Kindly share your availability for a coordination call.',
          read: true,
          createdAt: new Date(Date.now() - 3600000 * 28),
        },
        {
          name: 'Deepak Saxena',
          email: 'deepak.saxena@tcs.com',
          phone: '+91 99200 44556',
          subject: 'Inquiry on Youth Internship Certificates',
          inquiryType: 'General Inquiry',
          message: 'My daughter is in her 2nd year of college and wishes to intern with your rural education initiative for 6 weeks during summer. Do you provide formal internship completion certificates?',
          read: false,
          createdAt: new Date(Date.now() - 3600000 * 7),
        },
        {
          name: 'Harish Chandra',
          email: 'harish.c@rediffmail.com',
          phone: '+91 97100 33445',
          subject: 'In-kind Clothes and Ration Donation Drop-off',
          inquiryType: 'Donation Inquiry',
          message: 'We have collected 8 boxes of clean winter blankets, sweaters, and packaged dry rations from our apartment society. Can someone from your team arrange a pickup or can we drop it off at your Foundation House?',
          read: true,
          createdAt: new Date(Date.now() - 3600000 * 52),
        },
      ];
      await ContactMessage.insertMany(sampleMessages);
      console.log(`Seeded ${sampleMessages.length} contact messages.`);
    } else {
      console.log(`Contact Messages collection already has ${messageCount} records.`);
    }

    console.log('Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
