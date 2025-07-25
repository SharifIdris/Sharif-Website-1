import { createClient, type ContentfulClientApi, type Entry } from "contentful";
import type { BlogPost } from "@/content/blog-posts";
import type { ServiceCategory, ServiceIcon } from "@/content/services";
import type { Skill, SkillCategory, SkillIcon } from "@/content/skills";
import type { Project, ProjectCategory, ProjectIcon } from "@/content/projects";
import type { Certification, CertificationIcon } from "@/content/certifications";
import type { Testimonial } from "@/content/testimonials";
import type { HeroData } from "@/content/hero";
import * as LucideIcons from "lucide-react";
import React from 'react';

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
    return [];
}

const getIcon = (iconName: string, iconMap: Record<string, React.ElementType>): React.ReactNode => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || iconMap['default'];
    return <IconComponent className="h-16 w-16 text-primary drop-shadow-glow-primary" />;
};

const getAssetUrl = (asset: any, defaultUrl: string): string => {
    if (asset && 'fields' in asset && asset.fields.file) {
        return 'https:' + asset.fields.file.url;
    }
    return defaultUrl;
};

// Mappers for icons
const serviceIconMap: Record<ServiceIcon, React.ElementType> = {
    Briefcase: LucideIcons.Briefcase,
    Bot: LucideIcons.Bot,
    Code: LucideIcons.Code,
    BarChart3: LucideIcons.BarChart3,
    ShieldCheck: LucideIcons.ShieldCheck,
    default: LucideIcons.Briefcase,
};

const skillIconMap: Record<SkillIcon, React.ElementType> = {
    Briefcase: LucideIcons.Briefcase,
    Bot: LucideIcons.Bot,
    BarChart3: LucideIcons.BarChart3,
    ShieldCheck: LucideIcons.ShieldCheck,
    default: LucideIcons.Briefcase,
};

const projectIconMap: Record<ProjectIcon, React.ElementType> = {
    Bot: LucideIcons.Bot,
    Briefcase: LucideIcons.Briefcase,
    ShieldCheck: LucideIcons.ShieldCheck,
    BarChart3: LucideIcons.BarChart3,
    default: LucideIcons.Bot,
};

const certificationIconMap: Record<CertificationIcon, React.ElementType> = {
    ShieldCheck: LucideIcons.ShieldCheck,
    Award: LucideIcons.Award,
    DatabaseZap: LucideIcons.DatabaseZap,
    default: LucideIcons.Award,
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
        return entries.items.map(item => ({
            title: item.fields.title as string || '',
            excerpt: item.fields.excerpt as string || '',
            tags: (item.fields.tags as string[]) || [],
            imageUrl: getAssetUrl(item.fields.image, 'https://placehold.co/600x400.png'),
            imageHint: "blog post",
        }));
    } catch (error) {
        return handleFetchError(error, 'blog posts');
    }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'serviceCategory' });
        return entries.items.map(item => ({
            title: item.fields.title as string || '',
            subtitle: item.fields.subtitle as string || '',
            items: (item.fields.items as string[]) || [],
            icon: getIcon(item.fields.icon as string, serviceIconMap),
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
        return entries.items.map(item => ({
            title: item.fields.title as string || '',
            icon: getIcon(item.fields.icon as string, skillIconMap),
            skills: (item.fields.skills as Entry<Skill>[])?.map(skillEntry => ({
                name: skillEntry.fields.name || '',
                level: skillEntry.fields.level || 0,
            })) || [],
        }));
    } catch (error) {
        return handleFetchError(error, 'skill categories');
    }
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'projectCategory', include: 2 });
        return entries.items.map(item => ({
            name: item.fields.name as string || '',
            icon: getIcon(item.fields.icon as string, projectIconMap),
            projects: (item.fields.projects as Entry<Project>[])?.map(projectEntry => ({
                title: projectEntry.fields.title || '',
                description: projectEntry.fields.description || '',
                techStack: projectEntry.fields.techStack || [],
                liveUrl: projectEntry.fields.liveUrl || '#',
                githubUrl: projectEntry.fields.githubUrl || '#',
                imageUrl: getAssetUrl(projectEntry.fields.image, 'https://placehold.co/600x400.png'),
                imageHint: (projectEntry.fields.title as string || 'project').toLowerCase().split(' ').slice(0,2).join(' '),
            })) || [],
        }));
    } catch (error) {
        return handleFetchError(error, 'project categories');
    }
}

export async function getCertifications(): Promise<Certification[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'certification' });
        return entries.items.map(item => ({
            issuer: item.fields.issuer as string || '',
            name: item.fields.name as string || '',
            description: item.fields.description as string || '',
            icon: getIcon(item.fields.icon as string, certificationIconMap),
        }));
    } catch (error) {
        return handleFetchError(error, 'certifications');
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const client = getContentfulClient();
    if (!client) return [];
    try {
        const entries = await client.getEntries({ content_type: 'testimonial' });
        return entries.items.map(item => ({
            name: item.fields.name as string || '',
            title: item.fields.title as string || '',
            quote: item.fields.quote as string || '',
            avatarUrl: getAssetUrl(item.fields.avatar, 'https://placehold.co/100x100.png'),
            avatarHint: (item.fields.name as string || '').split(' ')[0].toLowerCase() + " portrait",
        }));
    } catch (error) {
        return handleFetchError(error, 'testimonials');
    }
}