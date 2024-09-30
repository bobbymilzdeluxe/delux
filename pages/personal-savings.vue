<template>
  <div>
    <main class="accent py-7 py-md-16" style="min-height: 100vh">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :absolute="true"
            :btn="true"
            :Dpic="Dpic"
            :absolute1="absOne"
            :absolute2="absTwo"
          >
            <template slot="title">
              Grow your <span class="lineartext">savings</span> with Flexi
              Unions Bank
            </template>
            <template #text>
              Save smart and earn more with a Deluxe Integrity Bank savings
              plan. We offer up to 15.5% interest on your savings.
            </template>
            <template #btn> Start saving with Deluxe Integrity Bank </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-5 my-md-13">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :width="500"
            :absolute="true"
            absolute2="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629eb7ab987dc62b857075_Spline%20-%2002.webp"
            Dpic="https://e0.pxfuel.com/wallpapers/407/993/desktop-wallpaper-deposit-saving-money-piggy-bank-money.jpg"
          >
            <template #title>
              <span class="accent--text">
                Save for the things that matter
              </span>
            </template>
            <template #text>
              <span class="grey--text">
                Whatever your saving habits or goals are, we have a plan that’s
                right for you.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-3 :features="reasons" title="Features" />
        </vContainer>
      </vContainer>
    </main>

    <main class="my-5 my-md-10 py-5 py-md-16 aquaColor">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea3f48fc7bd5a5858c7e_lock-p-500.webp"
            :width="200"
            :absolute="true"
            :revers="true"
            absolute1="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/647a0f74c70424a2a5d8d8ad_savings%20card.webp"
          >
            <template #title>
              <span class="accent--text"> Cash Vault </span>
            </template>
            <template #text>
              <span class="grey--text">
                Lock away bulk sums for capital projects from as low as $50,000
                and earn 15.5% interest at maturity.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-5 my-md-10 py-5 py-md-10">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64661b3c16996597de4aa56e_goals%202.webp"
          >
            <template #title>
              <span class="accent--text">Goals</span>
            </template>
            <template #text>
              <span class="grey--text">
                Invest towards your long or short term goals. Save a particular
                amount on a daily or weekly basis. Start as low as $100 to earn
                up to 9.5% interest at maturity.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-5 my-md-10 py-5 py-md-16 lightyellow">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :revers="true"
            Dpic="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64661abb4aeb86bf8d5ffafd_big-pile-money%201.webp"
          >
            <template #title>
              <span class="accent--text">FlexSave</span>
            </template>
            <template #text>
              <span class="grey--text">
                Have some spare cash? No amount is too small to save. Save it
                here and keep adding to it as you get more. Earn up to 9%
                interest.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-4>
            <template #text> Change the way you save </template>
            <template #btn> Create a savings plan today </template>
          </loans-sec-4>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
import loansSec1 from '~/components/loansComps/loansSec1.vue'
import LoansSec3 from '~/components/loansComps/loansSec3.vue'
import LoansSec4 from '~/components/loansComps/loansSec4.vue'
export default {
  components: { loansSec1, LoansSec3, LoansSec4 },
  created() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      Dpic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646613989ac983ebfa9ce8a1_Savings%201.webp',
      absOne:
        'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646614211f9623d8be480ab7_Savings%20frequency%20card.webp',
      absTwo:
        'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629c0e166d88430f10aac7_Circle%20-%2003.webp',
    }
  },
  computed: {
    reasons() {
      return [
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6466170d8945f927e2baf046_continuous-increment%201.webp',
          title: 'High yield savings',
          text: 'You save the money, we grow it! Earn up to 15% interest on your savings on your ‘Cash Vault’ savings with a minimum of $50,000.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6466170c3cac996bb8526e9f_Automate%20icon.webp',
          title: 'Automate your savings',
          text: 'Make saving a habit by putting money aside automatically at your chosen time of the month.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6466170d9ac983ebfaa0921a_Secure%20icon.webp',
          title: 'You’re safe, always',
          text: 'Opening a bank account and saving with Deluxe Integrity Bank is the start of a relationship with one of the most secure digital banks insured by World Bank',
        },
      ]
    },
  },
  head: {
    titleTemplate: 'Personal-Savings - Deluxe Integrity Bank',
  },
}
</script>

<style></style>
