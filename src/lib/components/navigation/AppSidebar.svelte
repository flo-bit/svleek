<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	export let show = true;
</script>

<div class="flex flex-row">
	{#if show}
		<div transition:slide={{ axis: 'x', duration: 200 }} class="h-screen w-56 hidden lg:block">
			<slot name="sidebar"><div class="w-full h-full grow"></div></slot>
		</div>
	{/if}
	<div class="flex-grow">
		<slot />
	</div>
</div>

{#if show}
	<div class="lg:hidden" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<button
			transition:fade={{ duration: 100 }}
			on:click={() => {
				show = false;
			}}
			class="fixed inset-0 z-50 bg-white/50 dark:bg-black/50 cursor-default"
		>
			<span class="sr-only">Close sidebar</span>
	</button>
		<div
			transition:slide={{ axis: 'x', duration: 200 }}
			class="fixed top-0 bottom-0 left-0 h-screen w-72 z-50"
		>
			<slot name="sidebar"><div class="bg-red-500 w-full h-full grow"></div></slot>
		</div>
	</div>
{/if}
