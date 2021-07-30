# mini vue reactivity

Usage

```typescript

import { h, init } from 'snabbdom'
import { reactive, createEffect } from '../index'

const root = document.getElementById('app')!
const buttonEl = document.getElementById('btn')!

const state = reactive({
  count: 0,
})

const patch = init([])

let vnode = h('span', null, state.count)

patch(root, vnode)

createEffect(() => {
  const nextVnode = h('span', null, state.count)
  patch(vnode, nextVnode)
  vnode = nextVnode
})

buttonEl.addEventListener('click', () => {
  state.count++
})

```
