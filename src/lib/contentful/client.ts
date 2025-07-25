import { createClient, type ContentfulClientApi } from "contentful";

let client: ContentfulClientApi<any> | null = null;

export function getContentfulClient() {
  if (!client) {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials are not defined in environment variables.");
    }
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }
  return client;
}

export async function getBlogPosts() {
    const client = getContentfulClient();
    try {
        const entries = await client.getEntries({ content_type: 'blogPost' });
        
        // Basic mapping, assuming fields exist.
        // A more robust solution would involve validation (e.g., with Zod).
        return entries.items.map(item => ({
            title: item.fields.title as string,
            excerpt: item.fields.excerpt as string,
            tags: (item.fields.tags as string[]) || [],
            // Assuming imageUrl is a linked asset
            imageUrl: item.fields.imageUrl && 'fields' in item.fields.imageUrl ? 'https:' + (item.fields.imageUrl as any).fields.file.url : 'https://placehold.co/600x400.png',
            imageHint: "blog post image",
        }));
    } catch (error) {
        console.error("Error fetching blog posts from Contentful:", error);
        return []; // Return empty array on error
    }
}
