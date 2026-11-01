<template>
  <div class="page record-page">
    <router-link class="back-link no-print" :to="{ name: 'dashboard' }">
      <app-icon name="back" :size="16" />
      All patients
    </router-link>

    <div v-if="status === 'loading'" aria-busy="true" aria-label="Loading the patient">
      <span class="skeleton" style="width: 280px; height: 32px" />
      <span class="skeleton" style="width: 100%; height: 64px; margin-top: 24px" />
      <span class="skeleton" style="width: 100%; height: 240px; margin-top: 32px" />
    </div>

    <div v-else-if="status === 'error'" class="state is-error" role="alert">
      <p class="state-title">Couldn't load this patient</p>
      <p class="state-text">{{ errorText }}</p>
      <div class="state-actions">
        <button class="btn btn-secondary" type="button" @click="load">Try again</button>
      </div>
    </div>

    <div v-else-if="status === 'missing'" class="state">
      <p class="state-title">Patient not found</p>
      <p class="state-text">There is no patient {{ $route.params.userID }} in your sandbox. It may have been deleted.</p>
      <div class="state-actions">
        <router-link class="btn btn-secondary" :to="{ name: 'dashboard' }">All patients</router-link>
      </div>
    </div>

    <article v-else class="record" aria-labelledby="record-name">
      <p class="print-only print-head">Clinical Registry, patient record, printed {{ printedOn }}</p>

      <header class="record-head">
        <h1 id="record-name" class="record-name">{{ fullName(patient) }}</h1>
        <div class="record-actions no-print">
          <router-link class="btn btn-secondary" :to="{ name: 'edit-patient', params: { userID: patient.id } }">
            <app-icon name="edit" :size="16" />
            Edit
          </router-link>
          <button class="btn btn-secondary" type="button" @click="print">
            <app-icon name="print" :size="16" />
            Print
          </button>
          <button class="btn btn-secondary is-danger" type="button" @click="pendingDelete = patient">
            <app-icon name="trash" :size="16" />
            Delete
          </button>
        </div>
      </header>

      <dl class="summary">
        <div v-for="item in summary" :key="item.label" class="summary-item">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      </dl>

      <section
        v-for="section in sections"
        :key="section.id"
        class="record-section"
        :aria-labelledby="`record-${section.id}`"
      >
        <h2 :id="`record-${section.id}`" class="record-section-title">{{ section.title }}</h2>
        <dl class="facts">
          <div v-for="row in section.rows" :key="row.key" class="fact" :class="{ 'is-wide': row.wide }">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </section>

      <p v-if="updatedText" class="record-updated">{{ updatedText }}</p>
    </article>

    <delete-dialog :patient="pendingDelete" :busy="deleting" @cancel="pendingDelete = null" @confirm="confirmDelete" />
  </div>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import { SECTIONS, ageFrom, formatDate, fullName, sexLabel, todayIso, viewRows } from '../patient'
import { deletePatient, describeError, getPatient } from '../patients'
import { toast } from '../toast'

export default {
  name: 'ViewPatient',
  components: { AppIcon, DeleteDialog },
  data() {
    return { status: 'loading', errorText: '', patient: null, pendingDelete: null, deleting: false }
  },
  computed: {
    summary() {
      const p = this.patient
      const age = ageFrom(p.dateOfBirth)
      const insurance = p.patientCovByInsurance === 'No' ? 'Self-pay' : (p.primaryInsurance || 'Not given')
      return [
        { label: 'Patient ID', value: p.id },
        { label: 'Date of birth', value: formatDate(p.dateOfBirth) },
        { label: 'Age', value: age === 1 ? '1 year' : `${age} years` },
        { label: 'Sex', value: sexLabel(p.sex) },
        { label: 'Insurance', value: insurance },
        { label: 'Registered', value: formatDate(p.registrationDate) }
      ]
    },
    // Sections with something to show; empty fields and empty sections are left out.
    sections() {
      return SECTIONS
        .map(section => ({ id: section.id, title: section.title, rows: viewRows(section, this.patient) }))
        .filter(section => section.rows.length)
    },
    updatedText() {
      const stamp = this.patient && this.patient.updatedAt
      if (!stamp || typeof stamp.toDate !== 'function') return ''
      const date = stamp.toDate()
      const pad = n => String(n).padStart(2, '0')
      return `Last updated ${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`
    },
    printedOn() {
      return formatDate(todayIso())
    }
  },
  watch: {
    '$route.params.userID'() { this.load() }
  },
  created() {
    this.load()
  },
  methods: {
    fullName,
    load() {
      this.status = 'loading'
      getPatient(this.$route.params.userID)
        .then(patient => {
          this.patient = patient
          this.status = patient ? 'ready' : 'missing'
        })
        .catch(error => {
          this.errorText = describeError(error)
          this.status = 'error'
        })
    },
    print() {
      window.print()
    },
    confirmDelete(patient) {
      this.deleting = true
      deletePatient(patient.id)
        .then(() => {
          toast(`${fullName(patient)} was deleted.`)
          this.pendingDelete = null
          this.$router.push({ name: 'dashboard' })
        })
        .catch(error => {
          toast(`Couldn't delete ${fullName(patient)}. ${describeError(error)}`, { tone: 'error' })
        })
        .finally(() => {
          this.deleting = false
        })
    }
  }
}
</script>

<style scoped>
.record { width: 100%; }

.print-only { display: none; }

.record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.record-name {
  font-size: 2rem;
  line-height: 1.15;
  font-weight: 650;
  letter-spacing: -0.015em;
}

.record-actions {
  display: flex;
  gap: var(--space-2);
}

.record-actions .is-danger { color: var(--danger); }
.record-actions .is-danger:hover { border-color: var(--danger); color: var(--danger-strong); }

.summary {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, auto));
  justify-content: start;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-4);
  padding: var(--space-3) 0;
  border-top: 2px solid var(--ink);
  border-bottom: 1px solid var(--line);
}

.summary dt,
.facts dt {
  color: var(--muted);
  font-size: var(--text-xs);
  font-weight: 500;
}

.summary dd {
  margin-top: 2px;
  font-weight: 600;
}

.record-section {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--line);
  break-inside: avoid;
}

.record-section-title {
  font-size: var(--text-md);
  font-weight: 650;
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3) var(--space-5);
}

.fact.is-wide { grid-column: 1 / -1; }

.facts dd {
  margin-top: 2px;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.record-updated {
  margin-top: var(--space-3);
  color: var(--muted);
  font-size: var(--text-xs);
}

@media (max-width: 899px) {
  .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-3); }
  .record-section { grid-template-columns: minmax(0, 1fr); gap: 12px; }
}

@media (max-width: 719px) {
  .record-name { font-size: 1.625rem; }
  .record-actions { width: 100%; }
  .record-actions .btn { flex: 1; padding: 0 var(--space-2); }
  .facts { grid-template-columns: minmax(0, 1fr); }
}

@media print {
  .print-only { display: block; }
  .print-head { margin-bottom: 8mm; color: #444; font-size: 9pt; }
  .record { max-width: none; }
  .record-name { font-size: 20pt; }
  .summary { grid-template-columns: repeat(6, auto); gap: 4mm 10mm; border-top-color: #000; }
  .record-section { grid-template-columns: 38mm minmax(0, 1fr); gap: 6mm; padding: 5mm 0; }
  .facts { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3mm 8mm; }
  .summary dt, .facts dt { color: #444; }
}
</style>
