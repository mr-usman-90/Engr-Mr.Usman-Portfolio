<script lang="ts">
	import { tick } from 'svelte';
	import { ArrowUp } from '@lucide/svelte';
	import { askAgent, type ChatHistoryItem } from '$lib/chat/agent';

	type Message = {
		id: string;
		role: 'user' | 'assistant';
		content: string;
		typing?: boolean;
	};

	const suggestions = [
		'What tools do you use?',
		'Tell me about your certifications',
		"What's your tech stack?",
		'What are your top projects?',
		'How can I contact you?'
	] as const;

	let messages = $state<Message[]>([]);
	let draft = $state('');
	let sending = $state(false);
	/** WhatsApp-style "agent is typing…" 3-dot indicator */
	let agentTyping = $state(false);
	let listEl: HTMLElement | undefined = $state();
	let inputEl: HTMLTextAreaElement | undefined = $state();
	let typeTimer: ReturnType<typeof setTimeout> | undefined;

	const started = $derived(messages.length > 0 || agentTyping);

	function uid() {
		return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	}

	function wait(ms: number) {
		return new Promise<void>((resolve) => setTimeout(resolve, ms));
	}

	async function scrollToBottom() {
		await tick();
		if (listEl) listEl.scrollTop = listEl.scrollHeight;
	}

	function typeReply(id: string, full: string): Promise<void> {
		return new Promise((resolve) => {
			if (typeTimer) clearTimeout(typeTimer);

			const reduce =
				typeof window !== 'undefined' &&
				window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (reduce || full.length === 0) {
				messages = messages.map((m) =>
					m.id === id ? { ...m, content: full, typing: false } : m
				);
				resolve();
				return;
			}

			let i = 0;
			const step = () => {
				i = Math.min(full.length, i + (full.length > 220 ? 3 : full.length > 100 ? 2 : 1));
				const slice = full.slice(0, i);
				messages = messages.map((m) =>
					m.id === id ? { ...m, content: slice, typing: i < full.length } : m
				);
				void scrollToBottom();

				if (i >= full.length) {
					typeTimer = undefined;
					resolve();
					return;
				}

				const ch = full[i - 1];
				const delay = ch === '\n' ? 38 : ch === ' ' ? 16 : 12 + Math.random() * 10;
				typeTimer = setTimeout(step, delay);
			};

			step();
		});
	}

	async function sendMessage(raw: string) {
		const text = raw.trim();
		if (!text || sending) return;

		sending = true;
		draft = '';

		const userMsg: Message = { id: uid(), role: 'user', content: text };
		messages = [...messages, userMsg];
		await scrollToBottom();

		// Show WhatsApp-style typing dots while agent "thinks"
		agentTyping = true;
		await scrollToBottom();

		const history: ChatHistoryItem[] = messages
			.slice(0, -1)
			.map((m) => ({
				role: m.role,
				content: m.content
			}));

		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const thinkMs = reduce ? 200 : 900 + Math.random() * 700;

		let reply =
			"Sorry — I couldn't reply just now. Please try again, or ask about my projects, skills, or contact details.";

		try {
			const [answer] = await Promise.all([askAgent(text, history), wait(thinkMs)]);
			reply = answer;
		} catch {
			await wait(thinkMs);
		}

		agentTyping = false;
		await tick();

		const assistantId = uid();
		messages = [...messages, { id: assistantId, role: 'assistant', content: '', typing: true }];
		await scrollToBottom();
		await typeReply(assistantId, reply);

		sending = false;
		await scrollToBottom();
		inputEl?.focus();
	}

	function onSubmit(e: Event) {
		e.preventDefault();
		void sendMessage(draft);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			void sendMessage(draft);
		}
	}

	function linkify(text: string): string {
		const escaped = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		return escaped
			.replace(
				/(https?:\/\/[^\s<]+)/g,
				'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
			)
			.replace(/\n/g, '<br />');
	}
