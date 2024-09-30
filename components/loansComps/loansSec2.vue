<template>
  <div data-aos="fade-up">
    <VCol cols="12">
      <p
        v-if="title"
        class="text-h4 text-md-h3 accent--text font-weight-bold text-center text-md-left"
      >
        <slot name="title"></slot>
      </p>
    </VCol>

    <v-row class="mx-0 px-0" justify="center" align="center">
      <VCol cols="12" md="6" v-for="card in features" :key="card.color">
        <VCard
          rounded="lg"
          min-height="300px"
          class="pa-2 pa-md-5"
          flat
          :color="card.color"
        >
          <VCardTitle class="d-flex justify-start align-start">
            <div>
              <v-img
                v-if="pic"
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64664be7e67ce67603e2d067_Misc_02.webp"
                contain
                width="25"
                height="25"
              ></v-img>
            </div>
          </VCardTitle>
          <VCardText
            v-if="cardTitle"
            class="text-h4 font-weight-bold accent--text"
          >
            {{ card.title }}
          </VCardText>
          <VCardText
            class="font-weight-regular"
            :class="cardTitle ? 'grey--text text-h6' : 'accent--text text-h5'"
          >
            {{ card.text }}
          </VCardText>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: Boolean,
      default: false,
    },
    cardTitle: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {},
}
</script>

<style></style>
