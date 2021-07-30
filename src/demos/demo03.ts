import { h, init, styleModule } from 'snabbdom'
import { reactive, createEffect } from '../index'

const root = document.getElementById('app')!
const buttonEl = document.getElementById('btn')!

const state = reactive({
  count: 0,
})

const patch = init([
  styleModule,
])

let vnode = h('div', null, [
  h('span', {
    style: {
      color: 'red',
    },
  }, state.count),
])

patch(root, vnode)

createEffect(() => {
  const nextVnode = h('div', null, [
    h('span', null, state.count),
    h('div', null, null),
    h('span', {
      style: {
        color: state.count % 2 === 0 ? 'red' : 'pink',
      },
    }, state.count + 1),
  ])
  patch(vnode, nextVnode)
  vnode = nextVnode
})

buttonEl.addEventListener('click', () => {
  state.count++
})
