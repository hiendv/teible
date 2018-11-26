<template>
  <div id="app">
    <section class="hero">
      <h1 class="hero__title">Vue Teible Example</h1>
      <h3 class="hero__subtitle">Example for <a class="hero__link" href="https://github.com/hiendv/teible/tree/master/packages/vue-teible" title="vue-teible">vue-teible</a></h3>
      <p style="text-align: center;"><iframe
        src="https://ghbtns.com/github-btn.html?user=hiendv&repo=teible&type=star&count=true&size=large&v=2" frameborder="0" scrolling="0"
        width="115px" height="30px" /></p>
    </section>
    <main>
      <div class="demos">
        <demo :items="itemsFunc" class="demo">
          <h2 class="demo__title">Function as items</h2>
          <p class="demo__subtitle">Searching fields will be ignored because <a href="https://jsonplaceholder.typicode.com/" title="typicode">typicode</a> does not support them.</p>
        </demo>
        <div class="demo demo__gut" />
        <demo :items="itemsArr" class="demo">
          <h2 class="demo__title">Array as items</h2>
          <p class="demo__subtitle">Searching using `indexOf` with queries in lowercase.</p>
        </demo>
      </div>
    </main>
  </div>
</template>
<style lang="css" src="vue-teible/dist/vueteible.css"></style>
<style lang="scss">
html, body, div, span, object, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

html {
  color: #414a51;
  font-weight: 400;
  font-size: 15px;
  font-family: "proxima-nova", "Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero {
  padding: 40px 0;
  position: relative;
  overflow: hidden;
  background: #222;
  color: #fff;
}

.hero__title {
  margin: 30px auto 0 auto;
  font-size: 32px;
  font-weight: 200;
  line-height: 60px;
  text-align: center;
  max-width: 830px;
}

.hero__subtitle {
  margin: 0 auto 20px;
  font-size: 18px;
  font-weight: 200;
  line-height: 1.5em;
  text-align: center;
  color: #a7a7a7;
}

.hero__link {
  color: #dcdcdc;
}

main {
  padding: 1rem;
}

.demos {
  width: 100%;
}

.demo {
  @media (min-width: 768px) {
    display: table-cell;
  }
}

.demo__title {
  margin: 20px 0 0 0;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.7em;
}

.demo__subtitle {
  margin-bottom: 10px;
}

.demo__gut {
  width: 6%;
}
</style>
<script>
import Haikunator from 'haikunator'
import axios from 'axios'
import Demo from './Demo.vue'

let haikunator = new Haikunator()

export default {
  components: { Demo },
  data () {
    return {
      itemsArr: [],
      total: 100
    }
  },
  mounted () {
    this.seed()
  },
  methods: {
    seed () {
      for (let i = 0; i < this.total; i++) {
        this.itemsArr.push({
          id: i,
          name: haikunator.haikunate()
        })
      }
    },
    itemsFunc (filtering, sorting, paging) {
      // filtering fields will be ignored because typicode does not support them: https://github.com/typicode/json-server/pull/558
      // this, sometimes, makes the result seem weird
      let url = `https://jsonplaceholder.typicode.com/users?q=${filtering.query}&_sort=${sorting.by}&_order=${sorting.order}&_page=${paging.page}&_limit=${paging.perPage}`

      return axios.get(url).then(response => {
        let total = parseInt(response.headers['x-total-count']) || 0
        return {
          total,
          items: response.data
        }
      })
    }
  }
}
</script>
