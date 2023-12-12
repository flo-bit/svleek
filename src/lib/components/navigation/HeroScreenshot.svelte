<script lang="ts">
	import Logo from '../../Logo.svelte';
	import Button from '../elements/Button.svelte';
	import LinkButton from '../elements/NeutralLink.svelte';

	import Github from '../../Github.svelte';
	import ThemeToggle from '../elements/ThemeToggle.svelte';
	// import Search from '../elements/Search.svelte';

	// optional
	export let buttonHref: string | undefined = undefined;
	export let buttonLabel = 'Button';

	export let linkButtonHref: string | undefined = undefined;
	export let linkButtonLabel = 'Button';

	export let imageDark = '';

	export let id = '';
	let classes = '';
	export { classes as class };

	// required
	export let image: string;
	export let title: string;
	export let subtitle: string;
</script>

<header class="inset-x-0 top-0 z-50 absolute">
	<nav class="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
		<div class="flex space-x-6"></div>
		<div class="flex lg:flex-1 justify-end space-x-6">
			<!--<Search />-->
			<Github />
			<ThemeToggle />
		</div>
	</nav>
</header>

<div class="relative isolate overflow-hidden {classes}" {id}>
	<div
		class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
		aria-hidden="true"
	>
		<div
			class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-accent-200 to-accent-600 opacity-20"
			style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
		></div>
	</div>
	<div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
		<div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
			<slot name="logo"><Logo size="h-11"></Logo></slot>

			<div class="mt-24 sm:mt-32 lg:mt-16"></div>
			<h1
				class="mt-10 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl"
			>
				{title}
			</h1>
			<p class="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
				{subtitle}
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				{#if buttonHref}
					<Button href={buttonHref}>{buttonLabel}</Button>
				{/if}
				{#if linkButtonHref}
					<LinkButton href={linkButtonHref}>{linkButtonLabel}</LinkButton>
				{/if}
			</div>
		</div>
		<div
			class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<div
					class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
				>
					{#if imageDark}
						<img
							src={image}
							alt="App screenshot"
							width="2432"
							height="1442"
							class="w-[76rem] max-h-screen object-cover block dark:hidden rounded-md bg-white/5 shadow-2xl ring-1 ring-neutral-900/10 dark:ring-white/10"
						/>
						<img
							src={imageDark}
							alt="App screenshot"
							width="2432"
							height="1442"
							class="w-[76rem] max-h-screen object-cover hidden dark:block rounded-md bg-white/5 shadow-2xl ring-1 ring-neutral-900/10 dark:ring-white/10"
						/>
					{:else}
						<img
							src={image}
							alt="App screenshot"
							width="2432"
							height="1442"
							class="w-[76rem] max-h-screen object-cover rounded-md bg-white/5 shadow-2xl ring-1 ring-neutral-900/10 dark:ring-white/10"
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
