<template>
<div id="app">
  <!-- Navbar -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://www.thevalley.nl/">
        <img id="logonavbar" src="./assets/images/logo.svg" width="92" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hiddenvue="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="navbar-item">
              Home
            </a>
            <a class="navbar-item">
              Auto reserveren
            </a>
            <a class="navbar-item">
              Reserveringen
            </a>
          </div>
        </div>
      </div>
  </nav>

<!-- The 2 tiles -->
  <div class="homepicture">
    <div class="tile is-ancestor">
      <div class="tile is-8 is-vertical">
        <div class="tile">
          <!-- Reserveringen tile -->
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p class="title">Reserveringen</p>

              <div class="level reservering" v-for="(item, index) in items">
                <div class="level-left" v-on:click="e => onClickShowInfoReservation(item, index)">
                  <div class="level-item">
                    <p class="subtitle is-5"><span v-html="item.id"></span>: &ensp;</p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.startdate"></p>
                  </div>
                  <div class="level-item">
                    <p> - </p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.enddate"></p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5">| &ensp;<span v-html="item.startTime"></span></p>
                  </div>
                  <div class="level-item">
                    <p> - </p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.endTime"></p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <p class="subtitle is-5"><span v-html="reservationProgress[index]"></span>%</p>
                  </div>
                  <div class="level-item" v-on:click="e => onClickEditReservation(index)">
                    <i class="fas fa-edit"></i>
                  </div>
                  <div class="level-item" v-on:click="onDeleteReservation(item)">
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- Auto reserveren tile -->
            <div class="tile is-child box">
              <p class="title">
                Auto reserveren
              </p>
              <form class="formreservation">
                <label class="label">Begin datum</label>
                  <input class="input" type="date" v-model="startdate">
                <label class="label">Eind datum</label>
                  <input class="input" type="date" v-model="enddate">
                <label class="label">Begin tijd</label>
                  <input class="input" type="time" v-model="startTime">
                <label class="label">Eind tijd</label>
                  <input class="input" type="time" v-model="endTime">
              </form>

              <button class="button is-primary is-normal reserveer" :disabled="reservatebuttonIsDisabled" v-on:click="onClickReservateButton">Reserveer</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

<!-- Modal when you make a reservation -->
  <div class="modal js-modal" :class="{ 'is-active': activeModalId === 'modal-reservation' }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-family-secondary">Bevestiging reservering</p>
        <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
      </header>
      <section class="modal-card-body">
        <label class="label">Begin datum</label>
        <p class="subtitle is-5 dateinformation"></p>
        <label class="label">Eind datum</label>
        <p class="subtitle is-5 dateinformation2"></p>
        <label class="label">Begin tijd</label>
        <p class="subtitle is-5" v-html="startTime"></p>
        <label class="label">Eind tijd</label>
        <p class="subtitle is-5" v-html="endTime"></p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="onClickConfirmButton">Bevestigen</button>
        <button class="button is-text" v-on:click="onClickCloseModal">Annuleren</button>
      </footer>
    </div>
  </div>

<!-- Modal when you want to edit the reservation-->
  <div class="modal js-modaleditinformation" v-for="(item, index) in items" :class="{ 'is-active': activeModalId === 'modal-editinformation-' + index }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-family-secondary">Gegevens invoeren</p>
        <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="column is-vcentered boxinfo">
          <!-- <div class="column is-half inforeservation">
            <label class="label">Begin datum</label>
              <input class="input" type="date" v-model="startdateedit">
            <label class="label">Eind datum</label>
              <input class="input" type="date" v-model="enddateedit">
            <label class="label">Begin tijd</label>
              <input class="input" type="time" v-model="startTimeedit">
            <label class="label">Eind tijd</label>
              <input class="input" type="time" v-model="endTimeedit">
          </div> -->

          <div class="column is-half infodata">
            <label class="label">Kilometers begin</label>
            <input class="input" type="number" placeholder="10" v-model.number="item.kmstart">

            <label class="label">Kilometers eind</label>
            <input class="input" type="number" placeholder="20" v-model.number="item.kmend">

            <label class="label">Postcode vertrek</label>
            <input class="input" type="text" placeholder="1234 AB" v-model="item.zipcodedeparture">

            <label class="label">Postcode bestemming</label>
            <input class="input" type="text" placeholder="1234 AB" v-model="item.zipcodedestination">

            <label class="label">Omschrijving/klant</label>
            <textarea class="textarea" v-model="item.description"></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" :disabled="saveButtonIsDisabled[index]" v-on:click="onClickSaveButton">Opslaan</button>
        <button class="button is-text" v-on:click="onClickCloseModal">Annuleren</button>
      </footer>
    </div>
  </div>

