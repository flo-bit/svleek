<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { showSearch } from './CommandPaletteStore';

	export let showResults = false;

	export let placeholder = 'Search...';

	export let results: string[] = [
		'tell me about the world and stuff and shit you know what i mean',
		'world or is it the other way around i dont know im not sure'
	];

	export let noResults = 'No results found';

	let trySend = () => {
		$showSearch = false;

		if (value.trim() == '') {
			return;
		}
		if (send) send(value);

		value = '';
	};

	export let send: ((value: string) => void) | undefined = undefined;

	export let value: string = '';

	export const show = () => {
		$showSearch = true;
		setTimeout(() => {
			input.focus();
		}, 200);
	};

	let input: HTMLInputElement;
</script>

<svelte:window
	on:keydown={(event) => {
		// show/hide on command + k
		if (event.key == 'k' && event.metaKey) {
			$showSearch = !$showSearch;

			if ($showSearch)
				setTimeout(() => {
					input.focus();
				}, 200);

			event.preventDefault();
		}
	}}
/>

{#if $showSearch}
	<div class="relative z-50" role="dialog" aria-modal="true" transition:fade={{ duration: 100 }}>
		<div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 pt-8 md:p-20">
			<button
				on:click={() => ($showSearch = false)}
				class="fixed inset-0 bg-neutral-500/30 dark:bg-black/70 transition-opacity z-0 cursor-default"
			></button>

			<div
				class="mx-auto max-w-xl transform divide-y divide-neutral-100 dark:divide-white/10 overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-black dark:ring-white/10 ring-opacity-5 transition-all"
			>
				<div class="relative flex flex-grow items-stretch focus-within:z-10">
					<input
						on:focus={() => {
							showResults = true;
						}}
						on:blur={() => {
							setTimeout(() => {
								showResults = false;
							}, 100);
						}}
						on:keypress={(event) => {
							if (event.key == 'Enter') {
								trySend();
							}
						}}
						type="text"
						class="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:ring-0 sm:text-sm"
						{placeholder}
						role="combobox"
						aria-expanded="false"
						aria-controls="options"
						bind:value
						bind:this={input}
					/>
					<button
						on:click={() => {
							trySend();
						}}
						type="button"
						class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-neutral-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-neutral-50"
					>
						<slot named="icon">
							<svg
								class=" h-5 w-5 text-neutral-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
									clip-rule="evenodd"
								/>
							</svg>
						</slot>
						<slot />
					</button>
				</div>

				<!-- Results, show/hide based on command palette state -->
				{#if showResults}
					<div transition:slide>
						{#if results.length > 0}
							<div
								class="max-h-56 sm:max-h-64 scroll-py-2 overflow-y-auto py-2 text-sm text-neutral-800 dark:text-neutral-200"
							>
								<!-- Active: "bg-indigo-600 text-white" -->
								{#each results as result}
									<button
										on:click={() => {
											console.log(result);
											value = result;
											trySend();
										}}
										class="w-full hover:bg-accent-600/30 select-none px-4 py-2 text-left"
									>
										{result}
									</button>
								{/each}
							</div>
						{:else}
							<!-- Empty state, show/hide based on command palette state -->
							<p class="p-4 text-sm text-neutral-500 dark:text-neutral-400">{noResults}</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
