import { createClient, type ContentfulClientApi, type Entry } from "contentful";
import type { BlogPost } from "@/content/blog-posts";
import type { ServiceCategory } from "@/content/services";
import type { SkillCategory } from "@/content/skills";
import type { ProjectCategory } from "@/content/projects";
import type { Certification } from "@/content/certifications";
import type { Testimonial } from "@/content/testimonials";

let client: ContentfulClientApi<any> | null = null;

function getContentfulClient() {
  if (!client) {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
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

export async function getBlogPosts(): Promise<BlogPost[]> {
    const client = getContentfulClient();
    if (!client) {
        console.warn("Contentful credentials not set. Returning empty array for blog posts.");
        return [];
    }
    try {
        const entries = await client.getEntries({ content_type: 'blogPost', order: ['-fields.date'] });
        return entries.items.map(item => ({
            title: item.fields.title as string || '',
            excerpt: item.fields.excerpt as string || '',
            tags: (item.fields.tags as string[]) || [],
            imageUrl: item.fields.imageUrl && 'fields' in (item.fields.imageUrl as any) ? 'https:' + (item.fields.imageUrl as any).fields.file.url : 'https://placehold.co/600x400.png',
            imageHint: "blog post image",
        }));
    } catch (error) {
        return handleFetchError(error, 'blog posts');
    }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
    // This is a placeholder as the component is client-side rendered with static data
    // If you move this data to Contentful, implement the fetch logic here.
    return [];
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
    // This is a placeholder as the component is client-side rendered with static data
    // If you move this data to Contentful, implement the fetch logic here.
    return [];
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
    // This is a placeholder as the component is client-side rendered with static data
    // If you move this data to Contentful, implement the fetch logic here.
    return [];
}

export async function getCertifications(): Promise<Certification[]> {
     // This is a placeholder as the component is client-side rendered with static data
    // If you move this data to Contentful, implement the fetch logic here.
    return [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const client = getContentfulClient();
    if (!client) {
        console.warn("Contentful credentials not set. Returning empty array for testimonials.");
        return [];
    }
    try {
        const entries = await client.getEntries({ content_type: 'testimonial' });
        return entries.items.map(item => ({
            name: item.fields.name as string || '',
            title: item.fields.title as string || '',
            quote: item.fields.quote as string || '',
            avatarUrl: item.fields.avatar && 'fields' in (item.fields.avatar as any) ? 'https:' + (item.fields.avatar as any).fields.file.url : 'https://placehold.co/100x100.png',
            avatarHint: (item.fields.name as string || '').split(' ')[0].toLowerCase() + " portrait",
        }));
    } catch (error) {
        return handleFetchError(error, 'testimonials');
    }
}