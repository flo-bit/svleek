<div class="px-6 py-16 lg:px-8 max-w-[100vw]"><div class="mx-auto max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300"><h1 class="mt-16 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">Testing the documentation</h1>
<h3 class="mt-6 text-xl leading-8">This is a very important subheading, that can be used for important things or something. I'm not completely sure yet. But it is important.</h3>
<p class="mt-6 leading-8">This is a <a href="https://flo-bit.github.io/svleek/docs/introduction" class="font-semibold text-accent-600 hover:text-accent-500 dark:text-accent-500 dark:hover:text-accent-400">link</a></p>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">List</h2>
<ul class="mt-8 space-y-4 text-neutral-600 dark:text-neutral-400">
<li class="flex gap-x-3 items-start"><div class="mt-3 h-1.5 w-1.5 flex-none bg-accent-600 dark:bg-accent-500 rounded-full" aria-hidden="true"></div><span class="text-neutral-900 dark:text-neutral-100 font-semibold">This is a list</span></li>
<li class="flex gap-x-3 items-start"><div class="mt-3 h-1.5 w-1.5 flex-none bg-accent-600 dark:bg-accent-500 rounded-full" aria-hidden="true"></div><span><span class="text-neutral-900 dark:text-neutral-100 font-semibold">It has some items</span>  Three to be exact</span></li>
<li class="flex gap-x-3 items-start"><div class="mt-3 h-1.5 w-1.5 flex-none bg-accent-600 dark:bg-accent-500 rounded-full" aria-hidden="true"></div><span><span class="text-neutral-900 dark:text-neutral-100 font-semibold">They are not very interesting</span>  But they are here</span></li>
</ul>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Numbered list</h2>
<ol class="mt-8 space-y-4 text-neutral-600 dark:text-neutral-400">
<li class="flex gap-x-3 items-start"><div class="flex-none text-accent-600 dark:text-accent-500 font-semibold text-lg" aria-hidden="true">1</div><span class="text-neutral-900 dark:text-neutral-100 font-semibold">This is a numbered list</span></li>
<li class="flex gap-x-3 items-start"><div class="flex-none text-accent-600 dark:text-accent-500 font-semibold text-lg" aria-hidden="true">2</div><span class="text-neutral-900 dark:text-neutral-100 font-semibold">It has some items</span></li>
<li class="flex gap-x-3 items-start"><div class="flex-none text-accent-600 dark:text-accent-500 font-semibold text-lg" aria-hidden="true">3</div><span><span class="text-neutral-900 dark:text-neutral-100 font-semibold">They are also not very interesting</span>  But they are here</span></li>
</ol>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Code</h2>
<div class="relative"><pre class="rounded-xl bg-neutral-100 dark:bg-neutral-900 p-4 mt-6 relative overflow-x-scroll" onclick="navigator.clipboard.writeText(this.querySelector(&quot;code&quot;).textContent.trim())"><code class="language-js"><span class="hljs-comment">// this is some javascript code</span>
<span class="hljs-keyword">const</span> test = <span class="hljs-number">15</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Hello World'</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Hello World This is a longer string, to test the wrapping of the code block'</span>);

<span class="hljs-keyword">const</span> data = &#123;
	<span class="hljs-attr">name</span>: <span class="hljs-string">'Svleek'</span>,
	<span class="hljs-attr">description</span>: <span class="hljs-string">'Minimal, Beautiful, and Fast Documentation'</span>
&#125;;
</code></pre><button class="absolute top-2 right-2 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300">Copy</button></div>
<div class="relative"><pre class="rounded-xl bg-neutral-100 dark:bg-neutral-900 p-4 mt-6 relative overflow-x-scroll" onclick="navigator.clipboard.writeText(this.querySelector(&quot;code&quot;).textContent.trim())"><code class="language-python"><span class="hljs-comment"># this is some python code</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">'Hello World'</span>)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">test</span>(<span class="hljs-params">value: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">'Hello World'</span> + value)
</code></pre><button class="absolute top-2 right-2 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300">Copy</button></div>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Warning</h2>
<div class="rounded-md bg-yellow-50 dark:bg-yellow-500/5 p-4 dark:ring-1 dark:ring-yellow-500/10 mt-6"><div class="flex"><svg class="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"></path></svg><div class="ml-3"><h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-400">Attention needed</h3><div class="mt-2 text-sm text-yellow-700 dark:text-yellow-300"><p>
This is a very important warning</p></div></div></div></div>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Quote</h2>
<blockquote class="font-semibold text-neutral-900 dark:text-neutral-100 mt-10 border-l border-accent-600 dark:border-accent-500 pl-9">
<p class="mt-6 leading-8">“Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh
ullamcorper ac dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget
cras. Sem volutpat enim tristique.”</p>
<ul class="mt-8 space-y-4 text-neutral-600 dark:text-neutral-400">
<li class="flex gap-x-3 items-start"><div class="mt-3 h-1.5 w-1.5 flex-none bg-accent-600 dark:bg-accent-500 rounded-full" aria-hidden="true"></div><span class="text-neutral-900 dark:text-neutral-100 font-semibold">Albert Einstein</span></li>
</ul>
</blockquote>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Image</h2>
<p class="mt-6 leading-8"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;w=1310&amp;h=873&amp;q=80&amp;facepad=3" alt="this is not me" class="rounded-xl bg-neutral-50 dark:bg-neutral-950 object-cover">
<strong><em>This is not me</em></strong></p>
<h2 class="mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Text</h2>
<p class="mt-6 leading-8">Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus
volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim.
Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.</p>
<p class="mt-6 leading-8">Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
viverra tellus varius sit neque erat velit.</p>
</div></div>