import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

import { connectDB } from './config/db.js';

import Admin from './models/Admin.js';
import HeroSlide from './models/HeroSlide.js';
import GalleryItem from './models/GalleryItem.js';
import Service from './models/Service.js';
import BusinessPillar from './models/BusinessPillar.js';
import ProcessStep from './models/ProcessStep.js';
import CompanyStat from './models/CompanyStat.js';
import Campaign from './models/Campaign.js';
import BlogPost from './models/BlogPost.js';
import ClientLogo from './models/ClientLogo.js';
import Testimonial from './models/Testimonial.js';
import TeamMember from './models/TeamMember.js';

// MOCK DATA FROM FRONTEND
const MOCK_HERO_SLIDES = [
  { title: 'Creative Strategy Meets Production Excellence', subtitle: "Bhubaneswar's premier agency for brands that want to lead.", imageUrl: '/images/hero-bg.png', ctaText: 'View Our Work', ctaLink: '/portfolio', order: 1, published: true },
  { title: "Odisha's Largest Creator Network", subtitle: 'Powered by OIN – Odisha Influencers Network. Reach millions locally.', imageUrl: '/images/hero-bg.png', ctaText: 'Explore OIN', ctaLink: '/services', order: 2, published: true },
  { title: 'End-to-End Creative & Marketing Solutions', subtitle: 'Strategy + Production + Creators + Distribution — under one roof.', imageUrl: '/images/hero-bg.png', ctaText: 'Our Services', ctaLink: '/services', order: 3, published: true }
];

const MOCK_SERVICES = [
  { title: 'Video Production', description: 'High-quality commercials, corporate videos, and documentaries.', icon: 'Video', order: 1, published: true },
  { title: 'Social Media Management', description: 'Strategic content creation and community building.', icon: 'Share2', order: 2, published: true },
  { title: 'Influencer Marketing', description: 'Partner with top local creators through OIN.', icon: 'Users', order: 3, published: true },
  { title: 'Brand Identity', description: 'Logo design, brand guidelines, and visual storytelling.', icon: 'PenTool', order: 4, published: true }
];

const MOCK_CAMPAIGNS = [
  { title: 'NIF Global Bhubaneswar', slug: 'nif-global', clientName: 'NIF Global', description: 'Handled complete social media promotions for NIF Global Event.', category: 'Social Media Campaigns', thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', order: 1, published: true },
  { title: 'DAV United', slug: 'dav-united', clientName: 'DAV United', description: 'Executed complete social media promotions for DAV United.', category: 'Social Media Campaigns', thumbnailUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800', order: 2, published: true }
];

const MOCK_CLIENT_LOGOS = [
  { name: 'NIF Global', logoUrl: 'https://picsum.photos/seed/nif/200/100', order: 1, published: true },
  { name: 'DAV United', logoUrl: 'https://picsum.photos/seed/dav/200/100', order: 2, published: true }
];

const MOCK_TEAM = [
  { name: 'Sourav Panda', role: 'Founder & CEO', bio: 'Visionary leader driving creative excellence.', photoUrl: 'https://i.pravatar.cc/300?u=sourav', socials: { linkedin: '#', instagram: '#' }, order: 1, published: true },
  { name: 'Creative Mind', role: 'Creative Director', bio: 'Creative genius behind every campaign.', photoUrl: 'https://i.pravatar.cc/300?u=creative', socials: { linkedin: '#', instagram: '#' }, order: 2, published: true },
  { name: 'Production Lead', role: 'Head of Production', bio: 'Production expert ensuring cinematic quality.', photoUrl: 'https://i.pravatar.cc/300?u=prod', socials: { linkedin: '#', instagram: '#' }, order: 3, published: true },
  { name: 'Strategy Expert', role: 'Marketing Strategist', bio: 'Strategy master crafting growth plans.', photoUrl: 'https://i.pravatar.cc/300?u=strat', socials: { linkedin: '#', instagram: '#' }, order: 4, published: true }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');

    // 1. Create Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lenstalkmedia.com';
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      await Admin.create({
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        name: 'Super Admin',
        role: 'superadmin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // 2. Clear existing public data and seed new
    console.log('🗑️ Clearing existing collections...');
    await HeroSlide.deleteMany();
    await Service.deleteMany();
    await Campaign.deleteMany();
    await ClientLogo.deleteMany();
    await TeamMember.deleteMany();

    console.log('📥 Inserting mock data...');
    if (MOCK_HERO_SLIDES.length > 0) await HeroSlide.insertMany(MOCK_HERO_SLIDES);
    if (MOCK_SERVICES.length > 0) await Service.insertMany(MOCK_SERVICES);
    if (MOCK_CAMPAIGNS.length > 0) await Campaign.insertMany(MOCK_CAMPAIGNS);
    if (MOCK_CLIENT_LOGOS.length > 0) await ClientLogo.insertMany(MOCK_CLIENT_LOGOS);
    if (MOCK_TEAM.length > 0) await TeamMember.insertMany(MOCK_TEAM);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