<!-- When you click on the reservation to see the data -->
  <div class="modal js-modalinformation" v-for="(item, index) in items" :class="{ 'is-active': activeModalId === 'modal-information-' + index }">
    <div class="modal-background"></div>
    <div class="modal-card modalcard">
      <header class="modal-card-head">
        <p class="modal-card-title is-family-secondary">Gegevens</p>
        <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="column is-vcentered boxinfo">
          <div class="column is-half inforeservation">
            <label class="label">Begin datum</label>
            <p class="subtitle is-5" v-html="item.startdate"></p>

            <label class="label">Eind datum</label>
            <p class="subtitle is-5" v-html="item.enddate"></p>

            <label class="label">Begin tijd</label>
            <p class="subtitle is-5" v-html="item.startTime"></p>

            <label class="label">Eind tijd</label>
            <p class="subtitle is-5" v-html="item.endTime"></p>
          </div>

          <div class="column is-half infodata">
            <label class="label">Kilometers begin</label>
            <p class="subtitle is-5"><span v-html="item.kmstart"></span> km</p>

            <label class="label">Kilometers eind</label>
            <p class="subtitle is-5"><span v-html="item.kmend"></span> km</p>

            <label class="label">Totaal aantal kilometers</label>
            <p class="subtitle is-5"><span v-html="item.kmtotal"></span> km</p>

            <label class="label">Postcode vertrek</label>
            <p class="subtitle is-5" v-html="item.zipcodedeparture"></p>

            <label class="label">Postcode bestemming</label>
            <p class="subtitle is-5" v-html="item.zipcodedestination"></p>

            <label class="label">Omschrijving/klant</label>
            <p class="subtitle is-5" v-html="item.description"></p>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary"v-on:click="onClickEditReservation">Bewerken</button>
        <button class="button" v-on:click="onClickCloseModal">Annuleren</button>
      </footer>
    </div>
  </div>

<!-- Confirmation delete reservation -->
  <div class="modal js-modalconfirmdelete" :class="{ 'is-active': activeModalId === 'modal-delete' }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-family-secondary">Verwijderen</p>
        <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
      </header>
      <section class="modal-card-body">
        <p>Weet u zeker dat u dit wilt verwijderen? Dit kan niet ongedaan worden gemaakt.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="onClickDeleteReservation">Ja</button>
        <button class="button" v-on:click="onClickCloseModal">Nee</button>
      </footer>
    </div>
  </div>

</div>

</template>

