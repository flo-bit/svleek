import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import markdownit from 'markdown-it';
import hljs from 'highlight.js'; // https://highlightjs.org

const docsPath = './docs';
const routesPath = './src/routes/docs';
const staticPath = './static';

let config;
const menu = {};

function addClassesToElement(element, classes) {
	classes.split(' ').forEach((className) => {
		element.classList.add(className);
	});
}

function addAllTailwindClassesToElement(dom) {
	dom.window.document.querySelectorAll('h1').forEach((element) => {
		addClassesToElement(
			element,
			'mt-16 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl'
		);
	});
	dom.window.document.querySelectorAll('p').forEach((element) => {
		addClassesToElement(element, 'mt-6 leading-8');
	});
	dom.window.document.querySelectorAll('h2').forEach((element) => {
		addClassesToElement(
			element,
			'mt-16 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100'
		);
	});
	dom.window.document.querySelectorAll('h3').forEach((element) => {
		addClassesToElement(element, 'mt-6 text-xl leading-8');
	});
	dom.window.document.querySelectorAll('img').forEach((element) => {
		// add base_url to src, if it doesn't start with http
		const src = element.getAttribute('src');
		if (!src.startsWith('http')) element.setAttribute('src', config.base_url + src);

		addClassesToElement(element, 'rounded-xl bg-neutral-50 dark:bg-neutral-950 object-cover');
	});
	dom.window.document.querySelectorAll('blockquote').forEach((element) => {
		addClassesToElement(
			element,
			'font-semibold text-neutral-900 dark:text-neutral-100 mt-10 border-l border-accent-600 dark:border-accent-500 pl-9'
		);
	});
	dom.window.document.querySelectorAll('a').forEach((element) => {
		const href = element.getAttribute('href');
		if (!href.startsWith('http')) element.setAttribute('href', config.base_url + href);

		addClassesToElement(
			element,
			'font-semibold text-accent-600 hover:text-accent-500 dark:text-accent-500 dark:hover:text-accent-400'
		);
	});

	dom.window.document.querySelectorAll('ul').forEach((element) => {
		addClassesToElement(element, 'mt-8 space-y-4 text-neutral-600 dark:text-neutral-400');
	});
	dom.window.document.querySelectorAll('ol').forEach((element) => {
		addClassesToElement(element, 'mt-8 space-y-4 text-neutral-600 dark:text-neutral-400');
	});
	dom.window.document.querySelectorAll('ul>li').forEach((element) => {
		const content = element.innerHTML;
		// find first :
		const firstColonIndex = content.indexOf(':');
		if (firstColonIndex === -1) {
			element.innerHTML = `<span class="text-neutral-900 dark:text-neutral-100 font-semibold">${content}</span>`;
		} else {
			const firstPart = content.substring(0, firstColonIndex);
			const secondPart = content.substring(firstColonIndex + 1);
			element.innerHTML = `<span><span class="text-neutral-900 dark:text-neutral-100 font-semibold">${firstPart}</span> ${secondPart}</span>`;
		}
		const circle = dom.window.document.createElement('div');
		circle.setAttribute(
			'class',
			'mt-3 h-1.5 w-1.5 flex-none bg-accent-600 dark:bg-accent-500 rounded-full'
		);
		circle.setAttribute('aria-hidden', 'true');
		element.prepend(circle);

		addClassesToElement(element, 'flex gap-x-3 items-start');
	});

	dom.window.document.querySelectorAll('ol>li').forEach((element) => {
		const content = element.innerHTML;
		// find first :
		const firstColonIndex = content.indexOf(':');
		if (firstColonIndex === -1) {
			element.innerHTML = `<span class="text-neutral-900 dark:text-neutral-100 font-semibold">${content}</span>`;
		} else {
			const firstPart = content.substring(0, firstColonIndex);
			const secondPart = content.substring(firstColonIndex + 1);
			element.innerHTML = `<span><span class="text-neutral-900 dark:text-neutral-100 font-semibold">${firstPart}</span> ${secondPart}</span>`;
		}
		const num = dom.window.document.createElement('div');
		num.setAttribute(
			'class',
			'flex-none text-accent-600 dark:text-accent-500 font-semibold text-lg'
		);
		num.setAttribute('aria-hidden', 'true');
		// find out the number
		const itemsArray = Array.from(element.closest('ol').querySelectorAll('li'));

		// Find the index of the element
		const number = itemsArray.indexOf(element) + 1;
		num.innerHTML = number;
		element.prepend(num);

		addClassesToElement(element, 'flex gap-x-3 items-start');
	});

	dom.window.document.querySelectorAll('pre').forEach((element) => {
		// Create a new div element
		let wrapperDiv = dom.window.document.createElement('div');
		wrapperDiv.setAttribute('class', 'relative');

		// Insert the new div right before the pre element in the DOM
		element.parentNode.insertBefore(wrapperDiv, element);

		// Move the pre element inside the new div
		wrapperDiv.appendChild(element);
		addClassesToElement(
			element,
			'rounded-xl bg-neutral-100 dark:bg-neutral-900 p-4 mt-6 relative overflow-x-scroll'
		);
		// add button to copy the code
		const copyButton = dom.window.document.createElement('button');
		copyButton.setAttribute(
			'class',
			'absolute top-2 right-2 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300'
		);

		// remove the leading and trailing newlines
		copyButton.innerHTML = `Copy`;
		element.setAttribute(
			'onclick',
			'navigator.clipboard.writeText(this.querySelector("code").textContent.trim())'
		);
		wrapperDiv.appendChild(copyButton);
	});

	// find blockquotes that start with [!WARNING]
	dom.window.document.querySelectorAll('blockquote').forEach((element) => {
		// get first p
		const firstP = element.querySelector('p');
		if (firstP?.textContent?.startsWith('[!WARNING]')) {
			// rename blockquote to warning
			const warning = dom.window.document.createElement('div');
			addClassesToElement(
				warning,
				'rounded-md bg-yellow-50 dark:bg-yellow-500/5 p-4 dark:ring-1 dark:ring-yellow-500/10 mt-6'
			);
			const flex = dom.window.document.createElement('div');
			warning.appendChild(flex);
			addClassesToElement(flex, 'flex');
			const svg = dom.window.document.createElement('svg');
			flex.appendChild(svg);
			addClassesToElement(svg, 'h-5 w-5 text-yellow-500 flex-shrink-0');
			svg.setAttribute('viewBox', '0 0 20 20');
			svg.setAttribute('fill', 'currentColor');
			svg.setAttribute('aria-hidden', 'true');
			const path = dom.window.document.createElement('path');
			svg.appendChild(path);
			path.setAttribute('fill-rule', 'evenodd');
			path.setAttribute(
				'd',
				'M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z'
			);
			const div = dom.window.document.createElement('div');
			flex.appendChild(div);
			addClassesToElement(div, 'ml-3');
			const h3 = dom.window.document.createElement('h3');
			div.appendChild(h3);
			addClassesToElement(h3, 'text-sm font-medium text-yellow-800 dark:text-yellow-400');
			h3.innerHTML = 'Attention needed';
			const div2 = dom.window.document.createElement('div');
			div.appendChild(div2);
			addClassesToElement(div2, 'mt-2 text-sm text-yellow-700 dark:text-yellow-300');
			const p = dom.window.document.createElement('p');
			div2.appendChild(p);
			p.innerHTML = firstP.textContent.replace('[!WARNING]', '');

			element.parentNode.insertBefore(warning, element);
			element.remove();
		}
	});

	dom.window.document.querySelectorAll('hr').forEach((element) => {
		addClassesToElement(element, 'mt-8 opacity-10');
	});

	let allCodeElements = Array.from(dom.window.document.querySelectorAll('code'));
	let filteredCodeElements = allCodeElements.filter((el) => !el.closest('pre'));

	filteredCodeElements.forEach((element) => {
		addClassesToElement(element, 'rounded-md bg-neutral-200 dark:bg-neutral-800 p-1');
	});
}

