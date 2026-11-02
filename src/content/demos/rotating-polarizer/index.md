---
# ── Copy this folder to src/content/demos/<your-demo-name>/ ──
# The folder name becomes the page address: /demos/<your-demo-name>/
# Use lowercase words separated by dashes, e.g. michelson-interferometer.

title: Rotating Polarizer
subtitle: See changes in intensity due to polarization and amaze all ages while introducing them to the nature of light.
# Optional: a short paragraph of context for readers new to the phenomenon, shown under the subtitle.
# *italics*, **bold** and [links](…) work here.
blurb: >-
  Polarization is one of the amazing properties that arise from the wave nature of light. From sunglasses to 3D cinema and displays, is one of the most easily found optical phenomena in our daily lives. This demo uses a simple electromechanical setup to make two polarizers rotate relative to each other and to allow observers to see the stunning intensity changes that arise. They can further interact with the demo by passing objects, such as different types of plastic utensils, in between the polarizers to see the effect of different materials on the polarization of light passing through them. **This demo also has our first full build guide so you can create your own!**

# stub: true   # unfinished page: shows a red "this page is a stub" banner at the top
added: 2026-11-01 # YYYY-MM-DD, used for "most recent" sorting

# Images live in this same folder. All of these are optional.
diagram: ./diagram.svg        # shown full width at the top of the page. Save the Inkscape master
#                               # here as diagram.source.svg and run `npm run diagrams` to make
#                               # diagram.svg (see README "Diagrams"). PNG/JPG also work.
# diagramAlt: Describe the diagram for screen readers.
# thumbnail: ./thumb.jpg        # front page image (defaults to the first photo, then the diagram)
photos:                       # up to two are shown beside the diagram
   - { video: ./video.mp4, alt: "Rotating polarizer in action!" }   # looping clip: save the original
#                               # as clip.source.mp4 (or .mov/.gif) and run `npm run media`
   - { src: ./colorful-objects.jpg, alt: "Colorful patterns from passing a plastic through the polarizer" }

# One entry per parameter in src/data/rubric.yaml — see the Scoring rubric page for what each
# number means. Each is one number (5) or a range ([7, 9]): 0–10, except budget, which is in dollars.
scores:
  budget: [50, 100]
  tools: 3                   # Required tools
  manufacturingDifficulty: 4
  alignmentDifficulty: 0
  portability: [5,7]
  setupTime: 1
  presentationComplexity: [2,8]
  conceptComplexity: [5,7]
  wow: 5                     # WOW factor

# Shown as a table under the "## Supplies" heading.
# need: required | effectively-required | likely-required | maybe-required |
#       highly-recommended | recommended | optional
# details can use Markdown links and *emphasis*. cost can be one line or a list of lines.
#supplies:

# draft: true   # uncomment to hide this demo from the site while you work on it
---
## Build Guide
This demo has a [full build guide](https://docs.google.com/document/d/17LX7pu8DwwLDtRS-0BdYAuyCTlxGZm-d26hJAvVb6G0/edit?usp=sharing) to build a relatively low cost version that uses MDF, laser cutting and 3D printing, easy to find electronics, and a few other standardized components such as nuts and bolts. Our design helps prevent the need of optomechanical bases and posts in case you don’t have access to a formal university optics lab. You can find the [full build guide here](https://docs.google.com/document/d/17LX7pu8DwwLDtRS-0BdYAuyCTlxGZm-d26hJAvVb6G0/edit?usp=sharing). The [CAD assembly](https://cad.onshape.com/documents/973d08c03346aa7f2df32aaa/w/ab300ccd5454226b7df219cc/e/f430be3e1cba726abb87b598?page=2&email=jleyvajara%40ucsd.edu&renderMode=0&uiState=6ae828319133eb89d160b91c) and all the [manufacturing files](https://drive.google.com/drive/folders/1rFvIHWe0HS-Z3nVmHNrxQzi1efH48Vhr?usp=sharing) referenced in the guide can be found here as well.

## Opportunities for improvement

- More sections and details such as Presentation Ideas coming soon! 
