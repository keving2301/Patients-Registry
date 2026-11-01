<template>
  <div id="app" class="app">
    <a class="skip-link no-print" href="#main" @click.prevent="skipToMain">Skip to content</a>
    <app-bar />
    <main id="main" ref="main" class="app-main" tabindex="-1">
      <router-view />
    </main>
    <footer class="app-footer no-print">
      <p class="demo-note">
        <app-icon name="info" :size="14" />
        Demo data: your changes stay in your own sandbox.
      </p>
    </footer>
    <toast-stack />
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue'
import AppIcon from './components/AppIcon.vue'
import ToastStack from './components/ToastStack.vue'

export default {
  name: 'App',
  components: { AppBar, AppIcon, ToastStack },
  methods: {
    skipToMain() {
      this.$refs.main.focus()
    }
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main { flex: 1 0 auto; }
.app-main:focus { outline: none; }

.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-3);
  z-index: 60;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

.skip-link:focus { top: var(--space-2); color: #fff; }

.app-footer {
  max-width: var(--page-width);
  width: 100%;
  margin: 0 auto;
  padding: var(--space-3) var(--gutter) var(--space-4);
}

.demo-note {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: var(--text-xs);
}
</style>
