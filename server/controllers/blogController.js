import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

let fallbackBlogs = [
  {
    _id: 'fallback-b1',
    id: 1,
    title: 'How Quality Education Opens Doors to a Better Future',
    category: 'Education',
    slug: 'quality-education-better-future',
    excerpt: 'Education is more than books. It is the key to confidence, independence, and a life full of possibilities for underprivileged children.',
    content: 'At Ajaysinh Foundation, we believe that education has the power to break the cycle of poverty and create a brighter tomorrow for every child. When a child learns to read and write, they gain the foundational tools to understand the world around them, make healthy choices, and build a productive career.\n\nThrough our education programs, we provide books, school supplies, tuition support, mentorship, and digital learning resources to underprivileged children across rural areas.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Ajaysinh Foundation',
      title: 'Education Lead',
    },
    readTime: '5 min read',
    tags: ['Learning', 'Rural Schools', 'Empowerment'],
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'fallback-b2',
    id: 2,
    title: 'Nurturing Hope: Reclaiming Childhoods in Marginalized Slums',
    category: 'Child Welfare',
    slug: 'nurturing-hope-childhood-slums',
    excerpt: 'Street children face severe neglect. Our Child Welfare program provides nutritional support, counseling, and safe havens to reclaim their innocence.',
    content: 'In crowded urban slums, thousands of young children are forced into early scrap-sorting or street vending due to extreme family deprivation. Re-enrolling them in secure daycare and childhood wellness facilities is critical.\n\nOur team works round the clock to ensure access to warm meals, basic medical exams, and psycho-social trauma counseling.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Dr. Alok Verma',
      title: 'Child Welfare Director',
    },
    readTime: '6 min read',
    tags: ['Child Rights', 'Nutrition', 'Safe Havens'],
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'fallback-b3',
    id: 3,
    title: 'Empowering Rural Women Through Skill Training & Financial Literacy',
    category: 'Women Empowerment',
    slug: 'empowering-rural-women-skill-training',
    excerpt: 'Financial independence transforms communities. Through vocational training in tailoring and handicrafts, women become household earners.',
    content: 'When a woman earns her own livelihood, the nutritional and educational status of the entire household improves immediately. Ajaysinh Foundation vocational training centers have trained more than 1,200 women across 40 villages.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    author: {
      name: 'Pooja Singh',
      title: 'Program Director',
    },
    readTime: '4 min read',
    tags: ['Livelihood', 'Vocational Training', 'Women'],
    published: true,
    createdAt: new Date().toISOString(),
  },
];

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * @desc    Get published blogs (Public)
 * @route   GET /api/blogs
 * @access  Public
 */
