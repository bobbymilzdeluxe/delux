<template>
  <div>
    <p class="accent--text text-center font-weight-medium">Loans</p>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="6" v-if="show1">
        <VCard
          flat
          color="rgba(180, 140, 252, 0.1)"
          rounded="xl"
          class="py-3 mb-4"
        >
          <VCardText class="text-center mx-auto mb-0 pb-0">
            Total left to pay
          </VCardText>
          <VCardText
            class="text-center mx-auto black--text text-subtitle-1 text-md-h6 font-weight-bold"
          >
            {{ user && user.currencySymbol
            }}{{ formatAmount(user && user.wallet.loan) }}
          </VCardText>
        </VCard>

        <div class="mx-auto">
          <!-- <v-img src="/bag.png" class="mx-auto" contain width="220"></v-img> -->
          <v-img
            src="/Bicons/loan1.svg"
            class="mx-auto"
            contain
            width="300"
          ></v-img>
        </div>

        <div class="mx-auto text-center my-6">
          <VBtn
            color="secondary "
            class="text-capitalize"
            :disabled="
              verify &&
              verify.documentStatus == 'approved' &&
              verify.selfieStatus == 'approved'
                ? false
                : true
            "
            @click="show1 = false"
            >Get a loan</VBtn
          >
        </div>
      </VCol>
      <VCol cols="12" md="6" v-if="!show1">
        <p class="mb-16">
          <v-img src="/Bicons/loan2.svg" width="300" class="mx-auto"></v-img>
        </p>
        <p
          class="mb-0 pb-0 font-weight-medium text-subtitle-2 text-md-subtitle-1 text-center"
        >
          Getting Loans on Deluxe Integrity Bank
        </p>
        <p
          class="font-weight-light mb-13 text-center text-body-2 text-md-body-1"
        >
          We make a loan decision based on certain information we have about
          you.
        </p>
        <div
          class="d-flex align-start mb-3"
          v-for="term in terms"
          :key="term.color"
        >
          <div>
            <VBtn :color="term.color" fab icon small
              ><VIcon :color="term.color"> {{ term.icon }} </VIcon></VBtn
            >
          </div>
          <div>
            <p class="text-body-2 text-md-body-1 mb-0 pb-0 font-weight-medium">
              {{ term.title }}
            </p>
            <p class="text-caption grey--text">
              {{ term.text }}
            </p>
          </div>
        </div>
        <div>
          <VBtn color="secondary" text to="/dashboard/loan/request"
            >Proceed</VBtn
          >
        </div>
      </VCol>
    </v-row>
    <v-row
      class="mx-0 px-0"
      justify="center"
      v-if="
        verify &&
        verify.documentStatus == 'approved' &&
        verify.selfieStatus == 'approved'
          ? false
          : true
      "
    >
      <VCol cols="12" md="6">
        <VCard flat outlined rounded="lg">
          <VCardText
            class="font-weight-bold mb-0 pb-0 text-subtitle-2 text-md-subtitle-1"
          >
            Verify Your Account
          </VCardText>
          <VCardText class="grey--text text--darken-2">
            Verify your Account to be able to apply and get loan offers
          </VCardText>
          <VCardText class="text-right float-end mx-0 px-0">
            <VBtn color="secondary" text to="/dashboard/account/verification"
              >Start Verification</VBtn
            >
          </VCardText>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      show1: true,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      fundState: 'userflow/getFundState',
      state: 'adminflow/getState',
    }),

    verify() {
      const verifications = this.state('allVerifications')
      const verify = verifications.find((verify) => {
        return verify.id == (this.user && this.user.userID)
      })
      return verify
    },

    terms() {
      return [
        {
          color: 'secondary',
          icon: 'mdi-history',
          title: 'Your History with Deluxe Integrity Bank',
          text: `You'll typically get a higher loan if you perform the bulk of your
              transaction on Deluxe Integrity Bank.`,
        },
        {
          color: 'primary',
          icon: 'mdi-chart-donut',
          title: 'Your History with other borrowers',
          text: `The better your credit history with other borrowers, the better your loan on Deluxe Integrity Bank.`,
        },
        {
          color: 'orange',
          icon: 'mdi-currency-usd',
          title: 'Getting Loans on Deluxe Integrity Bank',
          text: `The more information we have about you, the better. Ensure your details are up to date.`,
        },
      ]
    },
  },
  methods: {
    formatAmount(value) {
      if (value && !this.fundState) {
        return `${value.toLocaleString()}.00`
      } else if (value === 0 && !this.fundState) {
        return '0.00'
      } else if (!value && !this.fundState) {
        return '0.00'
      } else if (value === 0 && this.fundState) {
        return '0.00'
      } else if (!value && !this.fundState) {
        return '0.00'
      } else {
        return '****'
      }
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1);
}
</style>
