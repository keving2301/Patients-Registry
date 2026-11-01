<template>
  <div v-if="patient" class="dialog-backdrop no-print" @mousedown.self="cancel">
    <div
      ref="dialog"
      class="dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      aria-describedby="delete-text"
      @keydown.esc="cancel"
      @keydown.tab="trapFocus"
    >
      <h2 id="delete-title" class="dialog-title">Delete {{ name }}?</h2>
      <p id="delete-text" class="dialog-text">
        This removes patient {{ patient.id }} and the whole intake record from your sandbox. You can't undo this.
      </p>
      <div class="dialog-actions">
        <button ref="cancel" class="btn btn-secondary" type="button" :disabled="busy" @click="cancel">Cancel</button>
        <button class="btn btn-danger" type="button" :disabled="busy" @click="confirm">
          {{ busy ? 'Deleting...' : 'Delete patient' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fullName } from '../patient'

export default {
  name: 'DeleteDialog',
  props: {
    patient: { type: Object, default: null },
    busy: { type: Boolean, default: false }
  },
  data() {
    return { returnFocus: null }
  },
  computed: {
    name() { return this.patient ? fullName(this.patient) : '' }
  },
  watch: {
    patient(value) {
      if (value) {
        this.returnFocus = document.activeElement
        this.$nextTick(() => this.$refs.cancel && this.$refs.cancel.focus())
      } else if (this.returnFocus && document.body.contains(this.returnFocus)) {
        this.returnFocus.focus()
      }
    }
  },
  methods: {
    cancel() {
      if (!this.busy) this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm', this.patient)
    },
    trapFocus(event) {
      const buttons = Array.from(this.$refs.dialog.querySelectorAll('button:not(:disabled)'))
      if (!buttons.length) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gutter);
  background: rgba(26, 41, 48, 0.45);
}

.dialog {
  width: 100%;
  max-width: 440px;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--canvas);
  box-shadow: 0 16px 48px rgba(26, 41, 48, 0.24);
}

.dialog-title {
  font-size: var(--text-lg);
  line-height: 1.3;
  font-weight: 650;
}

.dialog-text {
  margin-top: var(--space-2);
  color: var(--muted);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

@media (max-width: 719px) {
  .dialog-actions { flex-direction: column-reverse; }
  .dialog-actions .btn { width: 100%; min-height: 44px; }
}
</style>
