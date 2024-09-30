<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div class="secondary--text text-body-2 font-weight-light">
              Please Make Sure The Details Entered Are Correct And Concise, We
              Will Not Be Held Responsible For Any False Or Inaccurate
              Transaction.
            </div>
          </div>
        </VCard>

        <VCard color="grey lighten-5" flat class="mt-3" rounded="lg">
          <VCardText class="d-flex justify-space-between align-center">
            <div>
              <VIcon
                color="secondary"
                style="cursor: pointer"
                @click="$router.go(-1)"
                >mdi-chevron-left</VIcon
              >
            </div>
            <p
              class="grey--text mr-2 text-subtitle-1 text-uppercase text-md-h6 text-subtitle-1 text--darken-3 mb-0 pb-0"
            >
              LOAN APPLICATION
            </p>
            <!-- <VSpacer /> -->
            <div class="white--text">
              <p
                class="secondary pa-1 ma-0 pa-0 text-center font-weight-light text-body-2 px-1 text-md-body-1 white--text rounded-lg"
              >
                Balance - {{ user && user.currencySymbol
                }}{{ formatAmount(user && user.wallet.balance) }}
              </p>
            </div>
          </VCardText>
          <VCardText>
            <VForm lazy-validation ref="form" @submit.prevent="submit">
              <v-row class="mx-0 px-0">
                <VCol cols="12">
                  <p
                    class="mx-0 px-0 text-subtitle-2 text-md-subtitle-1 black--text text-h5 font-weight-medium"
                  >
                    AMOUNT INFORMATION
                  </p>
                </VCol>
                <VCol cols="12" class="py-0 my-0">
                  <VTextField
                    v-model="addDesire"
                    :label="`Desired Amount (${user && user.currencySymbol})`"
                    color="secondary"
                    :rules="[(v) => !!v || 'Amount is required']"
                    light
                  />
                </VCol>
                <VCol cols="12" class="py-0 my-0">
                  <VTextField
                    v-model="addAnnual"
                    :label="`Annual Income (${user && user.currencySymbol})`"
                    color="secondary"
                    light
                    :rules="[(v) => !!v || 'Amount is required']"
                  />
                </VCol>

                <VCol cols="12" md="6" class="py-0 my-0">
                  <VCheckbox
                    label="Business Launching"
                    v-model="usage"
                    value="Business Launching"
                    :rules="[(v) => !!v || 'Usage is required']"
                    color="secondary"
                    light
                  ></VCheckbox>
                </VCol>
                <VCol cols="12" md="6" class="py-0 my-0">
                  <VCheckbox
                    label="Home Improvement"
                    v-model="usage"
                    value="Home Improvement"
                    color="secondary"
                    :rules="[(v) => !!v || 'Usage is required']"
                    light
                  ></VCheckbox>
                </VCol>
                <VCol cols="12" md="6" class="py-0 my-0">
                  <VCheckbox
                    label="Education"
                    v-model="usage"
                    :rules="[(v) => !!v || 'Usage is required']"
                    value="Education"
                    color="secondary"
                    light
                  ></VCheckbox>
                </VCol>
                <VCol cols="12" md="6" class="py-0 my-0">
                  <VCheckbox
                    label="Home Buying"
                    v-model="usage"
                    value="Home Buying"
                    :rules="[(v) => !!v || 'Usage is required']"
                    color="secondary"
                    light
                  ></VCheckbox>
                </VCol>
                <VCol cols="12" md="6" class="py-0 my-0">
                  <VCheckbox
                    label="Investment"
                    v-model="usage"
                    value="Investment"
                    color="secondary"
                    light
                    :rules="[(v) => !!v || 'Usage is required']"
                  ></VCheckbox>
                </VCol>

                <VCol cols="12">
                  <p
                    class="mx-0 px-0 text-subtitle-2 text-md-subtitle-1 black--text text-h5 font-weight-medium"
                  >
                    CONTACT INFORMATION
                  </p>
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VTextField
                    v-model="firstName"
                    label="First Name"
                    :rules="[(v) => !!v || 'First Name is required']"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VTextField
                    v-model="lastName"
                    label="Last Name"
                    :rules="[(v) => !!v || 'Last Name is required']"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VSelect
                    v-model="maritalStatus"
                    label="Marital Status"
                    color="secondary"
                    light
                    :rules="[(v) => !!v || 'Marital Status is required']"
                    :items="['Single', 'Married', 'Other']"
                    item-color="secondary"
                  />
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VTextField
                    v-model="email"
                    label="Email"
                    color="secondary"
                    :rules="emailRules"
                    light
                  />
                </VCol>
                <VCol cols="12" class="my-0 py-0">
                  <VTextField
                    v-model="phone"
                    label="Phone"
                    :rules="[(v) => !!v || 'Phone is required']"
                    color="secondary"
                    light
                  />
                </VCol>

                <VCol cols="12">
                  <p
                    class="mx-0 px-0 text-subtitle-2 black--text text-h5 text-md-subtitle-1 font-weight-medium"
                  >
                    ADDRESS
                  </p>
                </VCol>
                <VCol cols="12" class="my-0 py-0">
                  <VTextField
                    v-model="streetAddress1"
                    label="Street Address"
                    :rules="[(v) => !!v || 'Street Address is required']"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" class="my-0 py-0">
                  <VTextField
                    v-model="streetAddress2"
                    label="Street Address 2"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VTextField
                    v-model="city"
                    label="City"
                    :rules="[(v) => !!v || 'City is required']"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6" class="my-0 py-0">
                  <VTextField
                    v-model="state"
                    label="State / Province"
                    color="secondary"
                    :rules="[(v) => !!v || 'State / Province is required']"
                    light
                  />
                </VCol>
                <VCol cols="12" class="my-0 py-0">
                  <VTextField
                    v-model="zipCode"
                    label="Postal / Zip Code"
                    color="secondary"
                    light
                    :rules="[(v) => !!v || 'Postal / Zip Code is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <p
                    class="mx-0 px-0 black--text text-h5 text-subtitle-2 text-md-subtitle-1 font-weight-medium"
                  >
                    EMPLOYMENT INFORMATION
                  </p>
                </VCol>
                <VCol cols="12" md="3">
                  <VTextField
                    v-model="EfirstName"
                    label="First Name (Present Employer)"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="3">
                  <VTextField
                    v-model="ElastName"
                    label="Last Name (Present Employer)"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="occupation"
                    :rules="[(v) => !!v || 'Occupation is required']"
                    label="Occupation"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="addGross"
                    :rules="[(v) => !!v || 'Gross Monthly Income is required']"
                    :label="`Gross monthly income (${
                      user && user.currencySymbol
                    })`"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="addRent"
                    :label="`Monthly rent/mortgage (${
                      user && user.currencySymbol
                    })`"
                    color="secondary"
                    light
                  />
                </VCol>
                <VCol cols="12" class="py-0 my-0">
                  <VCheckbox
                    label="I hereby agree that the information given is true, accurate and complete as of the date of this application submission."
                    v-model="term"
                    color="secondary"
                    :rules="[(v) => !!v || 'Agreement is required']"
                    light
                  ></VCheckbox>
                </VCol>
                <VCol cols="12">
                  <VBtn
                    color="secondary"
                    :loading="loading.loan"
                    type="submit"
                    block
                    depressed
                    >Submit</VBtn
                  >
                </VCol>
              </v-row>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      amount: '',
      annual: '',
      usage: '',
      firstName: '',
      lastName: '',
      maritalStatus: '',
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phone: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',
      EfirstName: '',
      ElastName: '',
      occupation: '',
      gross: '',
      rent: '',
      term: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    addDesire: {
      get() {
        let val = parseInt(this.amount)
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
        // console.log(firstChar)
        if (firstChar === (await this.user.currencySymbol)) {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.amount = val
        }
      },
    },
    addAnnual: {
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
        // console.log(firstChar)
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
    addGross: {
      get() {
        let val = parseInt(this.gross)

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
        // console.log(firstChar)
        if (firstChar === (await this.user.currencySymbol)) {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.gross = val
        }
      },
    },
    addRent: {
      get() {
        let val = parseInt(this.rent)

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
        // console.log(firstChar)
        if (firstChar === (await this.user.currencySymbol)) {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.rent = val
        }
      },
    },
  },
  methods: {
    ...mapActions({ loanFN: 'userflow/loanFN' }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        //change amount to number after removing symbol
        const removeSymbolAmount = this.addDesire.slice(2)
        const convertedAmount = parseInt(removeSymbolAmount.split(',').join(''))

        const payload = {
          category: 'loans',
          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,
          title: `Applied for a loan`,
          //loan amounts
          desiredAmount: convertedAmount,
          symbolAmount: this.addDesire,
          rentAmount: this.addRent,
          grossAmount: this.addGross,
          annualAmount: this.addAnnual,

          phone: this.phone,
          streetAddress: this.streetAddress1,
          usage: this.usage,

          // purpose : `Applied for a loan of desiredAmount`

          type: 'credit',
          status: 'pending',
          userID: this.user && this.user.userID,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
        }

        this.loanFN(payload)
        // console.log(payload)
        setTimeout(() => {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }, 1200)
      }
    },

    formatAmount(amount) {
      if (amount) {
        return `${amount.toLocaleString()}.00`
      } else {
        return '0.00'
      }
    },

    getCurrentTimeAndDate(format) {
      const now = new Date()

      // Get time in 12-hour HH:MM AM/PM format
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12 // Convert hours to 12-hour format
      const time = `${hours}:${minutes} ${amOrPm}`

      // Get date in DD/MM/YY format
      const day = now.getDate().toString().padStart(2, '0')
      const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const year = now.getFullYear().toString().slice(-2)
      const date = `${format ? month : day}/${format ? day : month}/${year}`

      return `${time}, ${date}`
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
