/**
 * The page background — single switch point.
 *
 * Comment one line, uncomment the other. Nothing else changes: the layout
 * renders <Background /> and never names a specific effect.
 *
 *   NeuralMesh — drifting particles with links between near neighbours and
 *                brighter links to the pointer. A constellation.
 *   FlowField  — particles riding a slowly-rotating noise field, leaving
 *                fading trails. Reads as movement through a system, and the
 *                field parts around the cursor rather than gathering at it.
 *
 * Both take their colour from --field-dot, are masked to fade out below the
 * hero, stop when the tab is hidden, and render a single static frame under
 * prefers-reduced-motion.
 */

export { NeuralMesh as Background } from "./neural-mesh"
// export { FlowField as Background } from "./flow-field"
