<template>
  <div style="height: 100vh" class="d-flex justify-center align-center">
    <vContainer>
      <v-row class="mx-0 px-0" justify="center" align="center">
        <VCol cols="12" md="4">
          <VCard
            rounded="xl"
            :class="$vuetify.breakpoint.mdAndDown ? 'blurre' : 'blurr'"
          >
            <VCardText>
              <div class="mx-auto text-center">
                <v-img
                  width="120"
                  height="70"
                  @click="$router.push('/')"
                  style="cursor: pointer"
                  contain
                  class="text-center mx-auto"
                  src="/logo/line.svg"
                ></v-img>
              </div>
            </VCardText>
            <VCardText>
              <p class="white--text text-center mx-5 text-capitalize">
                Please Enter Your Email Address To Recover Your Password
              </p>
              <div>
                <VForm lazy-validation ref="form" @submit.prevent="submit">
                  <v-row class="mx-0 px-0">
                    <VCol cols="12" class="my-0 py-0">
                      <VTextField
                        v-model="email"
                        label="Email"
                        :rules="emailRules"
                        dark
                        color="primary"
                      />
                    </VCol>

                    <VCol cols="12" class="py-0 my-0 mb-3">
                      <VBtn
                        depressed
                        block
                        color="primary"
                        type="submit"
                        :loading="loading.login"
                        class="text-capitalize"
                        >Send</VBtn
                      >
                    </VCol>
                    <VCol cols="12" class="py-0 my-0 white--text text-center">
                      Remembered Your Password,
                      <nuxt-link to="/login">Please Login</nuxt-link>
                    </VCol>
                  </v-row>
                </VForm>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </v-row>
    </vContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading' }),
  },
  methods: {
    ...mapActions({ recoverPassword: 'authentication/recoverPassword' }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
        }
        this.recoverPassword(payload)
      }
    },
  },
}
</script>

<style scoped>
.blurre {
  background-color: rgba(104, 75, 179, 0.458) !important;
  box-shadow: 5px 5px 0 0 #ff0475 !important;
}
</style>
