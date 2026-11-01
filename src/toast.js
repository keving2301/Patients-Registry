// A small toast queue shared by every page.
import Vue from 'vue'

export const toasts = Vue.observable({ items: [] })

let nextId = 1

export function dismissToast(id) {
  const index = toasts.items.findIndex(item => item.id === id)
  if (index >= 0) toasts.items.splice(index, 1)
}

export function toast(message, { tone = 'success', timeout } = {}) {
  // A success means whatever went wrong before is resolved, so older error toasts go.
  if (tone === 'success') toasts.items = toasts.items.filter(item => item.tone !== 'error')
  const id = nextId
  nextId += 1
  toasts.items.push({ id, message, tone })
  const delay = timeout === undefined ? (tone === 'error' ? 8000 : 4000) : timeout
  if (delay) setTimeout(() => dismissToast(id), delay)
  return id
}
