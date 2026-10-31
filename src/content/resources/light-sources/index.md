---
title: Light Sources
subtitle: Finding the best and most economical light sources for your demos.
order: 1
---

## Summary

| Type | Best when… | Typical cost |
| --- | --- | --- |
| [Laser pointer](#laser-pointers) | You want lasers that are cheap and come in different colors (violet, green, red) | $15 for a pack of 3 colors |
| [HeNe laser](#affordable-hene-lasers) | You’re doing anything that needs high temporal coherence (interference, resonators, frequency beating) | $200–$300 (used, on eBay) |
| [Phone flashlight](#phone-flashlights) | You need a white light in a pinch that isn’t actually part of any demo | — |
| [White LED chip or LED flashlight](#white-led-sources-and-flashlights) | You want a cheap white light source to actually be built into a setup. Buying bare LEDs provides much more flexibility but requires supporting circuitry. | $10–20 on Amazon |
| [LEP flashlight](#lep-sources) | You want a white light source with great spatial coherence (which makes almost every demo better — **we cannot emphasize or recommend these enough**) | $100 on Amazon |

## Laser pointers

:::warning[Laser safety]
You should assume that all laser pointers you buy are **not** eye-safe unless you measure the output power yourself. Every 532 nm laser we have ever purchased on Amazon has output at least 40 mW out of the box, which is 8× the listed “<5 mW” spec and definitely enough to cause eye damage![^532]
:::

### How much power is safe?

The most complete and safe answer to this is [pretty situation specific](https://www.kenteklaserstore.com/online-web-edition-easy-haz-laser-hazard-analysis-software). After consulting the laser safety officer (LSO) here at UCSD, he directed us as follows: for our public-facing events, **stick to visible lasers with a power of 2 mW or lower**. This aligns (with some margin) with the ANSI [laser safety classifications](https://www.lasersafetyfacts.com/laserclasses.html), where Class 3R and below is generally considered eye-safe.

If you’re part of an organization or university with an LSO, we strongly recommend you just ask them about your particular situation or demo — *definitely* if you’re doing anything with non-eye-safe lasers (invisible wavelengths or above 5 mW).

### Measuring laser power

Our recommendation:

1. If you can afford it, buy a used optical power meter. Do your own research, but here are some pointers you may find useful:
   1. On eBay, you can get a Newport 1830-C power meter box for ~$300 and a power meter head for $200 if you look around enough, or equivalents.
   2. Or, a Thorlabs PM101 series meter and a compatible head can probably also be found for a similar cost.
   3. These two options are probably as cheap as you’ll get for a “lab grade” option.
   4. Cheaper handheld options for laser safety are probably available from AliExpress etc., but you may not want to trust them.
2. If you can’t afford this but you are at a university, ask to borrow one from a professor or the laser safety officer on campus. Any sane optics person should be more than happy to provide this, given you’re doing it for safety reasons.
3. If you’re not so fortunate as to have people nearby with this equipment, using a 10 dB ND filter (often labelled as ND9) on all 405 and 532 nm laser pointers you receive is likely safe. We have found that 630 nm laser pointers are typically not as over-juiced.

If you buy a laser that’s overpowered, the simplest solution is just to tape some [neutral density film](https://www.amazon.com/Lighting-Neutral-Density-Flashlight-Photography/dp/B0FY6997VN/) over the aperture and re-measure the power. After installing this attenuation, run the laser for a while to make sure the film isn’t melting or distorting (we have seen this with particularly juicy 532 nm sources). If it is, use lower ND film and compensate by using more layers of it.

### Choosing laser pointers

- The cheap laser diode colors on the market are 405 nm, 532 nm, and 630 nm. You can get packs of all 3 colors on Amazon for [$10–15](https://www.amazon.com/MEUSNO-Laser-Pointer-Product-Output/dp/B09SW2DKQ8).
  - 405 nm is actually a pretty dim violet near the edge of human vision, but since many organic materials fluoresce blue when hit by this wavelength, it works well for blue.
- Always buy extra AAA batteries when buying laser pointers.
- Where battery-powered laser pointers fall short:
  - Their output power and wavelength are very unstable.
  - They only have a few hours of battery life (optimistically) with the output on.
  - Since they use a button, they’re just not designed to run continuously (you need to tape the button down or use a binder clip to keep them on).
  - They have only moderately good temporal coherence — the spectral FWHM is around 1 nm for most laser pointers.
    - Given this, if used in interferometry demos, path lengths between the two sides need to be matched to ~<0.5 mm to see fringes.

[^532]: Cheap 532 nm lasers are particularly sinister for multiple reasons. These lasers typically use an 808 nm pump, powering a 1064 nm Nd:YAG lasing transition, which is then frequency doubled to 532 nm. Scary thing 1: many cheap lasers do not effectively filter out the residual 808 and 1064 nm light, which are both invisible! Scary thing 2: it is easier to efficiently frequency double higher power beams (as it’s a nonlinear process), which is why these lasers are usually overpowered — in some ways it is harder to make a dimmer laser. Scary thing 3: if the power of the 808 nm pump falls, the 532 nm light can fall to near-zero levels before the 808 or 1064 nm beams are even close to turning off. This makes a terrifying combination: a laser pointer with an invisible beam, whose operator is probably trying to figure out why it won’t turn on (and may look straight into it). These Amazon lasers are no joke!

## Affordable HeNe lasers

Unlike laser diodes, red HeNe lasers have a spectral linewidth of 1.5 GHz at the very worst (as this is the Doppler-broadened gain bandwidth of the transition the laser operates on), and if you have a single mode HeNe, this linewidth is more like <1 MHz. This means their coherence length is much longer and interference can be observed even over great path length imbalances. Also, tube-based lasers are just really cool for demos, particularly if you have some without a cover. Everyone has seen a laser pointer, but gas lasers look like fancy lab lasers!

**A note on backreflections into HeNe lasers.** Sometimes in optical setups, light can reflect directly back into HeNe lasers. In general, this should be avoided as it can cause power instability and general misbehavior of the laser. We have even seen lasers shut off, or refuse to begin lasing when such external feedback is present. Fortunately, to our knowledge, there is no risk of permanent damage to the laser in such situations. Simply ensure that any optics external to the laser are tilted slightly to prevent direct backreflections, and these effects can be easily avoided.

Demos that require a HeNe (some of these haven't been posted yet - now you have a sneak peak into what's coming in the future!):
<!-- TODO: link these to their demo pages as they're added -->

- *Strongly recommended* for any interferometry demos, like the [Michelson interferometer](/demos/michelson/).
- Absolute gravimeter (due to the large path length imbalance).
- [Fabry–Perot demos](/demos/fabry-perot-mode-filter/).
- Any demonstrations of frequency shifting using an Acousto-optic modulator (these are not part of [the existing documentation](/demos/acousto-optic/) but is a neat functionality we're interested in trying in the future).
- [Zeeman splitting](/demos/zeeman-hene/) (requires a special laser tube/source).

Brand new laboratory HeNe lasers are expensive — $1k–$5k! Fortunately, HeNes have had so many real-world uses (particularly before the commoditization of laser diodes) that many are available on the used market.

**Our favorite HeNes for demos.** For both of the lasers below, the high voltage circuitry is internal and all the laser needs is a 12 V DC power brick with a barrel connector. This is a huge advantage both in terms of space and safety. If for some reason you can’t find used copies of either, we highly recommend looking for another option that uses a low voltage DC power supply so you don’t have to bother with a high voltage supply.

These lasers also have short tube lengths, yielding a mode spacing around 1 GHz. As the gain bandwidth is only 1.5 GHz, they have only one or two lasing modes (depending on the temperature of the tube), which can simplify some things in resonator demos.

### JDS Uniphase (now Lumentum) 1508/1508P

`$150–$250 on eBay`

- Slot on the enclosure makes mounting super easy
- 1508P is linearly polarized, which is sometimes useful
- Identical to the Thorlabs HNLS008 series lasers, which cost $1.5k new

[Manual (PDF)](https://www.artisantg.com/info/Lumentum_JDSU_1508_1_Novette_Manual_2024321103117.pdf)

### Melles Griot 05-LLR-811

`$150–$300 on eBay`

- Round enclosure, so you need a clamp to mount it

[Manual (PDF)](https://vrguez.webs.ull.es/DOCENCIA/Laser%20He-Ne%20Melles%20Griot.pdf)



## White light

For some demos a laser won’t work, and white light is required. Unfortunately, unlike (most) lasers, (most) white light sources don’t have good spatial coherence.

So what is spatial coherence? This explanation may cause any statistical optics enjoyers in the audience to cringe, but higher spatial coherence essentially means the light is more like a laser beam. Alternatively, higher spatial coherence means it can be focused to a smaller point, or that the light casts a sharper shadow (more rigorous discussions [here](https://www.rp-photonics.com/coherence.html)). One useful trend to know is that spatial coherence typically improves as you get further from a source (basically, because it looks more like a point source the further it is from you). The following light sources are loosely sorted from worst to best by the spatial coherence of the light they emit (as evaluated at typical distances from the source):

- A big red-hot piece of metal
- Fluorescent lights in offices
- The sun, as seen from Earth
- A small, bare (no lens) white LED
- An LEP white light source
- A laser

One key example that benefits substantially from a good spatial coherence source is holograms: if viewed with a poor spatial coherence source, holograms appear blurry, or with a sort of depth of field, due to the diversity of angles of light illuminating them. High spatial coherence sources yield much clearer images. The LEP section below contains more examples where spatial coherence makes a big difference.

### Phone flashlights

The flashlights on the cell phones that many of us carry are actually quite awesome. They’re bright, and the emitter size of the flashlight is quite small, so the spatial coherence of the emitted light is pretty good. They work super well for viewing holograms, but it’s not super practical to build setups around phone flashlights unless you have to.

### White LED sources and flashlights

Many off-the-shelf white flashlights prioritize overall brightness over having a small emitter area and are often not as good as phone flashlights. You can, however, buy [discrete white LEDs](https://www.amazon.com/Chanzon-High-Power-White-6000K/dp/B01DBZICDC/) that are even better than phone flashlights while also being more suitable for integration into a demo. Just make sure you get a constant current power supply for the LEDs and set up proper heat sinking.

### LEP sources

**If you can afford it, we absolutely recommend you get one of these for general use.** Laser Excited Phosphor sources are the closest thing you’re going to get to a portable white laser with current (2026) technology.[^white-laser] These sources are made by focusing a blue laser on a yellow phosphor, yielding an extremely intense white light source coming from a spot much smaller than most LEDs can achieve. This means you can get a super powerful beam that doesn’t diverge much over the length of a normal optical table, and can be focused down to small points.

This technology is most popular among flashlight enthusiasts, and fortunately this demand has resulted in relatively affordable products such as the [Thor Mini for $99](https://www.amazon.com/LUMINTOP-Thor-Mini-Rechargeable-Flashlight/dp/B0D7Q6G4WN/). Searching on Chinese websites can yield products that are powered from a wired DC supply instead of a battery (which could be more ideal), but the Thor Mini on battery power has worked well enough for us.

We have found that these demos are dramatically better with an LEP source:

- **Diffraction grating:** the beam not only yields extremely bright, sharp, and vibrant rainbows, but the separation between the blue pump and yellow fluorescence is a great spectral feature for discussion.
- **[Crookes radiometer](/demos/crookes-radiometer/):** causes it to spin super fast, similar to exposure to sunlight.
- **Schlieren:** allows for much sharper and brighter imaging without using a laser source (to reach the brightness of the LEP source, you’d have to use a laser source that is not eye-safe).
- **White light interferometry:** an extremely bright and vibrant interference pattern containing colors that don’t look like anything else you’ve ever seen. Plus, the laser spike in the spectrum makes alignment easier.

[^white-laser]: But hopefully that will not be true for [too much longer](https://www.nature.com/articles/s41586-026-10517-4)!
