<template>
  <div id="app">
    <section class="hero">
      <h1 class="hero__title">Vue Teible Example</h1>
      <h3 class="hero__subtitle">Example for <a class="hero__link" href="https://github.com/hiendv/teible/tree/master/packages/vue-teible" title="vue-teible">vue-teible</a></h3>
      <p style="text-align: center;"><iframe
        src="https://ghbtns.com/github-btn.html?user=hiendv&repo=teible&type=star&count=true&size=large&v=2" frameborder="0" scrolling="0"
        width="115px" height="30px"/></p>
    </section>
    <main>
      <div class="demos">
        <demo :items="itemsFunc" class="demo">
          <h2 class="demo__title">Function as items</h2>
          <p class="demo__subtitle">Searching fields will be ignored because <a href="https://jsonplaceholder.typicode.com/" title="typicode">typicode</a> does not support them.</p>
        </demo>
        <div class="demo demo__gut"/>
        <demo :items="itemsArr" class="demo">
          <h2 class="demo__title">Array as items</h2>
          <p class="demo__subtitle">Searching using `indexOf` with queries in lowercase.</p>
        </demo>
      </div>
    </main>
  </div>
</template>
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
import Demo from './Demo.vue'
export default {
  components: { Demo },
  data () {
    return {
      itemsArr: JSON.parse('[ { "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } }, { "id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": { "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771", "geo": { "lat": "-43.9509", "lng": "-34.4618" } }, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": { "name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency", "bs": "synergize scalable supply-chains" } }, { "id": 3, "name": "Clementine Bauch", "username": "Samantha", "email": "Nathan@yesenia.net", "address": { "street": "Douglas Extension", "suite": "Suite 847", "city": "McKenziehaven", "zipcode": "59590-4157", "geo": { "lat": "-68.6102", "lng": "-47.0653" } }, "phone": "1-463-123-4447", "website": "ramiro.info", "company": { "name": "Romaguera-Jacobson", "catchPhrase": "Face to face bifurcated interface", "bs": "e-enable strategic applications" } }, { "id": 4, "name": "Patricia Lebsack", "username": "Karianne", "email": "Julianne.OConner@kory.org", "address": { "street": "Hoeger Mall", "suite": "Apt. 692", "city": "South Elvis", "zipcode": "53919-4257", "geo": { "lat": "29.4572", "lng": "-164.2990" } }, "phone": "493-170-9623 x156", "website": "kale.biz", "company": { "name": "Robel-Corkery", "catchPhrase": "Multi-tiered zero tolerance productivity", "bs": "transition cutting-edge web services" } }, { "id": 5, "name": "Chelsey Dietrich", "username": "Kamren", "email": "Lucio_Hettinger@annie.ca", "address": { "street": "Skiles Walks", "suite": "Suite 351", "city": "Roscoeview", "zipcode": "33263", "geo": { "lat": "-31.8129", "lng": "62.5342" } }, "phone": "(254)954-1289", "website": "demarco.info", "company": { "name": "Keebler LLC", "catchPhrase": "User-centric fault-tolerant solution", "bs": "revolutionize end-to-end systems" } }, { "id": 6, "name": "Mrs. Dennis Schulist", "username": "Leopoldo_Corkery", "email": "Karley_Dach@jasper.info", "address": { "street": "Norberto Crossing", "suite": "Apt. 950", "city": "South Christy", "zipcode": "23505-1337", "geo": { "lat": "-71.4197", "lng": "71.7478" } }, "phone": "1-477-935-8478 x6430", "website": "ola.org", "company": { "name": "Considine-Lockman", "catchPhrase": "Synchronised bottom-line interface", "bs": "e-enable innovative applications" } }, { "id": 7, "name": "Kurtis Weissnat", "username": "Elwyn.Skiles", "email": "Telly.Hoeger@billy.biz", "address": { "street": "Rex Trail", "suite": "Suite 280", "city": "Howemouth", "zipcode": "58804-1099", "geo": { "lat": "24.8918", "lng": "21.8984" } }, "phone": "210.067.6132", "website": "elvis.io", "company": { "name": "Johns Group", "catchPhrase": "Configurable multimedia task-force", "bs": "generate enterprise e-tailers" } }, { "id": 8, "name": "Nicholas Runolfsdottir V", "username": "Maxime_Nienow", "email": "Sherwood@rosamond.me", "address": { "street": "Ellsworth Summit", "suite": "Suite 729", "city": "Aliyaview", "zipcode": "45169", "geo": { "lat": "-14.3990", "lng": "-120.7677" } }, "phone": "586.493.6943 x140", "website": "jacynthe.com", "company": { "name": "Abernathy Group", "catchPhrase": "Implemented secondary concept", "bs": "e-enable extensible e-tailers" } }, { "id": 9, "name": "Glenna Reichert", "username": "Delphine", "email": "Chaim_McDermott@dana.io", "address": { "street": "Dayna Park", "suite": "Suite 449", "city": "Bartholomebury", "zipcode": "76495-3109", "geo": { "lat": "24.6463", "lng": "-168.8889" } }, "phone": "(775)976-6794 x41206", "website": "conrad.com", "company": { "name": "Yost and Sons", "catchPhrase": "Switchable contextually-based project", "bs": "aggregate real-time technologies" } }, { "id": 10, "name": "Clementina DuBuque", "username": "Moriah.Stanton", "email": "Rey.Padberg@karina.biz", "address": { "street": "Kattie Turnpike", "suite": "Suite 198", "city": "Lebsackbury", "zipcode": "31428-2261", "geo": { "lat": "-38.2386", "lng": "57.2232" } }, "phone": "024-648-3804", "website": "ambrose.net", "company": { "name": "Hoeger LLC", "catchPhrase": "Centralized empowering task-force", "bs": "target end-to-end models" } } ]')
    }
  },
  methods: {
    async itemsFunc (filtering, sorting, paging) {
      let total = 0
      let url = new URL('https://jsonplaceholder.typicode.com/users')

      // filtering fields will be ignored because typicode does not support them: https://github.com/typicode/json-server/pull/558
      // this, sometimes, makes the result seem weird
      url.searchParams.append('q', filtering.query)

      url.searchParams.append('_sort', sorting.by)
      url.searchParams.append('_order', sorting.order)

      url.searchParams.append('_page', paging.page)
      url.searchParams.append('_limit', paging.perPage)

      const items = await fetch(url).then(response => {
        total = parseInt(response.headers.get('x-total-count'))
        return response.json()
      })

      return {
        total,
        items
      }
    }
  }
}
</script>
