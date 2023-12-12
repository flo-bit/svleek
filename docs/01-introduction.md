# Svleek

This is the documentation/demo for Svleek. Svleek is a minimal, beautiful, and fast documentation generator. It is designed to be easy to use and to be able to generate beautiful documentation in seconds.

This is a work in progress, and is not ready for production use.

## Use

Currently the only way to use Svleek is to clone the repository, copy your docs into the `docs/` folder, then run the following commands:

```bash
npm install
npm run build
```

The documentation will be generated in the `build` folder. You can also run this command to preview it:

```bash
npm run preview
```

## Folder structure

All markdown files in the `docs/` folder will be parsed and converted to HTML. Subfolders are also supported and will become subpages (one level down only). Files that are not markdown files will be ignored (but will be copied to the static folder and can be linked/inlined in markdown files, e.g. `docs/selfie.png` can be inlined like this: `![this is me](/selfie.png)`).

Markdown files and folders are sorted alphabetically, you can prefix them with numbers to change the order. If you name a file `00-test.md` it's actual name will be `test.md` but it will be before files that start with `01-` and so on.

## Config

Create a `svleek.config.json` file in your docs folder to configure Svleek. The following options are available:

```json
{
	"title": "Svleek", // sets the title of the main page
	"subtitle": "Minimal, Beautiful, and Fast Documentation", // sets the subtitle of the main page
	"image": "/screenshot.png", // sets the image of the main page
	"first_page": "/docs/introduction", // where the button on the main page should link to
	"button_label": "Read the docs!", // the label of the button on the main page
	"github": "https://github.com", // the link to the github repo of the project
	"accent": "sky" // one of the tailwind colors
}
```

See [here](https://tailwindcss.com/docs/customizing-colors#default-color-palette) for a list of all available colors.

You can also add a logo.svg file to the docs folder that will be used on the main page, in the navbar and as the favicon.
