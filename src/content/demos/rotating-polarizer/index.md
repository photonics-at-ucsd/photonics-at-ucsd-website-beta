---
# ── Copy this folder to src/content/demos/<your-demo-name>/ ──
# The folder name becomes the page address: /demos/<your-demo-name>/
# Use lowercase words separated by dashes, e.g. michelson-interferometer.

title: Rotating Polarizer
subtitle: See changes in intensity due to polarization and amaze all ages while introducing them to the nature of light.
# Optional: a short paragraph of context for readers new to the phenomenon, shown under the subtitle.
# *italics*, **bold** and [links](…) work here.
blurb: >-
  Polarization is one of the amazing properties that arise from the wave nature of light. From sunglasses to 3D cinema and displays, is one of the most easily found optical phenomena in our daily lives. However, its true physical origin is often not well understood. This demo uses a simple electromechanical setup to make two polarizers rotate relative to each other and to allow observers to see the stunning intensity changes that arise. They can further interact with the demo by passing objects, such as different types of plastic utensils, in between the polarizers to see the effect of different materials on the polarization of light passing through them. **This demo also has our first full build guide so you can create your own!**

# stub: true   # unfinished page: shows a red "this page is a stub" banner at the top
added: 2026-11-01 # YYYY-MM-DD, used for "most recent" sorting

# Images live in this same folder. All of these are optional.
# diagram: ./diagram.svg        # shown full width at the top of the page. Save the Inkscape master
#                               # here as diagram.source.svg and run `npm run diagrams` to make
#                               # diagram.svg (see README "Diagrams"). PNG/JPG also work.
# diagramAlt: Describe the diagram for screen readers.
# thumbnail: ./thumb.jpg        # front page image (defaults to the first photo, then the diagram)
# photos:                       # up to two are shown beside the diagram
#   - { src: ./photo-1.jpg, alt: "What the photo shows" }
#   - { video: ./clip.mp4, alt: "What happens in the clip" }   # looping clip: save the original
#                               # as clip.source.mp4 (or .mov/.gif) and run `npm run media`

# One entry per parameter in src/data/rubric.yaml — see the Scoring rubric page for what each
# number means. Each is one number (5) or a range ([7, 9]): 0–10, except budget, which is in dollars.
scores:
  budget: [50, 100]
  tools: 3                   # Required tools
  manufacturingDifficulty: [4, 5]
  alignmentDifficulty: 2
  portability: 7
  setupTime: 3
  presentationComplexity: 4
  conceptComplexity: 5
  wow: 8                     # WOW factor

# Shown as a table under the "## Supplies" heading.
# need: required | effectively-required | likely-required | maybe-required |
#       highly-recommended | recommended | optional
# details can use Markdown links and *emphasis*. cost can be one line or a list of lines.
supplies:
  - item: Example part
    need: required
    details: What it is and why you need it. See [somewhere](https://example.com).
    cost: $20
    link: { label: Amazon, url: https://example.com }
  - item: Another part
    need: recommended
    details: Nice to have.
    cost: ["$5 used", "$15 new"]
    link: { label: DIY }   # no url → shown as plain text

# draft: true   # uncomment to hide this demo from the site while you work on it
---

## Supplies

<!-- The table comes from `supplies` above. Anything written here appears above it. -->

## Alignment

1. Numbered lists become numbered steps.
2. Use **bold** for emphasis and [links](#presentation-ideas) as usual.

:::note[A short title for the note]
- A boxed note. Everything up to the closing `:::` goes inside it.
:::

## Presentation ideas

### The effect

A `###` heading starts a row: the heading on the left, the text below it on the right.

### Audience

Who this works best for.

## Subtle tidbits

### A topic

`L ≤ 2R` `another formula`

A line of only `code` right after a `###` heading becomes formula chips. Cite sources like this [ref](https://example.com).

## Opportunities for improvement

- Bullet lists work as usual.
