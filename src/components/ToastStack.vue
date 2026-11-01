<template>
  <div class="toasts no-print" role="status" aria-live="polite">
    <div v-for="item in items" :key="item.id" class="toast" :class="`is-${item.tone}`">
      <app-icon :name="item.tone === 'error' ? 'alert' : 'check'" :size="18" class="toast-icon" />
      <p class="toast-text">{{ item.message }}</p>
      <button class="toast-close" type="button" aria-label="Dismiss" @click="dismiss(item.id)">
        <app-icon name="close" :size="16" />
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon.vue'
import { dismissToast, toasts } from '../toast'

export default {
  name: 'ToastStack',
  components: { AppIcon },
  computed: {
    items() { return toasts.items }
  },
  methods: {
    dismiss: dismissToast
  }
}
</script>

<style scoped>
/* Top right, under the app bar, so toasts never cover the form's save bar at the bottom. */
.toasts {
  position: fixed;
  top: calc(var(--bar-height) + var(--space-3));
  right: var(--gutter);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: min(380px, calc(100vw - 2 * var(--gutter)));
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 8px 12px 16px;
  border-radius: var(--radius-md);
  background: var(--ink);
  color: #fff;
  box-shadow: 0 8px 24px rgba(26, 41, 48, 0.18);
}

.toast-icon { margin-top: 2px; color: #7fe3f1; }
.toast.is-error .toast-icon { color: #ffb4ab; }

.toast-text {
  flex: 1;
  font-size: var(--text-sm);
  line-height: 1.45;
  padding-top: 1px;
}

.toast-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: -8px -8px -8px 0;
  border: 0;
  border-radius: var(--radius-sm);
  background: none;
  color: #c9d4d9;
  cursor: pointer;
}

.toast-close:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.toast-close:focus-visible { outline-color: #7fe3f1; }

@media (max-width: 719px) {
  .toasts { top: var(--space-2); right: var(--gutter); left: var(--gutter); width: auto; }
}

@media (prefers-reduced-motion: no-preference) {
  .toast { animation: toast-in 160ms ease-out; }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(-8px); }
  }
}
</style>
