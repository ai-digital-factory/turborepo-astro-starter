import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    createdDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
