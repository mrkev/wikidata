

const { results } = require("./events.json")
const events = results.bindings
  .map(b => ({
    label: b.eventLabel && b.eventLabel.value || null,
    entry: b.event.value,
    start: b.date.value,
    end: b.endDate.value
  }))

const str = JSON.stringify(events)
const print = `const data = ${events}`

console.log(JSON.stringify(events))


