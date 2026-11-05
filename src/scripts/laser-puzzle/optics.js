// The physics at a surface: reflection, refraction (Snell's law with total internal reflection) and
// the wavelength-dependent refractive index of prism materials. No partial (Fresnel) reflections.

import { add, dot, scale, sub } from './geometry.js';

/** Refractive index from Sellmeier coefficients { B: [...], C: [...] } (C in µm²) at a wavelength in nm. */
export function refractiveIndex(material, wavelengthNm) {
  const l2 = (wavelengthNm / 1000) ** 2;
  let n2 = 1;
  material.B.forEach((b, i) => (n2 += (b * l2) / (l2 - material.C[i])));
  return Math.sqrt(n2);
}

/** Mirror reflection of unit direction d off a surface with unit normal n (either orientation). */
export function reflect(d, n) {
  return sub(d, scale(n, 2 * dot(d, n)));
}

/**
 * Refraction of unit direction d through a surface with unit normal n (either orientation), going
 * from index n1 into index n2. Returns the new direction, or the reflected one if the light is
 * totally internally reflected (`tir: true`).
 */
export function refract(d, n, n1, n2) {
  const N = dot(d, n) < 0 ? n : scale(n, -1); // normal facing back against the incoming light
  const eta = n1 / n2;
  const cosI = -dot(d, N);
  const k = 1 - eta * eta * (1 - cosI * cosI);
  if (k < 0) return { dir: reflect(d, N), tir: true };
  return { dir: add(scale(d, eta), scale(N, eta * cosI - Math.sqrt(k))), tir: false };
}
