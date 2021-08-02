import { queueJob } from './scheduler'

type ReactivityTarget = Record<PropertyKey, any>

type Effect = () => void
type Effects = Set<Effect>
type KeyToEffectsMap = Map<PropertyKey, Effects>
type EffectMap = WeakMap<any, KeyToEffectsMap>

const runningEffects: Effect[] = []
const effectMap: EffectMap = new WeakMap()

const track = <T extends ReactivityTarget>(target: T, property: PropertyKey) => {
  const effects = runningEffects.slice()
  const oldEffects = effectMap.get(target)?.get(property) || new Set<Effect>()

  const allEffects: Effects = new Set([...oldEffects, ...effects])

  const depMap: KeyToEffectsMap = effectMap.get(target) || new Map()
  depMap.set(property, allEffects)
  effectMap.set(target, depMap)
}

const trigger = <T extends ReactivityTarget>(target: T, property: PropertyKey) => {
  const effects = effectMap.get(target)?.get(property)
  if (effects) {
    effects.forEach((effect) => {
      queueJob(effect)
    })
  }
}

export const reactive = <T extends ReactivityTarget>(target: T) => {
  const proxy = new Proxy(target, {
    get(target, property, receiver) {
      track(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value) {
      trigger(target, property)
      return Reflect.set(target, property, value)
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
