---
# ── Copy this folder to src/content/demos/<your-demo-name>/ ──
# The folder name becomes the page address: /demos/<your-demo-name>/
# Use lowercase words separated by dashes, e.g. michelson-interferometer.

title: Holographic Chocolate
subtitle: Diffractive optics you can eat!
# Optional: a short paragraph of context for readers new to the phenomenon, shown under the subtitle.
# *italics*, **bold** and [links](…) work here.
blurb: >-
  Most objects in our daily lives look a particular color because of the material they're made of. However, in special situations, the colors we see can be purely due to the structure or geometry of an object, independent of what the object is actually made of. These chocolates provide the perfect (and edible!) example of this. The vibrant iridescent colors on the surface of the chocolate come entirely from light diffracting off of microscopic patterns in the surface of the chocolate. Due to the fragility of this pattern, these chocolates do not keep or ship well, and the only real way to get these is by making them yourself using a special (but inexpensive) mold. Doing this requires carefully tempering the chocolate, providing a secondary lesson about polymorphs/crystal phases!
stub: true   # unfinished page: shows a red "this page is a stub" banner at the top
added: 2026-10-29 # YYYY-MM-DD, used for "most recent" sorting

# Images live in this same folder. All of these are optional.
diagram: ./diagram.svg        # shown full width at the top of the page. Save the Inkscape master
#                               # here as diagram.source.svg and run `npm run diagrams` to make
#                               # diagram.svg (see README "Diagrams"). PNG/JPG also work.
diagramAlt: >-
  White light strikes the surface of a chocolate bar and some of it diffracts, splitting into a
  rainbow of colored rays. A magnified inset shows why: the chocolate's surface is covered in
  microscopic ridges spaced about one wavelength of light apart.
# thumbnail: ./thumb.jpg        # front page image (defaults to the first photo, then the diagram)
photos:                       # up to two are shown beside the diagram
  - { video: ./video.mp4, alt: "Video of colorful patterns changing colors as the position of a light source is changed above the chocolates." }
  - { src: ./close-up.jpg, alt: "Close-up photo of some holographic chocolates." }
#   - { video: ./clip.mp4, alt: "What happens in the clip" }   # looping clip: save the original
#                               # as clip.source.mp4 (or .mov/.gif) and run `npm run media`

# One entry per parameter in src/data/rubric.yaml — see the Scoring rubric page for what each
# number means. Each is one number (5) or a range ([7, 9]): 0–10, except budget, which is in dollars.
scores:
  budget: [10,30]
  tools: 1                   # Required tools
  manufacturingDifficulty: [7,8]
  alignmentDifficulty: 0
  portability: 5
  setupTime: [0,1]
  presentationComplexity: [1,9]
  conceptComplexity: [6,8]
  wow: 8                     # WOW factor



# draft: true   # uncomment to hide this demo from the site while you work on it
---

## Opportunities for improvement

- This project uses [off-the-shelf molds](https://www.amazon.com/dp/B0CJV7194C) which come with a small variety of generic patterns. One day, we would like to make our own custom molds with patterns specific to our student organization. This entails first making a "master" from which silicone molds can be made. Making this master requires either analog holography methods or some (likely lithographic) method to fabricate computer-generated holograms.
