<template>
  <div>
    <VCard flat class="pa-3 pa-md-5 py-3 scrolls">
      <div class="mx-1 d-flex justify-space-between align-center">
        <div
          class="font-weight-medium my-1 black--text text-subtitle-2 text-center"
        >
          Withdrawal details
        </div>
        <div class="float-end text-right ma-0 pa-0">
          <VBtn
            color="secondary"
            text
            small
            depressed
            @click="$emit('closeDialog')"
            >Close</VBtn
          >
        </div>
      </div>
      <VDivider class="mt-3" :class="colors[transact.status]" />

      <div
        class="mx-auto text-center my-3 my-md-5"
        v-if="transact.symbolAmount"
      >
        <p
          class="text-center font-weight-bold text-h5 text-md-h3 red--text"
          v-if="transact.symbolAmount"
        >
          <!-- {{ transact.type == 'debit' ? '-' : '+' }} -->
          -
          {{ transact.symbolAmount.split(' ').join('') }}.00
          <!-- {{ transact.symbolAmount }}.00 -->
        </p>
        <p class="text-center text-body-2 font-weight-medium py-0 my-0">
          {{ transact.name }}
        </p>
        <p class="text-center text-caption font-weight-light">
          {{ transact.date }}
        </p>
      </div>
      <v-row class="mx-0 px-0">
        <VCol cols="12">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Reference</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.id }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
        <!-- second field -->
        <VCol cols="12" v-if="transact.symbolAmount">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.symbolAmount"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Withdrawal Amount</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.symbolAmount }}.00
              </p>
            </VCardText>
          </VCard>
        </VCol>
        <!-- third field -->

        <VCol cols="12" v-if="transact.crypto">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.crypto"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Crypto</p>
              <p class="ma-0 pa-0 grey--text text--darken-3 text-capitalize">
                {{ transact.crypto }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.walletNetwork">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.walletNetwork"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Wallet Network</p>
              <p class="ma-0 pa-0 grey--text text--darken-3 text-capitalize">
                {{ transact.walletNetwork }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.walletAddress">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.walletAddress"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Address</p>
              <p class="ma-0 pa-0 grey--text text--darken-3 text-capitalize">
                {{
                  $vuetify.breakpoint.mdAndDown &&
                  transact.walletAddress.length > 16
                    ? transact.walletAddress.slice(0, 16) + '...'
                    : transact.walletAddress
                }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.status">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.status"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Transfer Status</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                <VChip
                  pill
                  label
                  small
                  class="white--text text-capitalize"
                  :color="colors[transact.status]"
                >
                  {{ transact.status }}</VChip
                >
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.type">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.type"
          >
            <VCardText class="d-flex justify-space-between align-center">
              <p class="ma-0 pa-0">Type</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                <v-btn
                  small
                  :ripple="false"
                  class="white--text"
                  text
                  :color="transact.type == 'debit' ? 'red' : 'green'"
                >
                  {{ transact.type }}</v-btn
                >
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.date">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.date"
          >
            <VCardText class="d-flex justify-space-between align-center">
              <p class="ma-0 pa-0">Date</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.date }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <p class="float-end text-right">
            <VBtn color="secondary" depressed @click="$emit('closeDialog')"
              >Okay</VBtn
            >
          </p>
        </VCol>
      </v-row>
    </VCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    transact: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    colors() {
      return {
        pending: 'yellow darken-2',
        approved: 'green',
        declined: 'red',
      }
    },
  },
}
</script>

<style></style>
