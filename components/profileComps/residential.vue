<template>
  <div>
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
            >Update Address</VBtn
          >
        </p>
      </VCol>
    </VCol>
    <VCol cols="12" v-if="!show">
      <VCard flat rounded="lg" class="lightpinkish">
        <VCardText>
          <p class="ma-0 pa-0 text-caption grey--text">Address</p>
          <p class="mx-0 px-0 black--text text-h6 text-md-h5 font-weight-bold">
            {{ user && user.address }}
          </p>
        </VCardText>
      </VCard>
      <VCol cols="12">
        <VBtn block @click="show = true" color="secondary" depressed large
          >Change Address</VBtn
        >
      </VCol>
    </VCol>

    <VCol cols="12" v-if="show">
      <VForm lazy-validation ref="form" @submit.prevent="submit">
        <v-row class="ma-0 pa-0">
          <VCol cols="12" class="ma-0 pa-0">
            <VTextField
              v-model="UserAddress"
              label="Residential Address"
              color="secondary"
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VSelect
              v-model="UserCountry"
              label="Country of Residence"
              color="secondary"
              :items="countriess"
              item-color="secondary"
              item-text="name"
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VSelect
              v-model="UserResidence"
              label="Type of Residence"
              color="secondary"
              :items="[
                'Rented',
                'Owned',
                'Family house',
                'Employer provided',
                'Temporary',
              ]"
              light
              item-color="secondary"
            />
          </VCol>
          <VCol
            cols="12"
            class="ma-0 pa-0"
            v-if="type == 'Rented' || type == 'Temporary'"
          >
            <VTextField
              v-model="addSymbol"
              :label="`How Much is Your Rent (${user && user.currencyName})`"
              color="secondary"
              light
            />
          </VCol>
          <VCol cols="12" class="ma-0 pa-0">
            <VBtn
              color="secondary"
              large
              depressed
              block
              type="submit"
              :loading="loading.update"
              >Save</VBtn
            >
          </VCol>
        </v-row>
      </VForm>
    </VCol>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import countries from '~/services/countries'
export default {
  data() {
    return {
      show: false,
      address: '',
      country: '',
      type: '',
      rent: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
    UserAddress: {
      get() {
        return this.user && this.user.address
      },
      set(val) {
        this.address = val
      },
    },
    UserCountry: {
      get() {
        return this.user && this.user.country
      },
      set(val) {
        this.country = val
      },
    },
    UserResidence: {
      get() {
        return this.user && this.user.residenceType
      },
      set(val) {
        this.type = val
      },
    },
    addSymbol: {
      get() {
        let val = parseInt(this.rent)
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
          this.rent = val
        }
      },
    },
    countriess() {
      return countries
    },
  },
  methods: {
    ...mapActions({ updateAccount: 'userflow/updateAccount' }),
    submit() {
      const payload = {
        address: this.address ? this.address : this.UserAddress,
        country: this.country ? this.country : this.UserCountry,
        residenceType: this.type
          ? this.type
          : this.UserResidence
          ? this.UserResidence
          : '',
        rent: this.addSymbol
          ? this.addSymbol
          : this.UserRent
          ? this.UserRent
          : '',
      }

      this.updateAccount(payload)
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
