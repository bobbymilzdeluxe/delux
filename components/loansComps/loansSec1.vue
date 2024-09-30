<template>
  <div>
    <v-row
      class="mx-0 px-0"
      :class="revers ? 'flex-row-reverse' : null"
      justify="center"
      align="center"
    >
      <VCol cols="12" md="6">
        <slot></slot>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          class="text-h4 text-md-h3 white--text font-weight-bold text-center text-md-left"
        >
          <slot name="title"></slot>
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          class="text-h6 text-md-h5 white--text font-weight-regular text-center text-md-left"
        >
          <slot name="text"></slot>
        </p>
        <p class="mx-0 px-0 d-flex justify-center d-md-block" v-if="btn">
          <VBtn
            data-aos="fade-up"
            data-aos-delay="400"
            color="primary"
            class="white--text text-capitalize font-weight-medium"
            depressed
            large
            to="/register"
          >
            <slot name="btn"></slot>
          </VBtn>
        </p>
      </VCol>
      <VCol cols="12" md="6">
        <v-card
          flat
          color="transparent"
          rounded="xl"
          style="position: relative"
        >
          <v-img
            :src="Dpic"
            data-aos="zoom-in"
            data-aos-delay="1000"
            class="mx-auto text-center"
            contain
            :width="width"
            style="z-index: 3; border-radius: 20px"
          >
          </v-img>
          <v-img
            v-if="absolute"
            style="position: absolute; top: 0; left: 72%"
            :src="absolute1"
            contain
            data-aos="fade-up"
            data-aos-delay="800"
            width="80"
          >
          </v-img>
          <v-img
            :src="absolute2"
            v-if="absolute"
            style="position: absolute; top: 70%; right: 11%"
            contain
            data-aos="fade-up"
            data-aos-delay="900"
            width="30"
          >
          </v-img>
        </v-card>
      </VCol>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
    btn: {
      type: Boolean,
      default: false,
    },
    revers: {
      type: Boolean,
      default: false,
    },
    Dpic: {
      type: String,
      default: '',
    },
    absolute1: {
      type: String,
      default: '',
    },
    absolute2: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 300,
    },
  },
}
</script>

<style></style>
