<template>
  <div>
    <p
      class="text-center accent--text text--darken-2 font-weight-medium text-subtitle-1 text-md-subtitle-h6"
    >
      Crypto Funding
    </p>
    <v-row justify="center" class="mx-0 px-0">
      <VCol cols="12" class="mx-auto text-center">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/crypto-fund.svg"
              contain
              width="300"
              class="mx-auto"
            ></v-img>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12">
        <p class="text-center black--text text-h6">Deluxe Integrity Bank</p>
        <!-- <p class="text-center black--text text-body-2 text-md-body-1">
          301 East Water Street, Charlottesville, VA 22904 Virginia
        </p> -->
      </VCol>
      <VCol cols="12" md="6">
        <VCard
          color="grey lighten-4"
          flat
          rounded="lg"
          :loading="loading.deposit ? 'secondary' : null"
        >
          <VCardText class="font-weight-bold"> Crypto Details </VCardText>
          <VForm lazy-validation @submit.prevent="submit" ref="form">
            <VCardText class="my-0 py-0">
              <VSelect
                :items="wallets"
                v-model="wallet"
                label="Please Select The Wallet You Want To Deposit To"
                item-text="walletName"
                color="secondary"
                item-color="secondary"
                outlined
                dense
                return-object
              ></VSelect>
            </VCardText>

            <VCardText
              class="d-flex flex-column align-center mt-0 pt-0"
              v-if="wallet"
            >
              <VCard
                flat
                color="accent"
                class="d-flex align-center justify-center"
                width="180"
                height="180"
                rounded="lg"
              >
                <v-img
                  :src="wallet.walletPhoto"
                  v-if="wallet.walletPhoto"
                  class="mx-auto"
                  contain
                  width="150"
                >
                </v-img>
              </VCard>
              <p
                class="mb-0 pb-0 text-center accent--text text-caption"
                v-if="wallet.walletPhoto"
              >
                Scan {{ wallet.walletName }} Qrcode
              </p>

              <VCol
                cols="12"
                class="flex-colum mt-1"
                v-if="wallet.walletAddress"
              >
                <p class="mx-auto text-center ma-0 pa-0">
                  <VChip
                    @click="copyText(wallet.walletName, wallet.walletAddress)"
                    label
                    color="secondary"
                    outlined
                    class="mx-auto text-center"
                  >
                    {{
                      $vuetify.breakpoint.mdAndDown &&
                      wallet.walletAddress.length > 25
                        ? wallet.walletAddress.slice(0, 25) + '...'
                        : wallet.walletAddress
                    }}
                    <span><VIcon small>mdi-content-copy</VIcon></span></VChip
                  >
                </p>
                <p class="text-caption accent--text ma-0 pa-0 text-center">
                  Copy {{ wallet.walletName }} Address
                </p>
              </VCol>

              <VCol cols="12" class="ma-0 pa-0" v-if="wallet">
                <VCard
                  flat
                  class="lightpinkish pa-3 pa-md-5 mx-3 mt-5"
                  rounded="xl"
                >
                  <div class="d-flex align-center" style="gap: 12px">
                    <div>
                      <v-img width="25" src="/icons/shield-tick.svg"></v-img>
                    </div>
                    <div class="secondary--text text-body-2 font-weight-light">
                      Send only {{ wallet.walletName }} to this address. Sending
                      any other crypto currency may result in permanent loss
                    </div>
                  </div>
                </VCard>
              </VCol>
            </VCardText>

            <VCardText class="mb-0 pb-0" v-if="wallet">
              <VTextField
                v-model="addSymbol"
                light
                :label="`Enter Amount - ${user && user.currencyName}`"
                color="secondary"
                :rules="[(v) => !!v || 'Amount is required']"
                type="tel"
                outlined
                dense
              />
            </VCardText>

            <VCardText class="my-0 py-0" v-if="wallet">
              <v-file-input
                outlined
                v-model="proof"
                @change="showImage"
                dense
                prepend-icon=""
                :rules="[(v) => !!v || `Proof is required`]"
                color="secondary"
                :label="`Upload Proof of Payment`"
                prepend-inner-icon="mdi-file"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="secondary">
                    {{ text }}
                  </v-chip>
                </template></v-file-input
              >

              <VCard v-if="proof" flat class="mb-5">
                <v-img
                  :src="proofImage"
                  class="mx-auto"
                  contain
                  width="300"
                ></v-img>
              </VCard>
            </VCardText>

            <VCardText v-if="wallet">
              <VBtn
                color="secondary"
                block
                depressed
                large
                type="submit"
                :loading="loading.deposit"
                >Submit</VBtn
              >
            </VCardText>
          </VForm>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      amount: '',
      wallet: '',
      walletAddress: '',
      proof: null,

      proofImage: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'adminflow/getState',
      loading: 'userflow/getLoading',
    }),
    wallets() {
      const wallets = this.state('allWallets')
      return wallets
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
    ...mapActions({ depositFN: 'userflow/depositFN' }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        //change amount to number after removing symbol
        const removeSymbol = this.addSymbol.slice(2)
        const convertedAmount = parseInt(removeSymbol.split(',').join(''))

        const payload = {
          category: 'deposits',

          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,
          proof: this.proof,
          crypto: this.wallet.walletName,
          walletAddress: this.wallet.walletAddress,

          title: `${this.wallet.walletName} Deposit`,

          symbolAmount: this.addSymbol,
          amount: convertedAmount,

          type: 'credit',
          status: 'pending',
          userID: this.user && this.user.userID,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
        }

        this.depositFN(payload)
        // console.log(payload)
        setTimeout(() => {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }, 1200)
      }
    },
    showImage() {
      if (this.proof) {
        this.proofImage = URL.createObjectURL(this.proof)
      } else {
        this.proofImage = null
      }
    },

    copyText(name, text) {
      navigator.clipboard.writeText(text)
      this.$store.dispatch('authentication/initAlert', {
        is: true,
        type: 'success',
        message: `${name} Wallet Address Copied Successfully`,
      })
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

<style scoped>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
