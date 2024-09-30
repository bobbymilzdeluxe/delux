<template>
  <div class="my-3">
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <div class="mx-3 d-flex align-center justify-space-between">
          <div>
            <VIcon @click="$router.go(-1)" color="secondary"
              >mdi-chevron-left</VIcon
            >
          </div>
          <div class="black--text font-weight-medium">Card Creation</div>
          <div>
            <div
              class="secondary pa-1 ma-0 pa-0 text-center font-weight-light text-body-2 text-md-body-1 white--text rounded-lg"
            >
              Card Balance - {{ user && user.currencySymbol
              }}{{ formatAmount(user && user.wallet.card) }}
            </div>
          </div>
        </div>
      </VCol>
    </v-row>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="5">
        <VCol cols="12">
          <VCard
            flat
            color="secondary"
            class="wavy2"
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
              class="white--text font-weight-medium text-h4 text-md-h4 text-center"
            >
              {{ cardNum() }}
            </VCardText>
            <VCardText class="d-flex align-center justify-space-between">
              <div>
                <p class="white--text font-weight-light mb-0 pb-0">
                  Card holder name
                </p>
                <p class="white--text font-weight-light mb-0 pb-0">
                  {{ cardNum() }}
                </p>
              </div>
              <div class="d-flex align-center">
                <div>
                  <p class="white--text font-weight-light mb-0 pb-0">
                    Expiry date
                  </p>
                  <p class="white--text font-weight-light mb-0 pb-0">
                    {{ cardExp() }}
                  </p>
                </div>
                <div class="white mx-2" style="height: 15px; width: 1px"></div>
                <div>
                  <p class="white--text font-weight-light mb-0 pb-0">CVV</p>
                  <p class="white--text font-weight-light mb-0 pb-0">***</p>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12">
          <VCard flat color="grey lighten-5" rounded="lg">
            <VCardText
              class="black--text text-body-2 text-md-body-1 d-flex justify-space-between"
            >
              <p class="ma-0 pa-0 font-weight-light">
                Dollar Card Creation fee
              </p>
              <p class="ma-0 pa-0 font-weight-bold">
                {{ user && user.currencySymbol }}{{ (4000).toLocaleString() }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <VCardText v-for="regs in regulation" :key="regs.title">
            <p class="black--text font-weight-medium">{{ regs.title }}</p>
            <p
              class="grey--text text-caption text-md-body-2 mb-0 pb-0"
              v-for="reg in regs.texts"
              :key="reg.text"
            >
              {{ reg.text }}
            </p>
          </VCardText>
        </VCol>

        <VCol cols="12" class="ma-0 pa-0">
          <VCardText class="my-0 py-0">
            <v-checkbox
              v-model="term1"
              :label="terms1"
              color="secondary"
              light
            ></v-checkbox>
          </VCardText>
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VCardText class="my-0 py-0">
            <v-checkbox
              v-model="term1"
              :label="terms2"
              color="secondary"
              light
            ></v-checkbox>
          </VCardText>
        </VCol>
        <VCol cols="12">
          <VBtn
            block
            color="secondary"
            @click="getCard"
            :loading="loading.card"
            depressed
            :disabled="!term2 && !term1"
            >Get Virtual Card</VBtn
          >
        </VCol>
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
      term1: false,
      term2: false,
      terms1: 'I have read and understood the above card terms and conditions.',
      terms2: 'I accept the above terms and conditions.',
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    regulation() {
      return [
        {
          title: 'Card limit',
          texts: [
            {
              text: `- Maximum single deposit of $10,000`,
            },
            {
              text: `- Maximum single transaction $10,000`,
            },
            {
              text: `- Maximum transaction limit $40,000`,
            },
            {
              text: `- Monthly transaction limit $40,000`,
            },
            {
              text: `- Maximum of 1 dollar cards can be created`,
            },
          ],
        },
        {
          title: 'Use',
          texts: [
            {
              text: `For global payments on platforms and sites that accept VISA Virtual Cards`,
            },
          ],
        },
        {
          title: 'Terms of Use and Termination',
          texts: [
            {
              text: `- You can just create just one Dollar Card`,
            },
            {
              text: `- If your Dollar Card is denied up to three (3) times due to insufficient funds, the card would be terminated, automatically`,
            },
            {
              text: `- Always ensure you have sufficient funds on your card when performing a transaction`,
            },
          ],
        },
        {
          title: 'Rates & Conversion',
          texts: [
            {
              text: 'At the point of funding your dollar card, the current exchange rate will be made known to you.',
            },
          ],
        },
        {
          title: 'Card Creation Fee',
          texts: [
            {
              text: 'A non-refundable fee of $3 + an initial deposit of $5 would be charged & debited from your wallet for every card created',
            },
          ],
        },
        {
          title: 'Maintenance Fees',
          texts: [
            {
              text: 'There is no card maintenance fees.',
            },
          ],
        },
      ]
    },
  },
  methods: {
    ...mapActions({ cardFN: 'userflow/cardFN' }),
    async getCard() {
      const balance = (await this.user) && this.user.wallet.balance
      if (balance > 4000) {
        const payload = {
          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
          active: false,
          title: `${this.user && this.user.fullName} Created A Virtual Card`,
          type: 'visa',
          blocked: false,
          amount: 4000,
          userID: this.user && this.user.userID,
          id: this.user && this.user.userID,
        }
        this.cardFN(payload)
      } else {
        this.$store.dispatch('authentication/initAlert', {
          is: true,
          message:
            'You do not have the sufficient balance to get a virtual card',
          type: 'error',
        })
      }
    },
    cardNum() {
      return `**** **** **** ****`
    },
    cardExp() {
      return `**/**`
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
