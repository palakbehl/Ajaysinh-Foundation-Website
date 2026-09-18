import mongoose from 'mongoose';
import Campaign from '../models/Campaign.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

const initialFallbackCampaigns = [
  {
    _id: 'fallback-c1',
    id: 1,
    title: 'Bright Futures Education Program',
    slug: 'bright-futures-education-program',
    description: 'Providing quality education, books, and learning resources to underprivileged children across rural villages.',
    shortDescription: 'Providing quality education, books, and learning resources to underprivileged children.',
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
    _id: 'fallback-c2',
    id: 2,
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
    _id: 'fallback-c3',
    id: 3,
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
    _id: 'fallback-c4',
    id: 4,
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

// Helper to generate URL-safe slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * @desc    Get all campaigns (Public / Admin with filters)
 * @route   GET /api/campaigns
 * @access  Public
 */
export const getCampaigns = async (req, res, next) => {
  try {
    const { category, status, search, limit, page } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...initialFallbackCampaigns];
      if (category && category !== 'All Categories') {
        filtered = filtered.filter((c) => c.category.toLowerCase() === category.toLowerCase());
      }
      if (status && status !== 'All Status') {
        filtered = filtered.filter((c) => c.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((c) => c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s));
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        campaigns: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (category && category !== 'All Categories') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (status && status !== 'All Status') {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await Campaign.countDocuments(query);
    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      campaigns,
    });
  } catch (error) {
    console.warn('getCampaigns DB fallback triggered:', error.message);
    res.status(200).json({
      success: true,
      count: initialFallbackCampaigns.length,
      total: initialFallbackCampaigns.length,
      page: 1,
      pages: 1,
      campaigns: initialFallbackCampaigns,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Get single campaign by ID or Slug
 * @route   GET /api/campaigns/:id
 * @access  Public
 */
export const getCampaignByIdOrSlug = async (req, res, next) => {
  try {
    const { id } = req.params;
    let campaign;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      campaign = await Campaign.findById(id);
    }

    if (!campaign) {
      campaign = await Campaign.findOne({ slug: id });
    }

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    res.status(200).json({
      success: true,
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new campaign
 * @route   POST /api/campaigns
 * @access  Private (Admin)
 */
export const createCampaign = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      description,
      shortDescription,
      category,
      goalAmount,
      raisedAmount,
      daysLeft,
      deadline,
      status,
      featured,
      beneficiaries,
      featuredImage,
      image,
      gallery,
      overview,
      impactBreakdown,
      updates,
      stories,
      faqs,
    } = req.body;

    if (!title || !description || !goalAmount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, category, and goal amount',
      });
    }

    // Generate unique slug
    let slug = customSlug ? slugify(customSlug) : slugify(title);
    const existingSlug = await Campaign.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const campaign = await Campaign.create({
      title,
      slug,
      description,
      shortDescription: shortDescription || description.slice(0, 160),
      category,
      goalAmount: Number(goalAmount),
      raisedAmount: Number(raisedAmount) || 0,
      daysLeft: Number(daysLeft) || 30,
      deadline: deadline || null,
      status: status || 'Active',
      featured: Boolean(featured),
      beneficiaries: beneficiaries || '100+',
      featuredImage: featuredImage || (image ? { url: image, publicId: '' } : undefined),
      image: image || (featuredImage ? featuredImage.url : ''),
      gallery: gallery || [],
      overview,
      impactBreakdown,
      updates,
      stories,
      faqs,
    });

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update campaign
 * @route   PUT /api/campaigns/:id
 * @access  Private (Admin)
 */
export const updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    let campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // If new featuredImage is uploaded and different from old one, optionally remove old image from Cloudinary
    if (
      req.body.featuredImage &&
      req.body.featuredImage.publicId &&
      campaign.featuredImage &&
      campaign.featuredImage.publicId &&
      campaign.featuredImage.publicId !== req.body.featuredImage.publicId
    ) {
      await deleteFromCloudinary(campaign.featuredImage.publicId);
    }

    // Update slug if title changed and slug not explicitly provided
    if (req.body.title && req.body.title !== campaign.title && !req.body.slug) {
      let newSlug = slugify(req.body.title);
      const existingSlug = await Campaign.findOne({ slug: newSlug, _id: { $ne: id } });
      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
      }
      req.body.slug = newSlug;
    }

    campaign = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete campaign
 * @route   DELETE /api/campaigns/:id
 * @access  Private (Admin)
 */
export const deleteCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Clean up image from Cloudinary if publicId is present
    if (campaign.featuredImage && campaign.featuredImage.publicId) {
      await deleteFromCloudinary(campaign.featuredImage.publicId);
    }

    // Also clean up any gallery images
    if (Array.isArray(campaign.gallery)) {
      for (const item of campaign.gallery) {
        if (item.publicId) {
          await deleteFromCloudinary(item.publicId);
        }
      }
    }

    await Campaign.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Campaign and associated assets deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
