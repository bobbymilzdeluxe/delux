<template>
  <div>
    <VRow justify="center">
      <VCol cols="12" md="8">
        <VCol cols="12" class="d-flex justify-space-between" style="gap: 15px">
          <div class="ma-0 pa-0">
            <VIcon @click="$emit('show')" color="secondary"
              >mdi-chevron-left</VIcon
            >
          </div>
          <p
            class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
          >
            <VBtn color="secondary" small depressed class="text-capitalize"
              >Take a selfie</VBtn
            >
          </p>
        </VCol>

        <VCol cols="12">
          <v-card flat>
            <v-img
              src="https://wintrustfinance.online/img/face.png"
              contain
              class="mx-auto"
              width="100"
            ></v-img>
          </v-card>
        </VCol>
        <VCol cols="12">
          <div
            class="d-flex align-center justify-start"
            style="gap: 6px"
            v-for="reg in regs"
            :key="reg.text"
          >
            <div>
              <VIcon :color="reg.color" small>{{ reg.icon }}</VIcon>
            </div>
            <p class="text-caption ma-0 pa-0 grey--text text--darken-4">
              {{ reg.text }}
            </p>
          </div>
        </VCol>
        <VCol cols="12">
          <VCard
            flat
            class="lightpinkish pa-3 pa-md-5 mb-6"
            rounded="xl"
            v-if="user && !user.active"
          >
            <div class="d-flex align-center" style="gap: 12px">
              <div>
                <v-img width="25" src="/icons/shield-tick.svg"></v-img>
              </div>
              <div
                class="secondary--text text-body-2 font-weight-light text-capitalize"
              >
                Dear {{ user && user.fullName }}, Please Kindly Activate Your
                Account By Contacting
                <a
                  href="mailto:support@deluxeintegrity.com"
                  class="px-0 py-0 text-lowercase font-weight-black accent--text text-decoration-none"
                  target="_blank"
                >
                  support@deluxeintegrity.com
                </a>
                For An Account Upgrade In order to Submit Your Selfie For
                Verification.
              </div>
            </div>
          </VCard>
          <VForm lazy-validation ref="form" @submit.prevent="submit">
            <VCol cols="12" class="ma-0 pa-0">
              <v-file-input
                prepend-icon=""
                prepend-inner-icon="mdi-face-recognition"
                v-model="selfie"
                chips
                :disabled="user && !user.active"
                label="Upload Selfie"
                color="secondary"
                :rules="[(v) => !!v || 'Selfie Image is required']"
                light
                @change="showImage"
                filled
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="secondary">
                    {{ text }}
                  </v-chip>
                </template></v-file-input
              >
            </VCol>
            <VCard v-if="selfie" flat class="mb-5">
              <v-img :src="image" class="mx-auto" contain width="300"></v-img>
            </VCard>
            <VCol cols="12" class="ma-0 pa-0">
              <VBtn
                color="secondary"
                :loading="loading.selfie"
                depressed
                large
                block
                type="submit"
                >Submit</VBtn
              >
            </VCol>
          </VForm>
        </VCol>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selfie: null,
      image: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    regs() {
      return [
        {
          icon: 'mdi-check',
          color: 'success',
          text: 'Take a selfie of yourself with a neutral expression',
        },
        {
          icon: 'mdi-check',
          color: 'success',
          text: 'Make sure your whole face is visible, centred, and your eyes are open',
        },
        {
          icon: 'mdi-close',
          color: 'error',
          text: 'Do not crop your ID or use screenshots of your ID',
        },
        {
          icon: 'mdi-close',
          color: 'error',
          text: 'Do not hide or alter parts of your face (No hats/beauty images/filters/headgear)',
        },
      ]
    },
  },
  methods: {
    ...mapActions({ selfieFN: 'userflow/selfieFN' }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          doc: 'Selfie Image',
          //image suffix for reference in database
          selfie: this.selfie,
          selfieStatus: 'pending',
          userID: this.user && this.user.userID,
          date: this.getCurrentTimeAndDate(),
        }
        // console.log(payload)
        this.selfieFN(payload)
        setTimeout(() => {
          this.$refs.form.resetValidation()
          this.$refs.form.reset()
        }, 1200)
      }
    },
    showImage() {
      if (this.selfie) {
        this.image = URL.createObjectURL(this.selfie)
      } else {
        this.image = null
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
