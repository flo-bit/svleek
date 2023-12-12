<script>
	import { onNavigate } from '$app/navigation';
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import AppSidebar from '$lib/components/navigation/AppSidebar.svelte';
	import SidebarMenu from '$lib/components/navigation/SidebarMenu.svelte';
	import CommandPalette from '$lib/components/navigation/CommandPalette.svelte';
	import { onMount } from 'svelte';

	let showMenu = false;
	let showSearch = false;

	onNavigate(() => {
		// only hide menu if we're on mobile
		if (window.innerWidth < 1024) {
			showMenu = false;
		}
	});

	onMount(() => {
		if (window.innerWidth > 1024) {
			showMenu = true;
		}
	});

	// ADD MENU HERE
	let menu = [
  {
    "title": "Introduction",
    "href": "/docs/introduction"
  },
  {
    "title": "Test",
    "href": "/docs/test"
  },
  {
    "title": "Navigation",
    "href": "/docs/navigation",
    "children": [
      {
        "title": "Topic1",
        "href": "/docs/navigation/topic1"
      },
      {
        "title": "Topic2",
        "href": "/docs/navigation/topic2"
      }
    ]
  }
];
</script>

<AppSidebar bind:show={showMenu}>
	<SidebarMenu slot="sidebar" hideMenu={() => (showMenu = false)} {menu} />
	<div class="flex h-screen flex-col">
		<div>
			<Navbar bind:show={showMenu} />
		</div>
		<div class="flex-grow overflow-y-auto">
			<slot />
		</div>
		<div class="flex">
			<!-- footer here -->
			<div></div>
		</div>
	</div>
</AppSidebar>

<div
	class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)] opacity-20"
	aria-hidden="true"
>
	<div
		class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-accent-200 to-accent-600 opacity-20"
		style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
	></div>
</div>
