<template>
  <div>
    <main class="accent">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :Dpic="dpic"
            :absolute="true"
            :absolute1="absOne"
            :width="900"
          >
            <template #title>
              <span class="lineartext"> Banking Services</span>
            </template>
            <template #text>
              We offer a range of Cash ISAs to help meet your needs, including
              Instant Access, Fixed Rate Bond(s) and 40 day notice.
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-5 my-md-13">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646f4f5500e64cd1e2a681c6_transfers-icon%25402x-min-p-500.webp"
          >
            <template>
              <div class="mx-auto text-center text-md-left mx-0">
                <VChip
                  pill
                  color="secondary lighten-3"
                  class="primary--text font-weight-bold mb-2"
                  >Transfer funds</VChip
                >
              </div>
            </template>
            <template #title>
              <span class="accent--text">
                Send money instantly to friends, and keep track of all funds
                sent.
              </span>
            </template>
            <template #text>
              <span class="grey--text">
                Send money freely, 30 times a month and be the first to know
                when it arrives.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="py-5 py-md-13 lightpinkish">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646f51997f64141352cfe026_payment%20automate-p-500.webp"
          >
            <template>
              <!-- <div class="mx-auto text-center text-md-left mx-0">
                <VChip
                  pill
                  color="secondary lighten-3"
                  class="primary--text font-weight-bold mb-2"
                  >Bill payments</VChip
                >
              </div> -->
            </template>
            <template #title>
              <span class="accent--text">
                Banking services created exclusively for you</span
              >
            </template>
            <template #text>
              <span class="grey--text">
                As a customer of our private banking service, we offer a range
                of solutions that can satisfy your particular financial
                requirements. From current and savings accounts, to mortgages,
                credit cards and asset finance, your Relationship Manager will
                help connect you with products that make your money work harder.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="accent" data-aos="fade-in" data-aos-duration="1300">
      <v-row class="mx-0">
        <VCol cols="12" md="6" class="ma-0 pa-0">
          <v-img
            src="https://e0.pxfuel.com/wallpapers/673/701/desktop-wallpaper-scott-foley-white-costume-man-actor.jpg"
          >
          </v-img>
        </VCol>
        <VCol
          cols="12"
          md="6"
          class="ma-0 pa-0 pa-5 d-flex justify-center align-center"
        >
          <div>
            <p class="text-h5 text-md-h4 font-weight-medium white--text">
              I found out about Flexi Unions Bank in 2018, on Twitter or
              somewhere on social media. It was this app where you could sign up
              and get instant loans. I tried it and it worked. Subsequently,
              when I needed a quick loan I knew I could always go to Flexi
              Unions Bank
            </p>
            <p class="text-subtitle-2 text-md-subtitle 1 white--text">
              - Leonard U
            </p>
          </div>
        </VCol>
      </v-row>
    </main>
  </div>
</template>

<script>
import loansSec1 from '~/components/loansComps/loansSec1.vue'
export default {
  created() {
    window.scrollTo(0, 0)
  },
  components: { loansSec1 },
  data() {
    return {
      dpic: 'https://e0.pxfuel.com/wallpapers/396/312/desktop-wallpaper-co-working-conference-business-team-meeting-present-investor-colleagues-discussing-new-plan-financial-graph-data-on-office-table-with-laptop-and-digital-tablet-finance-accounting-investment-1241406.jpg',
      absOne:
        'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629c0e166d88430f10aac7_Circle%20-%2003.webp',
    }
  },
  head: {
    titleTemplate: 'Banking Services - Flexi Unions Bank',
  },
}
</script>

<style></style>
