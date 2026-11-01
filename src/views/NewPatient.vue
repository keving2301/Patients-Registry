<template>
  <div class="page">
    <router-link class="back-link no-print" :to="{ name: 'dashboard' }">
      <app-icon name="back" :size="16" />
      All patients
    </router-link>
    <div class="page-head">
      <div>
        <h1 class="page-title">New patient</h1>
        <p class="page-sub">Registration date {{ formatDate(patient.registrationDate) }}</p>
      </div>
    </div>
    <patient-form
      :value="patient"
      submit-label="Save patient"
      :busy="saving"
      :cancel-to="{ name: 'dashboard' }"
      @submit="save"
    />
  </div>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import PatientForm from '../components/PatientForm.vue'
import { emptyPatient, formatDate, fullName } from '../patient'
import { createPatient, describeError } from '../patients'
import { toast } from '../toast'

export default {
  name: 'NewPatient',
  components: { AppIcon, PatientForm },
  data() {
    return { patient: emptyPatient(), saving: false }
  },
  methods: {
    formatDate,
    save(patient) {
      this.saving = true
      createPatient(patient)
        .then(id => {
          toast(`${fullName(patient)} was added as patient ${id}.`)
          this.$router.push({ name: 'view-patient', params: { userID: id } })
        })
        .catch(error => {
          this.saving = false
          toast(`Couldn't save the patient. ${describeError(error)}`, { tone: 'error' })
        })
    }
  }
}
</script>
