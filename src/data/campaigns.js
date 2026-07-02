export const campaigns = [
  {
    id: 1,
    title: 'Bright Futures Education Program',
    description: 'Providing quality education, books, and learning resources to underprivileged children across rural villages.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    raised: 1250000,
    goal: 2000000,
    category: 'Education',
    donors: 245,
    beneficiaries: '350+',
    daysLeft: 45,
    status: 'Active',
    overview: {
      text: 'Millions of children in India lack access to quality education due to severe financial constraints. Through the Bright Futures Education Program, we aim to bridge this gap by providing essential learning resources, school supplies, professional tuition support, and life mentorship programs in rural areas of Bihar and Rajasthan.',
      checklist: [
        'Providing school supplies, books & uniforms',
        'Tuition support for underprivileged students',
        'After-school learning & mentoring programs',
        'Career guidance and personality development'
      ],
      stats: [
        { value: '350+', label: 'Children Benefited', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '1,200+', label: 'Books Distributed', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '25+', label: 'Schools Supported', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' },
        { value: '500+', label: 'Tuition Sessions', icon: 'Clock', bg: 'bg-primary/10', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Book', pct: 40, title: 'Educational Kits', desc: 'Books, stationery, uniforms, and structural learning materials', accent: '#3B82F6' },
      { icon: 'Users', pct: 30, title: 'Teacher Salaries', desc: 'Sustaining local learning center tutors and educational mentors', accent: '#EF4444' },
      { icon: 'Home', pct: 20, title: 'Classrooms', desc: 'Optimizing and upgrading village classroom learning facilities', accent: '#F59E0B' },
      { icon: 'Activity', pct: 10, title: 'Support Staff', desc: 'Administrative and operational expenses to keep school centers running', accent: '#10B981' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80',
    ],
    updates: [
      { date: 'May 15, 2026', title: 'School Supplies Distributed', desc: 'Successfully distributed 500+ school kits including notebooks, pens, and bags to students in 5 rural schools.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80' },
      { date: 'Apr 28, 2026', title: 'New Learning Center Opened', desc: 'Inaugurated our 3rd learning center in partnership with local community leaders.', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80' },
      { date: 'Feb 1, 2026', title: 'Campaign Launched', desc: 'Bright Futures Education Program officially launched with the support of 50 founding donors.', image: null }
    ],
    stories: [
      { name: 'Priya Sharma', age: '12 years old', quote: 'I never had my own books before. Now I have a whole bag full of them!', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', impact: 'Received education kit and tuition support' },
      { name: 'Rahul Meena', age: '14 years old', quote: 'The learning center helped me pass my exams. I want to become a teacher now.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Graduated from learning center program' }
    ],
    faqs: [
      { q: 'How are education donations used?', a: 'Every donation is carefully allocated towards educational materials, tuition fees, and learning center operations. We maintain complete transparency with regular bi-weekly updates.' },
      { q: 'Is my donation tax-deductible?', a: 'Yes, all donations are tax-deductible under Section 80G of the Income Tax Act. You will receive an automated receipt via email.' }
    ]
  },
  {
    id: 2,
    title: 'Safe Shelter Initiative',
    description: 'Building and maintaining safe, hygienic, and dignified living spaces for children and elders.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    raised: 1820000,
    goal: 3000000,
    category: 'Elder Care',
    donors: 310,
    beneficiaries: '120+',
    daysLeft: 60,
    status: 'Active',
    overview: {
      text: 'Having a secure roof overhead is a fundamental human right. The Safe Shelter Initiative works to construct, expand, and maintain community shelters that accommodate orphaned children and homeless elders. We focus on safe infrastructure, clean sanitation facilities, and warm bedding to create a loving, family-like environment.',
      checklist: [
        'Constructing additional dormitory units',
        'Installing clean sanitation and toilets',
        'Providing safe and regular drinking water',
        '24/7 security and residential wardens'
      ],
      stats: [
        { value: '120+', label: 'Residents Housed', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '5+', label: 'Shelters Built', icon: 'Home', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '30,000+', label: 'Nights of Shelter', icon: 'Clock', bg: 'bg-primary/10', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Home', pct: 50, title: 'Construction Material', desc: 'Bricks, steel, concrete, bedding, and secure roofs', accent: '#F59E0B' },
      { icon: 'Activity', pct: 25, title: 'Sanitation Utilities', desc: 'Modern toilets, water filters, and bathroom plumbing', accent: '#10B981' },
      { icon: 'Users', pct: 15, title: 'Staff & Caretakers', desc: 'Cooks, cleaners, security guards, and shelter managers', accent: '#3B82F6' },
      { icon: 'Book', pct: 10, title: 'Admin Oversight', desc: 'Legal and administrative costs of home registration', accent: '#EF4444' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 1, 2026', title: 'New Dormitory Wing Completed', desc: 'Successfully finalized construction of our third dormitory wing, accommodating 30 more elderly residents.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80' },
      { date: 'Mar 15, 2026', title: 'Groundbreaking for Sanitation Facility', desc: 'Begun layout and engineering of a modernized water filtration system and sanitation unit.', image: null }
    ],
    stories: [
      { name: 'Ramesh Lal', age: '72 years old', quote: 'I was wandering on the streets with nowhere to go. This home has given me a new family and dignity.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Housed in Elder Wing' }
    ],
    faqs: [
      { q: 'Who resides in these shelters?', a: 'Orphaned children and abandoned, homeless elderly persons who need support, safety, and care.' },
      { q: 'Can I visit the home?', a: 'Yes, we facilitate community visits on weekends. Please contact our shelter coordinator to register.' }
    ]
  },
  {
    id: 3,
    title: 'Health & Wellness Support',
    description: 'Organizing health camps, providing medical aid, and ensuring better healthcare access.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    raised: 875000,
    goal: 1500000,
    category: 'Healthcare',
    donors: 195,
    beneficiaries: '600+',
    daysLeft: 30,
    status: 'Active',
    overview: {
      text: 'Good health is the foundation of a bright life. In underserved rural villages, simple illnesses often lead to severe complications due to a lack of local clinics and medical awareness. Through this program, we hold weekly diagnosis camps, distribute free prescriptions, perform basic pediatric checkups, and sponsor surgeries for families living in extreme poverty.',
      checklist: [
        'Weekly mobile health camps',
        'Free prescription medicine distribution',
        'Specialist eye & dental checkups',
        'Fund for emergency surgical cases'
      ],
      stats: [
        { value: '600+', label: 'Patients Treated', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '2,500+', label: 'Meds Distributed', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '15+', label: 'Camps Conducted', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Activity', pct: 45, title: 'Medicine Supply', desc: 'Procuring high-quality prescription medicines, vaccines, and eye lenses', accent: '#10B981' },
      { icon: 'Users', pct: 30, title: 'Doctor Consultations', desc: 'Compensating visiting pediatricians, dentists, and eye surgeons', accent: '#3B82F6' },
      { icon: 'Home', pct: 15, title: 'Camp Logistics', desc: 'Renting tents, medical devices, and village transportation', accent: '#F59E0B' },
      { icon: 'Book', pct: 10, title: 'Awareness Material', desc: 'Brochures, nutrition charts, and wellness hygiene manuals', accent: '#EF4444' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 10, 2026', title: 'Eye Surgery Camp Success', desc: 'Completed 45 successful cataract surgeries for elderly villagers who have fully recovered their vision.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=300&q=80' },
      { date: 'Apr 12, 2026', title: 'Pediatric Checkup', desc: 'Covered 150+ kids in a single rural school, providing deworming kits and pediatric multi-vitamins.', image: null }
    ],
    stories: [
      { name: 'Saraswati Devi', age: '65 years old', quote: 'I could not see my grandchildren clearly for three years. The free eye surgery restored my sight. I am so grateful!', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80', impact: 'Successfully treated for Cataract' }
    ],
    faqs: [
      { q: 'How are medical camps structured?', a: 'We partner with qualified government and private hospitals to bring certified doctors to village locations.' },
      { q: 'How can I support beyond money?', a: 'Medical professionals and nursing students can volunteer to assist at our camps. Please sign up on our volunteer page.' }
    ]
  },
  {
    id: 4,
    title: 'Nutritious Meals for All',
    description: 'Distributing nutritious meals to children, elders, and families in need every day.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    raised: 960000,
    goal: 1800000,
    category: 'Community Welfare',
    donors: 420,
    beneficiaries: '2,000+',
    daysLeft: 25,
    status: 'Active',
    overview: {
      text: 'No one should sleep on an empty stomach. Malnutrition severely stunts child growth and leaves elders susceptible to preventable diseases. Our Nutritious Meals for All program runs community kitchens that distribute fresh, balanced, hot meals (consisting of lentils, rice, vegetables, and milk) to daily-wage laborer families, street children, and elders in marginalized communities.',
      checklist: [
        'Feeding 1,000+ individuals daily',
        'Sourcing fresh, local organic vegetables',
        'Special infant nutrition supplement kits',
        'High standards of kitchen hygiene and sanitization'
      ],
      stats: [
        { value: '2,000+', label: 'Daily Meals Served', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '75,000+', label: 'Total Plates Served', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '3+', label: 'Active Kitchens', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'ShoppingBag', pct: 60, title: 'Food Ingredients', desc: 'Bulk purchase of rice, grains, fresh vegetables, lentils, and cooking oil', accent: '#EF4444' },
      { icon: 'Home', pct: 20, title: 'Kitchen Utilities', desc: 'LPG gas, cooking utensils, storage freezers, and clean water supplies', accent: '#F59E0B' },
      { icon: 'Users', pct: 15, title: 'Kitchen Staff', desc: 'Compensation for professional cooks and local distribution staff', accent: '#3B82F6' },
      { icon: 'Activity', pct: 5, title: 'Distribution Fuel', desc: 'Transport fuel to carry cooked food containers to distant villages', accent: '#10B981' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 12, 2026', title: 'New Community Kitchen Launched', desc: 'Opened our third community kitchen serving daily nutritious breakfast and lunch to 300 additional children.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=300&q=80' },
      { date: 'Apr 2, 2026', title: 'Milestone: 50,000 Meals', desc: 'Celebrated serving our 50,000th fresh meal plate to the slum community residents.', image: null }
    ],
    stories: [
      { name: 'Karan Kumar', age: '8 years old', quote: 'I love coming to the kitchen. The food is warm and delicious, and they also give us fresh milk!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Received daily nutritional support' }
    ],
    faqs: [
      { q: 'How are raw materials sourced?', a: 'We source directly from local farmers, ensuring high quality and support for local rural businesses.' },
      { q: 'What is the cost per meal?', a: 'Due to bulk sourcing and volunteer chefs, a full healthy meal plate costs only ₹15.' }
    ]
  },
  {
    id: 5,
    title: 'Women Skill Development',
    description: 'Empowering women with tailoring, handicraft, and digital literacy skills.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80',
    raised: 450000,
    goal: 800000,
    category: 'Women Empowerment',
    donors: 140,
    beneficiaries: '200+',
    daysLeft: 90,
    status: 'Active',
    overview: {
      text: 'Empowering a woman empowers an entire family. In traditional rural structures, women are often financially dependent and have limited exposure to training. Our Skill Development centers provide certified vocational training in modern sewing, traditional block printing, organic candle making, and foundational computer skills, alongside small business training to foster entrepreneurship.',
      checklist: [
        'Certified 6-month tailoring program',
        'Organic soap & handicraft craft workshops',
        'Basic computers & digital bank skills',
        'Sourcing microloans and buyer contracts'
      ],
      stats: [
        { value: '200+', label: 'Women Trained', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '85%', label: 'Employment Rate', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '3+', label: 'Training Centers', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Home', pct: 40, title: 'Training Equipment', desc: 'Tailoring machines, fabric, needles, candles, and computers', accent: '#F59E0B' },
      { icon: 'Users', pct: 30, title: 'Expert Trainers', desc: 'Compensation for master tailors, artists, and IT literacy tutors', accent: '#3B82F6' },
      { icon: 'Book', pct: 20, title: 'Microfinance Kits', desc: 'Providing top graduates with their own sewing machine to start working', accent: '#EF4444' },
      { icon: 'Activity', pct: 10, title: 'Sales Coordination', desc: 'Participating in local craft markets and securing product buyers', accent: '#10B981' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 8, 2026', title: 'Sartorial Graduation Batch', desc: 'Proudly hosted graduation for 35 women who have completed modern tailoring training. 28 already have jobs.', image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=300&q=80' },
      { date: 'Mar 1, 2026', title: 'Computer Lab Upgraded', desc: 'Received 8 desktop computers to expand our digital literacy training module.', image: null }
    ],
    stories: [
      { name: 'Sunita Devi', age: '32 years old', quote: 'I used to struggle to make ends meet. Now I run my own micro tailoring shop from my house, earning ₹6,000 a month.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80', impact: 'Successfully established business' }
    ],
    faqs: [
      { q: 'Do you charge the women for classes?', a: 'No. All vocational training classes are completely free of cost for selected underprivileged candidates.' },
      { q: 'What happens after they graduate?', a: 'We link graduates with micro-enterprise organizations or assist in purchasing machinery through seed grants.' }
    ]
  },
  {
    id: 6,
    title: 'Clean Water for Villages',
    description: 'Installing water purifiers and building wells in water-scarce rural communities.',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80',
    raised: 680000,
    goal: 1200000,
    category: 'Community Welfare',
    donors: 165,
    beneficiaries: '500+',
    daysLeft: 55,
    status: 'Active',
    overview: {
      text: 'Water is the source of life, but polluted water is the source of disease. Many rural villages are plagued by fluorosis and water-borne pathogens due to reliance on shallow, contaminated ponds. This initiative constructs deep-bore tube wells, sets up solar-powered RO water filtration plants, and educates village committees on maintaining sustainable sanitization pipelines.',
      checklist: [
        'Installing solar-powered water purifiers',
        'Digging deep-bore wells in remote zones',
        'Regular laboratory testing of water quality',
        'Organizing village water management groups'
      ],
      stats: [
        { value: '500+', label: 'Families Supplied', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '8+', label: 'RO Plants Set Up', icon: 'Home', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '3,00,000L', label: 'Clean Water Daily', icon: 'Clock', bg: 'bg-primary/10', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Home', pct: 55, title: 'RO & Borewell Machinery', desc: 'Solar modules, RO membrane filters, submersible pumps, and iron pipes', accent: '#3B82F6' },
      { icon: 'Activity', pct: 25, title: 'Engineering & Labor', desc: 'Geological survey, deep drilling rigs, and brick and masonry platforms', accent: '#10B981' },
      { icon: 'Users', pct: 15, title: 'Water Committee Training', desc: 'Equipping villagers to perform minor maintenance and water distribution', accent: '#F59E0B' },
      { icon: 'Book', pct: 5, title: 'Hygiene Pamphlets', desc: 'Spreading handwashing awareness and sanitary waste booklets', accent: '#EF4444' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 3, 2026', title: 'Solar RO Plant Online', desc: 'Successfully powered up our latest RO filtration center supplying safe arsenic-free water to 120 families.', image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=300&q=80' },
      { date: 'Mar 20, 2026', title: 'Borewell Drilling Finished', desc: 'Drilled 200 feet deep to hit stable, pristine water tables in a drought-prone cluster.', image: null }
    ],
    stories: [
      { name: 'Dinesh Prasad', age: '45 years old', quote: 'Our children used to fall sick with diarrhea every summer. Now that we have the RO plant water, our family is healthy.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Protected from waterborne disease' }
    ],
    faqs: [
      { q: 'Is the RO water free for villagers?', a: 'Yes, a basic daily quota is completely free. Village committees collect a very nominal sum for commercial usage to fund future maintenance.' },
      { q: 'How long does it take to build a borewell?', a: 'A standard borewell takes about 5 to 7 days including drilling, cementing, and water chemical validation.' }
    ]
  },
  {
    id: 7,
    title: 'Inclusive Education Center',
    description: 'Creating equal learning opportunities for children with disabilities.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    raised: 320000,
    goal: 1000000,
    category: 'Disability Support',
    donors: 85,
    beneficiaries: '80+',
    daysLeft: 120,
    status: 'Upcoming',
    overview: {
      text: 'Every mind is uniquely brilliant. Children with special needs or motor disabilities are unfortunately kept out of standard village schools due to severe architectural barriers and a lack of trained special educators. This center will feature wheelchair-accessible ramps, specialized braille books, sensory play equipment, and highly trained therapy staff to make inclusive, supportive schooling a reality.',
      checklist: [
        'Constructing a sensory-designed school block',
        'Recruiting certified special education trainers',
        'Buying hearing aids, tablets & braille books',
        'Organizing custom physical therapy modules'
      ],
      stats: [
        { value: '80+', label: 'Children Enrolled', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '150+', label: 'Special Braille Books', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '100%', label: 'Accessible Design', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Home', pct: 40, title: 'Sensory School Infrastructure', desc: 'Ramps, textured flooring, supportive handrails, and customized desks', accent: '#F59E0B' },
      { icon: 'Users', pct: 30, title: 'Specialist Staff', desc: 'Hiring certified speech pathologists, special educators, and helpers', accent: '#3B82F6' },
      { icon: 'Book', pct: 20, title: 'Adaptive Learning Gear', desc: 'Tactile learning blocks, speaking tablets, and audiobooks', accent: '#EF4444' },
      { icon: 'Activity', pct: 10, title: 'Therapeutic Aids', desc: 'Wheelchairs, walking braces, and muscular therapy boards', accent: '#10B981' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'May 1, 2026', title: 'Architectural Blueprint Finalized', desc: 'Successfully got government layout clearance for building our barrier-free school infrastructure.', image: null },
      { date: 'Apr 10, 2026', title: 'First Special Educator Recruited', desc: 'Welcome Mrs. Ananya Sen, a gold medalist in child special education, as our program director.', image: null }
    ],
    stories: [
      { name: 'Kunal Sen', age: '10 years old', quote: 'I want to write stories one day. The audio tools and tactile boards make me feel like school is finally possible.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Preparing for early enrollment' }
    ],
    faqs: [
      { q: 'When will classes officially start?', a: 'We aim to complete classroom remodeling by next month and begin formal sessions shortly after.' },
      { q: 'Is there support for children with speech delays?', a: 'Yes, our therapy wing will provide custom speech training twice a week.' }
    ]
  },
  {
    id: 8,
    title: 'Rural Healthcare Camp',
    description: 'Providing free medical checkups and medicines to remote rural communities.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
    raised: 1500000,
    goal: 1500000,
    category: 'Healthcare',
    donors: 320,
    beneficiaries: '1000+',
    daysLeft: 0,
    status: 'Completed',
    overview: {
      text: 'This completed campaign achieved outstanding success. Our Rural Healthcare Camp distributed lifesaving medical support, dental consultation, hygiene diagnostics, and free corrective eyewear to remote villages in Chhattisgarh. With your overwhelming support, we surpassed our goals and set up a semi-permanent health station that continues to serve residents.',
      checklist: [
        '1,200+ generic checkups successfully completed',
        '300+ free custom glasses distributed to elderly patients',
        '25 children referred for subsidized major hospital procedures',
        'Establishment of a localized first-aid response cabin'
      ],
      stats: [
        { value: '1,000+', label: 'Patients Assisted', icon: 'Users', bg: 'bg-primary/10', color: 'text-primary' },
        { value: '100%', label: 'Goal Reached', icon: 'BookOpen', bg: 'bg-gold/10', color: 'text-gold' },
        { value: '4+', label: 'Villages Covered', icon: 'Home', bg: 'bg-sage/30', color: 'text-primary' }
      ]
    },
    impactBreakdown: [
      { icon: 'Activity', pct: 50, title: 'Specialist Equipment', desc: 'Eye testing machines, diagnostic laptops, and emergency medical kits', accent: '#10B981' },
      { icon: 'Users', pct: 30, title: 'Medical Salaries', desc: 'Remunerating visiting medical staff and support counselors', accent: '#3B82F6' },
      { icon: 'Home', pct: 15, title: 'Setup Materials', desc: 'Temporary health tents, medical partitions, and water facilities', accent: '#F59E0B' },
      { icon: 'Book', pct: 5, title: 'Reporting', desc: 'Consiling patient health records and regional reports', accent: '#EF4444' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80'
    ],
    updates: [
      { date: 'Apr 20, 2026', title: 'Health Cabin Finalized', desc: 'Installed the localized health cabin structure loaded with core medicines and emergency supplies.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=300&q=80' },
      { date: 'Mar 15, 2026', title: 'Final Camp Day Highlights', desc: 'Successfully registered our 1000th patient checkup. Outstanding results achieved by our team.', image: null }
    ],
    stories: [
      { name: 'Babulal Yadav', age: '58 years old', quote: 'I was unable to work due to chronic arthritis. The doctor at the camp gave me proper orthography supports and medical guidance.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', impact: 'Mobility restored with care support' }
    ],
    faqs: [
      { q: 'Is this healthcare program still active?', a: 'The primary camp campaign has successfully completed, but the localized cabin continues to distribute basic first-aid.' },
      { q: 'Can I check past health reports?', a: 'Yes, a summary of health conditions diagnosed during the camps is archived on our annual reports page.' }
    ]
  }
];

export const getCampaignById = (id) => {
  const numericId = parseInt(id, 10);
  return campaigns.find((c) => c.id === numericId) || null;
};
