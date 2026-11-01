<template>
  <form class="patient-form" novalidate @submit.prevent="submit">
    <nav class="section-nav" aria-label="Form sections">
      <ul>
        <li v-for="section in sections" :key="section.id">
          <a :href="`#section-${section.id}`" @click.prevent="jumpTo(section.id)">
            {{ section.title }}
            <span v-if="sectionErrors[section.id]" class="nav-errors">
              {{ sectionErrors[section.id] }}<span class="sr-only"> to fix</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="form-body">
      <p class="form-note">Fields marked <span aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required.</p>

      <section
        v-for="section in sections"
        :id="`section-${section.id}`"
        :key="section.id"
        class="form-section"
        :aria-labelledby="`heading-${section.id}`"
      >
        <div class="section-head">
          <h2 :id="`heading-${section.id}`" class="section-title">{{ section.title }}</h2>
          <p v-if="section.note" class="section-note">{{ section.note }}</p>
        </div>

        <div v-if="section.id === 'consent'" class="consent-text">
          <p v-for="(paragraph, i) in consentText" :key="i">{{ paragraph }}</p>
        </div>

        <div class="grid">
          <template v-for="(field, index) in section.fields">
            <div v-if="field.heading && visible(field)" :key="`h-${index}`" class="sub-head span-6">
              <h3 class="sub-title">{{ field.heading }}</h3>
              <p v-if="field.note" class="section-note">{{ field.note }}</p>
            </div>

            <fieldset
              v-else-if="field.type === 'radio' && visible(field)"
              :key="field.key"
              class="field choice"
              :class="`span-${field.span || 3}`"
              :aria-describedby="errors[field.key] ? `${field.key}-error` : null"
            >
              <legend class="label">
                {{ field.label }}<span v-if="field.required" class="req" aria-hidden="true"> *</span>
              </legend>
              <div class="choices">
                <label v-for="option in options(field)" :key="option.value" class="choice-option">
                  <input
                    v-model="form[field.key]"
                    type="radio"
                    :name="field.key"
                    :value="option.value"
                    :required="field.required"
                    @change="touch(field)"
                  >
                  <span>{{ option.label }}</span>
                </label>
              </div>
              <p v-if="errors[field.key]" :id="`${field.key}-error`" class="field-error">
                <app-icon name="alert" :size="14" />{{ errors[field.key] }}
              </p>
            </fieldset>

            <div v-else-if="field.key && visible(field)" :key="field.key" class="field" :class="`span-${field.span || 3}`">
              <label class="label" :for="`f-${field.key}`">
                {{ field.label }}<span v-if="field.required" class="req" aria-hidden="true"> *</span>
              </label>

              <select
                v-if="field.type === 'select'"
                :id="`f-${field.key}`"
                v-model="form[field.key]"
                class="input"
                :required="field.required"
                :aria-invalid="errors[field.key] ? 'true' : 'false'"
                :aria-describedby="describedBy(field)"
                @change="touch(field)"
              >
                <option value="">Select</option>
                <option v-for="option in options(field)" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>

              <div v-else-if="field.type === 'money'" class="money">
                <span class="money-sign" aria-hidden="true">$</span>
                <input
                  :id="`f-${field.key}`"
                  v-model="form[field.key]"
                  class="input"
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  :aria-invalid="errors[field.key] ? 'true' : 'false'"
                  :aria-describedby="describedBy(field)"
                  @blur="touch(field)"
                  @input="revalidate(field)"
                >
              </div>

              <input
                v-else
                :id="`f-${field.key}`"
                v-model="form[field.key]"
                class="input"
                :class="{ 'is-signature': field.type === 'signature' }"
                :type="inputType(field)"
                :inputmode="field.inputmode || (field.type === 'tel' ? 'tel' : null)"
                :list="field.type === 'suggest' ? `${field.key}-options` : null"
                :max="field.type === 'date' ? today : null"
                :min="field.type === 'date' ? '1900-01-01' : null"
                :readonly="field.readonly"
                :required="field.required"
                autocomplete="off"
                :spellcheck="field.type === 'email' ? 'false' : null"
                :aria-invalid="errors[field.key] ? 'true' : 'false'"
                :aria-describedby="describedBy(field)"
                @blur="touch(field)"
                @input="revalidate(field)"
              >
              <datalist v-if="field.type === 'suggest'" :id="`${field.key}-options`">
                <option v-for="option in field.options" :key="option" :value="option" />
              </datalist>

              <p v-if="field.hint && !errors[field.key]" :id="`${field.key}-hint`" class="field-hint">{{ field.hint }}</p>
              <p v-if="errors[field.key]" :id="`${field.key}-error`" class="field-error">
                <app-icon name="alert" :size="14" />{{ errors[field.key] }}
              </p>
            </div>
          </template>
        </div>
      </section>

      <div class="form-actions">
        <router-link class="btn btn-secondary" :to="cancelTo">Cancel</router-link>
        <button class="btn btn-primary" type="submit" :disabled="busy">{{ busy ? busyLabel : submitLabel }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import AppIcon from './AppIcon.vue'
import { CONSENT_TEXT, SECTIONS, formatPhone, todayIso, validateField, validatePatient } from '../patient'
import { toast } from '../toast'

export default {
  name: 'PatientForm',
  components: { AppIcon },
  props: {
    value: { type: Object, required: true },
    submitLabel: { type: String, default: 'Save patient' },
    busyLabel: { type: String, default: 'Saving...' },
    busy: { type: Boolean, default: false },
    cancelTo: { type: [String, Object], default: '/' }
  },
  data() {
    return {
      form: Object.assign({}, this.value),
      errors: {},
      sections: SECTIONS,
      consentText: CONSENT_TEXT,
      today: todayIso()
    }
  },
  computed: {
    sectionErrors() {
      const counts = {}
      this.sections.forEach(section => {
        const n = section.fields.filter(f => f.key && this.errors[f.key]).length
        if (n) counts[section.id] = n
      })
      return counts
    }
  },
  methods: {
    visible(field) {
      return !field.showIf || field.showIf(this.form)
    },
    options(field) {
      return (field.options || []).map(o => (typeof o === 'string' ? { value: o, label: o } : o))
    },
    inputType(field) {
      if (field.type === 'email') return 'email'
      if (field.type === 'tel') return 'tel'
      if (field.type === 'date') return 'date'
      return 'text'
    },
    describedBy(field) {
      if (this.errors[field.key]) return `${field.key}-error`
      return field.hint ? `${field.key}-hint` : null
    },
    setError(field) {
      const message = validateField(field, this.form)
      if (message) this.$set(this.errors, field.key, message)
      else this.$delete(this.errors, field.key)
    },
    // Check a field when the person leaves it, and tidy phone numbers into one format.
    touch(field) {
      if (field.type === 'tel' && this.form[field.key]) this.form[field.key] = formatPhone(this.form[field.key])
      this.setError(field)
    },
    // Once a field shows an error, re-check it as the person types so the message clears as soon as it is fixed.
    revalidate(field) {
      if (this.errors[field.key]) this.setError(field)
    },
    jumpTo(id) {
      const target = document.getElementById(`section-${id}`)
      if (!target) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    },
    submit() {
      this.errors = validatePatient(this.form)
      const keys = Object.keys(this.errors)
      if (keys.length) {
        toast(keys.length === 1 ? 'Fix the highlighted field to save.' : `Fix the ${keys.length} highlighted fields to save.`, { tone: 'error' })
        this.$nextTick(() => {
          const first = this.$el.querySelector('[aria-invalid="true"], fieldset[aria-describedby] input')
          if (first) {
            first.focus({ preventScroll: true })
            first.scrollIntoView({ block: 'center' })
          }
        })
        return
      }
      this.$emit('submit', Object.assign({}, this.form))
    }
  }
}
</script>

<style scoped>
.patient-form {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: var(--space-6);
  align-items: start;
}

.section-nav {
  position: sticky;
  top: calc(var(--bar-height) + var(--space-4));
}

.section-nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: 6px 12px;
  border-left: 2px solid var(--line);
  color: var(--muted);
  font-size: var(--text-sm);
  text-decoration: none;
}

