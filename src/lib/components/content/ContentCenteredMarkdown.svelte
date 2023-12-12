<script lang="ts">
	/*
	* supports light and dark mode

	example usage:

	// add this to the script tag
	import ContentCenteredMarkdown from '$lib/ui-components/page_sections/content/ContentCenteredMarkdown.svelte';
	const content = '# Hello world!\n\nThis is a markdown component';
	// add this to the markup
	<ContentCenteredMarkdown {content}/>

	currently supported syntax:
	- h1, h2 for headings (# and ##)
	- h3 for large text (###)
	- h4 for accented text (e.g. preheadings like "Introducing") (####)

	- paragraphs (separated by empty lines)
	- quotes > like this
	- images ![alt text](https://example.com/image.png)
	- bold and italic text *like this* and **like this**
	- links [like this](https://example.com)
	*/
	import { marked } from 'marked';

	import Prism from 'prismjs';
	import { onMount } from 'svelte';
	import github from 'svelte-highlight/styles/tomorrow-night-bright';

	import { HighlightAuto } from 'svelte-highlight';
	import Highlight from 'svelte-highlight';
	import hljs from 'highlight.js/lib/core';

	export let content: string;

	onMount(() => {
		Prism.highlightAll();

		console.log('content', content);

		document.querySelectorAll('pre code').forEach((el: Element) => {
			hljs.highlightElement(el);
			el.classList.add('rounded-md');
		});

		document.querySelectorAll('h4').forEach((el: Element) => {
			//el.classList.add('text-base font-semibold leading-7 text-accent-600 dark:text-accent-500');
			el.classList.add(
				'text-base',
				'font-semibold',
				'leading-7',
				'text-accent-600',
				'dark:text-accent-500'
			);
		});
	});
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div class="px-6 py-32 lg:px-8">
	<div
		class="mx-auto max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300 markdown-content"
	>
		{@html marked.parse(content)}
	</div>
</div>