<script>
import moment from 'moment'
export default {
  name: 'app',
  data(){
    return {
      startdate: '',
      enddate: '',
      startTime: '',
      endTime: '',
      id: 1,

      kmtotal: 0,

      activeModalId: '',

      items: [

      ]
    };

  },

  computed: {
    reservatebuttonIsDisabled() {
      var currentDate = new Date();
      var convertedcurrentdate = moment(this.formatDateToString(currentDate), "D/M/YYYY").unix();
      var str = moment(this.formatDateToString(this.startdate), "D/M/YYYY").unix();
      var str2 = moment(this.formatDateToString(this.enddate), "D/M/YYYY").unix();

      var startt = this.startTime.split(':');
      var endt = this.endTime.split(':');
      var hours = (startt[0] * 60 * 60);
      var minutes = (startt[1] * 60);

      var hours2 = (endt[0] * 60 * 60);
      var minutes2 = (endt[1] * 60);

      var totalsecondsbegin = hours + minutes;
      var totalsecondsend = hours2 + minutes2;

      const inputsAreValid = this.startdate.length > 0
                          && this.enddate.length > 0
                          && this.startTime.length > 0
                          && this.endTime.length > 0;
      const datesAreEqual = str == str2;
      const beginTimeIsBeforeEndTime = totalsecondsbegin < totalsecondsend;
      const beginAndEndDateAreAfterCurrentDate = str >= convertedcurrentdate && str2 >= convertedcurrentdate;
      const endDateisAfterBeginDate = str2 > str;
      const datesAreEqualAndBeginTimeIsBeforeEndTime = datesAreEqual && beginTimeIsBeforeEndTime;

      return !( inputsAreValid
        && beginAndEndDateAreAfterCurrentDate
        && endDateisAfterBeginDate
        || datesAreEqualAndBeginTimeIsBeforeEndTime
      );
    },

    saveButtonIsDisabled() {
      const retVal = [];
      for(var i =0; i < this.items.length; i++){
        const item = this.items[i];
        const kmEndIsBiggerThanKmstart = item.kmend >= item.kmstart;
        retVal.push(!(kmEndIsBiggerThanKmstart));
      }
      return retVal;
    },

    reservationProgress() {
      const retVal = [];
      for(var i =0; i < this.items.length; i++){
        const item = this.items[i];
        const berekening = String(
          ( item.kmstart > 0 ? 20 : 0 ) +
          ( item.kmend > 0 ? 20 : 0 ) +
          ( item.zipcodedeparture.length > 0 ? 20 : 0 ) +
          ( item.zipcodedestination.length > 0 ? 20 : 0 ) +
          ( item.description.length > 0 ? 20 : 0 ) );
          retVal.push(berekening);
      }
      return retVal;
    }
  },

  methods: {
    formatDateToString: function(date){
      var d = new Date(date);
      var yyyy = d.getFullYear();
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var dd = String(d.getDate()).padStart(2, '0');
      return  `${dd}-${mm}-${yyyy}`;
    },

    onClickReservateButton: function(event){
      this.activeModalId = "modal-reservation";

      var str = this.formatDateToString(this.startdate);
      var str2 = this.formatDateToString(this.enddate);

      document.querySelector(".dateinformation").innerHTML = str;
      document.querySelector(".dateinformation2").innerHTML = str2;
      return;
    },

    onClickConfirmButton: function(event){
      const convertedDate = this.formatDateToString(this.startdate);
      const convertedDate2 = this.formatDateToString(this.enddate);

      this.activeModalId = "";

      this.items.push({
        id: this.id,
        startTime: this.startTime,
        endTime: this.endTime,
        startdate: convertedDate,
        enddate: convertedDate2,
        kmend: 0,
        kmstart: 0,
        zipcodedeparture: '',
        zipcodedestination: '',
        description: ''
      });

      this.startTime = '';
      this.endTime = '';
      this.startdate = '';
      this.enddate = '';
      this.id++;

      return;
    },

    onClickSaveButton: function(event){
      this.activeModalId = "";
      return;
    },

    onClickShowInfoReservation: function(item, index){
      this.activeModalId = "modal-information-" + index;
      item.kmtotal = item.kmend - item.kmstart;
      return;
    },

    onClickEditReservation: function(index){
      this.activeModalId = "modal-editinformation-" + index;
      return;
    },

    onClickCloseModal: function(event){
      this.activeModalId = "";
      return;
    },

    onDeleteReservation: function(item){
      this.activeModalId = "modal-delete";
      this.itemToDelete = item;
      return;
    },

    onClickDeleteReservation: function(event){
      this.activeModalId = "";
      this.items.map((oItem, index) => {
        if(oItem.id === this.itemToDelete.id) {
          this.items.splice(index, 1);
        }
      });
      return;
    },

  },

  mounted(){
  // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
   if ($navbarBurgers.length > 0) {

     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);

         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }
  }
}

</script>
