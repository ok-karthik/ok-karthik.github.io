export type Layer = {
  id: string
  label: string                       // for docs/BACKGROUNDS.md
  scope: 'hero' | 'page'
  init(ctx: CanvasRenderingContext2D, w: number, h: number, budget: number, isLightMode: boolean): void
  draw(ctx: CanvasRenderingContext2D, t: number, pointer: { x: number, y: number, active: boolean }): void
  dispose(): void
}
