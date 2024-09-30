<template>
  <div class="white">
    <VRow class="mx-3 mt-1 py-5 mb-2" justify="center" align="center">
      <VCol cols="6">
        <VCard color="accent" class="" dark flat rounded="xl">
          <div>{{ user && user.fullName }} Profile</div>
        </VCard>
      </VCol>
      <VCol cols="6" class="ml-0 pl-0" align-self="center">
        <v-menu offset-y offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              icon
              class="float-end"
              :disabled="user && user.blocked"
              small
              dark
              v-bind="attrs"
              v-on="on"
            >
              <VIcon color="white">mdi-dots-vertical</VIcon>
            </v-btn>
          </template>
          <v-list elevation="1">
            <v-list-item
              v-for="state in states"
              :key="state.icon"
              :to="state.to"
            >
              <v-list-item-icon class="mx-1 px-1"
                ><VIcon color="accent">{{
                  state.icon
                }}</VIcon></v-list-item-icon
              >
              <v-list-item-title class="accent--text">{{
                state.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </VCol>
    </VRow>

    <v-container class="white" fluid>
      <v-row class="mx-0 px-0" justify="center" align="center">
        <VCol cols="12" md="8">
          <VCard
            rounded="xl"
            loader-height="8px"
            :disabled="user && user.blocked"
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            class="mt-n10 pa-5"
          >
            <p
              class="accent--text text-center text-md-left pb-0 mb-0 mb-1 font-weight-medium"
            >
              BIO DATA
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              FullName : <strong>{{ user && user.fullName }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Email : <strong>{{ user && user.email }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Password : <strong>{{ user && user.password }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Phone : <strong>{{ user && user.phone }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Country : <strong>{{ user && user.country }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Account Status :
              <VChip
                outlined
                label
                :color="user && user.active ? 'green' : 'red'"
                class="white--text"
                small
                >{{ user && user.active ? 'Active' : 'Non-Active' }}</VChip
              >
            </p>
            <!-- <p class="accent--text">
              Verification :
              <VChip
                label
                outlined
                :color="
                  verify &&
                  verify.documentStatus == 'approved' &&
                  verify.selfieStatus == 'approved'
                    ? 'green'
                    : 'red'
                "
                class="ma-0 pa-0 pa-2"
                :ripple="false"
                small
                >{{
                  verify &&
                  verify.documentStatus == 'approved' &&
                  verify.selfieStatus == 'approved'
                    ? 'Verified'
                    : 'Unverified'
                }}</VChip
              >
            </p> -->
            <div
              class="accent--text mb-0 pb-0 mb-1 mt-3 mx-auto text-center"
              v-if="user && user.blocked"
            >
              <p class="white--text rounded-lg red pa-2">
                {{ user && user.fullName }} Account Has Been Blocked
              </p>
            </div>
          </VCard>

          <VCard
            rounded="xl"
            loader-height="8px"
            :disabled="user && user.blocked"
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            class="mt-3 pa-5"
          >
            <!-- user funds -->
            <p
              class="accent--text text-center text-md-left pb-0 mb-0 mb-1 mt-2 font-weight-medium"
            >
              {{ user && user.fullName }} Funds -
              {{ user && user.currencyName }}
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Main Balance :
              <strong>{{ formatAmount(user && user.wallet.balance) }}</strong>
            </p>
            <!-- <p class="accent--text mb-0 pb-0 mb-1">
              Card Balance :
              <strong>{{ formatAmount(user && user.wallet.card) }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Loan Balance :
              <strong>{{ formatAmount(user && user.wallet.loan) }}</strong>
            </p>
            <p class="accent--text mb-0 pb-0 mb-1">
              Referral :
              <strong>{{ formatAmount(user && user.wallet.referral) }}</strong>
            </p> -->

            <VBtn
              color="accent"
              depressed
              @click="dialog = true"
              block
              :loading="loading.transfer"
              :disabled="user && user.blocked"
              >Edit User</VBtn
            >
          </VCard>
        </VCol>
      </v-row>
    </v-container>

    <!-- for unblocking the user -->
    <VRow class="white mx-0 px-0" justify="center" v-if="user && user.blocked">
      <VCol cols="12" md="8" class="white">
        <VBtn
          color="secondary darken-2"
          class="white--text float-end float-right"
          @click="dyUpdate"
          :loading="loading.update"
          >Unblock Account</VBtn
        >
      </VCol>
    </VRow>

    <!-- for updating and crediting or debiting the user -->
    <VLayout row justify-center>
      <VDialog
        v-model="dialog"
        persistent
        max-width="520px"
        class="accent"
        :fullscreen="$vuetify.breakpoint.mdAndDown ? true : false"
      >
        <VCard color="accent">
          <VCardTitle class="d-flex justify-space-between mb-0 pb-0">
            <p class="text-subtitle-1 font-weight-medium white--text ml-4">
              {{ user && user.fullName }}
            </p>
            <p class="">
              <VBtn color="secondary" @click="dialog = false" text>close</VBtn>
            </p>
          </VCardTitle>
          <VCardText class="text-center mx-auto">
            <p class="white--text d-inline text-center secondary rounded pa-2">
              Main Balance : {{ formatAmount(user && user.wallet.balance) }}
            </p>
          </VCardText>
          <VCardText>
            <VCol cols="12" v-if="!type" class="my-0 py-0">
              <v-card color="transparent" flat>
                <p
                  class="ma-0 pa-0 secondary--text text-center text-body-2 font-weight-medium animate__animated animate__shakeX"
                >
                  Select Type
                </p>
              </v-card>
            </VCol>
            <VCardText>
              <v-row class="mx-0 px-0">
                <VCol cols="6" class="my-0 py-0">
                  <VBtn
                    color="green"
                    depressed
                    block
                    class="white--text"
                    :plain="type == 'credit' ? false : true"
                    @click="type = 'credit'"
                    >Credit</VBtn
                  >
                </VCol>
                <VCol cols="6" class="my-0 py-0">
                  <VBtn
                    color="red"
                    @click="type = 'debit'"
                    :plain="type == 'debit' ? false : true"
                    depressed
                    block
                    class="white--text"
                    >Debit</VBtn
                  >
                </VCol>
              </v-row>
            </VCardText>
          </VCardText>
          <VCardText>
            <VContainer>
              <VForm lazy-validation ref="form" @submit.prevent="submit">
                <v-row class="mx-0 px-0">
                  <VFlex xs12 v-if="type == 'credit'">
                    <VTextField
                      label="Sender's Bank"
                      color="secondary"
                      required
                      dark
                      dense
                      v-model="senderBank"
                      hint="Default Is Flexi Unions Bank If Nothing Is Written"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12 v-if="type == 'credit'">
                    <VTextField
                      :rules="[(v) => !!v || 'Sender Name is required']"
                      dark
                      label="Sender's Name"
                      required
                      color="secondary"
                      dense
                      v-model="senderName"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12 v-if="type == 'debit'">
                    <VTextField
                      :rules="[(v) => !!v || 'Beneficiary Name is required']"
                      dark
                      label="Beneficiary Name"
                      required
                      color="secondary"
                      dense
                      v-model="bankName"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12 v-if="type == 'debit'">
                    <VTextField
                      :rules="[
                        (v) => !!v || 'Beneficiary Account Number is required',
                      ]"
                      dark
                      label="Beneficiary Account Number"
                      required
                      color="secondary"
                      dense
                      v-model="bankAccount"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12 v-if="type == 'debit'">
                    <VTextField
                      :rules="[(v) => !!v || 'Beneficiary Bank  is required']"
                      dark
                      label="Beneficiary Bank"
                      required
                      color="secondary"
                      dense
                      v-model="bank"
                      outlined
                    ></VTextField>
                  </VFlex>

                  <VFlex xs12>
                    <VSelect
                      :items="['Domestic', 'International']"
                      v-model="transferType"
                      label="Select Transfer Type"
                      :rules="[(v) => !!v || 'Transfer Type is required']"
                      color="secondary"
                      item-color="secondary"
                      dense
                      outlined
                      dark
                    ></VSelect>
                  </VFlex>

                  <VFlex xs12>
                    <VTextField
                      v-model="addSymbol"
                      dark
                      outlined
                      dense
                      :label="`Enter Amount - ${user && user.currencyName}`"
                      color="secondary"
                      :rules="[(v) => !!v || 'Amount is required']"
                      type="tel"
                    />
                  </VFlex>

                  <VFlex xs12>
                    <VTextarea
                      v-model="purpose"
                      rows="2"
                      hint="Optional"
                      dark
                      outlined
                      dense
                      label="Purpose of Transfer"
                      color="secondary"
                    />
                  </VFlex>

                  <!-- <VFlex xs12 class="my-0 py-0">
                    <p class="white--text my-0 py-0">
                      <VSwitch
                        label="Account Status"
                        color="secondary"
                        dense
                        class="white--text my-0 py-0"
                        dark
                        hint="To Make User Account Status Active"
                        v-model="userStatus"
                      ></VSwitch>
                    </p>
                  </VFlex>

                  <VFlex xs12 class="my-0 py-0">
                    <p class="white--text my-0 py-0">
                      <VSwitch
                        label="Block User"
                        color="secondary"
                        class="white--text my-0 py-0"
                        dense
                        dark
                        hint="To Block The User Account"
                        v-model="userBlocked"
                      ></VSwitch>
                    </p>
                  </VFlex> -->

                  <VFlex xs12 v-if="type">
                    <VCardActions class="my-1 py-0 pb-2 accent">
                      <VBtn
                        color="secondary darken-1"
                        depressed
                        class="text-capitalize"
                        block
                        type="submit"
                        large
                        :loading="loading.transfer"
                        >{{ type }} {{ user && user.fullName }}</VBtn
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

      type: 'credit',

      transferType: '',
      senderBank: '',
      senderName: '',
      amount: '',
      purpose: '',

      bank: '',
      bankAccount: '',
      bankName: '',

      active: false,
      blocked: false,
    }
  },
  computed: {
    ...mapGetters({
      admin: 'authentication/getUser',
      loading: 'adminflow/getLoading',
      state: 'adminflow/getState',
      props: 'adminflow/getProps',
    }),
    user() {
      const user = this.props('allUsers', this.$route.params.id)
      return user
    },

    userStatus: {
      get() {
        return this.user && this.user.active
      },
      set(val) {
        this.active = val
      },
    },

    userBlocked: {
      get() {
        return this.user && this.user.blocked
      },
      set(val) {
        this.blocked = val
      },
    },

    verify() {
      const verifications = this.state('allVerifications')
      const verify = verifications.find((verify) => {
        return verify.id == (this.user && this.user.userID)
      })
      return verify
    },

    states() {
      return [
        {
          title: `${this.user && this.user.fullName}'s Transfers`,
          icon: 'mdi-bank-transfer',
          to: `/admin/viewuser/${this.$route.params.id}?state=allTransfers`,
        },
        // {
        //   title: `${this.user && this.user.fullName}'s Loans`,
        //   icon: 'mdi-handshake',
        //   to: `/admin/viewuser/${this.$route.params.id}?state=allLoans`,
        // },
        {
          title: `${this.user && this.user.fullName}'s Deposits`,
          icon: 'mdi-orbit',
          to: `/admin/viewuser/${this.$route.params.id}?state=allDeposits`,
        },
        {
          title: `${this.user && this.user.fullName}'s Withdrawal`,
          icon: 'mdi-atom-variant',
          to: `/admin/viewuser/${this.$route.params.id}?state=allWithdraws`,
        },
        // {
        //   title: `${this.user && this.user.fullName}'s Virtual Card`,
        //   icon: 'mdi-card',
        //   to: `/admin/viewuser/${this.$route.params.id}?state=allCards`,
        // },
        // {
        //   title: `${this.user && this.user.fullName}'s Identity Document`,
        //   icon: 'mdi-identifier',
        //   to: `/admin/viewuser/${this.$route.params.id}?state=allIdentity`,
        // },
        // {
        //   title: `${this.user && this.user.fullName}'s Selfie Image`,
        //   icon: 'mdi-face-man',
        //   to: `/admin/viewuser/${this.$route.params.id}?state=allSelfie`,
        // },
        {
          title: `${this.user && this.user.fullName}'s Notifications`,
          icon: 'mdi-bell-badge',
          to: `/admin/viewuser/${this.$route.params.id}?state=allNotifications`,
        },
      ]
    },

    addSymbol: {
      get() {
        let val = parseInt(this.amount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `${this.user && this.user.currencySymbol} ${val}`
        }
      },
      async set(val) {
        // check if the first Character is ₦ and remove it
        if (val == null) {
          val = ''
        }
        const firstChar = val.charAt(0)
        if (firstChar === (await this.user.currencySymbol)) {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.amount = val
        }
      },
    },
  },
  methods: {
    ...mapActions({
      dynamicUpdate: 'adminflow/dynamicUpdate',
      adminTransfer: 'adminflow/adminTransfer',
    }),
    submit() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        //change amount to number after removing symbol
        const removeSymbol = this.addSymbol.slice(2)
        const convertedAmount = parseInt(removeSymbol.split(',').join(''))

        const payload = {
          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,

          category: 'transfers',

          symbolAmount: this.addSymbol,
          transferType: this.transferType,
          title: `Transfer ${this.type == 'credit' ? 'from' : 'to'} ${
            this.type == 'debit' ? `${this.bankName}` : this.senderName
          }`,

          senderName: `${
            this.type == 'debit'
              ? `${this.user && this.user.fullName}`
              : this.senderName
          }`,
          senderBank:
            this.senderBank == '' || this.senderBank == null
              ? 'Flexi Unions Bank'
              : this.senderBank,

          amount: convertedAmount,
          purpose: this.purpose,

          bankName: `${
            this.type == 'debit'
              ? `${this.bankName}`
              : this.user && this.user.fullName
          }`,
          bankAccount: `${
            this.type == 'debit'
              ? `${this.bankAccount}`
              : this.user && this.user.accNumber
          }`,
          bank: `${
            this.type == 'debit' ? `${this.bank}` : 'Flexi Unions Bank'
          }`,

          type: this.type,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
          status: 'approved',
          userID: this.user && this.user.userID,
        }

        this.adminTransfer(payload)
        // console.log(payload)
        setTimeout(() => {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          this.dialog = false
        }, 1200)
      }
    },

    formatAmount(amount) {
      if (amount) {
        return this.user && this.user.currencySymbol + amount.toLocaleString()
      } else {
        return this.user && this.user.currencySymbol + '0.00'
      }
    },

    dyUpdate() {
      // data is what is being changed in database

      const payload = {
        category: 'users',
        id: this.$route.params.id,
        data: { blocked: false },
        message: `${
          this.user && this.user.fullName
        } Account Has Now Been Unblocked`,
      }
      this.dynamicUpdate(payload)
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