.section-nav a:hover { border-left-color: var(--accent); color: var(--ink); }

.nav-errors {
  min-width: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: var(--danger-tint);
  color: var(--danger);
  font-size: var(--text-xs);
  font-weight: 600;
  text-align: center;
}

.form-body { max-width: 800px; }

.form-note {
  color: var(--muted);
  font-size: var(--text-sm);
}

.form-section {
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: calc(var(--bar-height) + var(--space-3));
}

.section-head { margin-bottom: var(--space-4); }

.section-title {
  font-size: var(--text-lg);
  line-height: 1.3;
  font-weight: 650;
}

.section-note {
  margin-top: 2px;
  color: var(--muted);
  font-size: var(--text-sm);
}

.sub-head { margin-top: var(--space-3); }

.sub-title {
  font-size: var(--text-md);
  font-weight: 600;
}

.consent-text {
  display: grid;
  gap: 12px;
  max-width: 68ch;
  margin-bottom: var(--space-4);
  color: var(--muted);
  font-size: var(--text-sm);
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px var(--space-3);
}

.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }
.span-6 { grid-column: span 6; }

.field { min-width: 0; }

fieldset.field {
  margin: 0;
  padding: 0;
  border: 0;
}

.label {
  display: block;
  margin-bottom: 6px;
  padding: 0;
  font-size: var(--text-sm);
  font-weight: 550;
}

.req { color: var(--danger); }

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-4);
  min-height: 40px;
  align-items: center;
}

.choice-option {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.choice-option input {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--accent);
}

.money { position: relative; }

.money-sign {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: var(--muted);
}

.money .input { padding-left: 26px; }

.is-signature { font-size: 1.125rem; font-weight: 500; }

.field-hint,
.field-error {
  margin-top: 6px;
  font-size: var(--text-xs);
  line-height: 1.4;
}

.field-hint { color: var(--muted); }

.field-error {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: var(--danger);
  font-weight: 500;
}

.field-error .app-icon { margin-top: 1px; }

.form-actions {
  position: sticky;
  bottom: 0;
  z-index: 5;
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  padding: var(--space-3) 0;
  border-top: 1px solid var(--line);
  background: var(--canvas);
}

@media (max-width: 1099px) {
  .patient-form { grid-template-columns: minmax(0, 1fr); }
  .section-nav { display: none; }
  .form-body { max-width: none; }
}

@media (max-width: 719px) {
  .grid { grid-template-columns: minmax(0, 1fr); }
  .span-2, .span-3, .span-4, .span-6 { grid-column: auto; }
  .form-section { padding: var(--space-4) 0; }
  .form-actions .btn { flex: 1; min-height: 44px; }
}
</style>
