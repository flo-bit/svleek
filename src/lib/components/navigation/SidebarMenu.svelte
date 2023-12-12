<script lang="ts">
	import { slide } from 'svelte/transition';
	import Logo from '../../Logo.svelte';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	type MenuItem = {
		title: string;
		icon?: string;
		href?: string;

		children?: MenuItem[];
		expanded?: boolean;
	};

	export let menu: MenuItem[] = [
		{
			title: 'Dashboard',
			icon: `<svg
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>`,
			href: '#'
		},
		{
			title: 'Dashboard',
			href: '#',
			children: [
				{
					title: 'Engineering',
					href: '#'
				},
				{
					title: 'Human Resources',
					href: '#'
				},
				{
					title: 'Customer Success',
					href: '#'
				}
			]
		}
	];

	function findByPath(data: MenuItem[], href: string): MenuItem | undefined {
		for (let item of data) {
			if (item.href === href) {
				return item;
			} else if (item.children && item.children?.length && typeof item.children === 'object') {
				const result = findByPath(item.children, href);
				if (result) {
					return result;
				}
			}
		}
	}

	let current = findByPath(menu, window.location.pathname);
	console.log(current);
	console.log(window.location.pathname);

	onNavigate(() => {
		// get current menu item based on current route
		current = findByPath(menu, window.location.pathname);
		console.log(current);
	});

	export let hideMenu = () => {};
</script>

<div
	class="flex grow flex-col h-screen gap-y-5 overflow-y-auto border-r border-neutral-200 bg-white dark:bg-neutral-950 dark:border-white/10 px-6 relative"
>
	<button
		on:click={hideMenu}
		class="lg:hidden absolute top-3 right-3 text-neutral-900 dark:text-white rounded-md p-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
	<div class="flex h-16 shrink-0 items-center">
		<Logo />
	</div>
	<nav class="flex flex-1 flex-col">
		<ul role="list" class="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" class="-mx-2 space-y-1">
					{#key current}
						{#each menu as item}
							<li>
								<!-- Current: "bg-neutral-50", Default: "hover:bg-neutral-50" -->
								{#if !item.children}
									<a
										href={item.href}
										class="{item == current
											? 'bg-neutral-50 dark:bg-neutral-900'
											: 'hover:bg-neutral-50 dark:hover:bg-neutral-900'} group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-neutral-700 dark:text-neutral-50"
									>
										{#if item.icon}
											<div class="shrink-0 text-neutral-400 dark:text-neutral-600">
												{@html item.icon}
											</div>
										{/if}
										{item.title}
									</a>
								{:else}
									<div>
										<button
											on:click={() => (item.expanded = !item.expanded)}
											type="button"
											class="hover:bg-neutral-50 dark:hover:bg-neutral-900 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-neutral-700 dark:text-neutral-50"
											aria-controls="sub-menu-1"
											aria-expanded="false"
										>
											{#if item.icon}
												<div class="shrink-0 text-neutral-400 dark:text-neutral-600">
													{@html item.icon}
												</div>
											{/if}
											{item.title}
											<svg
												class="{item.expanded
													? 'rotate-90 text-neutral-500 dark:text-neutral-400'
													: 'text-neutral-400 dark:text-neutral-500'} ml-auto h-5 w-5 shrink-0 transition-all duration-200 ease-in-out"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
										{#if item.expanded}
											<!-- Expandable link section, show/hide based on state. -->
											<ul transition:slide class="mt-1 px-2 space-y-1" id="sub-menu-1">
												{#each item.children as subitem}
													<li>
														<!-- 44px -->
														<a
															href={subitem.href}
															class="{subitem == current
																? 'bg-neutral-50 dark:bg-neutral-900'
																: 'hover:bg-neutral-50 dark:hover:bg-neutral-900'} hover:bg-neutral-50 dark:hover:bg-neutral-900 block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-neutral-700 dark:text-neutral-100"
															>{subitem.title}</a
														>
													</li>
												{/each}
											</ul>
										{/if}
									</div>
								{/if}
							</li>
						{/each}
					{/key}
				</ul>
			</li>
		</ul>
	</nav>
</div>
