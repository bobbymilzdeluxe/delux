<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <p
          class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
        >
          Your Virtual Card
        </p>
      </VCol>
      <VCol cols="12" md="6" v-if="!card">
        <VCol cols="12">
          <VCard flat>
            <v-img
              contain
              width="300"
              class="mx-auto"
              src="/nocard.svg"
            ></v-img>
          </VCard>
          <p
            class="grey--text my-0 py-0 text-subtitle-2 text-md-subtitle-1 text--darken-3 text-center font-weight-bold"
          >
            Your have no card
          </p>
          <p
            class="grey--text my-0 py-0 text-body-2 text-md-body-1 text--darken-1 text-center font-weight-light"
          >
            Please add a card to your account using the button below
          </p>
        </VCol>
        <VCol cols="12">
          <VBtn
            to="/dashboard/card/create-card"
            color="secondary"
            depressed
            large
            block
            >Add Card</VBtn
          >
        </VCol>
      </VCol>

      <!-- card is purchased -->
      <VCol cols="12" md="5" v-if="card">
        <VCol cols="12">
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
          <p
            class="text-center grey--text text--darken-3 mt-4 font-weight-medium"
          >
            Your Flexi Unions Bank Virtual card is here!
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
              <p
                class="text-body-1 text-md-body-2 mb-0 pb-0 font-weight-medium"
              >
                {{ term.title }}
              </p>
              <p class="text-caption grey--text">
                {{ term.text }}
              </p>
            </div>
          </div>
        </VCol>
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
      show: true,
      hide: true,
    }
  },
  computed: {
    ...mapGetters({ state: 'userflow/getState' }),
    card() {
      return this.state('card')
    },
    terms() {
      return [
        {
          color: 'secondary',
          icon: 'mdi-earth',
          title: 'Available',
          text: `Withdraw cash from your Flexi Unions Bank Account using your Virtual Card, anywhere`,
        },
        {
          color: 'primary',
          icon: 'mdi-shield-check',
          title: `It's secure`,
          text: `Keep your card sage always from the comfort of your app`,
        },
        {
          color: 'orange',
          icon: 'mdi-database',
          title: 'No unnecessary fees',
          text: `Say goodbye to those monthly card fees. Forever.`,
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
  },
}
</script>

<style></style>
