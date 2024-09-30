<template>
  <div>
    <VCol cols="12" v-if="!show">
      <p
        class="text-center text-subtitle-1 text-h5 grey--text text--darken-2 text-body-1 mt-4 mb-0 pb-0"
      >
        KYC Verification
      </p>
      <p class="text-center grey--text text-body-2">
        Before you start your KYC process, see what is
        <span class="secondary--text">required</span> of you
      </p>
    </VCol>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8" v-if="!show">
        <VCol cols="12">
          <VCard flat>
            <div>
              <v-img
                src="/Bicons/BigV.svg"
                contain
                width="300"
                class="mx-auto"
              ></v-img>
            </div>
          </VCard>
        </VCol>
        <VCol
          cols="12"
          class="my-0 py-0"
          v-for="(link, i) in Verificationlinks"
          :key="link.name"
        >
          <div>
            <VCard
              @click=";(show = true), (comp = link.state)"
              color="grey lighten-5"
              rounded="lg"
              class="pa-5"
              flat
            >
              <div class="d-flex align-center" style="gap: 9px">
                <div>
                  <v-img :src="link.icon" contain width="25"></v-img>
                </div>
                <div>
                  <p
                    class="text-body-2 text-md-body-1 font-weight-light black--text mb-0 pb-0"
                  >
                    {{ link.name }}
                  </p>
                </div>
                <VSpacer />
                <div class="font-weight-bold">
                  <VIcon color="secondary">mdi-chevron-right</VIcon>
                </div>
              </div>
            </VCard>
            <VDivider class="" v-if="i != Verificationlinks.length - 1" />
          </div>
        </VCol>
      </VCol>

      <VCol cols="12" md="8" v-if="show">
        <VBtn
          v-if="
            (verify && verify.documentStatus && comp == 'identification') ||
            (verify && verify.selfieStatus && comp == 'selfie')
          "
          color="secondary"
          text
          icon
          small
          fab
          @click="show = !show"
          ><VIcon>mdi-close</VIcon></VBtn
        >
        <!-- todo for identification -->
        <VCol cols="12" v-if="comp == 'identification'">
          <component
            @show="changeShowValue"
            :is="comp"
            v-if="!verify && comp == 'identification'"
          />
          <v-row class="mx-0 px-0" justify="center">
            <VCol
              cols="12"
              v-if="
                verify &&
                verify.documentStatus &&
                verify.documentStatus == 'pending' &&
                comp == 'identification'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="secondary" size="120" class="mx-auto"
                  >mdi-account-clock</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Please Hold, While We Process Your
                  {{ verify && verify.document }} identification Document
                </p>
              </VCard>
            </VCol>

            <VCol
              cols="12"
              v-if="
                verify &&
                verify.documentStatus &&
                verify.documentStatus == 'declined' &&
                comp == 'identification'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="red" size="120" class="mx-auto"
                  >mdi-account-cancel</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Your {{ verify && verify.document }} Identification Document
                  Has Been Declined, Please Re-submit The Required Document And
                  <span class="secondary--text">Selfie Image</span> For
                  Approval.
                </p>

                <div class="mx-auto text-center mt-3" @click="setVerifyNull">
                  <VBtn color="secondary" depressed>Re-submit</VBtn>
                </div>
              </VCard>
            </VCol>

            <VCol
              cols="12"
              v-if="
                verify &&
                verify.documentStatus &&
                verify.documentStatus == 'approved' &&
                comp == 'identification'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="green" size="120" class="mx-auto"
                  >mdi-account-check</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Your {{ verify && verify.document }} Identification Document
                  Has Been Approved.
                </p>
              </VCard>
            </VCol>
          </v-row>
        </VCol>

        <!-- todo for selfie -->
        <VCol cols="12" v-if="comp == 'selfie'">
          <component
            @show="changeShowValue"
            :is="comp"
            v-if="
              (!verify && comp == 'selfie') || (verify && !verify.selfieStatus)
            "
          />
          <v-row class="mx-0 px-0" justify="center">
            <VCol
              cols="12"
              v-if="
                verify &&
                verify.selfieStatus &&
                verify.selfieStatus == 'pending' &&
                comp == 'selfie'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="secondary" size="120" class="mx-auto"
                  >mdi-face-recognition</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Please Hold, While We Process Your Selfie Image
                </p>
              </VCard>
            </VCol>

            <VCol
              cols="12"
              v-if="
                verify &&
                verify.selfieStatus &&
                verify.selfieStatus == 'declined' &&
                comp == 'selfie'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="red" size="120" class="mx-auto"
                  >mdi-face-recognition</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Your Selfie Image Has Been Declined, Please Re-submit The
                  Proper Required Document For Approval.
                </p>
                <div class="mx-auto text-center mt-3" @click="setVerifyNull">
                  <VBtn color="secondary" depressed>Re-submit</VBtn>
                </div>
              </VCard>
            </VCol>

            <VCol
              cols="12"
              v-if="
                verify &&
                verify.selfieStatus &&
                verify.selfieStatus == 'approved' &&
                comp == 'selfie'
              "
            >
              <VCard flat class="text-center mx-auto">
                <VIcon color="green" size="120" class="mx-auto"
                  >mdi-face-recognition</VIcon
                >
                <p
                  class="text-center grey--text text--darken-2 text-body-1 mt-4"
                >
                  Your Selfie Image Has Been Approved.
                </p>
              </VCard>
            </VCol>
          </v-row>
        </VCol>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import selfie from '~/components/verifyComps/selfie.vue'
import identification from '~/components/verifyComps/identification.vue'
import { mapGetters } from 'vuex'
export default {
  components: { selfie, identification },
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      show: false,
      comp: '',

      alter: true,
    }
  },
  computed: {
    ...mapGetters({
      state: 'userflow/getState',
      loading: 'userflow/getLoading',
      user: 'authentication/getUser',
    }),
    verify() {
      const verify = this.state('verify')
      console.log(verify)
      return verify
    },
    Verificationlinks() {
      return [
        {
          icon: '/icons/identification.svg',
          name: 'Identity verification',
          state: 'identification',
        },
        {
          icon: '/icons/selfie.svg',
          name: 'Take a selfie',
          state: 'selfie',
        },
      ]
    },
  },
  methods: {
    changeShowValue() {
      this.show = false
    },
    setVerifyNull() {
      this.$store.commit('userflow/setState', { type: 'verify', value: null })
    },
  },
}
</script>

<style></style>
