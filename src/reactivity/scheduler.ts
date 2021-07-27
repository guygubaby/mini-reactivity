let queued = false
const queue: Function[] = []
const p = Promise.resolve()

export const nextTick = (fn: () => void) => p.then(fn)

const flushJobs = () => {
  let fn = queue.shift()
  while (fn) {
    fn()
    fn = queue.shift()
  }

  queued = false
}

export const queueJob = (job: Function) => {
  if (!queue.includes(job)) queue.push(job)
  if (!queued) {
    nextTick(flushJobs)
    queued = true
  }
}
