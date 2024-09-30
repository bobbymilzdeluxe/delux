<template>
  <div>
    <v-row class="mx-0 px-0">
      <VCol cols="12">
        <VCol
          cols="12"
          class="ma-0 pa-0 d-flex justify-space-between"
          style="gap: 15px"
        >
          <div class="ma-0 pa-0">
            <VIcon @click="$emit('show')" color="secondary"
              >mdi-chevron-left</VIcon
            >
          </div>
          <p
            class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
          >
            <VBtn color="secondary" small depressed class="text-capitalize"
              >Identification Details</VBtn
            >
          </p>
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VForm lazy-validation ref="form" @submit.prevent="submit">
            <v-row class="mx-0 px-0">
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  label="Identification Number"
                  v-model="UseridenType"
                  light
                  disabled
                  color="secondary"
                ></VTextField>
              </VCol>
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  v-model="UserIdenNumber"
                  :label="`Please Enter Your ${UseridenType} `"
                  light
                  disabled
                  color="secondary"
                />
              </VCol>
            </v-row>
          </VForm>
        </VCol>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      identityNum: [
        'Social Security Number (or equivalent)',
        // 'National Identification Number',
        'Passport Number (for international accounts)',
        `Driver's License Number`,
      ],
      iden: '',
      idenNum: '',
    }
  },
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    UseridenType: {
      get() {
        return this.user && this.user.idenType
      },
      set(val) {
        this.iden = val
      },
    },
    UserIdenNumber: {
      get() {
        return this.user && this.user.idenNum
      },
      set(val) {
        this.idenNum = val
      },
    },
  },
  methods: {
    submit() {
      console.log(this.idenNum)
    },
  },
}
</script>

<style></style>
