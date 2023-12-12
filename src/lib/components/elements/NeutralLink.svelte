<script lang="ts">
	/*
	supports light and dark mode

	example usage:
	// add this to the script tag
	import NeutralLink from '$lib/ui-components/elements/buttons/NeutralLink.svelte';

	// add this to the markup
	<NeutralLink href="link">Say hello!</NeutralLink>
	*/

	export let onClick = () => {};
	export let type: 'button' | 'submit' | 'reset' | undefined = undefined;

	export let href = '';

	let classes = '';
	export { classes as class };
</script>

{#if href}
	<a
		{href}
		{type}
		class="text-sm font-semibold leading-6 text-neutral-900 dark:text-white {classes}"><slot></slot></a
	>
{:else}
	<button
		{type}
		on:click={onClick}
		class="text-sm font-semibold leading-6 text-neutral-900 dark:text-white {classes}"
		><slot></slot></button
	>
{/if}
