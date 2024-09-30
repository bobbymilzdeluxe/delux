<template>
  <div>
    <v-row class="mx-0 px-0" align="start" justify="center">
      <VCol cols="12" md="5">
        <p class="ml-3 mb-0 pb-0 font-weight-bold">
          Swipe
          <v-icon>mdi-chevron-right</v-icon>
        </p>
        <swiper-container class="pa-3">
          <swiper-slide class="mr-2">
            <balance />
          </swiper-slide>
          <!-- <swiper-slide class="mr-2">
            <loan />
          </swiper-slide> -->
          <!-- <swiper-slide class="ml-1">
            <savings />
          </swiper-slide> -->
        </swiper-container>
      </VCol>

      <VCol cols="12" md="4" class="mt-0 pt-0">
        <p class="font-weight-bold ml-3 mt-0 pt-0 mt-md-2 pt-md-2">
          Quick Access
        </p>
        <v-row class="mx-0 px-0">
          <VCol cols="3" md="4" v-for="quick in quickAccess" :key="quick.color">
            <v-card
              dark
              :to="quick.to"
              flat
              class="grey lighten-5 py-3 d-flex flex-column justify-center align-center"
              style="border-radius: 12px; overflow: hidden"
              max-width="80"
            >
              <VIcon :color="quick.color">{{ quick.icon }}</VIcon>
              <p class="text-caption grey--text text--darken-3 ma-0 py-0">
                {{ quick.title }}
              </p>
            </v-card>
          </VCol>
        </v-row>
      </VCol>

      <!-- <VCol cols="12" md="3" class="">
        <p
          class="font-weight-bold black--text text-subtitle-2 text-md-subtitle-1 ml-3"
        >
          Verify your Deluxe Integrity Bank account
        </p>
        <VCard
          class="d-flex align-center pa-3"
          rounded="lg"
          style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px; gap: 7px"
        >
          <div>
            <VIcon color="secondary">mdi-lock</VIcon>
          </div>
          <div>
            <p
              class="text-caption mb-0 pb-0 text-md-body-2 font-weight-light texting"
            >
              Verify your identity to improve limits on your account
              <VBtn
                color="accent"
                class="text-capitalize ma-0 pa-0"
                text
                to="/dashboard/account/verification"
                >Verify now</VBtn
              >
            </p>
          </div>
        </VCard>
      </VCol> -->
    </v-row>

    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8" class="my-0 py-0 mx-2">
        <div class="d-flex justify-space-between align-center">
          <p
            class="black--text ml-3 font-weight-bold text-subtitle-2 text-md-subtitle-1"
          >
            Transactions
          </p>
          <p>
            <VBtn
              color="secondary"
              text
              small
              class="text-capitalize"
              @click="alerting, $router.push('/dashboard/transactions')"
              >View all</VBtn
            >
          </p>
        </div>
      </VCol>
    </v-row>
    <v-row
      class="mx-0 px-0 mb-4"
      justify="center"
      v-if="transactions.length > 0"
    >
      <VCol
        cols="12"
        md="8"
        class="my-0 py-0"
        v-for="(transact, i) in transactions"
        :key="transact.id"
      >
        <div>
          <VCard
            color="grey lighten-5"
            @click="passProps(transact)"
            class="pa-5"
            style="overflow: hidden"
            rounded="lg"
            flat
          >
            <div class="d-flex align-center" style="gap: 9px">
              <div>
                <VBtn
                  :class="`${iconsColors[transact.type]} lighten-5`"
                  :ripple="false"
                  icon
                  x-small
                  fab
                >
                  <VIcon :color="iconsColors[transact.type]">
                    {{ checkIcons(transact.type) }}
                  </VIcon>
                </VBtn>
              </div>
              <div>
                <p
                  class="text-body-2 text-md-body-1 font-weight-medium black--text mb-0 pb-0"
                >
                  {{ transact.title }}
                </p>
                <p class="text-caption grey--text mb-0 pb-0 font-weight-light">
                  {{ transact.date }}
                </p>
              </div>
              <VSpacer />
              <div class="font-weight-bold d-flex flex-column align-end">
                <p
                  class="caption font-weight-bold ma-0 pa-0 text-uppercase"
                  :class="`${colors[transact.status]}--text text--darken-3`"
                >
                  {{ transact.status }}
                </p>

                <p
                  class="ma-0 pa-0"
                  :class="
                    transact.type == 'debit' ? 'red--text' : 'green--text'
                  "
                >
                  {{
                    transact.type == 'debit'
                      ? '-'
                      : transact.type == 'credit'
                      ? '+'
                      : '~'
                  }}
                  {{
                    checkFundstate(
                      transact.symbolAmount.split(' ').join('') + '.00'
                    )
                  }}
                </p>
              </div>
            </div>
          </VCard>
          <VDivider class="mx-3 my-1" v-if="transactions.length != i + 1" />
        </div>
      </VCol>
    </v-row>

    <v-row class="mx-0 px-0 mb-3" justify="center" v-else>
      <VCol cols="12" md="8" v-if="show" class="my-0 py-0">
        <div class="white">
          <v-row class="mx-0 px-0" justify="center">
            <VCol cols="12" md="8" class="mx-auto text-center">
              <VIcon color="accent" size="100">mdi-filter-variant</VIcon>
              <p class="accent--text text-center font-weight-medium">
                No Transactions Yet
              </p>
            </VCol>
          </v-row>
        </div>
      </VCol>
      <VCol cols="12" v-if="!show" md="8" class="my-0 py-0">
        <VCard flat>
          <v-sheet class="pa-3">
            <v-skeleton-loader
              class="mx-auto"
              loading-text="Ready"
              type="list-item@3"
            ></v-skeleton-loader>
          </v-sheet>
        </VCard>
      </VCol>
    </v-row>

    <dialog-comp
      @closeDialog="closeModal"
      :dialog="dialog"
      :transact="transactObj"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogComp from '~/components/utils/dialogComp.vue'
