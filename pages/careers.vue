<template>
  <div>
    <main
      class="accent d-flex align-center justify-center carb"
      style="height: 100vh; position: relative; overflow: hidden"
    >
      <div>
        <vContainer>
          <vContainer>
            <p
              class="white--text font-weight-bold text-h4 text-md-h2 text-center text-capitalize"
            >
              We are creating access to the most basic financial services
            </p>
            <p
              class="white--text text-center font-weight-mediim text-subtitle-1 text-md-h6"
            >
              Join our team and help build Africa’s best banking platform. Grow
              with us and get more from your career
            </p>
            <div class="mx-auto text-center mt-7 mt-md-12">
              <VBtn color="primary" large depressed>Explore open roles</VBtn>
            </div>
          </vContainer>
        </vContainer>
      </div>

      <v-img
        style="position: absolute; top: 30px; left: 30px"
        src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629eb7ab987dc62b857075_Spline%20-%2002.webp"
        contain
        width="130"
        data-aos="fade-up"
        data-aos-duration="960"
      >
      </v-img>
      <v-img
        style="position: absolute; bottom: 55px; right: 90px"
        src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629c0e166d88430f10aac7_Circle%20-%2003.webp"
        contain
        width="30"
      >
      </v-img>
    </main>

    <main
      class="lightpinkish"
      :style="`padding: ${$vuetify.breakpoint.mdAndDown ? '2em' : '9em'} `"
    >
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0">
            <VCol cols="12" data-aos="fade-up">
              <p
                class="accent--text text-center text-h5 text-md-h3 font-weight-bold"
              >
                Why Deluxe Integrity Bank?
              </p>
              <p
                class="grey--text text-center text-subtitle-2 text-md-subtitle-1 text--darken-2"
              >
                We empower individuals with credit, simple payments solutions,
                high-yield investment opportunities, and easy-to-use tools for
                personal financial management.
              </p>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main class="wavy my-5 my-md-10">
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0">
            <VCol cols="12" md="4" style="position: relative">
              <p class="accent--text text-h5 text-md-h3 font-weight-bold">
                Our core values
              </p>
              <p
                class="grey--text text-subtitle-2 text-md-subtitle-1 text--darken-2"
              >
                Our cultural philosophy consists or 6 guiding principles known
                collectively as CREDIT
              </p>
              <v-img
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628eda78cdd719e2157067_sparkle.webp"
                style="position: absolute"
              ></v-img>
              <v-img
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628eda78cdd719e2157067_sparkle.webp"
                style="position: absolute; bottom: 30px; left: 30px"
                width="20"
                class="d-none d-md-block"
              ></v-img>
              <v-img
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628eda78cdd719e2157067_sparkle.webp"
                style="position: absolute; top: 50%; left: 170px"
                width="20"
                class="d-none d-md-block"
              ></v-img>
            </VCol>
            <VCol cols="12" md="8">
              <v-row class="mx-0 px-0">
                <VCol cols="12" md="6" v-for="val in values" :key="val.text">
                  <VCard
                    flat
                    rounded="xl"
                    :color="val.color"
                    :min-height="
                      $vuetify.breakpoint.mdAndDown ? '300px' : '400px'
                    "
                    class="py-5 py-md-8 px-3 px-md-5"
                  >
                    <VCardTitle>
                      <v-img
                        max-width="50px"
                        :src="val.pic"
                        height="50"
                        style="border-radius: 50%"
                      ></v-img>
                    </VCardTitle>
                    <VCardText
                      class="font-weight-bold accent--text text-subtitle-2 text-md-h6"
                    >
                      {{ val.title }}
                    </VCardText>
                    <VCardText class="grey--text text-body-2 text-md-body-1">
                      {{ val.text }}
                    </VCardText>
                  </VCard>
                </VCol>
              </v-row>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main class="d-flex justify-center" style="overflow: hidden">
      <div>
        <vContainer>
          <vContainer style="position: relative">
            <VCard
              flat
              rounded="xl"
              class="d-flex"
              style="overflow: hidden; gap: 19px"
            >
              <div
                v-for="image in images"
                :key="image.pic"
                ref="image"
                class="scrolling"
              >
                <v-img
                  style="border-radius: 23px"
                  :src="image.pic"
                  :height="$vuetify.breakpoint.mdAndDown ? '260' : '400'"
                  :width="$vuetify.breakpoint.mdAndDown ? '360' : '800'"
                >
                </v-img>
              </div>
            </VCard>
            <div
              class="d-flex justify-center"
              style="gap: 12px; position: absolute; bottom: 30px; right: 50%"
            >
              <VBtn
                color="black"
                @click="translate1"
                fab
                :class="slidenum == 1 ? 'purple' : 'white'"
                icon
                x-small
              ></VBtn>
              <VBtn
                color="black"
                @click="translate2"
                fab
                :class="slidenum == 2 ? 'purple' : 'white'"
                icon
                x-small
              ></VBtn>
              <VBtn
                color="black"
                @click="translate3"
                fab
                class="white d-none d-md-block"
                :class="slidenum == 3 ? 'purple' : 'white'"
                icon
                x-small
              ></VBtn>
            </div>
          </vContainer>
        </vContainer>
      </div>
    </main>

    <main class="wavy2">
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0" justify="center">
            <VCol cols="12" data-aos="fade-up">
              <p class="accent--text text-h5 text-md-h3 font-weight-bold">
                Perks and benefits
              </p>
              <p
                class="grey--text text-subtitle-2 text-md-subtitle-1 text--darken-2"
              >
                We believe in prioritizing our people and their well-being.
                That's why we offer a wide range of competitive perks and
                benefits, including:
              </p>
            </VCol>

            <VCol cols="12" md="6" v-for="perk in perks" :key="perk.title">
              <VCard
                style="box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px"
                rounded="xl"
                min-height="400px"
                color="white"
              >
                <VCardTitle primary-title>
                  {{ perk.title }}
                </VCardTitle>
                <VCardText
                  class="d-flex"
                  v-for="text in perk.arrText"
                  :key="text.text"
                >
                  <div>
                    <VIcon color="grey" small>mdi-square-small</VIcon>
                  </div>
                  <div class="grey--text text-body-2 text-md-body-1">
                    {{ text.text }}
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <VCol cols="12">
            <p
              class="accent--text text-center text-h5 text-md-h3 font-weight-bold"
            >
              What our team say about Deluxe Integrity Bank
            </p>
          </VCol>
          <VCol cols="12">
            <VCard
              color="accent"
              rounded="xl"
              class="pa-5 pa-md-10"
              style="
                position: relative;
                overflow: hidden;
                border: 1px solid red;
              "
            >
              <v-img
                style="position: absolute; top: 0; right: 0; margin-top: -30px"
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465fb03dcb0a00eb03da501_Circle%20-%2003%20(1).webp"
                width="170"
              ></v-img>
              <v-img
                style="position: absolute; top: 0; left: 109px"
                src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628ed9ba6705db8e36cd68_sparkle-1.webp"
                width="30"
              ></v-img>
              <v-row class="mx-0 px-0" align="center">
                <VCol cols="12" md="4">
                  <v-img
                    style="border-radius: 20px"
                    src="/skills.jpg"
                    width="500"
                  ></v-img>
                </VCol>
                <VCol cols="12" md="8">
                  <p
                    class="secondary--text text--darken-2 font-weight-medium text-subtitle-2 text-md-subtitle-1"
                  >
                    “Deluxe Integrity Bank has provided me with ample
                    opportunities to learn and develop my skills. The leadership
                    team is passionate about employee growth and offers
                    continuous training. I love being surrounded by talented
                    humans at Deluxe Integrity Bank who inspire me to reach new
                    heights.”
                  </p>
                  <p
                    class="white--text font-weight-medium text-subtitle-2 text-md-subtitle-1"
                  >
                    <span class="font-weight-bold">Kate Justina</span>
                    - Digital Content Developer
                  </p>
                </VCol>
              </v-row>
            </VCard>
          </VCol>
        </vContainer>
      </vContainer>
      <div
        style="width: 60px; height: 7px; border-radius: 20px"
        class="accent mx-auto my-5 my-md-12"
      ></div>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-4>
            <template #text> Ready to break boundaries with us? </template>
            <template #btn> Register With Us </template>
          </loans-sec-4>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
