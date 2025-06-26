<template>
  <div class="my-4 mb-4">
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <VCard
          flat
          class="lightpinkish pa-3 pa-md-5 mt-5"
          rounded="xl"
          v-if="user && user.active"
        >
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
      </VCol>

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
              For An Account Upgrade In order to Withdraw your funds.
            </div>
          </div>
        </VCard>
      </VCol>

      <VCol cols="12" md="8" class="">
        <VCard
          flat
          class="pa-5 grey lighten-5"
          outlined
          rounded="lg"
          :disabled="user && !user.active"
        >
          <VCol cols="12">
            <div class="d-flex justify-space-between align-center mb-3">
              <div>
                <VIcon color="secondary" @click="$router.go(-1)" class="mr-3"
                  >mdi-chevron-left</VIcon
                >
              </div>
              <p
                class="grey--text mr-2 text-subtitle-1 text-capitalize text-md-h6 text-subtitle-1 text--darken-1 mb-0 pb-0"
              >
                Withdraw in Crypto
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
            v-if="!showOtp"
          >
            <v-row class="mx-0 px-0">
              <VCol cols="12" class="my-0 py-0">
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

              <VCol cols="12" class="my-0 pb-0 mt-n2">
                <VSelect
                  v-model="crypto"
                  light
                  :rules="[(v) => !!v || 'Crypto Wallet is required']"
                  label="Crypto Wallet"
                  item-color="secondary"
                  :items="currencies"
                  color="secondary"
                  @click=";(walletAddress = ''), (walletNetwork = '')"
                />
              </VCol>

              <!-- /////// Paypal Method //////// -->
              <v-col
                v-if="crypto !== '' && crypto === 'Paypal'"
                cols="12"
                class="py-0 my-0"
              >
                <v-text-field
                  v-model="walletAddress"
                  type="email"
                  name="payal"
                  color="secondary"
                  label="Enter Email"
                  :rules="[
                    (v) => !!v || 'E-mail is required',
                    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ]"
                  light
                />
              </v-col>

              <!-- Skrill crypto -->
              <v-col
                v-if="crypto !== '' && crypto === 'Skrill'"
                cols="12"
                class="py-0 my-0"
              >
                <v-text-field
                  v-model="walletAddress"
                  type="text"
                  name="Skrill"
                  color="secondary"
                  label="Enter Address"
                  :rules="[(v) => !!v || 'E-Address is required']"
                  light
                />
              </v-col>
              <!-- /////// Cash App Tag Method //////// -->
              <v-col
                v-if="crypto !== '' && crypto === 'Cash App Tag'"
                cols="12"
                class="py-0 my-0"
              >
                <v-text-field
                  v-model="walletAddress"
                  type="text"
                  name="tag"
                  color="secondary"
                  label="Enter Tag"
                  :rules="[(v) => !!v || 'Tag is required']"
                  light
                />
              </v-col>

              <v-col
                v-if="
                  crypto !== '' &&
                  crypto !== 'Cash App Tag' &&
                  crypto !== 'Bank Transfer' &&
                  crypto !== 'Paypal' &&
                  crypto !== 'Skrill'
                "
                cols="12"
                class="py-0 my-0"
              >
                <v-text-field
                  v-model="walletAddress"
                  type="text"
                  :name="crypto"
                  color="secondary"
                  :label="`${crypto} address`"
                  :rules="[(v) => !!v || `Address is required`]"
                  light
                />
              </v-col>

              <v-col
                v-if="
                  crypto !== '' &&
                  crypto !== 'Cash App Tag' &&
                  crypto !== 'Bank Transfer' &&
                  crypto !== 'Paypal' &&
                  crypto !== 'Skrill'
                "
                cols="12"
                class="py-0 my-0"
              >
                <v-text-field
                  v-model="walletNetwork"
                  type="text"
                  :name="crypto"
                  color="secondary"
                  :label="`${crypto} Network`"
                  :rules="[(v) => !!v || `Network is required`]"
                  light
                />
              </v-col>

              <!-- <VCol cols="12" class="my-0 py-0">
                <VTextField
                  v-model="walletAddress"
                  light
                  :label="`Enter Wallet Address`"
                  color="secondary"
                  :rules="[(v) => !!v || 'Wallet Address is required']"
                />
              </VCol> -->

              <VCol cols="12">
                <VBtn color="secondary" depressed block large @click="checkForm"
                  >proceed</VBtn
                >
              </VCol>
            </v-row>
          </VForm>

          <VForm
            lazy-validation
            ref="codeForm"
            @submit="() => {}"
            v-if="showOtp"
          >
            <VRow class="mx-0 px-0" justify="center">
              <VCol cols="12">
                <p
                  class="font-weight-medium text-h6 text--darken-1 grey--text mb-0 pb-0"
                >
                  Please Enter Your Authorization Code.
                </p>
                <p
                  class="text-subtitle-2 font-weight-regular grey--text text--darken-1"
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
                  <strong>Authorization Code, charges may apply.</strong>
                </p>
              </VCol>
              <VCol cols="12" class="my-0 py-0">
                <VTextField
                  v-model="otp"
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
                  :loading="loading.withdraw"
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
      showOtp: false,
      otp: '',
      otpObj: null,

      crypto: '',
      walletAddress: '',
      walletNetwork: '',
      amount: '',
      currencies: [
        'Bitcoin',
        'Ethereum',
        'Perfect Money',
        'Litecoin',
        'Skrill',
        'Payeer',
        'Paypal',
        // "Bank Transfer",
        'Cash App Tag',
      ],
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
    ...mapActions({ withdrawFN: 'userflow/withdrawFN' }),

    async checkCode() {
      const codes = this.state('allCodes')

      const code = await codes.find((code) => {
        return code.code == this.otp
      })

      if (!code) {
        this.$store.dispatch('authentication/initAlert', {
          timer: 5000,
          type: 'error',
          is: true,
          message: `Please Contact Support To Get Valid W-OTP Code To Withdraw Your Funds`,
        })
        return
      }
      if (code.used) {
        this.$store.dispatch('authentication/initAlert', {
          timer: 5000,
          type: 'error',
          is: true,
          message: `This W-OTP Code Has Already Been Used.`,
        })
        return false
      } else {
        this.otpObj = code
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
          name: `${this.user && this.user.firstName} ${
            this.user && this.user.lastName
          }`,

          fullName: this.user && this.user.fullName,

          email: this.user && this.user.email,
          category: 'withdraws',

          symbolAmount: this.addSymbol,

          title: `${this.crypto} Withdrawal`,
          amount: convertedAmount,

          walletAddress: this.walletAddress,
          crypto: this.crypto,
          walletNetwork: this.walletNetwork,

          type: 'debit',
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
          status: 'pending',
          userID: this.user && this.user.userID,

          otpObj: this.otpObj,
        }

        this.withdrawFN(payload)
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
        this.showOtp = true
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
