<template>
  <div>
    <main class="accent py-7 py-md-16" style="min-height: 100vh">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :absolute="true"
            :btn="true"
            :width="500"
            :Dpic="Dpic"
            :absolute1="absOne"
            :absolute2="absTwo"
          >
            <template slot="title">
              <span class="lineartext">Instant Loans</span> loans whenever you
              need it.
            </template>
            <template #text>
              We take pride in helping families with affordable solutions to
              their money needs. Contact your nearest Deluxe Integrity Bank
            </template>
            <template #btn> Get an instant loan </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-8">
      <vContainer>
        <vContainer>
          <loans-sec-2 :features="lightCards" :title="true" :pic="true">
            <template #title> Our Features </template>
          </loans-sec-2>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-8 my-md-14">
      <vContainer>
        <vContainer>
          <loans-sec-3 :features="reasons" />
        </vContainer>
      </vContainer>
    </main>

    <main class="aquaColor my-4 my-md-10 py-5 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :revers="true"
            :width="140"
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64635aa3e037bad6552aa6f6_unlock%20icon.webp"
          >
            <template #title>
              <span class="primary--text">Unlock higher loan limits</span>
            </template>
            <template #text>
              <span class="grey--text">
                Deluxe Integrity Bank makes installment loans at all of our
                full-service bank locations, with friendly, helpful loan
                officers. If you are ready to purchase an automobile or truck,
                whether new or used, we are ready to finance the vehicle for
                you. We have competitive interest rates and terms on auto loans.
                If you have been considering a recreational vehicle, motor home,
                boat or other leisure vehicle, we can loan the money you need,
                with a repayment plan to suit you.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-4 my-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6479ddf87785f2c804abb0cc_dreams%20to%20reality.gif"
          >
            <template #title>
              <span class="accent--text"> Make your dreams a reality </span>
            </template>
            <template #text>
              <span class="grey--text">
                Our loans are made to fit your needs and help you achieve your
                goals. Select a repayment date that best suits you and change it
                if you need to.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <template #text>Want to know more about our loans? </template>
          <template #btn>Register With Us </template>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
import loansSec1 from '~/components/loansComps/loansSec1.vue'
import LoansSec2 from '~/components/loansComps/loansSec2.vue'
import LoansSec3 from '~/components/loansComps/loansSec3.vue'
import LoansSec4 from '~/components/loansComps/loansSec4.vue'
export default {
  components: { loansSec1, LoansSec2, LoansSec3, LoansSec4 },
  created() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      Dpic: 'https://www.nbkc.com/themes/nbkc-2020/assets/images/home-loans/purchase/kinds-pilot-program.jpg',
      absOne:
        'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629eb7ab987dc62b857075_Spline%20-%2002.webp',
      absTwo:
        'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629c0e166d88430f10aac7_Circle%20-%2003.webp',
    }
  },
  computed: {
    reasons() {
      return [
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646354826afc95b84a040228_Quick%20and%20Simple%20icon.webp',
          title: 'Quick and simple',
          text: 'Request a loan and get it in minutes.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6463548152ad093eec87a930_hidden%20fees%20icon.webp',
          title: 'No hidden fees ever',
          text: 'We give you a clear breakdown of your loan. You can bank on our transparency.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6463548152ad093eec87a8fb_all%20in%20one%20icon.webp',
          title: 'Do it all in one',
          text: 'View your loan offers, history and balance in one place and request new loans easily. ',
        },
      ]
    },
    lightCards() {
      return [
        {
          color: 'rgba(78,241,224,.1)',
          text: 'Access personal loans of up to $500,000',
        },
        {
          color: 'rgba(255,4,117,.1)',
          text: 'Enjoy loan top-ups that give you access to more funds to reach your goals even as you service an ongoing loan',
        },
        {
          color: 'rgba(255,203,47,.1)',
          text: 'Apply for a loan extension for convenient loan repayment',
        },
        {
          color: 'rgba(180,140,252,.1)',
          text: 'Competitive interest rates',
        },
      ]
    },
  },
  head: {
    titleTemplate: 'Loans - Deluxe Integrity Bank',
  },
}
</script>

<style></style>
