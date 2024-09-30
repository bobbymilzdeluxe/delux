<template>
  <div>
    <VCard flat class="pa-3 pa-md-5 py-3 scrolls">
      <div class="mx-1 d-flex justify-space-between align-center">
        <div
          class="font-weight-medium my-1 black--text text-subtitle-2 text-center"
        >
          Transfer details
        </div>
        <div class="float-end text-right ma-0 pa-0">
          <VBtn
            color="secondary"
            depressed
            text
            small
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
          class="text-center font-weight-bold text-h5 text-md-h3"
          :class="transact.type == 'debit' ? 'red--text' : 'green--text'"
          v-if="transact.symbolAmount"
        >
          {{ transact.type == 'debit' ? '-' : '+' }}
          {{ transact.symbolAmount.split(' ').join('') }}.00
          <!-- {{ transact.symbolAmount }}.00 -->
        </p>
        <p class="text-center text-body-2 font-weight-medium py-0 my-0">
          {{ transact.senderName }}
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
        <VCol cols="12" v-if="transact.senderBank">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.senderBank"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Sender's Bank</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.senderBank }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
        <!-- third field -->
        <VCol cols="12" v-if="transact.senderBank">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.senderBank"
          >
            <VCardText class="d-flex mb-0 pb-0 justify-space-between">
              <p class="ma-0 pa-0">Sender</p>
              <div
                class="ma-0 pa-0 grey--text text--darken-3 d-flex flex-column"
              >
                <div class="ma-0 pa-0">
                  {{ transact.senderName }}
                </div>
              </div>
            </VCardText>
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Beneficiary</p>
              <div
                class="ma-0 pa-0 grey--text text--darken-3 d-flex flex-column"
              >
                <div class="ma-0 pa-0 text-right float-end">
                  {{ transact.bankName }}
                </div>
                <p class="ma-0 pa-0 text-caption">
                  {{ transact.bankAccount }} - {{ transact.bank }}
                </p>
              </div>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.routingNumber">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.routingNumber"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Routing Number</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.routingNumber }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.swiftCode">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.swiftCode"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Swift Code</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.swiftCode }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.iban">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.iban"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">IBAN</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.iban }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.country">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.country"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Country</p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.country }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" v-if="transact.transferType">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.transferType"
          >
            <VCardText class="d-flex justify-space-between">
              <p class="ma-0 pa-0">Transfer Type</p>
              <p class="ma-0 pa-0 grey--text text--darken-3 text-capitalize">
                {{ transact.transferType }} Transfer
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

        <VCol cols="12" v-if="transact.purpose">
          <VCard
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            rounded="lg"
            v-if="transact.purpose"
          >
            <VCardText class="d-flex justify-space-between align-center">
              <p class="ma-0 pa-0">Purpose</p>
              <p><VSpacer /></p>
              <p class="ma-0 pa-0 grey--text text--darken-3">
                {{ transact.purpose }}
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
  mounted() {
    window.scrollBy(0, 0)
  },
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
