<template>
  <div>
    <p
      class="font-weight-medium accent--text text-body-2 text-center text-md-body-1"
    >
      Virtual Card
    </p>
    <v-row class="mx-0 px-0" justify="center" v-if="!card">
      <VCol cols="12" md="6" v-if="show1">
        <VCard flat>
          <VCardText class="mx-auto text-center">
            <v-img
              src="/icons/card.svg"
              width="300"
              class="mx-auto"
              contain
            ></v-img>
          </VCardText>
          <VCardText>
            <p class="black--text text-body-2 text-center text-md-body-1">
              Hello {{ user && user.fullName }},
            </p>
            <p
              class="grey--text pb-0 mb-0 text-caption text-center text-md-body-2"
            >
              You have no card yet.
            </p>
          </VCardText>
          <VCardText>
            <VBtn
              block
              depressed
              large
              @click=";(show1 = false), (show2 = true)"
              color="secondary"
              dark
              class="text-capitalize"
              >Get Virtual Card</VBtn
            >
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6" v-if="show2">
        <VCard flat color="grey lighten-5" rounded="xl">
          <VCardText class="d-flex mb-0 pb-0 justify-space-between">
            <p class="black--text text-body-2 text-md-body-1 font-weight-bold">
              Platinum Dollar Card
            </p>
            <p><VIcon color="black">mdi-chevron-right</VIcon></p>
          </VCardText>
          <VCardText
            class="teal--text my-0 py-0 font-weight-bold text-md-body-1 font-weight-bold"
          >
            $card creation fee per card + $5 initial deposit
          </VCardText>
          <VCardText
            class="d-flex align-center mb-0 pb-0"
            style="gap: 9px"
            v-for="feat in features"
            :key="feat.text"
          >
            <p><VIcon>mdi-check</VIcon></p>
            <p class="font-weight-light text-md-body-1 text-body-2">
              {{ feat.text }}
            </p>
          </VCardText>
          <VCardText>
            <VBtn
              color="secondary"
              depressed
              text
              to="/dashboard/card/create-card"
              >Proceed</VBtn
            >
          </VCardText>
        </VCard>
      </VCol>
    </v-row>

    <v-row v-if="card" justify="center" class="mx-0 px-0">
      <VCol cols="11" md="5">
        <VCard
          flat
          color="secondary"
          class="wavy2"
          :disabled="(card && !card.active) || (card && card.blocked)"
          rounded="xl"
          style="overflow: hidden"
        >
          <VCardText class="d-flex justify-space-between align-center">
            <div>
              <v-img width="35" src="/logo/line2.svg"></v-img>
            </div>
            <div>
              <v-img width="50" contain src="/visa.png"></v-img>
            </div>
          </VCardText>
          <VCardText
            @click="hide = !hide"
            class="white--text font-weight-medium text-h6 text-md-h5"
          >
            {{ formatCardNumber(card && card.cardNumber) }}
            <span
              ><VIcon @click.stop="hide = !hide" color="white">{{
                hide ? 'mdi-eye-off' : 'mdi-eye'
              }}</VIcon></span
            >
          </VCardText>
          <VCardText class="d-flex align-center justify-space-between">
            <div>
              <p class="white--text font-weight-light mb-0 pb-0">
                Card Holder Name
              </p>
              <p class="white--text font-weight-medium mb-0 pb-0">
                {{ card && card.fullName }}
              </p>
            </div>
            <div class="d-flex align-center">
              <div>
                <p class="white--text font-weight-light mb-0 pb-0">
                  Expiry Date
                </p>
                <p class="white--text font-weight-medium mb-0 pb-0">
                  {{ card && card.expDate }}
                </p>
              </div>
              <div class="white mx-2" style="height: 15px; width: 1px"></div>
              <div>
                <p class="white--text font-weight-light mb-0 pb-0">CVV</p>
                <p class="white--text font-weight-medium mb-0 pb-0">
                  {{ card && card.cvv }}
                </p>
              </div>
            </div>
          </VCardText>
        </VCard>
        <VCardText
          v-if="card && card.active && card && !card.blocked"
          class="mx-0 px-0"
        >
          <p
            class="text-center grey--text text--darken-2 font-weight-regular text-subtitle-1"
          >
            Total Card Balance : {{ user && user.currencySymbol
            }}{{ formatAmount(user && user.wallet.card) }}
          </p>
          <p class="accent--text mb-0 pb-0 font-weight-medium text-subtitle-2">
            Billing Address
          </p>
          <p class="accent--text my-0 py-0 font-weight-light">
            {{ user && user.address }}
          </p>

          <p
            class="accent--text text-center mt-3 mb-0 pb-0 font-weight-medium text-subtitle-2"
          >
            Card Details
          </p>
          <VCard outlined class="pa-3" rounded="xl">
            <div
              class="accent--text my-0 py-0 d-flex justify-space-between"
              v-for="detail in details"
              :key="detail.text"
            >
              <p class="font-weight-light accent--text my-1">
                {{ detail.text }}
              </p>
              <p
                class="accent--text font-weight-medium my-0"
                @click="copyText(detail.text, detail.info)"
              >
                <VIcon color="accent" x-small>mdi-content-copy</VIcon>
                {{ detail.info }}
              </p>
            </div>
          </VCard>
        </VCardText>
        <VCardText v-if="card && !card.active">
          <p class="accent--text font-weight-medium">
            This Card is Not Yet Active, Please Contact Support To Activate Your
            Card
          </p>
        </VCardText>
        <VCardText v-if="card && card.blocked">
          <p class="accent--text font-weight-medium">
            This Card Has Been Blocked, Please Contact Support For More
            Enquires.
          </p>
        </VCardText>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('userflow/getCardProps')
    }, 4000)
  },
  data() {
    return {
      show1: true,
      show2: false,
      hide: true,
    }
  },
  computed: {
    ...mapGetters({
      state: 'userflow/getState',
      user: 'authentication/getUser',
    }),
    card() {
      return this.state('card')
    },
    details() {
      return [
        {
          text: 'Card Number',
          info: this.formatCardNumber(this.card && this.card.cardNumber),
        },
        {
          text: 'Expiration Date',
          info: this.card.expDate,
        },
        {
          text: 'CVC',
          info: this.card.cvv,
        },
        {
          text: 'Card Name',
          info: this.card.fullName,
        },
      ]
    },
    features() {
      return [
        {
          text: 'Shop, Spend, and pay globally',
        },
        {
          text: 'For online payments on all enabled sites and plaforms',
        },
        {
          text: 'Enabled for payments on 3D secured platforms',
        },
        {
          text: 'Monthly transaction limit of $40,000/card',
        },
      ]
    },
  },
  methods: {
    formatCardNumber(number) {
      if (!this.hide && number) {
        return number
      } else {
        return number.slice(0, 11) + '*** ****'
      }
    },
    formatAmount(amount) {
      if (amount) {
        return `${amount.toLocaleString()}.00`
      } else {
        return '0.00'
      }
    },
    copyText(text, info) {
      navigator.clipboard.writeText(info)

      this.$store.dispatch('authentication/initAlert', {
        is: true,
        type: 'success',
        message: `${text} Copied Successfully`,
        close: true,
      })
    },
  },
}
</script>

<style></style>
