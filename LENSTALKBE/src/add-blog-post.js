import mongoose from 'mongoose';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import BlogPost from './models/BlogPost.js';

const BLOG_POSTS = [
  {
    title: 'The Art of Brand Storytelling: Why Emotion Trumps Data',
    slug: 'art-of-brand-storytelling',
    excerpt: 'How the world\'s most successful brands use emotional narratives to build lifelong customer loyalty and brand equity.',
    content: `
# The Art of Brand Storytelling

In an era where consumers are bombarded with thousands of marketing messages every day, the ability to tell a compelling story has become a brand's most valuable asset. Data might inform your strategy, but emotion is what drives action.

## Why Emotion Matters
Humans are hardwired for stories. We don't just buy products; we buy into the "why" behind the brand. When a brand connects with its audience on a human level, it transcends the transactional and becomes a part of the consumer's identity.

## The Narrative Arc
Every great brand story needs a hero (the customer), a challenge (the problem), and a guide (your brand). By positioning your customer as the hero of the story, you create an immediate sense of relevance and urgency.

## Conclusion
Data can prove your point, but a story will win the heart. As you craft your next campaign, ask yourself: what is the emotional truth we are trying to convey?
    `,
    featuredImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1400',
    author: 'Lenstalk Strategy',
    category: 'Strategy',
    published: true,
    publishedAt: new Date()
  },
  {
    title: 'Influencer Marketing: Beyond the Follower Count',
    slug: 'influencer-marketing-2024',
    excerpt: 'Shifting the focus from vanity metrics to authentic engagement and long-term creator partnerships in the regional market.',
    content: `
# Influencer Marketing in 2024

The landscape of influencer marketing is shifting. The days of simply buying a post for its reach are over. Today, brands are looking for authenticity, resonance, and real-world impact.

## The Rise of Micro-Influencers
In regional markets like Odisha, micro-influencers often command far higher engagement rates and trust than their celebrity counterparts. Their followers aren't just numbers; they are communities.

## Authentic Partnerships
The most successful campaigns are those where the creator has genuine creative freedom. When a brand trusts the influencer to speak in their own voice, the message feels natural rather than forced.

## Measuring Success
Move beyond likes and comments. Look at sentiment, brand recall, and conversion. Influencer marketing should be a strategic pillar of your growth, not just a line item in your budget.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1400',
    author: 'OIN Team',
    category: 'Influencer',
    published: true,
    publishedAt: new Date()
  },
  {
    title: 'Cinematography: The Visual Language of Luxury',
    slug: 'cinematography-visual-language',
    excerpt: 'Exploring how light, composition, and color grading can transform a simple product video into a cinematic brand experience.',
    content: `
# Cinematography: Capturing Emotion

At Lenstalk Media, we believe that every frame should tell a story. Cinematography is not just about having the best camera; it's about how you use light and shadow to evoke a specific feeling.

## The Power of Composition
How you frame a subject tells the viewer how to feel about it. A low angle can convey power and luxury, while soft, natural lighting can create a sense of approachability and trust.

## Color Grading as a Narrative Tool
Color is one of the most powerful ways to influence mood. Warm tones can evoke nostalgia and comfort, while cool, high-contrast grades can feel modern and high-tech.

## The Lenstalk Approach
We combine technical precision with creative intuition. Our production team works closely with our strategists to ensure that every visual choice serves the brand's ultimate goal.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1400',
    author: 'Production Desk',
    category: 'Creative',
    published: true,
    publishedAt: new Date()
  }
];

const addPosts = async () => {
  try {
    await connectDB();
    console.log('🚀 Connecting to database...');

    for (const post of BLOG_POSTS) {
      const exists = await BlogPost.findOne({ slug: post.slug });
      if (!exists) {
        await BlogPost.create(post);
        console.log(`✅ Added: ${post.title}`);
      } else {
        console.log(`ℹ️ Already exists: ${post.title}`);
      }
    }

    console.log('🎉 All posts added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding posts:', error);
    process.exit(1);
  }
};

addPosts();
