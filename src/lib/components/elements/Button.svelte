<script lang="ts">
	/*
	supports light and dark mode

	example usage:
	// add this to the script tag
	import Button from '$lib/ui-components/elements/buttons/Button.svelte';

	// add this to the markup
	<Button href="link">Button</Button>
	*/

	export let onClick = () => {};

	export let type: 'button' | 'submit' | 'reset' | undefined = undefined;
	export let href = '';
	export let disabled = false;

	let classes = '';
	export { classes as class };
</script>

{#if href}
	<a
		{href}
		{type}
		class="rounded-md bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 dark:hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 dark:focus-visible:outline-accent-500 {classes}"
		><slot>Button</slot></a
	>
{:else}
	<button
		on:click={onClick}
		{type}
		disabled={disabled}
		class="rounded-md disabled:opacity-30 bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 dark:hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 dark:focus-visible:outline-accent-500 {classes}"
		><slot>Button</slot></button
	>
{/if}
