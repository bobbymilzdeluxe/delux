<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div class="secondary--text text-body-2 font-weight-light">
              Please Change Your
              <span class="secondary--text">Password,</span> If Any Unauthorised
              Activity Is Seen In Your Account.
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="8">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/security.svg"
              contain
              width="300"
              class="mx-auto"
            ></v-img>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="8">
        <VForm lazy-validation @submit.prevent="changePassword" ref="form">
          <VCol cols="12" class="ma-0 pa-0">
            <VTextField
              v-model="currentPassword"
              label="Current Password"
              color="secondary"
              filled
              :rules="[(v) => !!v || 'Current Password is required']"
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VTextField
              v-model="newPassword"
              label="New Password"
              color="secondary"
              :rules="[(v) => !!v || 'New Password is required']"
              filled
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VTextField
              v-model="cPassword"
              label="Confirmed Password"
              dense
              :rules="cPasswordRules"
              filled
              :error="erroring"
              color="secondary2"
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VBtn
              color="secondary"
              block
              depressed
              large
              type="submit"
              :loading="loading.update"
              >Save</VBtn
            >
          </VCol>
        </VForm>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      cPassword: '',
      cPasswordRules: [(v) => !!v || 'Confirm your password'],
      erroring: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
  },

  methods: {
    ...mapActions({ updatePassword: 'userflow/updatePassword' }),
    changePassword() {
      if (this.newPassword !== this.cPassword) {
        this.$store.dispatch('authentication/initAlert', {
          is: true,
          message: "Password Doesn't Match, Please Confirm Your Password",
          type: 'error',
          timer: 3500,
        })
        this.cPasswordRules = [(v) => !!v || 'Password does not match']
        this.erroring = true
        return
      }

      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.erroring = false
        const payload = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          userID: this.user && this.user.userID,
        }
        // console.log(payload)
        this.updatePassword(payload)

        setTimeout(() => {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }, 1200)
      }
    },
  },
}
</script>

<style></style>