import loansSec4 from '~/components/loansComps/loansSec4.vue'
export default {
  components: { loansSec4 },
  created() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      slidenum: 100,
    }
  },
  computed: {
    perks() {
      return [
        {
          title: 'Total Rewards 💸',
          arrText: [
            {
              text: 'Your salary is reviewed annually and increased proactively based on growing responsibilities.',
            },
            {
              text: ' We also automatically enroll you in our pension scheme with your preferred provider.',
            },
            {
              text: 'Performance bonuses to let you know we appreciate your hard work and results',
            },
            {
              text: 'Employee Loan and EarlyPay: You also have access to employee loans at 2% monthly and can request part of your salary from the 15th - the 25th of the month.',
            },
          ],
        },
        {
          title: 'Flexible working hours 📆',
          arrText: [
            {
              text: `We encourage collaboration and offer hybrid work options. You're trusted to work enough hours to complete your job well, at times that suit you and your team.`,
            },
          ],
        },
        {
          title: 'Generous holiday allowance 🌴',
          arrText: [
            {
              text: `Enjoy not less than 17 paid holidays per year to rest or take that vacation plus public holidays`,
            },
          ],
        },
        {
          title: 'Health and Wellness support ⛑️',
          arrText: [
            {
              text: `We care about your physical and mental health, which is why we offer paid sick leave and health insurance via a HMO of our choice and Mental Health Support (therapy on us).`,
            },
            {
              text: 'Our Employee Assistance Programme offers confidential advice and support for health, legal, and bereavement issues.',
            },
            {
              text: 'Plus, we provide fresh fruit, tea, coffee and soft drinks in the office.',
            },
          ],
        },
        {
          title: 'Learning and Development 📚',
          arrText: [
            {
              text: 'We believe in continuous learning and growth, which is why we organize regular knowledge-sharing sessions (lunch and learn) and provide a quarterly learning budget for training courses and conferences.',
            },
            {
              text: 'On-the-job training',
            },
          ],
        },
        {
          title: 'Family-friendly policies 💜',
          arrText: [
            {
              text: `We offer paid maternity and paternity if you've been with us for at least 6 months.`,
            },
          ],
        },
        {
          title: 'Strong community spirit 👥',
          arrText: [
            {
              text: `We provide monthly budgets for teams and managers to use for team activities, as well as free company merch yearly`,
            },
            {
              text: `You'll also get to enjoy regular socials like TGIF, with fun activities such as Sip and Paint, games night  and an annual company-wide party.`,
            },
            {
              text: `Plus, hot lunches twice a month on us.`,
            },
            {
              text: `Random gifts to say thanks when we reach company milestones & celebrations`,
            },
          ],
        },
        {
          title: 'An open approach ✌️',
          arrText: [
            {
              text: `We really care about transparency. We communicate and collaborate through Slack.`,
            },
          ],
        },
        {
          title: 'Great tech 💻',
          arrText: [
            {
              text: `The latest tech, tools and equipment to help you get work done, either at home or at the office`,
            },
            {
              text: `We work on MacBooks, Mac minis, Chromebooks, and you’ll receive anything else you might need on request.`,
            },
          ],
        },
      ]
    },
    values() {
      return [
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736677_rating.svg',
          title: 'Customer first',
          text: 'The customer is our top priority and we are committed to providing the best service to all - both internal and external customers.',
          color: '#eaf6fc',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736676_stopwatch.svg',
          title: 'Rapid response',
          text: 'At Deluxe Integrity Bank, we understand timely information is valuable, which is why we are committed to giving quick and appropriate responses to enquiries. We also take responsibility for each of our actions.',
          color: '#ffe9f2',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736675_equality.svg',
          title: 'Equity',
          text: 'We believe in fair play. This means everyone is treated with justice. Moreover, we aim to ensure our processes are characterised by transparency.',
          color: '#ecf9ed',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736677_rating.svg',
          title: 'Dignity',
          text: 'Respect of self and others is important to us. Including respects for the environment ; people’s privacy, physical space, belongings, perspectives, philosophies, religion, gender, ethnicity physical ability and personality.',
          color: '#f6efff',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736679_idea.svg',
          title: 'Innovation',
          text: 'We strive to continuously improve our minds, viewpoints, products and services to not only meet the changing needs of our clients, but to also impact our industry and society.',
          color: '#fef6eb',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465ec149ac983ebfa736674_space-ship.svg',
          title: 'Technology',
          text: 'Our use of technology is to help simplify all internal and external business processes, and enable us be easily accessible by anyone irrespective of distance and time of the day.',
          color: '#fff2ed',
        },
      ]
    },
    images() {
      return [
        {
          pic: 'https://www.datocms-assets.com/23428/1698405050-happy-office-workers.jpg?auto=compress',
        },
        {
          pic: 'https://t4.ftcdn.net/jpg/02/18/74/53/360_F_218745374_qEkxNtXcwVPSEQFyGwmaRb2k8atX0nog.jpg',
        },
        {
          pic: 'https://img.freepik.com/premium-photo/group-office-workers-are-successful-working-together-with-smile-their-laptop-having-city-buildings-background-glad-successful-with-office-worker-group_35150-2026.jpg',
        },
      ]
    },
  },
  methods: {
    translate1() {
      const slide = this.$refs.image

      slide.forEach((slid) => {
        slid.style.transform = `translateX(${-0}%)`
      })

      this.slidenum = 1
    },
    translate2() {
      const slide = this.$refs.image

      slide.forEach((slid) => {
        slid.style.transform = `translateX(${-100}%)`
      })

      this.slidenum = 2
    },
    translate3() {
      const slide = this.$refs.image

      slide.forEach((slid) => {
        slid.style.transform = `translateX(${-200}%)`
      })

      this.slidenum = 3
    },
  },
  head: {
    titleTemplate: 'Careers - Deluxe Integrity Bank',
  },
}
</script>

<style>
.scrolling {
  transition: all 1s;
}
</style>
