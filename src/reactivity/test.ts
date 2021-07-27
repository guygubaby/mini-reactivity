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
