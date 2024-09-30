<template>
  <div class="my-5">
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <VCard
          :class="$vuetify.breakpoint.mdAndDown ? 'blurr' : 'blurr2'"
          rounded="xl"
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
            <div class="text-center secondary--text">Flexi Unions Bank</div>
          </VCardText>
          <VCardText class="mx-0 px-0">
            <p class="white--text text--h6 text-center text-capitalize">
              Please Create an account with us
            </p>
            <VForm lazy-validation ref="form" @submit.prevent="submit">
              <v-stepper v-model="e6" vertical dark class="trans" flat>
                <v-stepper-step :complete="e6 > 1" step="1">
                  <p class="white--text my-0 py-0">Account Details:</p>
                  <!-- todo add caption to each registration phases -->
                  <!-- <small class="grey--text my-0 py-0"
                    >Summarize if needed</small
                  > -->
                </v-stepper-step>

                <v-stepper-content step="1">
                  <div class="mb-12">
                    <div>
                      <v-row class="mx-0 px-0 mt-1">
                        <VCol cols="12" class="pa-0 ma-0">
                          <VTextField
                            v-model="firstName"
                            color="primary"
                            dark
                            :rules="[(v) => !!v || 'First Name is required']"
                            label="First Name"
                          />
                        </VCol>
                        <VCol cols="12" class="pa-0 ma-0">
                          <VTextField
                            v-model="lastName"
                            color="primary"
                            dark
                            :rules="[(v) => !!v || 'Last Name is required']"
                            label="Last Name"
                          />
                        </VCol>
                        <VCol cols="12" class="pa-0 ma-0">
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="dob"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dob"
                                label="Date Of Birth"
                                dark
                                :rules="[
                                  (v) => !!v || 'Date of Birth is required',
                                ]"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="dob" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(dob)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </VCol>

                        <VCol cols="12" md="6" class="ma-0 pa-0">
                          <v-autocomplete
                            :items="countriess"
                            v-model="country"
                            label="Country"
                            item-text="name"
                            return-object
                            color="primary"
                            :rules="[(v) => !!v || 'Country is required']"
                            item-color="primary"
                            dark
                          ></v-autocomplete>
                        </VCol>
                        <VCol cols="12" md="6" class="py-0 my-0 px-0 pl-md-2">
                          <VTextField
                            v-model="currencyCode"
                            color="primary"
                            disabled
                            dark
                            :label="`Currency - ${currencyName}`"
                          />
                        </VCol>
                        <VCol cols="12" md="6" class="ma-0 pa-0">
                          <VSelect
                            :items="['Male', 'Female']"
                            v-model="gender"
                            label="Gender"
                            color="primary"
                            :rules="[(v) => !!v || 'Gender is required']"
                            item-color="primary"
                            dark
                          ></VSelect>
                        </VCol>
                        <VCol cols="12" md="6" class="py-0 my-0 px-0 pl-md-2">
                          <VSelect
                            :items="[
                              'Single',
                              'Married',
                              'Widowed',
                              'Divorced',
                              'Separated',
                              'Registered Partnership',
                            ]"
                            v-model="maritalStatus"
                            color="primary"
                            dark
                            item-color="primary"
                            :rules="[
                              (v) => !!v || 'Marital Status is required',
                            ]"
                            label="Marital Status"
                          ></VSelect>
                        </VCol>
                        <VCol cols="12" class="ma-0 pa-0">
                          <VTextField
                            v-model="email"
                            color="primary"
                            dark
                            :rules="emailRules"
                            label="Email"
                          />
                        </VCol>
                        <VCol cols="12" class="pa-0 ma-0">
                          <VTextField
                            color="secondary2"
                            dark
                            :type="type ? 'text' : 'password'"
                            :rules="passwordRules"
                            @click:append="type = !type"
                            :append-icon="type ? 'mdi-eye' : 'mdi-eye-off'"
                            v-model="password"
                            label="Password"
                          />
                        </VCol>
                      </v-row>
                    </div>
                  </div>
                  <v-btn
                    :disabled="One"
                    depressed
                    color="primary"
                    @click="e6 = 2"
                  >
                    Continue
                  </v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">
                  <p class="white--text pa-0 ma-0">Contact Information:</p>
                </v-stepper-step>

                <v-stepper-content step="2">
                  <div class="mb-12">
                    <div>
                      <v-row class="mx-0 px-0 mt-1">
                        <VCol cols="12" class="ma-0 pa-0">
                          <VTextField
                            v-model="phone"
                            dark
                            type="tel"
                            :rules="[
                              (v) =>
                                !!v ||
                                'Phone Number (mobile and/or landline) is required',
                            ]"
                            color="primary"
                            label="Phone Number (mobile and/or landline)"
                          />
                        </VCol>
                        <VCol cols="12" class="ma-0 pa-0">
                          <VTextarea
                            color="primary"
                            rows="2"
                            dark
                            v-model="address"
                            :rules="[(v) => !!v || 'Address is required']"
                            label="Residential Address"
                          />
                        </VCol>
                      </v-row>
                    </div>
                  </div>
                  <v-btn
                    :disabled="Two"
                    depressed
                    color="primary"
                    @click="e6 = 3"
                  >
                    Continue
                  </v-btn>
                  <v-btn text @click="e6 = 1" class="white--text">
                    Cancel
                  </v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">
                  <p class="white--text ma-0 pa-0">
                    Identification Information:
                  </p>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <div class="mb-12">
                    <div>
                      <v-row class="mx-0 px-0 mt-1">
                        <VCol cols="12" class="ma-0 pa-0">
                          <VSelect
                            label="Identification Number"
                            :items="identityNum"
                            v-model="iden"
                            :rules="[
                              (v) => !!v || 'Identification Type is required',
                            ]"
                            dark
                            color="primary"
                            autocomplete
                          ></VSelect>
                        </VCol>
                        <VCol cols="12" v-if="iden" class="ma-0 pa-0">
                          <VTextField
                            v-model="idenNum"
                            :label="`Please Enter Your ${iden} `"
                            dark
                            :rules="[
                              (v) => !!v || 'Identification Number is required',
                            ]"
                            color="primary"
                          />
                        </VCol>
                      </v-row>
                    </div>
                  </div>
                  <v-btn
                    :disabled="Three"
                    depressed
                    color="primary"
                    @click="e6 = 4"
                  >
                    Continue
                  </v-btn>
                  <v-btn text @click="e6 = 2" class="white--text">
                    Cancel
                  </v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 4" step="4">
                  <p class="white--text ma-0 pa-0">Employment Information:</p>
                </v-stepper-step>
                <v-stepper-content step="4">
                  <div class="mb-12">
                    <div>
                      <v-row class="mx-0 px-0 mt-1">
                        <VCol cols="12" class="ma-0 pa-0">
                          <VTextField
                            v-model="occupation"
                            color="primary"
                            :rules="[(v) => !!v || 'Occupation is required']"
                            dark
                            label="Occupation"
                          />
                        </VCol>
                        <VCol cols="12" class="ma-0 pa-0">
                          <VTextField
                            v-model="employer"
                            color="primary"
                            dark
                            label="Employer's Name and Address (if any)"
                          />
                        </VCol>
                      </v-row>
                    </div>
                  </div>
                  <v-btn
                    :disabled="Four"
                    depressed
                    color="primary"
                    @click="e6 = 5"
                  >
                    Continue
                  </v-btn>
                  <v-btn text class="white--text" @click="e6 = 3">
                    Cancel
                  </v-btn>
                </v-stepper-content>

                <v-stepper-step step="5">
                  <p class="white--text ma-0 pa-0">Final Details:</p>
                </v-stepper-step>
                <v-stepper-content step="5">
                  <div class="mb-12">
                    <div>
                      <v-row class="mx-0 px-0 mt-1">
                        <VCol cols="12" class="ma-0 pa-0">
                          <VSelect
                            :items="[
                              'Savings Account',
                              'Checking accounts',
                              'Money market accounts (MMAs)',
                              'Certificate of deposit accounts (CDs)',
                            ]"
                            v-model="account"
                            label="Type of Account"
                            dark
                            item-color="primary"
                            :rules="[(v) => !!v || 'Account Type is required']"
                            color="primary"
                          ></VSelect>
                        </VCol>
                        <VCol cols="12" class="ma-0 pa-0">
                          <v-select
                            v-model="ownership"
                            :rules="[
                              (v) => !!v || 'Account Ownership is required',
                            ]"
                            color="primary"
                            item-color="primary"
                            :items="[
                              'INDIVIDUAL ACCOUNT',
                              'JOINT ACCOUNTS',
                              'TRUST ACCOUNTS',
                            ]"
                            dark
                            label="Account Ownership"
                          />
                        </VCol>
                        <VCol cols="12" class="ma-0 pa-0">
                          <v-checkbox
                            v-model="terms"
                            :label="termsTemplate"
                            color="primary"
                            dark
                            :rules="[(v) => !!v || 'Agree To Our Terms']"
                          ></v-checkbox>
                        </VCol>
                      </v-row>
                    </div>
                  </div>
                  <v-btn
                    :disabled="Five"
                    depressed
                    type="submit"
                    color="primary"
                    :loading="loading.register"
                  >
                    Continue
                  </v-btn>
                  <v-btn text class="white--text" @click="e6 = 4">
                    Cancel
                  </v-btn>
                </v-stepper-content>
              </v-stepper>
              <VCol cols="12" class="py-0 my-0 white--text text-center">
                Have an account with us,
                <nuxt-link to="/login">Login!</nuxt-link>
              </VCol>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </v-row>
    <alert-comp />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import countries from '@/services/countries'
