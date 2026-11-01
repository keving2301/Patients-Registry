<template>
  <div class="page dashboard">
    <div class="page-head">
      <div>
        <h1 class="page-title">Patients</h1>
        <p class="page-sub" aria-live="polite">{{ countText }}</p>
      </div>
      <button v-if="status === 'ready' && visible.length" class="btn btn-secondary print-list no-print" type="button" @click="print">
        <app-icon name="print" :size="16" />
        Print list
      </button>
    </div>

    <div v-if="status === 'loading'" class="loading" aria-busy="true" aria-label="Loading patients">
      <div v-for="n in 6" :key="n" class="loading-row">
        <span class="skeleton" style="width: 9%" />
        <span class="skeleton" style="width: 22%" />
        <span class="skeleton" style="width: 12%" />
        <span class="skeleton" style="width: 26%" />
        <span class="skeleton" style="width: 14%" />
      </div>
    </div>

    <div v-else-if="status === 'error'" class="state is-error" role="alert">
      <p class="state-title">Couldn't load patients</p>
      <p class="state-text">{{ errorText }}</p>
      <div class="state-actions">
        <button class="btn btn-secondary" type="button" @click="load">Try again</button>
      </div>
    </div>

    <div v-else-if="!patients.length" class="state">
      <p class="state-title">No patients yet</p>
      <p class="state-text">Register a patient to start the list.</p>
      <div class="state-actions">
        <router-link class="btn btn-primary" :to="{ name: 'new-patient' }">
          <app-icon name="plus" :size="18" />
          New patient
        </router-link>
      </div>
    </div>

    <div v-else-if="!visible.length" class="state">
      <p class="state-title">No patients match "{{ query }}"</p>
      <p class="state-text">Search by name, patient ID, email, phone number or date of birth.</p>
      <div class="state-actions">
        <button class="btn btn-secondary" type="button" @click="clearSearch">Clear search</button>
      </div>
    </div>

    <template v-else>
      <table class="patients-table">
        <caption class="sr-only">Patients in your sandbox</caption>
        <thead>
          <tr>
            <th scope="col">Patient ID</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Date of birth</th>
            <th scope="col" class="num">Age</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col" class="actions-col no-print"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in visible" :key="p.id">
            <td class="id">{{ p.id }}</td>
            <td class="name">
              <router-link :to="{ name: 'view-patient', params: { userID: p.id } }">{{ fullName(p) }}</router-link>
            </td>
            <td>{{ sexLabel(p.sex) }}</td>
            <td>{{ formatDate(p.dateOfBirth) }}</td>
            <td class="num">{{ ageFrom(p.dateOfBirth) }}</td>
            <td class="email">{{ p.email }}</td>
            <td class="phone">{{ formatPhone(p.cellNumber) }}</td>
            <td class="actions no-print">
              <router-link class="btn btn-quiet" :to="{ name: 'edit-patient', params: { userID: p.id } }" :aria-label="`Edit ${fullName(p)}`">
                <app-icon name="edit" :size="15" />
                Edit
              </router-link>
              <button class="btn btn-quiet is-danger" type="button" :aria-label="`Delete ${fullName(p)}`" @click="askDelete(p)">
                <app-icon name="trash" :size="15" />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <ul class="patients-list" aria-label="Patients in your sandbox">
        <li v-for="p in visible" :key="p.id" class="patient-item">
          <div class="item-head">
            <router-link class="item-name" :to="{ name: 'view-patient', params: { userID: p.id } }">{{ fullName(p) }}</router-link>
            <span class="item-id"><span class="sr-only">Patient ID </span>{{ p.id }}</span>
          </div>
          <p class="item-meta">{{ sexLabel(p.sex) }}, {{ ageText(p) }}, born {{ formatDate(p.dateOfBirth) }}</p>
          <p class="item-contact">
            <span>{{ p.email }}</span>
            <span>{{ formatPhone(p.cellNumber) }}</span>
          </p>
          <div class="item-actions">
            <router-link class="btn btn-quiet" :to="{ name: 'edit-patient', params: { userID: p.id } }" :aria-label="`Edit ${fullName(p)}`">
              <app-icon name="edit" :size="15" />
              Edit
            </router-link>
            <button class="btn btn-quiet is-danger" type="button" :aria-label="`Delete ${fullName(p)}`" @click="askDelete(p)">
              <app-icon name="trash" :size="15" />
              Delete
            </button>
          </div>
        </li>
      </ul>
    </template>

    <delete-dialog :patient="pendingDelete" :busy="deleting" @cancel="pendingDelete = null" @confirm="confirmDelete" />
  </div>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import { ageFrom, formatDate, formatPhone, fullName, matchesQuery, sexLabel } from '../patient'
