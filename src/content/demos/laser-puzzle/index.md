---
# ── Copy this folder to src/content/demos/<your-demo-name>/ ──
# The folder name becomes the page address: /demos/<your-demo-name>/
# Use lowercase words separated by dashes, e.g. michelson-interferometer.

title: Laser Puzzle
subtitle: Colorful laser alignment game suitable for all ages!
# Optional: a short paragraph of context for readers new to the phenomenon, shown under the subtitle.
# *italics*, **bold** and [links](…) work here.
blurb: >-
  This is one of our favorites. The concept is simple: there are 3 colors of lasers, and players must move around optics to get the lasers where they need to go (see diagram). There are other examples of games similar to this (e.g. [Laser Maze](https://www.lakeshorelearning.com/products/games/logic-games/laser-maze/s/GA104/) and in [Portal 2](https://theportalwiki.com/wiki/Thermal_Discouragement_Beam)), but ours has its own distinct feel. The requirement that light go straight into the detectors adds substantial challenge and complexity; the table-top size combined with the form factor of the optics also makes it feel a lot more like aligning "real" optics. Once the pieces have been made for this demo, there are a practically infinite number of puzzles that can be prepared (the diagram shows only one example - we have about 15-20 in our records). Getting the full guide, including CAD models and full build instructions, for this out is one of our top priorities, so check back frequently and it should be here soon!
stub: true   # unfinished page: shows a red "this page is a stub" banner at the top
added: 2026-10-29

# Images live in this same folder. All of these are optional.
diagram: ./diagram.svg
#                               # here as diagram.source.svg and run `npm run diagrams` to make
#                               # diagram.svg (see README "Diagrams"). PNG/JPG also work.
diagramAlt: >-
  Two views of the same tabletop puzzle board, unsolved and solved. Red, green and blue lasers and
  detectors of matching colors sit at fixed positions, with orange barriers between them. Players
  move one-sided mirrors, a two-sided mirror and a prism to steer each beam straight into its
  matching detector; the objective is to activate all 3 detectors at the same time. Rules: lasers
  and detectors are fixed; mirrors and prisms can be moved anywhere; a detector only responds to
  its own color of laser, and only if the light enters it straight-on.
# thumbnail: ./diagram.svg        # front page image (defaults to the first photo, then the diagram)
photos:
  - { src: ./laser-puzzle-at-event.jpg, alt: "UCSD students solve the laser puzzle at an Optics Hour event." }
  - { src: ./laser-puzzle-kindergarten.jpg, alt: "An elementary school student tries out an early prototype of the laser puzzle under the supervision of a Photonics Society member." }
#   - { video: ./clip.mp4, alt: "What happens in the clip" }   # looping clip: save the original
#                               # as clip.source.mp4 (or .mov/.gif) and run `npm run media`

# One entry per parameter in src/data/rubric.yaml — see the Scoring rubric page for what each
# number means. Each is one number (5) or a range ([7, 9]): 0–10, except budget, which is in dollars.
scores:
  budget: [100,1000]
  tools: [3,8]                   # Required tools
  manufacturingDifficulty: [5, 6]
  alignmentDifficulty: 2
  portability: 4
  setupTime: [4,6]
  presentationComplexity: [1,8]
  conceptComplexity: [3,5]
  wow: 8                     # WOW factor

# Shown as a table under the "## Supplies" heading.
# need: required | effectively-required | likely-required | maybe-required |
#       highly-recommended | recommended | optional
# details can use Markdown links and *emphasis*. cost can be one line or a list of lines.
#supplies:
#  - item: Example part
#    need: required
#    details: What it is and why you need it. See [somewhere](https://example.com).
#    cost: $20
#    link: { label: Amazon, url: https://example.com }
#  - item: Another part
#    need: recommended
#    details: Nice to have.
#    cost: ["$5 used", "$15 new"]
#    link: { label: DIY }   # no url → shown as plain text

# draft: true   # uncomment to hide this demo from the site while you work on it
---

## Opportunities for improvement

- Full guide coming soon!
