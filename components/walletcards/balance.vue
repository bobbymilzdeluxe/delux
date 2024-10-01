<template>
  <div style="height: 100%">
    <VCard flat rounded="lg" class="wavy3 accent pa-4 pa-md-4">
      <div class="d-flex justify-space-between align-center">
        <p
          class="white--text font-weight-bold text-body-2 text-md-body-1 texting"
        >
          {{ user && user.fullName }} Balance
        </p>
        <p>
          <VBtn
            :color="user && user.active ? '#018900' : 'red'"
            class="white--text text-capitalize text-caption"
            depressed
            x-small
            >{{ user && user.active ? 'Active' : 'Non - Active' }}</VBtn
          >
        </p>
      </div>
      <div>
        <p class="white--text font-weight-bold">
          {{ user && user.currencySymbol }}
          <span class="text-h6" @click="showAmount">{{
            hideAmount(balance)
          }}</span>
          <VIcon @click="showAmount" small color="white">{{
            fundState ? 'mdi-eye-off' : 'mdi-eye'
          }}</VIcon>
        </p>
      </div>
      <div>
        <p class="white--text font-weight-light text-caption texting">
          Account number :
          <span
            style="cursor: pointer"
            @click="copyAccNumber(user && user.accNumber)"
            class="text-body-1 font-weight-light"
            >{{ user && user.accNumber }}</span
          >
          <v-icon
            @click="copyAccNumber(user && user.accNumber)"
            color="white"
            small
            class="mb-1"
            >mdi-content-copy</v-icon
          >
        </p>
        <p class="white--text font-weight-light text-caption texting">
          Account Type :
          <span class="text-body-1 font-weight-light">{{
            user && user.accountType
          }}</span>
        </p>
      </div>
    </VCard>

    <div class="mx-auto text-center d-flex justify-center">
      <VCol cols="10">
        <div>
          <v-card flat class="grey lighten-4 d-flex mt-n7" style="z-index: 3">
            <div class="mx-auto text-center">
              <VBtn
                color="secondary darken-2"
                to="/dashboard/fund-account"
                text
                class="text-capitalize"
                >Add money</VBtn
              >
            </div>
            <VDivider vertical />
            <div class="mx-auto text-center">
              <VBtn
                color="secondary darken-2"
                text
                to="/dashboard/transfer"
                class="text-capitalize"
                >Send money</VBtn
              >
            </div>
          </v-card>
        </div>
      </VCol>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      mar: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      fundState: 'userflow/getFundState',
    }),
    balance() {
      return this.user && this.user.wallet.balance
    },
  },
  methods: {
    ...mapMutations({ changeFundState: 'userflow/setFundState' }),
    showAmount() {
      this.changeFundState({ is: !this.fundState })
    },
    hideAmount(value) {
      if (value && !this.fundState) {
        return `${value.toLocaleString()}.00`
      } else if (value === 0 && !this.fundState) {
        return '0.00'
      } else if (!value && !this.fundState) {
        return '0.00'
      } else {
        return '****'
      }
    },
    copyAccNumber(accNumber) {
      window.navigator.clipboard.writeText(accNumber)
      this.$store.dispatch('authentication/initAlert', {
        is: true,
        close: true,
        timer: 2500,
        type: 'success',
        message: 'Account Number Copied Successfully',
      })
    },
  },
}
</script>

<style scoped>
.wavy3 {
  background-image: url(https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628f1aba6705db8e3715ce_curved%20shape.webp);
  background-position: center;
  background-size: cover;
}
.pinkish {
  background-color: rgb(90, 8, 131);
}
.blue {
  color: #add8e6;
}
</style>