function convertMarkdownToHTML(markdown) {
	const md = markdownit({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					str = hljs.highlight(str, { language: lang }).value;
					// remove the leading and trailing newlines
					//str = str.replace(/^\n+|\n+$/g, '');
					return str;
				} catch (__) {
					console.log(__);
				}
			}

			return ''; // use external default escaping
		}
	});
	const content = md.render(markdown);
	const dom = new JSDOM(content);
	addAllTailwindClassesToElement(dom);

	const div1 = dom.window.document.createElement('div');
	div1.setAttribute('class', 'px-6 py-16 lg:px-8 max-w-[100vw]');
	const div2 = dom.window.document.createElement('div');
	div2.setAttribute(
		'class',
		'mx-auto max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300'
	);
	div1.appendChild(div2);
	div2.innerHTML = dom.window.document.querySelector('body').innerHTML;
	dom.window.document.querySelector('body').innerHTML = div1.outerHTML;

	// replace { and } with &#123; and &#125;
	return dom.window.document
		.querySelector('body')
		.innerHTML.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;');
}

function processFile(filePath, destPath) {
	const markdown = fs.readFileSync(filePath, 'utf-8');
	const html = convertMarkdownToHTML(markdown);
	const pageContent = `${html}`;
	// create the directory if it doesn't exist
	if (!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath, { recursive: true });
	}
	fs.writeFileSync(`${destPath}/+page.svelte`, pageContent);
}