import alertComp from '~/components/utils/alertComp.vue'
export default {
  components: { alertComp },
  layout: 'auth',
  created() {
    window.scrollTo(0, 0)
  },
  mounted() {
    // console.log(this.$store.state.authentication.counter)
  },
  updated() {
    if (
      this.firstName &&
      this.lastName &&
      this.gender &&
      this.country &&
      this.maritalStatus &&
      this.email &&
      this.password &&
      this.dob
    ) {
      this.One = false
    } else {
      this.One = true
    }

    if (this.phone && this.address) {
      this.Two = false
    } else {
      this.Two = true
    }

    if (this.iden && this.idenNum) {
      this.Three = false
    } else {
      this.Three = true
    }

    if (this.occupation) {
      this.Four = false
    } else {
      this.Four = true
    }

    if (this.account && this.ownership && this.terms) {
      this.Five = false
    } else {
      this.Five = true
    }
  },
  data() {
    return {
      e6: 1,
      One: true,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      type: false,

      // personal information
      firstName: '',
      lastName: '',
      gender: '',
      currency: '',
      country: '',
      maritalStatus: '',
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 6) || 'Password must be greater than 6 characters',
      ],

      //for calendar date of birth
      modal: false,
      dob: '',

      //contact information
      phone: '',
      address: '',

      //identification informaion
      identityNum: [
        'Social Security Number (or equivalent)',
        // 'National Identification Number',
        'Passport Number (for international accounts)',
        `Driver's License Number`,
      ],
      iden: '',
      idenNum: '',

      //employment information
      occupation: '',
      employer: '',

      //account details
      account: '',
      ownership: '',
      terms: '',
      termsTemplate: `By checking this box, I acknowledge that I have read, understood, and agree to abide by the terms and conditions outlined by Flexi Unions Bank. I understand that these terms govern my use of Flexi Unions Bank's banking services, including account access, transactions, and data privacy. I accept any future updates or modifications to these terms.`,
    }
  },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading' }),
    countriess() {
      return countries
    },
    currencyCode() {
      let code
      if (this.country) {
        code = this.country.currency.symbol
      } else {
        code = ''
      }
      return code
    },
    currencyName() {
      let name
      if (this.country) {
        name = this.country.currency.name
      } else {
        name = ''
      }
      return name
    },
  },
  methods: {
    ...mapActions({ registerUser: 'authentication/registerUser' }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          // Personal Details
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          country: this.country.name,
          currencySymbol: this.currencyCode ? this.currencyCode[0] : '$',
          currencyName: this.currencyName ? this.currencyName : 'Dollar',
          maritalStatus: this.maritalStatus,
          email: this.email,
          password: this.password,
          dob: this.dob,

          // Contact details
          phone: this.phone,
          address: this.address,

          // Identification details
          idenType: this.iden,
          idenNum: this.idenNum,

          // Employment details
          occupation: this.occupation,
          employer: this.employer,

          // Account details
          accountType: this.account,
          ownership: this.ownership,
        }

        this.registerUser(payload)
        this.e6 = 5
        // console.log(payload)
        // setTimeout(() => {
        //   this.e6 = 1
        //   this.$refs.form.reset()
        //   this.$refs.form.resetValidation()
        // }, 2000)
      }
    },
  },
}
</script>

<style scoped>
.trans {
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0px 0px 0px;
}
</style>
