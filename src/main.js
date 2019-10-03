import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

require("./assets/main.scss");

new Vue({
  render: h => h(App),
}).$mount('#app')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



// <figure is-fullwidth>
//   <img src="./assets/images/valleyachtergrond.jpg">
// </figure>

// <p class="title">
//   Auto reserveren
// </p>
// <form>
//   <label class="label">Datum</label>
//     <input class="input" type="date">
//   <label class="label">Begin tijd</label>
//     <input class="input" type="time">
//   <label class="label">Eind tijd</label>
//     <input class="input" type="time">
// </form>
//
// <button class="button is-primary">Reserveer</button>

// <div class="tile is-ancestor">
//     <div class="tile is-parent">
//       <div class="tile is-child box">
//
//       </div>
//   </div>
//
//   <div class="tile is-parent">
//     <div class="tile is-child box">
//       <p class="title">Two</p>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
//     </div>
//   </div>
//   <div class="tile is-parent">
//     <div class="tile is-child box">
//       <p class="title">Three</p>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
//       <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
//       <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
//     </div>
//   </div>
//
// </div>
