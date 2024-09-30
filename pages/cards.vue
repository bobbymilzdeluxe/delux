<template>
  <div>
    <main class="accent py-7 py-md-16" style="min-height: 100vh">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :absolute="true"
            :width="900"
            :btn="true"
            Dpic="/bigcreditcard.jpg"
            absolute2="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea41292dc349aa980002_handdrawn%20green%20arrow.webp"
            absolute1="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645ad85b650f330da848944c_Highlight_right.webp"
          >
            <template slot="title">
              Debit cards are the past,
              <span class="lineartext"
                >Deluxe Integrity Bank cards are the future</span
              >
            </template>
            <template #text>
              Anyone who opens a personal checking account may apply for a free
              Deluxe Integrity Bank CheckCard.
              <br />

              It's the card that works like a check, anywhere VISA is accepted.
              <br />
              It also serves as an ATM card at any PULSE/CIRRUS/DASH affiliated
              Automatic Teller Machine or PULSEPAY terminal. Choose your own
              Personal Identification Number (PIN) at your nearest Deluxe
              Integrity Bank Online Bank location.
            </template>
            <template #btn> Request a card today </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="wavy py-7 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://e1.pxfuel.com/desktop-wallpaper/901/225/desktop-wallpaper-premium-of-woman-with-shopping-bags-and-a-credit-card-women-in-shopping-mall.jpg"
          >
            <template slot="title">
              <span class="accent--text">
                Get rewarded for your everyday spending
              </span>
            </template>
            <template #text>
              <span class="grey--text">
                Experience the joy of earning while you spend. Earn 1% cashback
                on every Virtual card purchase you make.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-4">
      <vContainer fluid>
        <v-row justify="center" class="mx-0 px-0">
          <VCol cols="12">
            <VCard flat class="pa-5" color="transparent" rounded="xl">
              <v-row class="mx-0 px-0" justify="center">
                <VCol
                  cols="12"
                  md="6"
                  class="d-flex justify-center align-center"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  <div style="position: relative">
                    <v-img
                      src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645aad4512cec53ede261ac5_man%20shopping-p-500.webp"
                      contain
                      width="290"
                      style="border-radius: 12px; z-index: 1"
                    >
                    </v-img>

                    <div
                      style="
                        position: absolute;
                        bottom: 12%;
                        z-index: 2;
                        left: 12%;
                        border-radius: 9px;
                      "
                      class="secondary pa-3 darken-4"
                    >
                      <v-img
                        src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea407c0134d9ca25a30c_shop.webp"
                        contain
                        width="60"
                      >
                      </v-img>
                    </div>
                  </div>
                </VCol>
                <VCol cols="12" md="6">
                  <p class="text-h5 text-md-h3 font-weight-bold accent--text">
                    Shop now, pay later at 0% interest
                  </p>
                  <p class="text-h6 text-md-h5 text1--text font-weight-regular">
                    Enjoy the perks of spreading payments, use your Deluxe
                    Integrity Bank debit card to pay for items and spread in
                    equal installments at your favourite stores. No hidden fees.
                  </p>
                  <p>
                    <VBtn
                      color="primary"
                      class="white--text text-capitalize font-weight-medium"
                      depressed
                      large
                      >Learn More
                    </VBtn>
                  </p>
                </VCol>
              </v-row>
            </VCard>
          </VCol>
        </v-row>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-1
            class="aquaColor pa-6 pa-md-10"
            style="border-radius: 20px"
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64665225ea80d7aa0126aa50_wallett%201.webp"
          >
            <template #title>
              <span class="accent--text"> Discounts and Rewards </span>
            </template>
            <template #text>
              <span class="grey--text">
                Our partnership with Visa also gives you access to up to 10% in
                discounts from featured merchants.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-2 :cardTitle="true" :features="lightCards" />
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-4>
            <template #text> Change the way you spend </template>
            <template #btn> Request for your card now</template>
          </loans-sec-4>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
import loansSec1 from '~/components/loansComps/loansSec1.vue'
import LoansSec2 from '~/components/loansComps/loansSec2.vue'
import LoansSec4 from '~/components/loansComps/loansSec4.vue'
export default {
  components: { loansSec1, LoansSec2, LoansSec4 },
  created() {
    window.scrollTo(0, 0)
  },
  computed: {
    lightCards() {
      return [
        {
          title: 'Efficient card creation',
          color: 'rgba(78,241,224,.1)',
          text: 'Request your Virtual card from the Cards section on the site.',
        },
        {
          title: 'A card you can trust',
          color: 'rgba(255,4,117,.1)',
          text: 'Our debit card transactions are secured by Visa global and Network International.',
        },
        {
          title: 'Your card, your safety rules',
          color: 'rgba(255,203,47,.1)',
          text: 'Your site and your debit card are the perfect duo, working in sync with each other. From card freezes to setting spend limits, you’re completely in charge.',
        },
        {
          title: 'Pay anywhere locally',
          color: 'rgba(180,140,252,.1)',
          text: 'Make payments online and in-store with your virtual card.',
        },
      ]
    },
  },
  head: {
    titleTemplate: 'Cards - Deluxe Integrity Bank',
  },
}
</script>

<style></style>
