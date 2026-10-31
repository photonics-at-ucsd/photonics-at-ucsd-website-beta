# Photonics Society at UC San Diego — Optical Demos

Documentation site for the optical demos built by the Photonics Society at UC San Diego. Built with [Astro](https://astro.build), hosted on GitHub Pages, and deployed automatically on every push to `main`.

## Adding or editing a demo

Each demo is one folder in `src/content/demos/`:

```
src/content/demos/
  fabry-perot-mode-filter/
    index.md             ← all of the demo's text, scores and supplies
    diagram.source.svg   ← editable diagram master (Inkscape)
    diagram.svg          ← web version, generated from the master by `npm run diagrams`
    *.jpg                ← photos used by index.md
```

To add a demo:

1. Copy `templates/demo/` to `src/content/demos/<your-demo-name>/`. The folder name becomes the address: `/demos/<your-demo-name>/`.
2. Fill in `index.md`. The template explains each field.
3. Put any images in the same folder and refer to them as `./my-image.jpg`.

The home page's plot and list update automatically.

### The top of the file (between the `---` lines)

This part holds the structured info: title, subtitle, an optional `blurb` (a short paragraph of context shown under the subtitle), date added, images, the supplies list, and `scores:`, with one entry per rubric parameter. Scores can be a single number (`5`) or a range (`[7, 9]`): 0–10, except budget, which is in dollars.

Text up here isn't run through the Markdown converter, with two exceptions: `blurb` and each supply's `details` support *italics*, **bold** and [links](…). Write long text like the blurb as a `>-` block (see the template), so colons in it can't break the file.

If something is wrong, such as a score of 12, a misspelled `need`, a missing image, or a missing or unknown parameter under `scores:`, the build stops. The error names the file and the field, for example `scores.wow: Too big: expected number to be <=10`.

## Diagrams

Diagrams are drawn in Inkscape. The editable master and a web version both live in the demo's folder and are both committed to git:

- **Master:** `diagram.source.svg`, the file you edit. Any `<name>.source.svg` works the same way and becomes `<name>.svg`, so a page can have more than one diagram.
- **Web version:** `diagram.svg`, generated from the master and shown on the page. Don't edit it by hand.

After adding or changing a master, run:

```bash
npm run diagrams
```

This uses Inkscape (it needs to be installed, along with the fonts the diagram uses, such as IBM Plex Sans) to make the web version:

- objects lying completely outside the page are deleted (anything partly outside is cropped at the page edge, as usual)
- text is converted to paths, so the diagram looks the same everywhere without needing fonts
- unused definitions are removed and the file is saved as plain SVG

It only converts masters that changed (`npm run diagrams -- --force` converts all of them), and finds Inkscape on the PATH or in the usual install folders. Set the `INKSCAPE` environment variable to its full path if it's somewhere else.

Each web version records a fingerprint of its master. If you forget to run the command, `npm run dev` and `npm run build` print a warning naming the master that changed, and the site uses the old web version until you run it. `npm run diagrams -- --check` lists out-of-date diagrams without converting anything.

## Video clips

Short looping clips (like GIFs, but much smaller and sharper) can be used anywhere a photo can, including as a demo's front page preview. Put the original clip in the demo's folder named `<name>.source.<ext>` (`.mp4`, `.mov`, `.m4v`, `.webm`, `.mkv`, `.avi` or `.gif`), then run:

```bash
npm run media
```

This makes, next to it:

- `<name>.mp4`: silent, at most 960 px wide and 30 fps, compressed for the web (a few hundred KB for a 5 s clip)
- `<name>.poster.jpg`: its first frame, shown until the clip plays

Then list the clip in `photos:` like a photo, using `video` instead of `src`:

```yaml
photos:
  - { video: ./clip.mp4, alt: "What happens in the clip" }
  - { src: ./photo.jpg, alt: "A photo" }
```

If the first entry is a clip, the front page preview plays it too. Clips play silently on a loop while on screen, have a pause/play button, and show only the still frame to people who've turned on "reduce motion" on their device.

The ffmpeg used for conversion comes with `npm install` (the `@ffmpeg-installer/ffmpeg` package), so nothing else needs installing. Like diagrams, each clip records a fingerprint of its source: if a source changes and `npm run media` isn't run, `npm run dev` and `npm run build` print a warning. `npm run media -- --check` lists out-of-date clips and `--force` reconverts all of them.

Keep source clips short (under ~15 s) and reasonably small. They're committed to git, which keeps every version forever, and GitHub rejects files over 100 MB. Trim long recordings before adding them.

**Quoting tip:** in `{ … }` entries like these, put text containing commas or colons in quotes. An unquoted comma ends the value early.

## Changing the scoring parameters

The parameters, and the rubric text explaining them, live in one file: `src/data/rubric.yaml`. The [scoring rubric page](https://photonicsatucsd.com/resources/rubric/), the scores on every demo page, the front page plot, preview panel and list columns, and the checks on each demo's `scores:` are all built from it. Nothing else lists the parameters.

- **Edit wording, descriptions or level text:** just edit the YAML.
- **Reorder:** move the entries. Every page follows the new order.
- **Add a parameter:** add an entry, then add its key to `scores:` in every demo. The build lists each demo that's missing it.
- **Rename a parameter:** changing `name` only changes what's displayed. Changing `key` means renaming it under `scores:` in every demo; the build flags each old key as `Unrecognized key`.
- **Remove a parameter:** delete the entry, then delete its key from every demo (again, the build lists them).

Parameters with `unit: usd` (budget) are dollar amounts: no meter, and a log scale on the plot. Everything else is 0–10.

### The rest of the file (Markdown)

Write ordinary Markdown. The page layout comes from a few conventions:

| You write | The page shows |
|---|---|
| `## Heading` | A numbered section, also added to the "Contents" sidebar. Name, add or remove sections freely. |
| `## Supplies` | The supplies table (from `supplies:` at the top). |
| `1.` `2.` `3.` list | Steps with square numbers. |
| `:::note[Title]` … `:::` | A boxed note. |
| `:::warning[Title]` … `:::` | The same box in red, labelled WARNING, for safety information. |
| `\| a \| b \|` Markdown tables | A styled table. On phones, each row becomes a block with every value labelled by its column name. |
| `text[^name]` and `[^name]: note text` | A `[1]`-style footnote; the notes are collected into a final numbered "Notes" section. |
| Text before the first `##` | An intro paragraph, in larger type. |
| A numbered list inside a numbered list | Lettered sub-steps (a, b, c). |
| `### Topic` then paragraphs | A row: the title on the left, the text on the right. |
| A line of only `` `code` `` right after a `###` | Formula chips under the row title. |
| `[ref](https://…)` | A small `[ref]` citation link. |
| `**bold**`, `*italic*`, `[links](…)`, `- bullets` | As usual. |

Links to other pages on this site should start with `/` (e.g. `/resources/`). The site's base path is added automatically.

## Adding or editing a resource page

Resource pages (Light Sources, Optomechanics, …) live in `src/content/resources/<page-name>/index.md` and appear at `/resources/<page-name>/` and on the Resources page. The top of the file needs `title`, `subtitle` and `order` (position on the Resources page, lowest first). Add `stub: true` to show the red "this page is a stub" banner, as on demo pages. The rest uses exactly the same Markdown conventions as demo pages above. The scoring rubric is the exception: it's generated from `src/data/rubric.yaml`.

## Other pages' text

Some page text is Markdown in `src/content/pages/`, using the same conventions as demo pages:

- `about.md`: the About page. `title` and `subtitle` (shown under the title) go at the top; the text before the first `##` is the intro, and each `##` starts a numbered section.
- `home.md`: the introduction at the top of the front page, above the plot. `title` is the fixed start of the heading ("Looking for"), and the phrases under `nouns` take turns after it in red, each sliding in from above. The Markdown text is the description beside the heading (below it on narrower screens). Keep phrases short: the longest should fit on one line on a phone (about 25 characters).

## Development

```bash
npm install
npm run dev       # http://localhost:4321/
npm run build     # outputs to dist/
npm run preview   # serve the built site
npm run diagrams  # convert changed diagram masters (see "Diagrams" above)
npm run media     # convert changed video clips (see "Video clips" above)
```

If you change the Markdown plugins in `src/plugins/`, stop the dev server and delete `.astro/` and `node_modules/.astro/` first. Astro caches rendered Markdown, so without this you will keep seeing the old output.

### Where things are

| Path | What |
|---|---|
| `src/content.config.ts` | Demo schema: the allowed fields at the top of each `index.md` |
| `src/data/rubric.yaml` | The scoring parameters and rubric text (see above) |
| `src/data/parameters.ts`, `src/lib/scores.ts` | Load and check `rubric.yaml`; format scores and meters |
| `src/pages/resources/rubric.astro` | Scoring rubric page |
| `src/plugins/remark-demo.mjs`, `rehype-demo.mjs` | Turn the Markdown conventions above into the page layout |
| `scripts/diagrams.mjs`, `scripts/diagram-status.mjs` | `npm run diagrams`: converts diagram masters with Inkscape; fingerprint helpers |
| `scripts/media.mjs`, `scripts/media-status.mjs` | `npm run media`: converts source video clips with ffmpeg; fingerprint helpers |
| `src/integrations/asset-check.mjs` | Warns on dev/build when a diagram master or source clip changed since it was converted |
| `src/components/LoopVideo.astro`, `src/scripts/loop-video.ts`, `src/lib/media.ts` | Looping video clips: markup, play/pause behaviour, finding a clip and its poster |
| `src/pages/index.astro`, `src/scripts/selector.ts` | Demo Selector (plot, preview, sortable list) |
| `src/pages/demos/[slug].astro` | Demo page template |
| `src/pages/demos/michelson/interactive.astro`, `src/scripts/interferometer.js` | Michelson interferometer simulator (a one-off page). Link to a preset with `/demos/michelson/interactive/#…`, copying the hash from its "Get share link" button |
| `src/pages/resources/[slug].astro`, `src/pages/resources/index.astro` | Resource page template and the Resources page |
| `src/components/DocBody.astro` | Page body shared by demo and resource pages: Contents sidebar / sticky bar + the Markdown |
| `src/styles/global.css` | Design tokens and all styles. The desktop design comes first; the "Responsive" section at the end adapts it for narrow windows (≤1199px), tablets (≤959px) and phones (≤719px) |
| `templates/demo/` | Starting point for a new demo |

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The site is served at https://photonicsatucsd.com. One-time setup: in the repository settings under **Pages**, set **Source** to **GitHub Actions** and **Custom domain** to `photonicsatucsd.com` (with **Enforce HTTPS** on). If the domain changes, update `site` in `astro.config.mjs`.

## License

Source code: MIT (see `LICENSE`).
