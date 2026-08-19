import { Layer } from './types'
import { createSphereLayer } from './layers/sphere'
import { createNeuralMeshLayer } from './layers/mesh'
import { createParticleVortexLayer } from './layers/vortex'

export const DEFAULT_BG = 'mobius'

// Internal mapping to construct layers
type LayerFactory = {
  create: () => Layer
  family?: string
  mode?: string
}

const factories: Record<string, LayerFactory> = {
  'mobius': { create: () => createSphereLayer('ai-core', 'mobius', 'Möbius Ribbon'), family: 'sphere', mode: 'ai-core' },
  'globe': { create: () => createSphereLayer('globe', 'globe', 'Sphere Globe'), family: 'sphere', mode: 'globe' },
  'lattice': { create: () => createSphereLayer('lattice', 'lattice', 'Data Lattice'), family: 'sphere', mode: 'lattice' },
  'swirl': { create: () => createSphereLayer('swirl', 'swirl', 'Particle Swirl'), family: 'sphere', mode: 'swirl' },
  'ai-core': { create: () => createSphereLayer('ai-core', 'ai-core', 'AI Core'), family: 'sphere', mode: 'ai-core' },
  'mesh': { create: () => createNeuralMeshLayer('mesh', 'Neural Mesh'), family: 'mesh' },
  'vortex': { create: () => createParticleVortexLayer('vortex', 'Particle Vortex'), family: 'vortex' }
}

export function resolveBackgrounds(bgQuery: string | null): Layer[] {
  const query = bgQuery || DEFAULT_BG
  if (query === 'none') return []

  const parts = query.split(',')
  const activeLayers: Layer[] = []

  for (const part of parts) {
    if (part.includes('>')) {
      const sequence = part.split('>')
      // Check if all belong to the sphere family
      const allSphere = sequence.every(id => factories[id]?.family === 'sphere')
      
      if (allSphere) {
        // Resolve to a SINGLE sphere layer instance that cycles its modes
        const modes = sequence.map(id => factories[id].mode!)
        const sphereLayer = createSphereLayer(modes[0] as any, part, 'Morphing Sphere')
        if ((sphereLayer as any).setModes) {
          (sphereLayer as any).setModes(modes)
        }
        activeLayers.push(sphereLayer)
      } else {
        // Host-level alpha crossfade (managed by host wrapper later if needed)
        // For now, just return them wrapped in a sequence object or just return the first one
        // The host will need to know it's a sequence layer.
        // We can create a HostSequenceLayer that wraps them.
        activeLayers.push(createHostSequenceLayer(part, sequence))
      }
    } else {
      const factory = factories[part]
      if (factory) {
        activeLayers.push(factory.create())
      } else {
        // Fallback to default
        if (part !== DEFAULT_BG) {
           return resolveBackgrounds(DEFAULT_BG)
        }
      }
    }
  }

  return activeLayers
}

function createHostSequenceLayer(id: string, sequence: string[]): Layer {
  const layers = sequence.map(seqId => factories[seqId]?.create()).filter(Boolean) as Layer[]
  if (layers.length === 0) return factories[DEFAULT_BG].create()

  let activeIndex = 0
  let timeInState = 0
  const TRANSITION_FRAMES = 120
  const DURATION_FRAMES = 500
  let currentBudget = 0
  let isLight = false

  return {
    id,
    label: `Sequence: ${sequence.join(' > ')}`,
    scope: layers[0].scope,
    init(ctx, w, h, budget, isLightMode) {
      currentBudget = budget
      isLight = isLightMode
      layers.forEach(l => l.init(ctx, w, h, Math.floor(budget / 2), isLightMode)) // Split budget for crossfade
    },
    draw(ctx, t) {
      timeInState++
      if (timeInState > DURATION_FRAMES) {
        timeInState = 0
        activeIndex = (activeIndex + 1) % layers.length
      }

      const nextIndex = (activeIndex + 1) % layers.length
      
      if (timeInState > DURATION_FRAMES - TRANSITION_FRAMES) {
        // Crossfade
        const progress = (timeInState - (DURATION_FRAMES - TRANSITION_FRAMES)) / TRANSITION_FRAMES
        
        ctx.globalAlpha = 1 - progress
        layers[activeIndex].draw(ctx, t)
        
        ctx.globalAlpha = progress
        layers[nextIndex].draw(ctx, t)
        
        ctx.globalAlpha = 1
      } else {
        layers[activeIndex].draw(ctx, t)
      }
    },
    dispose() {
      layers.forEach(l => l.dispose())
    }
  }
}
