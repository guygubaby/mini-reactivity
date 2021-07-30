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

let vdom = h('span', null, state.count)

patch(root, vdom)

createEffect(() => {
  const nextVdom = h('span', null, state.count)
  patch(vdom, nextVdom)
  vdom = nextVdom
})

buttonEl.addEventListener('click', () => {
  state.count++
})

```
