<template>
  <div>
    <VCol
      cols="12"
      class="ma-0 pa-0 d-flex justify-space-between"
      style="gap: 15px"
    >
      <div class="ma-0 pa-0">
        <VIcon @click="$emit('show')" color="secondary">mdi-chevron-left</VIcon>
      </div>
      <p
        class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
      >
        <VBtn color="secondary" small depressed class="text-capitalize"
          >Update Employment Details</VBtn
        >
      </p>
    </VCol>
    <VCol cols="12">
      <VForm lazy-validation ref="form" @submit.prevent="submit">
        <VCol cols="12" class="ma-0 pa-0">
          <VSelect
            v-model="UserEmploymentStatus"
            :items="[
              'Employed',
              'Self-Employed',
              'Retired',
              'Unemployed',
              'Student',
            ]"
            label="What's Your Current Employment Status"
            color="secondary"
            light
            item-color="secondary"
          ></VSelect>
        </VCol>
        <VCol
          cols="12"
          class="ma-0 pa-0"
          v-if="emp == 'Employed' || emp == 'Self-Employed'"
        >
          <VTextField
            v-model="UserOccupation"
            label="Occupation"
            color="secondary"
            light
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0" v-if="emp == 'Employed'">
          <VTextField
            v-model="UserEmployer"
            color="secondary"
            light
            label="Employer's Name and Address (if any)"
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0" v-if="emp == 'Self-Employed'">
          <VTextField
            v-model="UserCompany"
            color="secondary"
            light
            label="What's Your Company Name"
          />
        </VCol>
        <VCol
          cols="12"
          class="ma-0 pa-0"
          v-if="emp == 'Employed' || emp == 'Self-Employed'"
        >
          <VTextField
            v-model="addSymbol"
            color="secondary"
            light
            :label="`How Much Do You Earn Per Month (${
              user && user.currencyName
            })`"
            hint="We Ask About Your Income So We Can Better Understand Your Needs."
          />
        </VCol>
        <VCol cols="12" class="mx-0 px-0">
          <VBtn color="secondary" block large depressed type="submit"
            >Save</VBtn
          >
        </VCol>
      </VForm>
    </VCol>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      emp: '',
      occupation: '',
      annual: '',
      company: '',
      employer: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    UserEmploymentStatus: {
      get() {
        return this.user && this.user.employmentStatus
      },
      set(val) {
        this.emp = val
      },
    },
    UserOccupation: {
      get() {
        return this.user && this.user.occupation
      },
      set(val) {
        this.occupation = val
      },
    },
    UserEmployer: {
      get() {
        return this.user && this.user.employer
      },
      set(val) {
        this.employer = val
      },
    },
    UserCompany: {
      get() {
        return this.user && this.user.company
      },
      set(val) {
        this.company = val
      },
    },
    addSymbol: {
      get() {
        let val = parseInt(this.annual)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `${this.user && this.user.currencySymbol} ${val}`
        }
      },
      async set(val) {
        // check if the first Character is ₦ and remove it
        if (val == null) {
          val = ''
        }
        const firstChar = val.charAt(0)
        if (firstChar === (await this.user.currencySymbol)) {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.annual = val
        }
      },
    },
  },
  methods: {
    ...mapActions({ updateAccount: 'userflow/updateAccount' }),
    submit() {
      const payload = {
        employmentStatus: this.emp
          ? this.emp
          : this.UserEmploymentStatus
          ? this.UserEmploymentStatus
          : '',
        occupation: this.occupation ? this.occupation : this.UserOccupation,
        employer: this.employer ? this.employer : this.UserEmployer,
        company: this.company
          ? this.company
          : this.UserCompany
          ? this.UserCompany
          : '',
        annual: this.addSymbol ? this.addSymbol : '',
      }
      this.updateAccount(payload)
    },
  },
}
</script>

<style></style>