import { deletePatient, describeError, listPatients } from '../patients'
import { toast } from '../toast'

export default {
  name: 'Dashboard',
  components: { AppIcon, DeleteDialog },
  data() {
    return {
      status: 'loading',
      errorText: '',
      patients: [],
      pendingDelete: null,
      deleting: false
    }
  },
  computed: {
    query() {
      return (this.$route.query.q || '').trim()
    },
    visible() {
      return this.patients.filter(p => matchesQuery(p, this.query))
    },
    countText() {
      if (this.status === 'loading') return 'Opening your sandbox...'
      if (this.status === 'error') return 'Not loaded'
      const total = this.patients.length
      const noun = total === 1 ? 'patient' : 'patients'
      if (!this.query) return `${total} ${noun}`
      return `${this.visible.length} of ${total} ${noun} match "${this.query}"`
    }
  },
  created() {
    this.load()
  },
  methods: {
    ageFrom,
    formatDate,
    formatPhone,
    fullName,
    sexLabel,
    ageText(p) {
      const age = ageFrom(p.dateOfBirth)
      return age === 1 ? '1 year' : `${age} years`
    },
    load() {
      this.status = 'loading'
      listPatients()
        .then(patients => {
          this.patients = patients
          this.status = 'ready'
        })
        .catch(error => {
          this.errorText = describeError(error)
          this.status = 'error'
        })
    },
    clearSearch() {
      this.$router.replace({ name: 'dashboard' }).catch(() => {})
    },
    print() {
      window.print()
    },
    askDelete(patient) {
      this.pendingDelete = patient
    },
    confirmDelete(patient) {
      this.deleting = true
      deletePatient(patient.id)
        .then(() => {
          this.patients = this.patients.filter(p => p.id !== patient.id)
          toast(`${fullName(patient)} was deleted.`)
          this.pendingDelete = null
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
.loading { border-top: 1px solid var(--line); }

.loading-row {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  height: 56px;
  padding: 0 12px;
  border-bottom: 1px solid var(--line);
}

/* Table, wide screens */

.patients-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.patients-table th {
  padding: 10px 12px;
  border-bottom: 1px solid var(--field-border);
  color: var(--muted);
  font-size: var(--text-xs);
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.patients-table td {
  height: 56px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
}

.patients-table tbody tr:hover td { background: #f8fbfc; }

.patients-table .num { text-align: right; }
.patients-table th.num { text-align: right; }

.patients-table .id {
  color: var(--muted);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.patients-table .name a {
  color: var(--ink);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
}

.patients-table .name a:hover { color: var(--accent); text-decoration: underline; }

.patients-table .email { word-break: break-all; }
.patients-table .phone { white-space: nowrap; }

.patients-table .actions {
  text-align: right;
  white-space: nowrap;
}

.patients-table .actions .btn + .btn { margin-left: var(--space-1); }

.patients-list { display: none; }

/* Card list, phones */

@media (max-width: 899px) {
  .patients-table { display: none; }

  .patients-list {
    display: block;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
  }

  .patient-item {
    padding: var(--space-3) var(--space-3) 12px;
  }

  .patient-item + .patient-item { border-top: 1px solid var(--line); }

  .item-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .item-name {
    color: var(--ink);
    font-size: 1.0625rem;
    font-weight: 600;
    text-decoration: none;
  }

  .item-id {
    flex: none;
    color: var(--muted);
    font-size: var(--text-xs);
    letter-spacing: 0.04em;
  }

  .item-meta {
    margin-top: 2px;
    color: var(--muted);
    font-size: var(--text-sm);
  }

  .item-contact {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-2);
    font-size: var(--text-sm);
    overflow-wrap: anywhere;
  }

  .item-actions {
    display: flex;
    gap: var(--space-1);
    margin: var(--space-1) 0 0 calc(-1 * var(--space-2));
  }

  .item-actions .btn { min-height: 40px; }

  .print-list { display: none; }
}

@media print {
  .patients-table { display: table !important; }
  .patients-list { display: none !important; }
  .patients-table td { height: auto; padding: 6px 8px; }
  .patients-table tbody tr:hover td { background: none; }
}
</style>