export const getBlogs = async (req, res, next) => {
  try {
    const { category, search, limit, page, tag } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = fallbackBlogs.filter((b) => b.published);
      if (category && category !== 'All Stories' && category !== 'All Categories') {
        filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (b) => b.title.toLowerCase().includes(s) || b.excerpt.toLowerCase().includes(s)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        blogs: filtered,
        isOfflineFallback: true,
      });
    }

    const query = { published: true };

    if (category && category !== 'All Stories' && category !== 'All Categories') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      blogs,
    });
  } catch (error) {
    console.warn('getBlogs DB fallback triggered:', error.message);
    res.status(200).json({
      success: true,
      count: fallbackBlogs.length,
      total: fallbackBlogs.length,
      page: 1,
      pages: 1,
      blogs: fallbackBlogs,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Get all blogs including drafts (Admin)
 * @route   GET /api/blogs/admin/all
 * @access  Private (Admin)
 */
export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const { category, published, search, limit, page } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...fallbackBlogs];
      if (category && category !== 'All Categories') {
        filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
      }
      if (published !== undefined && published !== '' && published !== 'All') {
        const isPub = published === 'true';
        filtered = filtered.filter((b) => b.published === isPub);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (b) => b.title.toLowerCase().includes(s) || b.excerpt.toLowerCase().includes(s)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        blogs: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (category && category !== 'All Categories') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (published !== undefined && published !== '' && published !== 'All') {
      query.published = published === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 100;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      blogs,
    });
  } catch (error) {
    console.warn('getAllBlogsAdmin DB fallback triggered:', error.message);
    res.status(200).json({
      success: true,
      count: fallbackBlogs.length,
      total: fallbackBlogs.length,
      page: 1,
      pages: 1,
      blogs: fallbackBlogs,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Get single blog by ID or Slug
 * @route   GET /api/blogs/:id
 * @access  Public
 */
export const getBlogByIdOrSlug = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const blog = fallbackBlogs.find((b) => b._id === id || b.slug === id);
      if (blog) {
        return res.status(200).json({ success: true, blog });
      }
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    let blog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      const fallback = fallbackBlogs.find((b) => b._id === id || b.slug === id);
      if (fallback) {
        return res.status(200).json({ success: true, blog: fallback });
      }
      return res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    const fallback = fallbackBlogs.find((b) => b._id === req.params.id || b.slug === req.params.id);
    if (fallback) {
      return res.status(200).json({ success: true, blog: fallback });
    }
    next(error);
  }
};

/**
 * @desc    Create new blog
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      featuredImage,
      image,
      author,
      category,
      tags,
      readTime,
      quote,
      published,
    } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, excerpt, and content',
      });
    }

    let slug = customSlug ? slugify(customSlug) : slugify(title);

    if (mongoose.connection.readyState !== 1) {
      const newBlog = {
        _id: `fallback-b${Date.now()}`,
        title,
        slug,
        excerpt,
        content,
        featuredImage: featuredImage || (image ? { url: image, publicId: '' } : { url: '', publicId: '' }),
        image: image || (featuredImage ? featuredImage.url : ''),
        author: author || { name: req.admin?.name || 'Ajaysinh Foundation', title: 'Editorial Team' },
        category: category || 'Community',
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
        readTime: readTime || '5 min read',
        quote: quote || '',
        published: published !== undefined ? Boolean(published) : true,
        createdAt: new Date().toISOString(),
      };
      fallbackBlogs.unshift(newBlog);
      return res.status(201).json({
        success: true,
        message: 'Blog article created successfully (Offline mode)',
        blog: newBlog,
      });
    }

    const existingSlug = await Blog.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage: featuredImage || (image ? { url: image, publicId: '' } : undefined),
      image: image || (featuredImage ? featuredImage.url : ''),
      author: author || { name: req.admin?.name || 'Ajaysinh Foundation', title: 'Editorial Team' },
      category: category || 'Community',
      tags: tags || [],
      readTime: readTime || '5 min read',
      quote: quote || '',
      published: published !== undefined ? Boolean(published) : true,
    });

    res.status(201).json({
      success: true,
      message: 'Blog article created successfully',
      blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update blog
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const index = fallbackBlogs.findIndex((b) => b._id === id);
      if (index !== -1) {
        fallbackBlogs[index] = { ...fallbackBlogs[index], ...req.body };
        return res.status(200).json({
          success: true,
          message: 'Blog article updated successfully (Offline mode)',
          blog: fallbackBlogs[index],
        });
      }
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    let blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
    }

    if (
      req.body.featuredImage &&
      req.body.featuredImage.publicId &&
      blog.featuredImage &&
      blog.featuredImage.publicId &&
      blog.featuredImage.publicId !== req.body.featuredImage.publicId
    ) {
      await deleteFromCloudinary(blog.featuredImage.publicId);
    }

    if (req.body.title && req.body.title !== blog.title && !req.body.slug) {
      let newSlug = slugify(req.body.title);
      const existingSlug = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
      }
      req.body.slug = newSlug;
    }

    blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Blog article updated successfully',
      blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete blog
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      fallbackBlogs = fallbackBlogs.filter((b) => b._id !== id);
      return res.status(200).json({
        success: true,
        message: 'Blog article removed successfully (Offline mode)',
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
    }

    if (blog.featuredImage && blog.featuredImage.publicId) {
      await deleteFromCloudinary(blog.featuredImage.publicId);
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Blog article and media removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
