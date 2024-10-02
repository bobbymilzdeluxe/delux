<template>
  <div class="my-4 mb-4">
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8" v-if="user && !user.active">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mx-3 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div
              class="secondary--text text-body-2 font-weight-light text-capitalize"
            >
              Dear {{ user && user.fullName }}, Please Kindly Activate Your
              Account By Contacting
              <a
                href="mailto:support@deluxeintegrity.com"
                class="px-0 py-0 text-lowercase font-weight-black accent--text text-decoration-none"
                target="_blank"
              >
                support@deluxeintegrity.com
              </a>
              For An Account Upgrade In order to transfer your funds.
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="8" class="">
        <VCard
          :disabled="user && !user.active"
          flat
          class="pa-5 grey lighten-5"
          outlined
          rounded="lg"
        >
          <VCol cols="12">
            <div class="d-flex justify-space-between align-center mb-3">
              <div>
                <VIcon color="secondary" @click="$router.go(-1)" class="mr-3"
                  >mdi-chevron-left</VIcon
                >
              </div>
              <p
                class="grey--text mr-2 text-subtitle-1 text-uppercase text-md-h6 text-subtitle-1 text--darken-1 mb-0 pb-0"
              >
                {{ transferType }} Transfer
              </p>
              <!-- <VSpacer /> -->
              <div>
                <p
                  class="secondary pa-1 ma-0 pa-0 text-center font-weight-light text-body-2 text-md-body-1 white--text rounded-lg"
                >
                  Balance - {{ user && user.currencySymbol
                  }}{{ formatAmount(user && user.wallet.balance) }}
                </p>
              </div>
            </div>
          </VCol>
          <VForm
            ref="form"
            @submit.prevent="submit"
            lazy-validation
            v-if="!showIms"
          >
            <v-row class="mx-0 px-0">
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VTextField
                  v-model="Bank"
                  light
                  :rules="[(v) => !!v || 'Bank Name is required']"
                  label="Beneficiary Bank Name"
                  color="secondary"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VTextField
                  v-model="Bname"
                  light
                  :rules="[
                    (v) => !!v || 'Beneficiary Account Name is required',
                  ]"
                  label="Beneficiary Account Name"
                  color="secondary"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VTextField
                  v-model="BAccount"
                  light
                  :rules="[
                    (v) => !!v || 'Beneficiary Account Number is required',
                  ]"
                  label="Beneficiary Account Number"
                  color="secondary"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VTextField
                  v-model="addSymbol"
                  light
                  :label="`Enter Amount - ${user && user.currencyName}`"
                  color="secondary"
                  :rules="[(v) => !!v || 'Amount is required']"
                  type="tel"
                />
                <!-- @input="addSymbol" -->
              </VCol>
              <VCol
                cols="12"
                class="my-0 py-0"
                v-if="transferType && transferType == 'international'"
              >
                <VTextField
                  v-model="iban"
                  light
                  label="IBAN"
                  :rules="[(v) => !!v || 'IBAN is required']"
                  color="secondary"
                />
              </VCol>
              <VCol
                cols="12"
                class="my-0 py-0"
                v-if="transferType && transferType == 'international'"
              >
                <VSelect
                  v-model="country"
                  light
                  label="Country"
                  :rules="[(v) => !!v || 'Country is required']"
                  item-text="name"
                  color="secondary"
                  item-color="secondary"
                  :items="countriess"
                />
              </VCol>
              <VCol
                cols="12"
                class="my-0 py-0"
                v-if="transferType && transferType == 'international'"
              >
                <VTextField
                  v-model="Swcode"
                  light
                  :rules="[(v) => !!v || 'Swift Code is required']"
                  label="Swift Code"
                  color="secondary"
                />
              </VCol>
              <VCol
                cols="12"
                class="my-0 py-0"
                v-if="transferType && transferType == 'international'"
              >
                <VTextField
                  v-model="Rnumber"
                  light
                  :rules="[(v) => !!v || 'Routing Number is required']"
                  label="Routing Number"
                  color="secondary"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VSelect
                  v-model="acctType"
                  light
                  label="Account Type"
                  :rules="[(v) => !!v || 'Account Type is required']"
                  color="secondary"
                  item-color="secondary"
                  :items="[
                    'Savings Account',
                    'Current Account',
                    'Checking Account',
                    'Fixed Account',
                    'Non Resident Account',
                    'Online Banking',
                  ]"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="transferType">
                <VTextarea
                  v-model="purpose"
                  rows="2"
                  :rules="[(v) => !!v || 'Purpose is required']"
                  light
                  label="Purpose of Transfer"
                  color="secondary"
                />
              </VCol>
              <VCol cols="12" v-if="transferType">
                <VBtn
                  block
                  color="secondary"
                  @click="checkForm"
                  depressed
                  dark
                  large
                  >Continue</VBtn
                >
              </VCol>
            </v-row>
          </VForm>

          <!-- for the w-otp code -->
          <VForm
            lazy-validation
            ref="codeForm"
            @submit="() => {}"
            v-if="showIms"
          >
            <VRow class="mx-0 px-0" justify="center">
              <VCol cols="12">
                <p
                  class="font-weight-medium text-h6 text--darken-1 grey--text mb-0 pb-0"
                >
                  Please Enter Your Authorization Code.
                </p>
                <p
                  class="text-subtitle-2 font-weight-bold grey--text text--darken-1"
                >
                  Contact
                  <a
                    href="mailto:support@deluxeintegrity.com"
                    class="px-0 py-0 text-lowercase font-weight-black accent--text text-decoration-none"
                    target="_blank"
                  >
                    support@deluxeintegrity.com
                  </a>
                  to get your
                  <strong class="font-weight-black"
                    >Authorization Code, charges may apply.</strong
                  >
                </p>
              </VCol>
              <VCol cols="12" class="my-0 py-0">
                <VTextField
                  v-model="imsCode"
                  label="Enter Code Here"
                  color="secondary"
                  light
                />
              </VCol>
              <VCol cols="12">
                <VBtn
                  color="secondary"
                  block
                  depressed
                  :loading="loading.transfer"
                  dark
                  @click="submit"
                  large
                  >Proceed</VBtn
                >
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import countries from '~/services/countries'
export default {
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      imsCode: '',
      imsObj: null,
      showIms: false,

      amount: '',
      Bname: '',
      BAccount: '',
      Bank: '',
      iban: '',
      country: '',
      Swcode: '',
      Rnumber: '',
      acctType: '',
      purpose: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
      state: 'adminflow/getState',
    }),
    countriess() {
      return countries
    },
    transferType() {
      return this.$route.params.id
    },

    addSymbol: {
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
  },
  methods: {
    ...mapActions({ transferFN: 'userflow/transferFN' }),

    async checkCode() {
      const codes = this.state('allCodes')

      const code = await codes.find((code) => {
        return code.code == this.imsCode
      })

      if (!code) {
        this.$store.dispatch('authentication/initAlert', {
          timer: 5000,
          type: 'error',
          is: true,
          message: `Please Contact Support To Get Valid IMS Code To Transfer Your Funds`,
        })
        return
      }
      if (code.used) {
        this.$store.dispatch('authentication/initAlert', {
          timer: 5000,
          type: 'error',
          is: true,
          message: `This IMS Code Has Already Been Used.`,
        })
        return false
      } else {
        this.imsObj = code
        return true
      }
    },

    async submit() {
      //change amount to number after removing symbol
      const removeSymbol = this.addSymbol.slice(2)
      const convertedAmount = parseInt(removeSymbol.split(',').join(''))

      const checkCode = await this.checkCode()

      if (checkCode) {
        const payload = {
          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,

          category: 'transfers',

          symbolAmount: this.addSymbol,

          transferType: this.transferType,
          title: `Transfer to ${this.Bname}`,
          senderName: `${this.user && this.user.firstName} ${
            this.user && this.user.lastName
          }`,
          senderAccountNumber: `${this.user && this.user.accNumber}`,
          senderBank: 'Deluxe Integrity Bank',

          amount: convertedAmount,
          bankName: this.Bname,
          bankAccount: this.BAccount,
          bank: this.Bank,
          iban: this.iban,
          country: this.country,
          swiftCode: this.Swcode,
          routingNumber: this.Rnumber,
          accountType: this.acctType,
          purpose: this.purpose,

          type: 'debit',
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
          status: 'pending',
          userID: this.user && this.user.userID,

          imsObj: this.imsObj,
        }

        this.transferFN(payload)
        // console.log(payload)
      }
    },

    async checkForm() {
      const balance = (await this.user) && this.user.wallet.balance

      //change amount to number after removing symbol
      const removeSymbol = this.addSymbol.slice(2)
      const convertedAmount = parseInt(removeSymbol.split(',').join(''))

      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
      } else {
        return
      }
      if (balance >= convertedAmount) {
        this.showIms = true
      } else {
        this.$store.dispatch('authentication/initAlert', {
          is: true,
          message: 'You Do Not Have The Sufficient Amount For This Transaction',
          type: 'success',
          timer: 4000,
        })
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

<style></style>
