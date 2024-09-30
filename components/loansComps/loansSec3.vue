<template>
  <div>
    <VCol cols="12">
      <p
        class="text-h4 text-md-h3 accent--text font-weight-bold text-center text-md-left"
      >
        {{ title }}
      </p>
    </VCol>

    <v-row class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="simple in features" :key="simple.text">
        <div class="d-flex align-center my-3 my-md-10" style="gap: 14px">
          <div data-aos="fade-down" data-aos-duration="800">
            <v-img :src="simple.pic" contain width="100"> </v-img>
          </div>
          <div>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              class="font-weight-bold accent--text text-h6 text-md-h5"
            >
              {{ simple.title }}
            </p>
            <p
              class="font-weight-regular grey--text text-md-subtitle-1 text-subtitle-2"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              {{ simple.text }}
            </p>
          </div>
        </div>
      </VCol>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    features: {
      type: Array,
      default: () => {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    reasons() {
      return [
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646354826afc95b84a040228_Quick%20and%20Simple%20icon.webp',
          title: 'Quick and simple',
          text: 'Request a loan and get it in minutes.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6463548152ad093eec87a930_hidden%20fees%20icon.webp',
          title: 'No hidden fees ever',
          text: 'We give you a clear breakdown of your loan. You can bank on our transparency.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6463548152ad093eec87a8fb_all%20in%20one%20icon.webp',
          title: 'Do it all in one',
          text: 'View your loan offers, history and balance in one place and request new loans easily. ',
        },
      ]
    },
  },
}
</script>

<style></style>
