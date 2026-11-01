<template>
  <div class="page">
    <router-link class="back-link no-print" :to="backTo">
      <app-icon name="back" :size="16" />
      {{ patient ? fullName(patient) : 'All patients' }}
    </router-link>

    <div v-if="status === 'loading'" aria-busy="true" aria-label="Loading the patient">
      <span class="skeleton" style="width: 240px; height: 28px" />
      <span class="skeleton" style="width: 180px; margin-top: 12px" />
      <span class="skeleton" style="width: 100%; max-width: 800px; height: 320px; margin-top: 48px" />
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

    <template v-else>
      <div class="page-head">
        <div>
          <h1 class="page-title">Edit patient</h1>
          <p class="page-sub">{{ fullName(patient) }}, patient {{ patient.id }}, registered {{ formatDate(patient.registrationDate) }}</p>
        </div>
      </div>
      <patient-form
        :value="patient"
        submit-label="Save changes"
        :busy="saving"
        :cancel-to="backTo"
        @submit="save"
      />
    </template>
  </div>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import PatientForm from '../components/PatientForm.vue'
import { formatDate, fullName } from '../patient'
import { describeError, getPatient, updatePatient } from '../patients'
import { toast } from '../toast'

export default {
  name: 'EditPatient',
  components: { AppIcon, PatientForm },
  data() {
    return { status: 'loading', errorText: '', patient: null, saving: false }
  },
  computed: {
    backTo() {
      return this.status === 'ready'
        ? { name: 'view-patient', params: { userID: this.$route.params.userID } }
        : { name: 'dashboard' }
    }
  },
  watch: {
    '$route.params.userID'() { this.load() }
  },
  created() {
    this.load()
  },
  methods: {
    formatDate,
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
    save(patient) {
      this.saving = true
      updatePatient(this.patient.id, patient)
        .then(() => {
          toast(`Changes to ${fullName(patient)} were saved.`)
          this.$router.push({ name: 'view-patient', params: { userID: this.patient.id } })
        })
        .catch(error => {
          this.saving = false
          toast(`Couldn't save the changes. ${describeError(error)}`, { tone: 'error' })
        })
    }
  }
}
</script>
