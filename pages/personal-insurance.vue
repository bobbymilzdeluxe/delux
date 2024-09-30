<template>
  <div>
    <!-- <p>{{ textGen }}</p> -->
    <main class="accent py-7 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            :width="500"
            :absolute="true"
            Dpic="https://e1.pxfuel.com/desktop-wallpaper/184/176/desktop-wallpaper-life-insurance-insurance.jpg"
            absolute1="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6454ea41292dc349aa980002_handdrawn%20green%20arrow.webp"
            absolute2="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64629c0e166d88430f10aac7_Circle%20-%2003.webp"
          >
            <template slot="title">
              Personal <span class="lineartext">Insurance</span>
            </template>
            <template #text>
              Choose from a range of extra options that gives you the choice and
              flexibility to build the right level of cover to protect your
              home, possessions and lifestyle.
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="py-7 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://e0.pxfuel.com/wallpapers/320/558/desktop-wallpaper-a-s-k-insurance-danville-sunbury-and-lewisburg-professional-liability-insurance.jpg"
            :width="500"
          >
            <template slot="title">
              <span class="accent--text"> Technology and Entertainment </span>
            </template>
            <template #text>
              <span class="grey--text">
                Electrical items like TVs, cameras and computers are covered
                against accidental damage and loss, both inside and outside your
                home. Accidental Damage - You can add accidental damage cover to
                your core cover. And because this doesn't include items covered
                by other packages you won't pay to insure the same things twice.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="aquaColor py-7 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://e0.pxfuel.com/wallpapers/769/439/desktop-wallpaper-hyperledger-powered-healthcare-solutions-in-action-hyperledger-medical-insurance.jpg"
            :revers="true"
            :width="500"
          >
            <template slot="title">
              <span class="accent--text"> Home Emergency </span>
            </template>
            <template #text>
              <span class="grey--text">
                Home Emergency assistance, help and advice which includes cover
                for loss of heating, emergency roof repairs and securing broken
                windows or doors. Legal Expenses - Access to a wide range of
                legal solutions, including professional mediation and consumer
                protection. *Optional cover not available if you purchase core
                buildings only
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>

    <main class="py-7 py-md-16">
      <vContainer>
        <vContainer>
          <loans-sec-1
            Dpic="https://e0.pxfuel.com/wallpapers/465/865/desktop-wallpaper-life-insurance-medical-insurance.jpg"
            :width="500"
          >
            <template slot="title">
              <span class="accent--text"> Insured with us </span>
            </template>
            <template #text>
              <span class="grey--text">
                If you’re using personal insurance for the first time, we’ve got
                you.
              </span>
            </template>
          </loans-sec-1>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    window.scrollTo(0, 0)
  },
  head: {
    titleTemplate: 'Personal Insurance - Deluxe Integrity Bank',
  },
  computed: {
    textGen() {
      let text = 'I am a text trying to write'
      let write = ''
      let num = 0
      setInterval(() => {
        write += text[num++]
        // this.$refs.p.innerHTML = write
        if (write.length == text.length) {
          num = 0
          write = ''
        }
        console.log(write)
        return write
      }, 400)
    },
  },
}
</script>

<style></style>
