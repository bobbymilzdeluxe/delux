<template>
  <div>
    <VRow class="mx-3 mt-1 py-5 mb-2" justify="center" align="center">
      <VCol cols="6">
        <VCard color="accent" class="" dark flat rounded="xl">
          <div>Admin's Profile</div>
        </VCard>
      </VCol>
      <!-- <VCol cols="6" class="ml-0 pl-0" align-self="center">
        <VBtn depressed color="white" class="accent--text float-end"
          >Change Password</VBtn
        >
      </VCol> -->
    </VRow>

    <v-container class="white" fluid>
      <v-row class="mx-0 px-0" justify="center" align="center">
        <VCol cols="12" md="8">
          <VCard
            rounded="xl"
            loader-height="8px"
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            class="mt-n10 pa-5"
          >
            <p
              class="text-center accent--text pb-0 mb-0 mb-1 font-weight-medium"
            >
              Super Admin
            </p>
            <p class="accent--text">
              Email : <strong>{{ user && user.email }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0">
              Password : <strong>{{ user && user.password }}</strong>
            </p>
          </VCard>
        </VCol>
      </v-row>
    </v-container>

    <vContainer class="white">
      <vContainer class="white">
        <v-row class="mx-0 px-0 white" justify="center">
          <VCol cols="12" md="8" class="mt-1">
            <div class="d-flex justify-space-between">
              <!-- <p class="font-weight-medium text-h6 accent--text">Wallet Address</p> -->
              <div>
                <VBtn
                  color="accent"
                  class="white--text"
                  :loading="loading.wallet"
                  depressed
                  @click="dialog = true"
                  >Add Wallet</VBtn
                >
              </div>
            </div>
          </VCol>
        </v-row>
      </vContainer>
    </vContainer>

    <v-container class="white">
      <vContainer class="white">
        <div v-if="wallets.length > 0">
          <v-row class="mx-0 px-0" justify="center" align="center">
            <VCol
              cols="12"
              md="8"
              v-for="wallet in wallets"
              :key="wallet.id"
              class="my-0 py-0 my-1"
            >
              <VCard
                rounded="xl"
                loader-height="8px"
                style="box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 3px"
                class="pa-5 d-flex justify-space-between align-center"
              >
                <div style="width: 100%">
                  <div class="d-flex align-center justify-space-between">
                    <p class="accent--text">
                      <strong>{{ wallet.walletName }}</strong>
                    </p>
                    <p>
                      <VBtn
                        color="red"
                        small
                        fab
                        icon
                        :loading="loading.delete"
                        @click="
                          deleteWallet({
                            name: wallet.walletName,
                            id: wallet.id,
                          })
                        "
                      >
                        <VIcon color="red">mdi-delete</VIcon>
                      </VBtn>
                    </p>
                  </div>
                  <p class="accent--text mb-0 pb-0 font-weight-light text-wrap">
                    {{ wallet.walletAddress }}
                  </p>
                </div>
              </VCard>
            </VCol>
          </v-row>
        </div>

        <div v-else class="white">
          <v-row class="mx-0 px-0" justify="center">
            <VCol cols="12" md="8" class="mx-auto text-center">
              <VIcon color="accent" size="100">mdi-filter-variant</VIcon>
              <p class="accent--text text-center font-weight-medium">
                No Wallet Address
              </p>
            </VCol>
          </v-row>
        </div>
      </vContainer>
    </v-container>

    <VLayout row justify-center>
      <VDialog
        v-model="dialog"
        persistent
        max-width="520px"
        class="accent"
        :fullscreen="$vuetify.breakpoint.mdAndDown ? true : false"
      >
        <VCard color="accent">
          <VCardTitle class="d-flex justify-space-between">
            <p class="text-subtitle-1 white--text ml-4">Wallet Details</p>
            <p class="">
              <VBtn color="secondary" @click="dialog = false" text>close</VBtn>
            </p>
          </VCardTitle>
          <VCardText>
            <VContainer>
              <VForm lazy-validation ref="form" @submit.prevent="submit">
                <v-row class="mx-0 px-0">
                  <VFlex xs12>
                    <VTextField
                      label="Wallet Name"
                      color="secondary"
                      :rules="[(v) => !!v || 'Wallet Name is required']"
                      required
                      dark
                      v-model="walletName"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12>
                    <VTextField
                      :rules="[(v) => !!v || 'Wallet Address is required']"
                      dark
                      label="Wallet Address"
                      required
                      v-model="walletAddress"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12>
                    <v-file-input
                      outlined
                      dark
                      v-model="walletPhoto"
                      prepend-icon=""
                      @change="showImage"
                      color="secondary"
                      :rules="[(v) => !!v || `Wallet Qrcode is required`]"
                      :label="`Upload Wallet Qrcode`"
                      prepend-inner-icon="mdi-qrcode"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip small label color="secondary">
                          {{ text }}
                        </v-chip>
                      </template></v-file-input
                    >
                  </VFlex>

                  <VFlex xs12 v-if="walletPhotoImage">
                    <VCard
                      v-if="walletPhotoImage"
                      flat
                      class="mb-5 transparent"
                    >
                      <v-img
                        :src="walletPhotoImage"
                        class="mx-auto"
                        contain
                        width="300"
                      ></v-img>
                    </VCard>
                  </VFlex>
                  <VFlex xs12>
                    <VCardActions class="my-0 py-0 pb-4 accent">
                      <VBtn
                        color="secondary darken-1"
                        depressed
                        block
                        type="submit"
                        large
                        :loading="loading.wallet"
                        >Submit</VBtn
                      >
                    </VCardActions>
                  </VFlex>
                </v-row>
              </VForm>
            </VContainer>
          </VCardText>
        </VCard>
      </VDialog>
    </VLayout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'adminLayout',
  data() {
    return {
      dialog: false,

      walletName: '',
      walletAddress: '',
      walletPhoto: null,
      walletPhotoImage: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'adminflow/getLoading',
      state: 'adminflow/getState',
    }),
    wallets() {
      const wallets = this.state('allWallets')
      return wallets
    },
  },
  methods: {
    ...mapActions({
      walletFN: 'adminflow/walletFN',
      deleteWallet: 'adminflow/deleteWallet',
    }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          walletName: this.walletName,
          walletAddress: this.walletAddress,
          walletPhoto: this.walletPhoto,

          userID: this.user && this.user.userID,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
        }
        this.walletFN(payload)
        setTimeout(() => {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          this.dialog = false
        }, 1200)
      }
    },

    showImage() {
      if (this.walletPhoto) {
        this.walletPhotoImage = URL.createObjectURL(this.walletPhoto)
      } else {
        this.walletPhotoImage = null
      }
    },
    getCurrentTimeAndDate(format) {
      const now = new Date()

      // Get time in 12-hour HH:MM AM/PM format
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12 // Convert hours to 12-hour format
      const time = `${hours}:${minutes} ${amOrPm}`

      // Get date in DD/MM/YY format
      const day = now.getDate().toString().padStart(2, '0')
      const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const year = now.getFullYear().toString().slice(-2)
      const date = `${format ? month : day}/${format ? day : month}/${year}`

      return `${time}, ${date}`
    },
  },
}
</script>

<style></style>
