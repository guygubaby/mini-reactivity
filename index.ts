import { effect, reactive } from '@vue/reactivity'

const state = reactive({
  count: 0,
})

effect(() => {
  console.log('effect', state)
})
