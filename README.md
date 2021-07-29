# mini vue reactivity

Usage

```typescript

import { createEffect, reactive } from './index'

const state = reactive({
  count: 0,
})

createEffect(() => {
  console.log('effct 01 called', state.count)
})

createEffect(() => {
  console.log('effct 02 called', state.count)
})

window.setInterval(() => {
  console.log('update')
  state.count++
}, 2000)

```

```typescript

import { createEffect, reactive } from '../index'
import { nextTick } from '../scheduler'

const countEl = document.getElementById('count')!
const buttonEl = document.getElementById('btn')!

const state = reactive({
  count: 0,
})

createEffect(() => {
  document.title = `Count - ${state.count}`
})

createEffect(() => {
  countEl.innerText = `${state.count}`
})

buttonEl.addEventListener('click', () => {
  state.count++

  console.log(countEl.innerText)
  nextTick(() => {
    console.log(countEl.innerText)
  })
})

```