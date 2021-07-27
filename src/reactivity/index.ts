import { queueJob } from './scheduler'

type Effect = () => void
type Deps = Set<Effect>
type KeyToDepMap = Map<string| symbol, Deps>
type EffectMap = WeakMap<any, KeyToDepMap>

const runningEffects: Effect[] = []
const effectMap: EffectMap = new WeakMap()

const track = <T extends Record<string| symbol, any>>(target: T, property: string | symbol) => {
  const effects = runningEffects.slice()
  const oldDeps = effectMap.get(target)?.get(property) || new Set<Effect>()

  const deps: Deps = new Set([...oldDeps, ...effects])
  const depMap: KeyToDepMap = effectMap.get(target) || new Map()
  depMap.set(property, deps)
  effectMap.set(target, depMap)
}

const trigger = <T extends Record<string| symbol, any>>(target: T, property: string | symbol) => {
  const effects = effectMap.get(target)?.get(property)
  if (effects) {
    effects.forEach((effect) => {
      queueJob(effect)
    })
  }
}

export const reactive = <T extends Record<string| symbol, any>>(target: T) => {
  const proxy = new Proxy(target, {
    get(target, property, receiver) {
      track(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value) {
      const ret = Reflect.set(target, property, value)
      trigger(target, property)
      return ret
    },
  })
  return proxy
}

export const createEffect = (fn: Effect) => {
  const effect = () => {
    runningEffects.push(effect)
    fn()
    runningEffects.pop()
  }

  effect()
}
