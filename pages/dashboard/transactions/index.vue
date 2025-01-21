<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8" class="mx-0 px-0">
        <VCol cols="12">
          <section class="d-flex align-center justify-space-between">
            <div class="ml-2">
              <VIcon @click="$router.go(-1)" color="grey"
                >mdi-chevron-left</VIcon
              >
            </div>

            <div
              class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
            >
              Transactions
            </div>
            <div class="mr-3">
              <v-btn
                @click=";(searchBar = !searchBar), (search = '')"
                fab
                icon
                x-small
                :color="searchBar ? 'secondary' : 'grey'"
              >
                <v-img
                  src="/icons/search.svg"
                  contain
                  width="10"
                  :style="`filter: grayscale(${searchBar ? '0' : '100%'})`"
                  height="25"
                ></v-img>
              </v-btn>

              <!-- todo : was supposed to add filter here....quite tired to do that i would say -->
              <!-- <v-btn
                @click=";(dialog2 = true), (filterBar = true)"
                fab
                icon
                x-small
                :color="filterBar ? 'secondary' : 'grey'"
              >
                <v-img
                  src="/icons/filter.svg"
                  contain
                  width="10"
                  :style="`filter: grayscale(${filterBar ? '0' : '100%'})`"
                  height="22"
                ></v-img>
              </v-btn> -->
            </div>
          </section>
        </VCol>

        <VCol cols="12" class="d-flex justify-center">
          <div class="d-inline-block">
            <v-tabs
              class="mx-auto text-center rounded-lg"
              background-color="lightpinkish"
              color="secondary"
              centered
              slider-color="secondary darken-2"
              active-class="secondary white--text rounded-t-lg"
            >
              <v-tab @click="currentState = 'transactions'">All</v-tab>
              <v-tab @click="currentState = 'credits'">Incoming</v-tab>
              <v-tab @click="currentState = 'debits'">Outgoing</v-tab>
            </v-tabs>
          </div>
        </VCol>
        <VCol cols="12">
          <VDivider class="my-3 mb-3" v-if="!searchBar" />
          <VTextField
            v-model="search"
            v-if="searchBar"
            light
            color="secondary"
            label="Search"
          />
        </VCol>
      </VCol>
    </v-row>
    <v-row
      class="mx-0 px-0 mb-4"
      justify="center"
      v-if="transactState[currentState].length > 0"
    >
      <VCol
        cols="12"
        md="8"
        class="my-0 py-0"
        v-for="(transact, i) in transactState[currentState]"
        :key="transact.id"
      >
        <div>
          <VCard
            color="grey lighten-5"
            class="pa-5"
            style="overflow: hidden"
            rounded="lg"
            @click="passProps(transact)"
            flat
          >
            <p class="font-weight-bold grey--text text--darken-1">
              <!-- {{ formatDate(transact.date.slice(9)) }} -->
            </p>
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
                  :class="`${colors[transact.status]}--text text--darken-2`"
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
          <VDivider
            class="mx-3 my-1"
            v-if="transactState[currentState].length != i + 1"
          />
        </div>
      </VCol>
    </v-row>

    <!-- else -->
    <v-row class="mx-0 px-0 mb-3" justify="center" v-else>
      <VCol cols="12" md="8" v-if="show" class="my-0 py-0">
        <div class="white">
          <v-row class="mx-0 px-0" justify="center">
            <VCol cols="12" md="8" class="mx-auto text-center">
              <VIcon color="secondary" size="100">mdi-filter-variant</VIcon>
              <p class="accent--text text-center font-weight-medium">
                No {{ emptyTransactions }} Transactions Listed
                {{ search && searchBar ? 'From Your Search' : '' }}
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

    <!-- todo dialog i wanted to use for filtering the transactions -->
    <!-- <VDialog
      v-model="dialog2"
      persistent
      :overlay="false"
      class="pa-3 scrolls"
      max-width="500px"
      transition="dialog-transition"
    >
      <VCard flat class="pa-3 py-4">
        <VCardText>
          <section>
            <div class="d-flex justify-space-between align-center my-4">
              <div
                class="font-weight-medium text-subtitle-2 text-md-subtitle-1"
              >
                Transaction Type
              </div>
              <div>
                <VBtn
                  color="secondary"
                  text
                  small
                  depressed
                  @click=";(dialog2 = false), (filterBar = false)"
                  >Close</VBtn
                >
              </div>
            </div>
            <VDivider class="my-2" />
            <VCard
              rounded="lg"
              style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            >
              <v-row class="mx-0 px-0" justify="center">
                <VCol cols="6" class="py-0 my-0">
                  <VCheckbox
                    label="All Types"
                    v-model="filters"
                    color="secondary"
                    value="All Types"
                    multiple
                  ></VCheckbox>
                </VCol>
                <VCol cols="6" class="py-0 my-0">
                  <VCheckbox
                    label="Transfers"
                    v-model="filters"
                    color="secondary"
                    value="transfers"
                    multiple
                  ></VCheckbox>
                </VCol>
                <VCol cols="6" class="py-0 my-0">
                  <VCheckbox
                    label="Loans"
                    v-model="filters"
                    color="secondary"
                    value="loans"
                    multiple
                  ></VCheckbox>
                </VCol>
                <VCol cols="6" class="py-0 my-0">
                  <VCheckbox
                    label="Cards"
                    v-model="filters"
                    color="secondary"
                    value="cards"
                    multiple
                  ></VCheckbox>
                </VCol>

                <VCol cols="12">
                  <VBtn
                    color="secondary"
                    depressed
                    block
                    @click=";(dialog2 = false), (filterBar = fase)"
                    >Apply filter</VBtn
                  >
                </VCol>
              </v-row>
            </VCard>

            <p class="text-caption secondary--text mt-5">
              <span class="primary--text">*</span> Note: You Can select multiple
              options
            </p>
          </section>
        </VCardText>
      </VCard>
    </VDialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogComp from '~/components/utils/dialogComp.vue'
