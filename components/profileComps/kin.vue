<template>
  <div class="mt-3">
    <VCol
      cols="12"
      class="ma-0 pa-0 d-flex justify-space-between"
      style="gap: 15px"
    >
      <div class="ma-0 pa-0">
        <VIcon @click="$emit('show')" color="secondary">mdi-chevron-left</VIcon>
      </div>
      <p
        class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
      >
        <VBtn color="secondary" small depressed class="text-capitalize"
          >Next Of Kin</VBtn
        >
      </p>
    </VCol>
    <VForm lazy-validation ref="form" @submit.prevent="submit">
      <v-row class="ma-0 pa-0">
        <VCol cols="12" class="ma-0 pa-0">
          <VTextField
            v-model="KinfirstName"
            label="First Name"
            light
            color="secondary"
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VTextField
            v-model="KinlastName"
            label="Last Name"
            light
            color="secondary"
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VTextField
            v-model="KinPhone"
            label="Phone"
            light
            color="secondary"
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VTextField
            v-model="KinEmail"
            label="Email Address"
            light
            color="secondary"
          />
        </VCol>
        <VCol cols="12" class="ma-0 pa-0">
          <VSelect
            v-model="KinRelationship"
            label="Relationship"
            light
            item-color="secondary"
            :items="relations"
            color="secondary"
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
      </v-row>
    </VForm>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      relationship: '',
      relations: [
        'Mother',
        'Father',
        'Brother',
        'Sister',
        'Uncle',
        'Aunt',
        'Husband',
        'Wife',
        'Other',
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    KinfirstName: {
      get() {
        return this.user && this.user.kin.firstName
      },
      set(val) {
        this.firstName = val
      },
    },
    KinlastName: {
      get() {
        return this.user && this.user.kin.lastName
      },
      set(val) {
        this.lastName = val
      },
    },
    KinPhone: {
      get() {
        return this.user && this.user.kin.phone
      },
      set(val) {
        this.phone = val
      },
    },
    KinEmail: {
      get() {
        return this.user && this.user.kin.email
      },
      set(val) {
        this.email = val
      },
    },
    KinRelationship: {
      get() {
        return this.user && this.user.kin.relationship
      },
      set(val) {
        this.relationship = val
      },
    },
  },
  methods: {
    ...mapActions({ updateAccount: 'userflow/updateAccount' }),
    submit() {
      const kin = {
        firstName: this.firstName ? this.firstName : this.KinfirstName,
        lastName: this.lastName ? this.lastName : this.KinlastName,
        phone: this.phone ? this.phone : this.KinPhone,
        email: this.email ? this.email : this.KinEmail ? this.KinEmail : '',
        relationship: this.relationship
          ? this.relationship
          : this.KinRelationship
          ? this.KinRelationship
          : '',
      }
      const payload = {
        kin,
      }
      // console.log(payload)
      this.updateAccount(payload)
    },
  },
}
</script>

<style></style>
