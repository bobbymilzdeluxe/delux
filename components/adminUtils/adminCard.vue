<template>
  <div>
    <VCard
      class=""
      flat
      :color="cardColor == 'white' ? null : cardColor"
      outlined
      rounded="xl"
      :loading="loading"
      :disabled="disabled"
      @click="() => {}"
      :to="to"
      style="overflow: hidden"
    >
      <VCardText
        class="d-flex flex-column justify-center py-10"
        style="gap: 17px"
      >
        <div class="align-self-center">
          <VIcon size="70" :color="color"> {{ icon }}</VIcon>
        </div>
        <div class="text-center">
          <p class="my-0 py-0 text-subtitle-1" :class="`${color}--text`">
            {{ text }}
          </p>
          <p
            class="my-0 py-0 text-center font-weight-bold"
            :class="`${color}--text`"
          >
            {{ length }}
          </p>
        </div>
        <VSpacer />
        <!-- <VDivider /> -->
      </VCardText>
    </VCard>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    length: {
      type: Number,
      default: 0,
    },
    to: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'accent',
    },
    cardColor: {
      type: String,
      default: 'white',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
}
</script>

<style></style>
