<template>
  <header class="app-bar no-print">
    <div class="app-bar-inner">
      <router-link class="brand" to="/" aria-label="Clinical Registry, all patients">
        <img class="brand-mark" src="../assets/mark.png" alt="" width="18" height="24">
        <span class="brand-name">Clinical Registry</span>
      </router-link>

      <form class="search" role="search" @submit.prevent="submit">
        <label class="sr-only" for="patient-search">Search patients</label>
        <app-icon class="search-icon" name="search" :size="18" />
        <input
          id="patient-search"
          ref="input"
          v-model="query"
          class="search-input"
          type="search"
          autocomplete="off"
          spellcheck="false"
          placeholder="Search by name, ID, email or phone"
          @input="apply"
          @keydown.esc="clear"
        >
        <button v-if="query" class="search-clear" type="button" aria-label="Clear search" @click="clear">
          <app-icon name="close" :size="16" />
        </button>
      </form>

      <router-link class="btn btn-primary new-patient" :to="{ name: 'new-patient' }">
        <app-icon name="plus" :size="18" />
        <span>New patient</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import AppIcon from './AppIcon.vue'

const ignoreDuplicate = () => {}

export default {
  name: 'AppBar',
  components: { AppIcon },
  data() {
    return { query: this.$route.query.q || '' }
  },
  watch: {
    '$route.query.q'(value) {
      if ((value || '') !== this.query.trim()) this.query = value || ''
    }
  },
  methods: {
    apply() {
      const q = this.query.trim()
      const query = q ? { q } : {}
      if (this.$route.name === 'dashboard') {
        if ((this.$route.query.q || '') !== q) this.$router.replace({ name: 'dashboard', query }).catch(ignoreDuplicate)
      } else if (q) {
        this.$router.push({ name: 'dashboard', query }).catch(ignoreDuplicate)
      }
    },
    submit() {
      this.apply()
      if (this.$route.name !== 'dashboard') this.$router.push({ name: 'dashboard' }).catch(ignoreDuplicate)
    },
    clear() {
      this.query = ''
      this.apply()
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
.app-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--tint);
  border-bottom: 1px solid #cdeef4;
}

.app-bar-inner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  max-width: var(--page-width);
  min-height: var(--bar-height);
  margin: 0 auto;
  padding: var(--space-2) var(--gutter);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  text-decoration: none;
  flex: none;
}

.brand:hover { color: var(--ink); }
.brand { min-height: 44px; }

.brand-mark { width: 18px; height: 24px; }

.brand-name {
  font-size: 1.0625rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.search {
  position: relative;
  flex: 1 1 auto;
  max-width: 480px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 44px;
  padding: 0 44px 0 40px;
  border: 1px solid var(--field-border);
  border-radius: var(--radius-sm);
  background: var(--canvas);
  font-size: var(--text-md);
  transition: border-color var(--dur-fast) ease-out, box-shadow var(--dur-fast) ease-out;
}

.search-input::placeholder { color: var(--muted); opacity: 1; }
.search-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.search-input::-webkit-search-cancel-button { -webkit-appearance: none; }

.search-clear {
  position: absolute;
  top: 50%;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transform: translateY(-50%);
  border: 0;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--muted);
  cursor: pointer;
}

.search-clear:hover { background: var(--subtle); color: var(--ink); }

.new-patient { margin-left: auto; }

@media (max-width: 719px) {
  /* On a phone the bar is two rows tall, so it scrolls away instead of taking a fifth of the screen. */
  .app-bar { position: static; }

  .app-bar-inner {
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .search {
    order: 3;
    flex-basis: 100%;
    max-width: none;
  }
}
</style>
