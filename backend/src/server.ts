import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { ZodError } from 'zod';
import { contactSchema } from './schemas/contact.js';
import { chatRequestSchema } from './schemas/chat.js';
import { generateChatReply } from './lib/chatAgent.js';

const app = Fastify({
	logger: true
});

await app.register(helmet);
await app.register(cors, {
	origin: true,
	methods: ['GET', 'POST', 'OPTIONS']
});

app.get('/health', async () => ({
	ok: true,
	service: 'portfolio-api',
	timestamp: new Date().toISOString()
}));

app.post('/api/contact', async (request, reply) => {
	try {
		const body = contactSchema.parse(request.body);
		const { prisma } = await import('./lib/prisma.js');

		const saved = await prisma.contactMessage.create({
			data: body
		});

		return reply.code(201).send({
			success: true,
			id: saved.id
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return reply.code(400).send({
				success: false,
				errors: error.flatten()
			});
		}

		request.log.error(error);
		return reply.code(500).send({
			success: false,
			message: 'Unable to save message. Ensure PostgreSQL is running and migrations are applied.'
		});
	}
});

app.post('/api/chat', async (request, reply) => {
	try {
		const body = chatRequestSchema.parse(request.body);
		const { reply: content, provider } = await generateChatReply(body);

		return reply.send({
			success: true,
			reply: content,
			provider
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return reply.code(400).send({
				success: false,
				errors: error.flatten()
			});
		}

		request.log.error(error);
		return reply.code(500).send({
			success: false,
			message: 'Unable to generate a reply right now. Please try again.'
		});
	}
});

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '0.0.0.0';

try {
	await app.listen({ port, host });
} catch (error) {
	app.log.error(error);
	process.exit(1);
}
