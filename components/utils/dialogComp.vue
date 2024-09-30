<template>
  <div class="white">
    <VDialog
      v-model="dialog"
      persistent
      :overlay="false"
      class="pa-3 scrolls"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="500px"
      transition="slide-x-reverse-transition"
    >
      <!-- todo for transfer -->
      <transfer
        v-if="transact.category == 'transfers'"
        :transact="transact"
        @closeDialog="$emit('closeDialog')"
      />

      <!-- todo for loan -->
      <loan
        v-if="transact.category == 'loans'"
        :transact="transact"
        @closeDialog="$emit('closeDialog')"
      />

      <withdraw
        v-if="transact.category == 'withdraws'"
        :transact="transact"
        @closeDialog="$emit('closeDialog')"
      />

      <identification-dialog
        v-if="transact.docID == 'Identification Document' && !selfie"
        :transact="transact"
        @closeDialog="$emit('closeDialog')"
      />

      <selfie-dialog
        v-if="transact.docS == 'selfie' && selfie"
        @closeDialog="$emit('closeDialog')"
        :transact="transact"
      />

      <deposit
        v-if="transact.category == 'deposits'"
        @closeDialog="$emit('closeDialog')"
        :transact="transact"
      />
    </VDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import transfer from '../dialogStates/transfer.vue'
import loan from '../dialogStates/loan.vue'
import Withdraw from '../dialogStates/withdraw.vue'
import IdentificationDialog from '../dialogStates/identificationDialog.vue'
import SelfieDialog from '../dialogStates/selfieDialog.vue'
import Deposit from '../dialogStates/deposit.vue'

export default {
  components: {
    transfer,
    loan,
    Withdraw,
    IdentificationDialog,
    SelfieDialog,
    Deposit,
  },
  mounted() {
    window.scrollBy(0, 0)
  },
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
    transact: {
      type: Object,
      default: () => {
        return {}
      },
    },
    selfie: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      red: false,
    }
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    colors() {
      return {
        pending: 'yellow darken-2',
        success: 'green',
        declined: 'red',
      }
    },
  },
}
</script>

<style>
.scrolls::-webkit-scrollbar {
  width: 3px;
  height: 0%;
}
.scrolls::-webkit-scrollbar-track {
  background-color: #2c1762;
  border-radius: 20px;
}
.scrolls::-webkit-scrollbar-thumb {
  background: #b48cfc;
  border-radius: 20px;
}
.scrolls::-webkit-scrollbar-corner {
  border-radius: 12px;
  background: pink;
}
.scrolls {
  transition: all 1s;
}
.scrolling {
  transition: all 1s;
}
</style>