import balance from '~/components/walletcards/balance.vue'
import Loan from '~/components/walletcards/loan.vue'
import savings from '~/components/walletcards/savings.vue'

export default {
  components: { balance, Loan, savings, DialogComp },
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },

  mounted() {
    setTimeout(() => {
      this.show = true
    }, 4000)
  },

  data() {
    return {
      //for modal dialog
      transactObj: {},
      dialog: false,

      show: false,
      theme: {
        isDark: false,
      },
    }
  },

  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'userflow/getState',
      fundState: 'userflow/getFundState',
    }),
    colors() {
      return {
        pending: 'yellow',
        approved: 'green',
        declined: 'red',
      }
    },

    iconsColors() {
      return {
        credit: 'green',
        debit: 'red',
      }
    },

    transactions() {
      const transactions = this.state('allUserTransactions')
      const slicedT = transactions.slice(0, 4)
      return slicedT
    },
    quickAccess() {
      return [
        {
          color: 'orange',
          icon: 'mdi-cash-plus',
          title: 'Add Cash',
          to: '/dashboard/fund-account',
        },
        {
          color: 'green',
          icon: 'mdi-cash-fast',
          title: 'Transfer',
          to: '/dashboard/transfer',
        },
        {
          color: 'blue',
          icon: 'mdi-credit-card',
          title: 'Card',
          to: '/dashboard/card',
        },
        {
          color: 'pink',
          icon: 'mdi-atom-variant',
          title: 'Withdraw',
          to: '/dashboard/crypto-withdrawal',
        },
        // {
        //   color: 'red',
        //   icon: 'mdi-help-circle',
        //   title: 'Faqs',
        //   to: '',
        // },
      ]
    },
  },
  methods: {
    checkIcons(type) {
      if (type == 'credit') {
        return 'mdi-arrow-bottom-right'
      } else if (type == 'debit') {
        return 'mdi-arrow-top-left'
      }
    },
    checkFundstate(fund) {
      if (this.fundState) {
        return `${this.user && this.user.currencySymbol}****`
      } else {
        return fund
      }
    },

    onSlideChange() {
      console.log('slide changed')
    },
    alerting() {},
    passProps(transactionDetails) {
      this.transactObj = transactionDetails
      this.dialog = true
    },
    closeModal() {
      this.dialog = false
    },
  },
}
</script>

<style></style>
