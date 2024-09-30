<template>
  <div style="min-height: 100vh" class="accent">
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Virtual Card Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="card in cardData" :key="card.icon">
        <vContainer class="my-0 py-0">
          <vContainer class="my-0 py-0">
            <admin-card
              :length="card.length"
              :icon="card.icon"
              :text="card.text"
              :color="card.color"
              :to="card.to"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
export default {
  components: { adminCard },
 
  layout: 'adminLayout',
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    cardData() {
      return [
        {
          icon: 'mdi-credit-card',
          text: 'All Cards',
          length: this.cards && this.cards.length,
          to: '/admin/cards/all',
        },
        {
          icon: 'mdi-credit-card-check',
          text: 'All Activated Cards(Made Active)',
          length: this.activeCards && this.activeCards.length,
          color: 'green',
          to: '/admin/cards/active',
        },
        {
          icon: 'mdi-credit-card-remove',
          text: 'All Blocked Cards(Made Blocked)',
          length: this.blockedCards && this.blockedCards.length,
          color: 'red',
          to: '/admin/cards/blocked',
        },
      ]
    },

    cards() {
      const cards = this.state('allCards')
      return cards
    },
    activeCards() {
      const active = this.cards.filter((card) => {
        return card.active
      })
      return active
    },
    blockedCards() {
      const blocked = this.cards.filter((card) => {
        return card.blocked
      })
      return blocked
    },
  },
}
</script>

<style></style>
