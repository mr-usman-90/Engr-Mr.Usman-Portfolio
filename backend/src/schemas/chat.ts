import { z } from 'zod';

export const chatMessageSchema = z.object({
	role: z.enum(['user', 'assistant']),
	content: z.string().min(1).max(4000)
});

export const chatRequestSchema = z.object({
	message: z.string().trim().min(1).max(2000),
	history: z.array(chatMessageSchema).max(24).optional().default([])
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
