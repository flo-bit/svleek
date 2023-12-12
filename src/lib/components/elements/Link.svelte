<script lang="ts">
	/*
	supports light and dark mode

	example usage:
	// add this to the script tag
	import Link from '$lib/ui-components/elements/buttons/Link.svelte';

	// add this to the markup
	<Link href="link">Say hello!</Link>
	*/

	export let href = '#';

	let classes = '';
	export { classes as class };
</script>

<a
	{href}
	class="font-semibold text-accent-600 hover:text-accent-500 dark:text-accent-500 dark:hover:text-accent-400 {classes}"
	><slot>Click me!</slot></a
>
