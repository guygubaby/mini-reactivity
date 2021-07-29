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
