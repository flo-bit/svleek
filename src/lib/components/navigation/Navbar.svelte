<script lang="ts">
	import Github from '../../Github.svelte';
	import Search from '../elements/Search.svelte';
	import ThemeToggle from '../elements/ThemeToggle.svelte';
	import Logo from '../../Logo.svelte';

	export let show = true;
</script>

<header
	class="inset-x-0 top-0 z-50 border-b border-neutral-300 dark:border-white/10 bg-white dark:bg-neutral-950"
>
	<nav class="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
		<div class="flex space-x-6">
			<button
				type="button"
				on:click={() => (show = !show)}
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-800 dark:text-neutral-200"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 {show ? '' : 'rotate-180'} transition-all duration-200"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>
			<Logo size="w-6 h-6" />
		</div>
		<div class="flex lg:flex-1 justify-end space-x-6">
			<!--<Search />-->
			<Github />
			<ThemeToggle />
		</div>
	</nav>
</header>
