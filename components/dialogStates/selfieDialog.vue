<template>
  <div>
    <VCard flat class="pa-3 pa-md-5 py-3 scrolls">
      <div class="mx-1 d-flex justify-space-between align-center">
        <div
          class="font-weight-medium my-1 black--text text-subtitle-2 text-center"
        >
          {{ verify && verify.fullName }} Selfie Image -
          <span
            ><VChip
              outlined
              label
              class="text-capitalize"
              small
              :color="colors[verify && verify.selfieStatus]"
              >{{
                verify && verify.selfieStatus
                  ? verify && verify.selfieStatus
                  : 'Loading'
              }}</VChip
            ></span
          >
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

      <VDivider
        class="mb-5 mt-2"
        :class="colors[verify && verify.selfieStatus]"
      />
      <v-row class="mx-0 px-0" justify="center">
        <VCol cols="12" md="8" v-if="!verify.selfieStatus">
          <VCard flat class="lightpinkish pa-3 pa-md-5 mx-3 mt-5" rounded="xl">
            <div class="d-flex align-center" style="gap: 12px">
              <div>
                <v-img width="25" src="/icons/shield-tick.svg"></v-img>
              </div>
              <div
                class="secondary--text text-center text-body-2 font-weight-light"
              >
                Click then wait a bit for the image to load
              </div>
            </div>
          </VCard>
        </VCol>
      </v-row>
      <v-row class="mx-0 px-0 mt-4" justify="center" v-if="verify != null">
        <VCol cols="12">
          <VCard flat :loading="verify.selfie ? null : 'accent'">
            <v-img
              contain
              :src="verify.selfie"
              class="mx-auto text-center"
              width="300"
            >
            </v-img>
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
import { mapActions, mapGetters } from 'vuex'

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
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'adminflow/getState',
    }),
    verify() {
      const verifications = this.state('allVerifications')
      const verify = verifications.find((verify) => {
        return verify.userID == this.transact.userID
      })
      return verify
    },
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

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
