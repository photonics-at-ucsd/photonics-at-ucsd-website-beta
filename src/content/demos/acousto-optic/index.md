---
title: Acousto-optic Modulator
subtitle: Watch beams of light diffract off sound waves
blurb: >-
  Acousto-optic modulators are an important building block in advanced optical systems, providing several useful capabilities such as high speed switching, intensity modulation, beam deflection, and frequency modulation. These modulators operate on a very interesting principle: a high power, (usually) sinusoidal electrical signal is delivered to the modulator, generating pressure waves in a crystal which light may diffract off of. This setup is a simple demonstration of an AOM, where a single laser beam enters the AOM but an additional diffracted beam can be seen exiting it. Audiences can see the impact on the position and brightness of the diffracted beam when the power and frequency of the RF waveform is adjusted.
added: 2026-10-25
stub: true
diagram: ./diagram.svg
diagramAlt: >-
  Setup: a laser (any type) shines through an acousto-optic modulator, which is driven by an RF
  source (about 50–200 MHz) through an RF amplifier. Two beams leave the modulator, the transmitted
  beam and a slightly deflected diffracted beam, and land side by side on a viewing screen about
  1–4 m away.
#photos:

#- { src: ./setup_rough.jpg, alt: The demo roughly put together on a big optical table in the lab.}

# Scores: see /resources/rubric/ for what each number means.
scores:
  budget: [1000,3000]
  tools: 2
  manufacturingDifficulty: 3
  alignmentDifficulty: [4,5]
  portability: 3
  setupTime: [3,5]
  presentationComplexity: [5,8]
  conceptComplexity: [8,9]
  wow: [2,3]
---

## Opportunities for improvement

- Interfere the transmitted beam with the diffracted beam on a photodetector: a beatnote will appear at the drive frequency of the AOM due to the frequency shift the AOM applies to the diffracted beam.
