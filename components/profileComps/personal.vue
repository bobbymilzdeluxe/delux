<template>
  <div>
    <v-row class="ma-0 pa-0" justify="center">
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
        <div>
          <VBtn color="secondary" small depressed class="text-capitalize"
            >Update Profile</VBtn
          >
        </div>
      </VCol>
      <VCol cols="12" class="ma-0 pa-0 mb-7">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div class="secondary--text text-body-2 font-weight-light">
              Some fields can't be changed in your profile. Do well to
              cautiously changed other fields which can.
            </div>
          </div>
        </VCard>
      </VCol>

      <VCol cols="12" class="ma-0 pa-0">
        <VForm lazy-validation @submit.prevent="submit" ref="form">
          <v-row class="mx-0 px-0">
            <VCol cols="12" class="ma-0 pa-0">
              <VTextField
                v-model="UserfullName"
                label="FullName"
                color="secondary"
                light
              />
            </VCol>

            <VCol cols="12" class="ma-0 pa-0">
              <VTextField
                v-model="UserEmail"
                label="Email"
                color="secondary"
                light
                disabled
              />
            </VCol>
            <VCol cols="12" class="pa-0 ma-0">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="dob"
                persistent
                class="secondary"
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="UserDob"
                    label="Date Of Birth"
                    light
                    color="secondary"
                    :rules="[(v) => !!v || 'Date of Birth is required']"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="secondary" v-model="dob" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="secondary" @click="$refs.dialog.save(dob)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </VCol>
            <VCol cols="12" class="ma-0 pa-0">
              <VTextField
                v-model="UserPhone"
                label="Phone"
                color="secondary"
                light
              />
            </VCol>
            <VCol cols="12" class="ma-0 pa-0">
              <VSelect
                :items="['Male', 'Female']"
                v-model="UserGender"
                color="secondary"
                item-color="secondary"
                label="Gender"
              ></VSelect>
            </VCol>
            <VCol cols="12" class="ma-0 pa-0">
              <VSelect
                :items="['Single', 'Married', 'Others']"
                v-model="UsermaritalStatus"
                label="Marital Status"
                color="secondary"
                item-color="secondary"
              ></VSelect>
            </VCol>
            <VCol cols="12" class="ma-0 pa-0">
              <VTextField
                v-model="UserChildren"
                label="Number of Children"
                color="secondary"
                light
              />
            </VCol>
            <VCol cols="12" class="ma-0 pa-0 mb-5">
              <VBtn
                color="secondary"
                block
                depressed
                large
                :loading="loading.update"
                type="submit"
                >Save</VBtn
              >
            </VCol>
          </v-row>
        </VForm>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      modal: false,

      fullName: '',
      email: '',
      dob: '',
      phone: '',
      gender: '',
      maritalStatus: '',
      children: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),

    UserfullName: {
      get() {
        return this.user && this.user.fullName
      },
      set(val) {
        this.fullName = val
      },
    },

    UserlastName: {
      get() {
        return this.user && this.user.lastName
      },
      set(val) {
        this.lastName = val
      },
    },

    UsermiddleName: {
      get() {
        return this.user && this.user.middleName
      },
      set(val) {
        this.middleName = val
      },
    },

    UserEmail: {
      get() {
        return this.user && this.user.email
      },
      set(val) {
        this.email = val
      },
    },

    UserDob: {
      get() {
        return this.user && this.user.dob
      },
      set(val) {
        this.dob = val
      },
    },

    UserPhone: {
      get() {
        return this.user && this.user.phone
      },
      set(val) {
        this.phone = val
      },
    },

    UserGender: {
      get() {
        return this.user && this.user.gender
      },
      set(val) {
        this.gender = val
      },
    },

    UsermaritalStatus: {
      get() {
        return this.user && this.user.maritalStatus
      },
      set(val) {
        this.maritalStatus = val
      },
    },

    UserChildren: {
      get() {
        return this.user && this.user.children
      },
      set(val) {
        this.children = val
      },
    },
  },

  methods: {
    ...mapActions({ updateAccount: 'userflow/updateAccount' }),
    submit() {
      const payload = {
        fullName: this.fullName ? this.fullName : this.UserfullName,
        dob: this.dob ? this.dob : this.UserDob,
        phone: this.phone ? this.phone : this.UserPhone,
        gender: this.gender ? this.gender : this.UserGender,
        maritalStatus: this.maritalStatus
          ? this.maritalStatus
          : this.UsermaritalStatus,
        children: this.children
          ? this.children
          : this.UserChildren
          ? this.UserChildren
          : '',
      }
      this.updateAccount(payload)
    },
  },
}
</script>

<style></style>
