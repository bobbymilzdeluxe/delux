<template>
  <div>
    <VCard
      flat
      color=""
      class=""
      rounded="xxl"
      style="border: 1px solid #2c1762"
    >
      <VCardText class="d-flex align-center" style="gap: 1px">
        <div>
          <p class="mb-0 pb-0 accent--text text-h6" v-if="title">
            <!-- add notify condition to see whole text in notification array admin -->
            {{
              $vuetify.breakpoint.mdAndDown && title.length > 16 && notify
                ? title.slice(0, 16) + '...'
                : title
            }}
          </p>
          <p class="mb-0 pb-0 accent--text" v-if="bigText">
            {{
              $vuetify.breakpoint.mdAndDown && bigText.length > 16 && notify
                ? bigText.slice(0, 16) + '...'
                : bigText
            }}
          </p>
          <p class="mb-0 pb-0 accent--text" v-if="smallText">{{ smallText }}</p>
          <p class="mb-0 pb-0 accent--text" v-if="date">{{ date }}</p>
        </div>
        <VSpacer />
        <div class="d-flex flex-column" style="gap: 3px">
          <!-- mostly transactions -->
          <VChip
            :color="colors[Data.status]"
            class="text-capitalize"
            outlined
            small
            v-if="Data.status"
            >{{ Data.status }}</VChip
          >

          <!-- for users and cards -->
          <VChip color="green" small outlined v-if="Data.active">Active</VChip>
          <VChip color="red" outlined small v-if="Data.blocked">Blocked</VChip>

          <!-- for imscode -->
          <VChip
            color="green"
            small
            outlined
            v-if="Data.category == 'codes' && !Data.used"
            >Active</VChip
          >
          <VChip
            color="red"
            small
            outlined
            v-if="Data.category == 'codes' && Data.used"
            >Used</VChip
          >

          <!-- for identification document -->
          <VChip
            :color="colors[Data.documentStatus]"
            class="text-capitalize"
            outlined
            small
            v-if="Data.documentStatus"
            >{{ Data.documentStatus }} Identity</VChip
          >

          <!-- for selfie image -->
          <VChip
            :color="colors[Data.selfieStatus]"
            class="text-capitalize"
            outlined
            small
            v-if="Data.selfieStatus"
            >{{ Data.selfieStatus }} Selfie</VChip
          >
        </div>
        <VSpacer />
        <div class="d-flex flex-column" style="gap: 6px">
          <div v-for="action in actions" :key="action.color">
            <v-btn
              depressed
              v-if="action.is"
              :disabled="
                (Data.category == 'loans' &&
                  Data.status != 'pending' &&
                  !action.text.startsWith('View')) ||
                (Data.category == 'deposits' &&
                  Data.status != 'pending' &&
                  !action.text.startsWith('View'))
              "
              :color="action.color"
              @click="action.action($event, Data)"
              :to="action.to ? `/admin/editUser/${Data && Data.userID}` : null"
              small
              block
              class="white--text"
              >{{ action.text }}
            </v-btn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
export default {
  components: { adminCard },
  layout: 'adminLayout',

  props: {
    title: {
      type: String,
      default: '',
    },
    bigText: {
      type: String,
      default: '',
    },
    smallText: {
      type: String,
      default: '',
    },

    date: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      default: () => {
        return []
      },
    },
    Data: {
      type: Object,
      default: () => {
        return {}
      },
    },
    notify: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    colors() {
      return {
        approved: 'green',
        pending: 'orange',
        declined: 'red',
      }
    },
  },
}
</script>

<style></style>
