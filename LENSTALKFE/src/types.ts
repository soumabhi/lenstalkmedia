export interface HeroSlide {
  id?: string;
  title: string;
  subtitle: string;
  category?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  published?: boolean;
}

export interface GalleryItem {
  id?: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  order: number;
  published: boolean;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: any;
  published: boolean;
}

export interface ClientLogo {
  id?: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
  published?: boolean;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
  published?: boolean;
  order: number;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  published?: boolean;
  order: number;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: any;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  published?: boolean;
}

export interface BusinessPillar {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  published?: boolean;
}

export interface ProcessStep {
  id?: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  published?: boolean;
}

export interface CompanyStats {
  id?: string;
  value: string;
  suffix: string;
  label: string;
  published?: boolean;
  order: number;
}

export interface Campaign {
  id?: string;
  title: string;
  slug: string;
  clientName: string;
  description: string;
  category: 'Social Media Campaigns' | 'Video Ads' | 'Documentary' | 'Influencer';
  feedImages: string[];
  reelUrls: string[];
  staticPosts: string[];
  thumbnailUrl: string;
  order: number;
  published: boolean;
}

export interface ReelItem {
  id?: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  order: number;
  published: boolean;
}
