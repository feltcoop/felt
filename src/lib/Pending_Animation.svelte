<span class="one">•</span>
<span class="two">•</span>
<span class="three">•</span>

<style>
	span {
		opacity: 0;
		animation: dot 1.5s infinite;
	}

	.one {
		animation-delay: 0s;
	}
	.two {
		animation-delay: 0.2s;
	}
	.three {
		animation-delay: 0.3s;
	}

	@keyframes dot {
		0% {
			opacity: 0;
		}
		33% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
