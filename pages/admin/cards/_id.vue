<template>
  <div class="mt-1">
    <v-row class="mx-0 px-0 white" justify="center" align="center">
      <VCol cols="12" md="4" class="white">
        <vContainer>
          <vContainer>
            <admin-card
              cardColor="accent"
              :icon="dynamicCard.icon"
              :color="dynamicCard.color"
              :text="dynamicCard.text"
              :length="dynamicCard.length"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </v-row>

    <v-row class="white text-center mx-auto" justify="center">
      <VCol cols="11" md="6" class="mt-0 pt-0">
        <VTextField
          v-model="search"
          label="Search Card"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicCards.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="card in dynamicCards"
          :key="card.userID"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="`${card.title}`"
            :bigText="card.email"
            :date="card.date"
            :Data="card"
          />
        </VCol>
      </v-row>
    </div>
    <div v-else class="white">
      <v-row class="mx-0 px-0" justify="center">
        <VCol cols="12" md="8" class="mx-auto text-center">
          <VIcon color="accent" size="100">mdi-filter-variant</VIcon>
          <p class="accent--text text-center font-weight-medium">Empty</p>
        </VCol>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
import AdminPropCard from '~/components/adminUtils/adminPropCard.vue'
export default {
  components: { adminCard, AdminPropCard },
  layout: 'adminLayout',
  // mounted() {
  //   setTimeout(() => {
  //     this.$store.dispatch('adminflow/initAdmin')
  //   }, 3000)
  // },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    dynamicCard() {
      const dynamicCard = {
        all: {
          icon: 'mdi-credit-card',
          text: 'All Cards',
          color: 'white',
          length: this.cards.length,
        },
        active: {
          icon: 'mdi-credit-card-check',
          text: 'Activated Cards',
          color: 'green',
          length: this.activeCards.length,
        },
        blocked: {
          icon: 'mdi-credit-card-cancel',
          text: 'Blocked Cards',
          color: 'red',
          length: this.blockedCards.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicCards() {
      const dynamicCards = {
        all: this.cards,
        blocked: this.blockedCards,
        active: this.activeCards,
      }
      return dynamicCards[this.$route.params.id]
    },

    cards() {
      const cards = this.state('allCards')
      return cards.filter((card) => {
        return (
          card.fullName.includes(this.search) ||
          card.fullName.toLowerCase().includes(this.search) ||
          card.email.includes(this.search)
        )
      })
    },

    blockedCards() {
      const cards = this.state('allCards')
      return cards.filter((card) => {
        return (
          (card.blocked && card.fullName.includes(this.search)) ||
          (card.blocked && card.fullName.toLowerCase().includes(this.search)) ||
          (card.blocked && card.email.includes(this.search))
        )
      })
    },

    activeCards() {
      const cards = this.state('allCards')
      return cards.filter((card) => {
        return (
          (card.active && card.fullName.includes(this.search)) ||
          (card.active && card.fullName.toLowerCase().includes(this.search)) ||
          (card.active && card.email.includes(this.search))
        )
      })
    },

    userActions() {
      return [
        {
          is: false,
          color: 'accent',
          text: 'View User',
          to: true,
          action: ($event, data) => {
            console.log(data)
          },
        },

        //for activating and deactivating card
        {
          is:
            this.$route.params.id != 'active' &&
            this.$route.params.id != 'blocked'
              ? true
              : false,
          color: 'green',
          text: 'Activate',
          action: ($event, data) => {
            if (data.active) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Virtual Card is Already ACTIVE`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Virtual Card Has Now Become ACTIVE`

              this.dyUpdate('cards', data.id, { active: true }, message)
            }
          },
        },
        {
          is: this.$route.params.id == 'active' ? true : false,
          color: 'red',
          text: 'Deactivate',
          action: ($event, data) => {
            if (!data.active) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Virtual Card is not ACTIVE`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Virtual Card Has Now Been Deactivated`

              this.dyUpdate('cards', data.id, { active: false }, message)
            }
          },
        },

        //for blocking and unblocking cards
        {
          is:
            this.$route.params.id != 'blocked' &&
            this.$route.params.id != 'active'
              ? true
              : false,
          color: 'red',
          text: 'Block',
          action: ($event, data) => {
            if (data.blocked) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Virtual Card is Already BLOCKED`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Virtual Card Has Now Become BLOCKED`

              this.dyUpdate('cards', data.id, { blocked: true }, message)
            }
          },
        },
        {
          is: this.$route.params.id == 'blocked' ? true : false,
          color: 'green',
          text: 'Unblock',
          action: ($event, data) => {
            if (!data.blocked) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Virtual Card is Already not BLOCKED`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Virtual Card Has Now Been UNBLOCKED`

              this.dyUpdate('cards', data.id, { blocked: false }, message)
            }
          },
        },
      ]
    },
  },
  methods: {
    ...mapActions({ dynamicUpdate: 'adminflow/dynamicUpdate' }),
    dyUpdate(category, id, data, message) {
      // data is what is being changed in database

      const payload = {
        category: category,
        id: id,
        data: data,
        message: message,
      }
      this.dynamicUpdate(payload)
    },
  },
}
</script>

<style></style>
