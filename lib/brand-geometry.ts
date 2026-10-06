export const BRAND_VIEWBOX = { width: 360, height: 340 } as const

type Point = readonly [number, number]

// LOGO-DESIGN-1: vertices retain the three ribbons and their negative space.
const pieces: { id: string; fill: string; vertices: readonly Point[] }[] = [
  {
    id: "left",
    fill: "#2D78FF",
    vertices: [[0, 46], [69, 0], [245, 111], [245, 204], [89, 115], [89, 277], [0, 331]],
  },
  {
    id: "right",
    fill: "#2059E8",
    vertices: [[258, 72], [360, 10], [360, 286], [258, 226]],
  },
  {
    id: "lower",
    fill: "#2875FA",
    vertices: [[108, 148], [360, 286], [280, 340], [108, 241]],
  },
]

// x = W × xBase/360; y = H × yBase/340. Defaults match the standalone SVG.
export function createBrandGeometry(
  width: number = BRAND_VIEWBOX.width,
  height: number = BRAND_VIEWBOX.height,
) {
  return pieces.map(({ id, fill, vertices }) => ({
    id,
    fill,
    d: vertices.map(([x, y], index) =>
      `${index === 0 ? "M" : "L"}${x * (width / BRAND_VIEWBOX.width)} ${y * (height / BRAND_VIEWBOX.height)}`,
    ).join(" ") + " Z",
  }))
}