</script>

<section class="live-chat relative flex min-h-dvh flex-col" aria-label="Live Chat">
	<div class="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
		{#if !started}
			<div class="welcome flex flex-1 flex-col items-center justify-center pb-8 text-center">
				<img
					src="/profile.png"
					alt="Engr. Mr. Usman"
					width="72"
					height="72"
					class="welcome-avatar h-[4.5rem] w-[4.5rem] rounded-full object-cover object-[50%_18%]"
				/>
				<h1 class="welcome-title mt-5 font-display text-[clamp(1.45rem,4vw,1.85rem)] font-bold tracking-tight">
					Hi, I'm Usman
				</h1>
				<p class="welcome-sub mt-2 max-w-sm text-[0.95rem] leading-relaxed">
					Software Engineer & Full Stack Developer.<br />
					Ask me anything.
				</p>
			</div>
		{:else}
			<div
				bind:this={listEl}
				class="chat-scroll flex-1 space-y-5 overflow-y-auto pb-4 pr-1"
				role="log"
				aria-live="polite"
			>
				{#each messages as msg (msg.id)}
					{#if msg.role === 'assistant'}
						<div class="msg msg-agent flex items-end gap-2.5">
							<img
								src="/profile.png"
								alt=""
								width="32"
								height="32"
								class="agent-avatar h-8 w-8 shrink-0 rounded-full object-cover object-[50%_18%]"
							/>
							<div class="bubble bubble-agent" class:is-typing={msg.typing}>
								{@html linkify(msg.content)}{#if msg.typing}<span class="caret" aria-hidden="true"
									></span>{/if}
							</div>
						</div>
					{:else}
						<div class="msg msg-user flex items-end justify-end gap-2.5">
							<div class="bubble bubble-user">{msg.content}</div>
							<span
								class="user-avatar flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								aria-hidden="true">U</span
							>
						</div>
					{/if}
				{/each}

				{#if agentTyping}
					<div class="msg msg-agent flex items-end gap-2.5" aria-live="polite" aria-label="Usman is typing">
						<img
							src="/profile.png"
							alt=""
							width="32"
							height="32"
							class="agent-avatar h-8 w-8 shrink-0 rounded-full object-cover object-[50%_18%]"
						/>
						<div class="typing-indicator" aria-hidden="true">
							<span></span><span></span><span></span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if !started}
			<div class="suggestions mb-4 flex flex-wrap justify-center gap-2.5">
				{#each suggestions as tip}
					<button type="button" class="tip-pill" disabled={sending} onclick={() => sendMessage(tip)}>
						{tip}
					</button>
				{/each}
			</div>
		{/if}

		<form class="composer" onsubmit={onSubmit}>
			<textarea
				bind:this={inputEl}
				bind:value={draft}
				class="composer-input"
				placeholder="Message..."
				rows="1"
				maxlength="2000"
				disabled={sending}
				aria-label="Message"
				onkeydown={onKeydown}
			></textarea>
			<button
				type="submit"
				class="send-btn"
				disabled={sending || !draft.trim()}
				aria-label="Send message"
			>
				<ArrowUp class="h-4 w-4" strokeWidth={2.5} />
			</button>
		</form>
	</div>
</section>

<style>
	.live-chat {
		color: var(--fg);
	}

	.welcome-avatar {
		border: 2px solid color-mix(in srgb, var(--fg) 35%, transparent);
		box-shadow: 0 0 28px color-mix(in srgb, var(--fg) 18%, transparent);
	}

	.welcome-title {
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
	}

	.welcome-sub {
		color: var(--muted);
	}

	.chat-scroll {
		mask-image: linear-gradient(to bottom, transparent 0%, #000 12px, #000 calc(100% - 4px), #000 100%);
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			#000 12px,
			#000 calc(100% - 4px),
			#000 100%
		);
	}

	.bubble {
		max-width: min(78%, 34rem);
		padding: 0.7rem 0.95rem;
		border-radius: 1rem;
		font-size: 0.92rem;
		line-height: 1.55;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.bubble-agent {
		background: color-mix(in srgb, var(--bg) 88%, var(--fg));
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		color: var(--fg);
		border-bottom-left-radius: 0.35rem;
	}

	.bubble-agent :global(a) {
		color: color-mix(in srgb, #60a5fa 80%, var(--fg));
		text-decoration: underline;
		text-underline-offset: 2px;
		word-break: break-all;
	}

	.bubble-user {
		background: #2563eb;
		color: #ffffff;
		border-bottom-right-radius: 0.35rem;
	}

	.user-avatar {
		background: #2563eb;
		color: #ffffff;
	}

	.agent-avatar {
		border: 1px solid color-mix(in srgb, var(--fg) 20%, transparent);
	}

	.caret {
		display: inline-block;
		width: 0.45rem;
		height: 1em;
		margin-left: 1px;
		vertical-align: text-bottom;
		background: color-mix(in srgb, var(--fg) 70%, transparent);
		animation: blink 0.85s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.typing-indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.28rem;
		min-width: 3.4rem;
		min-height: 2.35rem;
		padding: 0.65rem 0.9rem;
		border-radius: 1rem;
		border-bottom-left-radius: 0.35rem;
		background: color-mix(in srgb, var(--bg) 88%, var(--fg));
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
	}

	.typing-indicator span {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--fg) 55%, transparent);
		animation: typing-bounce 1.2s ease-in-out infinite;
	}

	.typing-indicator span:nth-child(1) {
		animation-delay: 0s;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.18s;
	}

	.typing-indicator span:nth-child(3) {
		animation-delay: 0.36s;
	}

	@keyframes typing-bounce {
		0%,
		60%,
		100% {
			transform: translateY(0);
			opacity: 0.35;
		}
		30% {
			transform: translateY(-5px);
			opacity: 1;
		}
	}

	.tip-pill {
		border: 1px solid color-mix(in srgb, var(--fg) 28%, transparent);
		background: transparent;
		color: color-mix(in srgb, var(--fg) 82%, transparent);
		border-radius: 999px;
		padding: 0.55rem 1rem;
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.tip-pill:hover:not(:disabled) {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
		border-color: color-mix(in srgb, var(--fg) 45%, transparent);
		color: var(--fg);
	}

	.tip-pill:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.composer {
		display: flex;
		align-items: flex-end;
		gap: 0.65rem;
		width: 100%;
		padding: 0.55rem 0.55rem 0.55rem 1.1rem;
		border-radius: 1.35rem;
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		background: color-mix(in srgb, var(--bg) 82%, var(--fg));
		box-shadow: 0 10px 36px color-mix(in srgb, #000 22%, transparent);
	}

	.composer-input {
		flex: 1;
		min-height: 2.4rem;
		max-height: 8rem;
		resize: none;
		border: 0;
		outline: none;
		background: transparent;
		color: var(--fg);
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
		font-size: 0.95rem;
		line-height: 1.45;
		padding: 0.55rem 0;
	}

	.composer-input::placeholder {
		color: var(--muted);
	}

	.send-btn {
		display: inline-flex;
		height: 2.35rem;
		width: 2.35rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 999px;
		background: #ffffff;
		color: #0a0a0a;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			opacity 0.15s ease;
	}

	:global(html[data-theme='light']) .send-btn {
		background: #0a0a0a;
		color: #ffffff;
	}

	.send-btn:hover:not(:disabled) {
		transform: scale(1.05);
	}

	.send-btn:active:not(:disabled) {
		transform: scale(0.94);
	}

	.send-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.font-display {
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
	}

	@media (prefers-reduced-motion: reduce) {
		.typing-indicator span,
		.caret,
		.send-btn,
		.tip-pill {
			animation: none;
			transition: none;
		}
	}
</style>
