<div class="math-grid" aria-hidden="true"></div>

<style>
	.math-grid {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image:
			linear-gradient(var(--grid-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
		background-size: 56px 56px;
		opacity: 0.9;
		mask-image: radial-gradient(ellipse at center, black 40%, transparent 88%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 88%);
		animation: net-drift 28s linear infinite;
		will-change: background-position;
	}

	@keyframes net-drift {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 56px 56px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.math-grid {
			animation: none;
			will-change: auto;
		}
	}
</style>
