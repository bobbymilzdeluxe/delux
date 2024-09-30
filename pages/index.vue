<template>
  <!-- root div -->
  <div class="white">
    <!-- landing page 1 -->
    <main
      :class="$vuetify.breakpoint.mdAndDown ? 'translinear2' : 'translinear'"
      style="position: relative"
    >
      <v-container fluid>
        <vContainer fluid>
          <v-row class="mx-0 px-0" align="center">
            <VCol cols="12" md="6">
              <VCard
                flat
                color="transparent"
                data-aos="fade-up"
                data-aos-delay="300"
                class="text-h4 text-md-h2 font-weight-bold white--text text-center text-md-left"
              >
                <p
                  class="text-h4 text-md-h2 text-capitalize font-weight-bold white--text text-center text-md-left"
                >
                  We are a bank and our
                  <span class="lineartext">superpower</span> is giving you
                  access to <span class="lineartext">credit</span>
                </p>

                <p
                  class="white--text text-h6 text-md-h5 font-weight-medium mt-3 text-capitalize text-center text-md-left"
                >
                  <VChip pill color="white" outlined>Be innovative Now</VChip>
                </p>
                <VCardActions
                  class="mx-0 px-0 d-flex justify-center d-md-block"
                >
                  <VBtn
                    color="primary"
                    class="text-capitalize mx-0 pa-4"
                    to="/register"
                    depressed
                    >Get Started
                    <VIcon color="white" right>mdi-account-plus</VIcon></VBtn
                  >
                  <VBtn
                    color="primary"
                    class="text-capitalize mx-0 pa-4"
                    text
                    to="/login"
                    depressed
                    >Login Now
                    <VIcon color="primary">mdi-account-badge</VIcon></VBtn
                  >
                </VCardActions>
              </VCard>
            </VCol>
            <VCol cols="12" md="6" class="mx-0 px-0">
              <VCard
                class="white--text d-flex justify-center"
                flat
                data-aos="fade-up"
                data-aos-delay="300"
                color="transparent"
              >
                <div>
                  <v-img
                    style="position: absolute: left: 0; z-index: 4"
                    src="/images/absorbed.svg"
                    contain
                    :width="$vuetify.breakpoint.mdAndDown ? '300' : '680'"
                  ></v-img>
                </div>
              </VCard>
            </VCol>
          </v-row>
        </vContainer>
      </v-container>
    </main>

    <!-- landing page  2-->
    <main class="lightpinkish my-4">
      <vContainer fluid>
        <vContainer fluid>
          <v-row class="my-4 mx-0 px-0" justify="center" align="center">
            <VCol cols="12" md="6" data-aos="fade-up" data-aos-delay="300">
              <p
                class="text-md-h3 text-center text-md-left text-h4 accent--text font-weight-bold"
              >
                Stay in control of your money with a Flexi Unions Bank account
              </p>
            </VCol>
            <VCol
              cols="12"
              md="6"
              class="d-flex justify-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div style="position: relative">
                <v-img
                  src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea3e3fe5c77b0adc57ac_girls%20with%20phon%201-p-500.webp"
                  contain
                  width="290"
                  style="border-radius: 12px; z-index: 1"
                >
                </v-img>
                <v-img
                  src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea437bc0402f6ef21e44_handdrawn%20shape%202.webp"
                  contain
                  :style="`position: absolute; left: ${
                    $vuetify.breakpoint.mdAndDown ? '165px' : '250px'
                  }; top: 0`"
                  width="150"
                >
                </v-img>

                <v-img
                  src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea410c26da029289cf5f_handrawn%20shape%201%20-%20green.webp"
                  contain
                  style="position: absolute; bottom: 100px; z-index: 2"
                  width="60"
                >
                </v-img>
              </div>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <!-- floating card....with negative margin -->
    <VCol cols="10" class="d-flex justify-center mx-auto text-center mt-n16">
      <VCard class="shadowfloat py-10 px-5" rounded="xl">
        <v-row class="mx-0 px-0">
          <VCol
            cols="12"
            data-aos="fade-up"
            :data-aos-delay="200 + i * 300"
            md="4"
            v-for="(float, i) in floatInfo"
            :key="float.color"
            class="py-0"
          >
            <div
              class="d-md-flex align-center justify-center flex-md-row"
              style="gap: 12px; height: 100px"
            >
              <VSpacer />
              <div>
                <VBtn :color="float.color" large depressed max-width="130px"
                  ><VIcon color="accent">{{ float.icon }}</VIcon></VBtn
                >
              </div>
              <div class="text-subtitle-2 text-md-subtitle-1 grey--text">
                {{ float.text }}
              </div>
              <VSpacer />
              <div
                v-if="i != 2"
                :style="`width: ${
                  $vuetify.breakpoint.mdAndDown ? '100%' : '0'
                };height: ${
                  $vuetify.breakpoint.mdAndDown ? '0' : '100%'
                }; border: 1px solid grey; opacity: 0.3`"
                class="mt-3 mt-md-0"
              ></div>
            </div>
          </VCol>
        </v-row>
      </VCard>
    </VCol>

    <div class="text-center mx-auto my-10">
      <VBtn
        color="primary"
        to="/register"
        class="text-capitalize"
        large
        depressed
        >Open Flexi Unions Bank Account</VBtn
      >
    </div>

    <!-- landing 3 -->
    <!-- <main>
      <vContainer fluid>
        <vContainer fluid>
          <v-row class="mx-0 px-0">
            <VCol cols="12" md="6" data-aos="fade-right">
              <p
                class="text-h5 text-md-h3 font-weight-bold accent--text"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                Instant Loans
              </p>
              <p
                class="text-h6 text-md-h5 text1--text font-weight-regular"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                We make access to loans simple and easy. No guarantors,
                collaterals or long forms. Apply 24/7 and receive funds in your
                Flexi Unions Bank account instantly. Unlock higher loan amounts
                and lower interest rates by repaying loans on time.
              </p>
              <p>
                <VBtn
                  color="primary"
                  class="white--text text-capitalize font-weight-medium"
                  depressed
                  data-aos="fade-right"
                  data-aos-delay="300"
                  to="/loans"
                  large
                  >More about loans</VBtn
                >
              </p>
            </VCol>
            <VCol cols="12" md="6" class="d-flex justify-center align-center">
              <div
                style="position: relative"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <v-img
                  src="https://www.nbkc.com/themes/nbkc-2020/assets/images/home-loans/purchase/difference-perfect-size.jpg"
                  contain
                  width="290"
                  style="
                    border-radius: 12px;
                    z-index: 1;
                    box-shadow: 5px 5px 0 0 #ff0475;
                  "
                >
                </v-img>
                <v-img
                  src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea412b990a8e4485e906_Spline%20-%2012.webp"
                  contain
                  :style="`position: absolute; left: ${
                    $vuetify.breakpoint.mdAndDown ? '165px' : '250px'
                  }; top: 0`"
                  width="150"
                >
                </v-img>

                <v-img
                  src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea410c26da029289cf5f_handrawn%20shape%201%20-%20green.webp"
                  contain
                  style="position: absolute; bottom: 100px; z-index: 2"
                  width="60"
                >
                </v-img>
              </div>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main> -->

    <!-- landing 4 -->
    <main class="my-4">
      <v-row justify="center" class="mx-0 px-0">
        <VCol cols="11">
          <VCard flat class="pa-5" color="rgba(78,241,224,.1)" rounded="xl">
            <v-row class="mx-0 px-0" justify="center">
              <VCol cols="12" md="6" class="d-flex justify-center align-center">
                <div
                  style="position: relative"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <v-img
                    src="https://img.freepik.com/premium-photo/wow-sale-happy-man-with-shopping-bag-studio-excited-discount-purchase-white-background-deal-excited-indian-guy-with-product-form-shop-mall-market-while-posing-isolated_590464-161553.jpg"
                    contain
                    width="290"
                    style="
                      border-radius: 12px;
                      z-index: 1;
                      box-shadow: 5px 5px 0 0 #ff0475;
                    "
                  >
                  </v-img>
                  <div
                    class="primary"
                    :style="`position: absolute; left: ${
                      $vuetify.breakpoint.mdAndDown ? '165px' : '250px'
                    }; bottom: 20%; border-radius: 100%; height: 70px; width: 70px`"
                  ></div>

                  <div
                    style="
                      position: absolute;
                      bottom: 12%;
                      z-index: 2;
                      left: 12%;
                      border-radius: 9px;
                    "
                    class="secondary pa-3 darken-4"
                  >
                    <v-img
                      src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea407c0134d9ca25a30c_shop.webp"
                      contain
                      width="60"
                    >
                    </v-img>
                  </div>
                </div>
              </VCol>
              <VCol cols="12" md="6">
                <p class="text-h5 text-md-h3 font-weight-bold accent--text">
                  Shop now, pay later for pretty much anything
                </p>
                <p class="text-h6 text-md-h5 text1--text font-weight-regular">
                  Buy anything, shop anywhere, pay with Flexi Unions Bank. This
                  feature lets you spread the cost of anything into 4
                  installments at 0% interest.
                </p>
                <p>
                  <VBtn
                    color="primary"
                    class="white--text text-capitalize font-weight-medium"
                    depressed
                    to="/register"
                    large
                    >Create An Account With F.M.B
                  </VBtn>
                </p>
              </VCol>
            </v-row>
          </VCard>
        </VCol>
      </v-row>
    </main>

    <!-- landing 5 -->
    <main data-aos="fade-up" data-aos-delay="300">
      <vContainer fluid>
        <vContainer fluid>
          <v-row class="mx-0 px-0">
            <VCol cols="12" md="6">
              <p class="text-h5 text-md-h3 font-weight-bold accent--text">
                Save
              </p>
              <p class="text-h6 text-md-h5 text1--text font-weight-regular">
                Earn up to 15.5% interest on your savings. That’s on a 12-month
                fixed Cash vault savings plan with a $50,000 minimum deposit to
                open. (Fixed means the money will be locked away for 12 months
                while you earn interest on it)
              </p>
              <p>
                <VBtn
                  color="primary"
                  class="white--text text-capitalize font-weight-medium"
                  depressed
                  large
                  to="/personal-savings"
                  >More about saving with F.M.B
                </VBtn>
              </p>
            </VCol>
            <VCol cols="12" md="6" class="d-flex justify-center align-center">
              <div>
                <v-img
                  src="/images/save.jpg"
                  contain
                  width="300"
                  style="border-radius: 12px; box-shadow: 5px 5px 0 0 #ff0475"
                >
                </v-img>
              </div>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main
      class="darkpurple my-5 py-4 d-flex align-center"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <v-row class="mx-0 px-0" justify="center" align="center">
        <VCol cols="12" md="6" class="ma-0 pa-0">
          <!-- <div>
            <v-img
              src="/images/save.jpg"
              contain
              width="300"
              style="border-radius: 12px; box-shadow: 5px 5px 0 0 #ff0475"
            >
            </v-img>
          </div> -->
        </VCol>
        <VCol cols="12" md="6">
          <p class="text-h5 text-md-h3 font-weight-bold primary--text">Spend</p>
          <p class="text-h6 text-md-h5 white--text font-weight-regular">
            Our Virtual Card is much more than its good looks. Make online or
            offline payments with ease, get instant payment notifications,
            manage card security in app and also enjoy the benefits of spreading
            payments and earning monthly cashback
          </p>
          <p>
            <VBtn
              color="primary"
              class="white--text text-capitalize font-weight-medium"
              depressed
              large
              to="/register"
            >
              Create A Virtual Card
            </VBtn>
          </p>
        </VCol>
      </v-row>
    </main>

    <!-- landing 6 -->
    <main class="my-14" data-aos="fade-up" data-aos-delay="300">
      <v-row justify="center" class="mx-0 px-0">
        <VCol cols="11">
          <VCard flat class="pa-5" color="rgba(78,241,224,.1)" rounded="xl">
            <v-row class="mx-0 px-0 flex-md-row-reverse" justify="center">
              <VCol cols="12" md="6">
                <p class="text-h5 text-md-h3 font-weight-bold accent--text">
                  We’re here to help you
                </p>
                <p class="text-h6 text-md-h5 text1--text font-weight-regular">
                  You can email us on the app, slide into our DMs. However you
                  choose to reach out, there’ll always be a friendly person
                  there to make your life easy. Get to know our information’s
                  center in case of emergencies.
                </p>
                <p>
                  <VBtn
                    color="primary"
                    class="white--text text-capitalize font-weight-medium"
                    depressed
                    large
                    to="/contact"
                    >Head to our help center
                  </VBtn>
                </p>
              </VCol>
              <VCol
                cols="12"
                md="6"
                class="my-0 py-0 d-flex justify-center align-center"
              >
                <div
                  :style="`margin-top: ${
                    $vuetify.breakpoint.mdAndDown ? '' : '-200px'
                  } `"
                >
                  <v-img
                    src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea4038f3f44f9bee6621_telephone%2024%3A7-p-500.webp"
                    contain
                    width="290"
                  >
                  </v-img>
                </div>
              </VCol>
            </v-row>
          </VCard>
        </VCol>
      </v-row>
    </main>

    <!-- landing 7 -->
    <main class="lightpurple my-5">
      <vContainer fluid>
        <vContainer fluid>
          <v-row class="mx-0 px-0" justify="center">
            <VCol cols="12">
              <p class="text-h5 text-md-h3 font-weight-bold accent--text">
                Our happy clients
              </p>
              <p class="text-h6 text-md-h5 text1--text font-weight-regular">
                What they say about us.
              </p>
            </VCol>
            <VCol cols="12" md="9">
              <v-row class="mx-0 px-0" justify="center">
                <VCol cols="12">
                  <VCard class="transparent" flat rounded="xl">
                    <v-carousel
                      cycle
                      :height="$vuetify.breakpoint.mdAndDown ? '490' : '230'"
                      show-arrows-on-hover
                      hide-delimiters
                    >
                      <v-carousel-item
                        v-for="(testimonial, i) in testimonials"
                        :key="i"
                      >
                        <v-sheet height="30%">
                          <VCard flat color="white" class="pa-3" rounded="xl">
                            <v-row class="mx-0 px-0 justify-center">
                              <VCol cols="12" md="2" class="text-center mx-auto"
                                ><VIcon size="90" color="grey lighten-3"
                                  >mdi-format-quote-close
                                </VIcon></VCol
                              >
                              <VCol cols="12" md="1">
                                <VDivider
                                  :vertical="
                                    $vuetify.breakpoint.mdAndDown ? false : true
                                  "
                                />
                              </VCol>
                              <VCol cols="12" md="9">
                                {{ testimonial.text }}
                              </VCol>
                            </v-row>
                          </VCard>
                          <div
                            class="mx-auto text-center d-flex justify-center my-4"
                          >
                            <div class="text-center mx-auto">
                              <v-img
                                :src="testimonial.pic"
                                contain
                                style="border-radius: 100%"
                                width="50"
                              ></v-img>
                            </div>
                          </div>
                          <p class="accent-text text-center mx-auto ma-0 pa-0">
                            {{ testimonial.name }}
                          </p>
                        </v-sheet>
                      </v-carousel-item>
                    </v-carousel>
                  </VCard>
                </VCol>
              </v-row>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <!-- landing 7 -->
    <main style="margin: 7em 0" data-aos="fade-right" data-aos-delay="300">
      <v-row class="mx-0 px-0">
        <VCol cols="12" md="3" class="my-0 py-0">
          <vContainer fluid>
            <vContainer fluid>
              <p
                class="text-h5 text-center mx-auto text-md-h3 font-weight-bold accent--text mb-0 pb-0"
              >
                Explore Features
              </p>
            </vContainer>
          </vContainer>
        </VCol>
        <VCol cols="12" md="9" class="mx-0 px-0">
          <div style="overflow: hidden">
            <div
              class="mx-0 px-0 d-flex scrolls"
              style="overflow-x: scroll; overflow-y: hidden; width: 100%"
            >
              <VCol
                cols="9"
                md="4"
                v-for="feature in cardFeatures"
                :key="feature.text"
                class="scrolling"
                ref="moves"
              >
                <VCard
                  :color="feature.color"
                  flat
                  min-height="300px"
                  min-width="250px"
                  rounded="xl"
                  class="pa-5 white--text font-weight-medium"
                  style="position: relative; overflow: hidden"
                >
                  {{ feature.text }}
                  <v-img
                    contain
                    width="200"
                    :src="feature.pic"
                    style="top: 230px; right: 10px; position: absolute"
                  ></v-img>
                </VCard>
              </VCol>
            </div>
            <VCol cols="12" class="d-flex justify-center">
              <div class="d-flex justify-center" style="gap: 5px">
                <!-- <VBtn small color="accent" fab icon outlined @click="translate2"
                  ><VIcon>mdi-chevron-left</VIcon></VBtn
                > -->
                <VBtn small color="accent" fab icon outlined @click="translate"
                  ><VIcon>mdi-chevron-right</VIcon></VBtn
                >
              </div>
            </VCol>
          </div>
        </VCol>
      </v-row>
    </main>

    <main class="mt-4 pa-7 pa-md-13 lightpinkish2">
      <VCol cols="12">
        <div class="text-center mx-auto">
          <VIcon large v-for="star in 5" :key="star" color="yellow darken-2"
            >mdi-star</VIcon
          >
        </div>
        <div class="text-h5 my-3 text-md-h3 font-weight-bold text-center">
          Join over 30 <span class="lineartext2">million</span> people who are
          changing the way they bank
        </div>

        <div class="mx-auto text-center mt-6">
          <VBtn large depressed color="primary text-capitalize" to="/register"
            >Get Started</VBtn
          >
        </div>
      </VCol>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      slidenum: 100,
    }
  },
  computed: {
    floatInfo() {
      return [
        {
          icon: 'mdi-send-outline',
          color: 'secondary',
          text: 'Fast transfers',
        },
        {
          icon: 'mdi-chart-box-outline',
          color: 'tealish',
          text: 'Free credit report',
        },
        {
          icon: 'mdi-checkbox-marked-circle-plus-outline',
          color: 'primary',
          text: 'Monthly interest payout on your account',
        },
      ]
    },
    testimonials() {
      return [
        {
          name: 'Michael Patel',
          pic: '/images/pic1.jpeg',
          text: `I was skeptical at first, but Flexi Unions Bank exceeded my expectations. The virtual card and secure transactions give me peace of mind. It's become an indispensable tool in my daily life.`,
        },
        {
          name: 'Alex Turner',
          pic: '/images/pic2.jpeg',
          text: `I've tried various financial platforms, but Flexi Unions Bank is on another level. From budgeting tools to real-time expense tracking, it's the all-in-one solution I've been searching for. Managing my money has never been this easy!`,
        },
        {
          name: 'Sophie Lewis',
          pic: '/images/pic3.jpg',
          text: `I've tried a few expense-tracking apps, but Flexi Unions Bank stands out. Its ability to categorize expenses automatically and generate insightful reports saves me so much time. I'm in control of my finances like never before!`,
        },
        {
          name: 'Grace Kim',
          pic: '/images/pic4.jpeg',
          text: `As a busy professional, Flexi Unions Bank's is a game-changer. I can manage my finances on the go, and the real-time notifications keep me updated. It's reliable and efficient – exactly what I need in a financial app.`,
        },
        {
          name: 'Ryan Foster',
          pic: '/images/pic5.jpg',
          text: `Flexi Unions Bank has made budgeting a breeze. The automatic categorization and visual representation of my spending make it easy to stay on top of my financial goals. Truly a user-friendly financial companion!`,
        },
      ]
    },
    cardFeatures() {
      return [
        {
          color: 'accent',
          text: 'Visa debit card with 1% cashback',
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea3d1748c96cb4455e9d_card.webp',
        },
        {
          color: 'primary',
          text: 'World bank liscensed current account',
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea3f48fc7bd5a5858c7e_lock-p-500.webp',
        },
        {
          color: 'secondary',
          text: 'Enjoy fast transfer',
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea3d9b6df48e56625d60_cash-p-500.webp',
        },
        {
          color: 'primary',
          text: 'Spread any payment at 0% interest',
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea407c0134d9ca25a30c_shop.webp',
        },
      ]
    },
  },
  methods: {
    translate() {
      const slide = this.$refs.moves
      // slide.style.transform = `translateX(${-10}%)`

      slide.forEach((slid) => {
        slid.style.transform = `translateX(${-this.slidenum}%)`
      })

      this.slidenum = this.slidenum + 100
      if (this.slidenum == 500) {
        slide.forEach((slid) => {
          slid.style.transform = `translateX(${0}%)`
        })
        this.slidenum = 100
      }
      console.log(this.slidenum)
    },
    translate2() {
      const slide = this.$refs.moves

      this.slidenum = 600

      slide.forEach((slid) => {
        slid.style.transform = `translateX(${-this.slidenum - 100}%)`
      })
      console.log(this.slidenum)
    },
  },
}
</script>

<style>
.shadowfloat {
  box-shadow: 0 5px 11px -7px rgba(180, 140, 252, 0.3),
    0 7px 20px -6px rgba(255, 4, 117, 0.3) !important;
}
.darkpurple {
  background-image: url(https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645b6e58c096d9cb8a59774c_spend.webp);
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #3b227b;
  height: 70vh;
}
.lightpurple {
  background-color: rgba(180, 140, 252, 0.1);
}

.scrolls::-webkit-scrollbar {
  width: 3px;
  height: 0%;
}
.scrolls::-webkit-scrollbar-track {
  background-color: rgba(180, 140, 252, 0.1);
  border-radius: 20px;
}
.scrolls::-webkit-scrollbar-thumb {
  background: rgba(180, 140, 252, 0.1);
  border-radius: 20px;
}
.scrolls::-webkit-scrollbar-corner {
  border-radius: 12px;
  background: rgba(180, 140, 252, 0.1);
}
.scrolls {
  transition: all 1s;
}
.scrolling {
  transition: all 1s;
}
</style>