function processDirectory(dirPath, destPath, parentMenu = null) {
	if (!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath, { recursive: true });
	}

	const files = fs.readdirSync(dirPath).sort();
	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		const fileStats = fs.statSync(filePath);

		if (!fileStats.isDirectory() && !file.endsWith('.md')) {
			return;
		}
		// Remove the leading number and hyphen and the trailing .md
		const fileName = file.replace(/^\d+-/, '').replace(/\.md$/, '');
		const newDestPath = path.join(destPath, fileName);

		// add to menu
		const menuEntry = {
			// replace - with space and turn the first letter to uppercase
			title: fileName.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
			// remove src/routes from the path
			href: config.base_url + newDestPath.replace(/^src\/routes/, '')
		};
		if (parentMenu) {
			parentMenu.children = parentMenu.children || [];
			parentMenu.children.push(menuEntry);
		}
		if (fileStats.isDirectory()) {
			processDirectory(filePath, newDestPath, menuEntry);
		} else {
			processFile(filePath, newDestPath);
		}
	});
}

function addMenu(menu) {
	// find let menu = [xyz]; in +layout.svelte and replace it with the menu
	const layoutPath = './src/routes/docs/+layout.svelte';
	const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
	const newLayoutContent = layoutContent.replace(
		/let menu = \[(\S|\s)*\];/,
		`let menu = ${JSON.stringify(menu.children, null, 2)};`
	);
	fs.writeFileSync(layoutPath, newLayoutContent);
}

function cleanFolder(folder) {
	// delete everything except +layout.svelte from target folder
	const files = fs.readdirSync(folder);
	files.forEach((file) => {
		const filePath = path.join(folder, file);
		const fileStats = fs.statSync(filePath);
		if (fileStats.isDirectory()) {
			fs.rmdirSync(filePath, { recursive: true });
		} else if (file !== '+layout.svelte') {
			fs.unlinkSync(filePath);
		}
	});
}

function readConfig() {
	// read from docs/config.json
	const configPath = docsPath + '/svleek.config.json';
	const configContent = fs.readFileSync(configPath, 'utf-8');
	const config = JSON.parse(configContent);
	return config;
}

function copyAssets(srcDir, destDir) {
	// Create destination directory if it doesn't exist
	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true });
	}

	// Read source directory contents
	const items = fs.readdirSync(srcDir);

	items.forEach((item) => {
		const srcPath = path.join(srcDir, item);
		const destPath = path.join(destDir, item);

		// Check if the item is a directory or file
		const stat = fs.statSync(srcPath);
		if (stat.isDirectory()) {
			// Recursively copy directory
			copyAssets(srcPath, destPath);
		} else {
			// Copy file
			fs.copyFileSync(srcPath, destPath);
		}
	});
}

function setupStartPage() {
	const heroScreenshot = config.image;
	const heroTitle = config.title;
	const heroSubtitle = config.subtitle;
	const heroButtonHref = config.first_page;
	const heroButtonLabel = config.button_label;

	const pagePath = './src/routes/+page.svelte';
	const pageContent = fs.readFileSync(pagePath, 'utf-8');
	const newPageContent = pageContent.replace(
		/<HeroScreenshot [\s|\S]*\/>/,
		`<HeroScreenshot title="${heroTitle}" subtitle="${heroSubtitle}" image="${
			config.base_url + heroScreenshot
		}" buttonHref="${config.base_url + heroButtonHref}" buttonLabel="${heroButtonLabel}"/>`
	);
	fs.writeFileSync(pagePath, newPageContent);
}

function setLogo() {
	// read logo from ./docs/logo.svg
	let logo = '';
	try {
		const svgPath = docsPath + '/logo.svg';
		const svgContent = fs.readFileSync(svgPath, 'utf-8');
		logo = svgContent.replace(/<svg/, '<svg class="{size} fill-accent-600 dark:fill-accent-600"');
	} catch (e) {
		console.warn('No logo.svg found in ./docs');
	}

	// replace <slot></slot> in ./src/lib/Logo.svelte with the logo
	const logoPath = './src/lib/Logo.svelte';
	const logoContent = fs.readFileSync(logoPath, 'utf-8');

	const newLogoContent = logoContent.replace(/<slot>[\s|\S]*<\/slot>/, `<slot>${logo}</slot>`);

	console.log(newLogoContent == logoContent);
	fs.writeFileSync(logoPath, newLogoContent);
}

function setGithubLink() {
	// set link in ./src/lib/Github.svelte
	// from config.github
	const githubPath = './src/lib/Github.svelte';
	const githubContent = fs.readFileSync(githubPath, 'utf-8');
	const newGithubContent = githubContent.replace(
		/let link = '.*';/,
		`let link = '${config.github}';`
	);
	fs.writeFileSync(githubPath, newGithubContent);
}

function setAccentColor() {
	const tailwindConfigPath = './tailwind.config.js';
	const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf-8');
	const newTailwindConfigContent = tailwindConfigContent.replace(
		/colors: {\s*accent: colors\..*\s*}\s/,
		`colors: { accent: colors.${config.accent} } `
	);
	fs.writeFileSync(tailwindConfigPath, newTailwindConfigContent);
}

config = readConfig();
setAccentColor();
setGithubLink();
setLogo();
cleanFolder(routesPath);
cleanFolder(staticPath);
copyAssets(docsPath, staticPath);
processDirectory(docsPath, routesPath, menu);
setupStartPage();
addMenu(menu);
