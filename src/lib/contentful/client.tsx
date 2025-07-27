
import { createClient, type ContentfulClientApi, type Entry } from "contentful";
import type { BlogPost } from "@/content/blog-posts";
import type { ServiceCategory } from "@/content/services";
import type { SkillCategory } from "@/content/skills";
import type { ProjectCategory, Project } from "@/content/projects";
import type { Certification } from "@/content/certifications";
import type { Testimonial } from "@/content/testimonials";
import type { HeroData } from "@/content/hero";
import * as LucideIcons from "lucide-react";
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Mappers for icons - to be defined based on actual string values from Contentful
const iconMap: { [key: string]: React.ElementType } = {
    Briefcase: LucideIcons.Briefcase,
    Bot: LucideIcons.Bot,
    Code: LucideIcons.Code,
    BarChart3: LucideIcons.BarChart3,
    ShieldCheck: LucideIcons.ShieldCheck,
    Award: LucideIcons.Award,
    DatabaseZap: LucideIcons.DatabaseZap,
    LayoutDashboard: LucideIcons.LayoutDashboard,
    Cpu: LucideIcons.Cpu,
    default: LucideIcons.Briefcase, // Fallback icon
};


let client: ContentfulClientApi<any> | null = null;

function getContentfulClient() {
  if (!client) {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
        console.warn("Contentful credentials not set. Using fallback data or returning empty arrays.");
        return null;
    }
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }
  return client;
}

const handleFetchError = (error: any, contentType: string): [] => {
    console.error(`Error fetching ${contentType} from Contentful:`, error);
    // In a real app, you might want to log this to a service like Sentry
    return [];
}

const getIcon = (iconName: string | undefined): React.ReactNode => {
    const IconComponent = iconName ? iconMap[iconName] || iconMap['default'] : iconMap['default'];
    // Adjusting icon styling to match existing components
    if (['Award', 'ShieldCheck', 'DatabaseZap'].includes(iconName || '')) {
         return <IconComponent className="h-12 w-12 text-primary drop-shadow-glow-primary" />;
    }
     if (['Briefcase', 'Bot', 'BarChart3', 'LayoutDashboard', 'Cpu'].includes(iconName || '')) {
         return <IconComponent className="h-8 w-8 text-accent" />;
    }
    // Default styling for service icons
    return <IconComponent className="h-16 w-16 text-primary drop-shadow-glow-primary" />;
};


const getAssetUrl = (asset: any, defaultUrl: string): string => {
    if (asset && asset.fields && asset.fields.file && asset.fields.file.url) {
        return 'https:' + asset.fields.file.url;
    }
    return defaultUrl;
};

// --- Data Fetching Functions ---

export async function getHeroData(): Promise<HeroData | null> {
    const client = getContentfulClient();
    if (!client) return { imageUrl: 'https://placehold.co/400x500.png', imageHint: 'professional portrait' };
    try {
        const entries = await client.getEntries({ content_type: 'heroSection', limit: 1 });
        if (entries.items.length === 0) return { imageUrl: 'https://placehold.co/400x500.png', imageHint: 'professional portrait' };
        
        const heroEntry = entries.items[0];
        return {
            imageUrl: getAssetUrl(heroEntry.fields.professionalImage, 'https://placehold.co/400x500.png'),
            imageHint: 'professional portrait',
        };
    } catch (error) {
        console.error(`Error fetching hero data from Contentful:`, error);
        return { imageUrl: 'https://placehold.co/400x500.png', imageHint: 'professional portrait' };
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'blogPost', order: ['-fields.date'] });
        return entries.items.map((item: any) => ({
            title: item.fields.title || '',
            excerpt: item.fields.excerpt || '',
            tags: item.fields.tags || [],
            imageUrl: getAssetUrl(item.fields.image, 'https://placehold.co/600x400.png'),
            imageHint: (item.fields.title || "blog post").toLowerCase().split(' ').slice(0,2).join(' '),
            content: item.fields.content || null,
        }));
    } catch (error) {
        return handleFetchError(error, 'blog posts');
    }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'service' });
        return entries.items.map((item: any) => ({
            title: item.fields.title || '',
            subtitle: item.fields.subtitle || '',
            items: item.fields.items || [],
            icon: getIcon(item.fields.icon),
        }));
    } catch (error) {
        return handleFetchError(error, 'service categories');
    }
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'skillCategory', include: 1 });
        return entries.items.map((item: any) => ({
            title: item.fields.title || '',
            icon: getIcon(item.fields.icon),
            skills: (item.fields.skills || []).map((skillEntry: any) => ({
                name: skillEntry.fields.name || '',
                level: skillEntry.fields.level || 0,
            })),
        }));
    } catch (error) {
        return handleFetchError(error, 'skill categories');
    }
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'projectCategory', include: 2, order: ['fields.name'] });
        return entries.items.map((item: any) => ({
            name: item.fields.name || '',
            icon: getIcon(item.fields.icon),
            projects: (item.fields.projects || []).map((projectEntry: any): Project => ({
                title: projectEntry.fields.title || '',
                description: projectEntry.fields.description || null,
                techStack: projectEntry.fields.techStack || [],
                liveUrl: projectEntry.fields.liveUrl || '#',
                githubUrl: projectEntry.fields.githubUrl || '#',
                imageUrl: getAssetUrl(projectEntry.fields.image, 'https://placehold.co/600x400.png'),
                imageHint: (projectEntry.fields.title || 'project').toLowerCase().split(' ').slice(0,2).join(' '),
            })),
        }));
    } catch (error) {
        return handleFetchError(error, 'project categories');
    }
}

export async function getCertifications(): Promise<Certification[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'certificationEntry', order: ['fields.name'] });
        return entries.items.map((item: any) => ({
            issuer: item.fields.issuer || '',
            name: item.fields.name || '',
            description: item.fields.description || '',
            icon: getIcon(item.fields.icon),
            imageUrl: getAssetUrl(item.fields.image, 'https://placehold.co/300x300.png'),
            imageHint: (item.fields.name || 'certification').toLowerCase().split(' ').slice(0,2).join(' '),
        }));
    } catch (error) {
        return handleFetchError(error, 'certifications');
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'testimonialEntry' });
        return entries.items.map((item: any) => ({
            name: item.fields.name as string || '',
            title: item.fields.title as string || '',
            quote: item.fields.quote || null,
            avatarUrl: getAssetUrl(item.fields.avatar, 'https://placehold.co/100x100.png'),
            avatarHint: (item.fields.name as string || '').split(' ')[0].toLowerCase() + " portrait",
        }));
    } catch (error) {
        return handleFetchError(error, 'testimonials');
    }
}