export default {
  components: { dialogComp },
  layout: 'dashboard',

  mounted() {
    window.scrollBy(0, 0)

    setTimeout(() => {
      this.show = true
    }, 4000)
  },

  data() {
    return {
      //for modal dialog
      transactObj: {},
      dialog: false,

      //for filter dialog
      dialog2: false,
      filterBar: false,
      filters: [],

      show: false,

      currentState: 'transactions',

      searchBar: false,
      search: '',
    }
  },
  computed: {
    ...mapGetters({ state: 'userflow/getState' }),

    emptyTransactions() {
      const empty = {
        credits: 'Incoming',
        debits: 'Outgoing',
        transactions: '',
      }

      return empty[this.currentState]
    },

    transactState() {
      return {
        transactions: this.transactions,
        debits: this.debits,
        credits: this.credits,
      }
    },
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

    debits() {
      let arr = []
      this.transactions.forEach((transact) => {
        if (transact.type == 'debit') {
          arr.push(transact)
        }
      })
      return arr
    },
    credits() {
      let arr = []
      this.transactions.forEach((transact) => {
        if (transact.type == 'credit') {
          arr.push(transact)
        }
      })
      // console.log(arr, 'is the debits')
      return arr
    },
    transactions() {
      const transactions = this.state('allUserTransactions')
      const filter = transactions.filter((transact) => {
        return (
          (transact.category == 'transfers' &&
            transact.bankName.includes(this.search)) ||
          (transact.category == 'transfers' &&
            transact.bank.includes(this.search)) ||
          (transact.category == 'transfers' &&
            transact.title.includes(this.search)) ||
          (transact.category == 'transfers' &&
            transact.title.toLowerCase().includes(this.search)) ||
          (transact.category == 'transfers' &&
            transact.amount.toString().includes(this.search)) ||
          (transact.category == 'withdraws' &&
            transact.title.includes(this.search)) ||
          (transact.category == 'withdraws' &&
            transact.title.toLowerCase().includes(this.search)) ||
          (transact.category == 'withdraws' &&
            transact.crypto.includes(this.search)) ||
          (transact.category == 'withdraws' &&
            transact.amount.toString().includes(this.search)) ||
          (transact.category == 'withdraws' &&
            transact.symbolAmount.includes(this.search)) ||
          (transact.category == 'loans' &&
            transact.title.includes(this.search)) ||
          (transact.category == 'loans' &&
            transact.title.toLowerCase().includes(this.search)) ||
          (transact.category == 'loans' &&
            transact.desiredAmount.toString().includes(this.search)) ||
          (transact.category == 'deposits' &&
            transact.title.includes(this.search)) ||
          (transact.category == 'deposits' &&
            transact.title.toLowerCase().includes(this.search)) ||
          (transact.category == 'deposits' &&
            transact.crypto.includes(this.search)) ||
          (transact.category == 'deposits' &&
            transact.amount.toString().includes(this.search)) ||
          (transact.category == 'deposits' &&
            transact.symbolAmount.includes(this.search))
        )
      })
      return filter
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
    passProps(transactionDetails) {
      this.transactObj = transactionDetails
      this.dialog = true
    },

    formatDate(date) {
      const sections = date.split('/')
      const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      }
      return `${sections[0]} ${months[sections[1]]} 2025`
    },
    closeModal() {
      this.dialog = false
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
