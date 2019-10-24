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

<!-- Add reservation -->
  <section class="section">
    <div class="container containercards">
      <div class="card addreservation">
        <header class="card-header">
          <p class="card-header-title">
            Voeg reservering toe
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="plus" v-on:click="onClickAddReservationButton">
              <svg id="icon-plus" class="icon-plus" viewBox="0 0 32 32">
      					<path d="M0 0h32v32h-32v-32z" class="plus-bg"></path>
      					<path d="M7.406 15.429h17.189v1.143h-17.189v-1.143z" class="plus-line"></path>
      					<path d="M15.429 7.406h1.143v17.189h-1.143v-17.189z" class="plus-line"></path>
      				</svg>
            </div>
          </div>
        </div>
      </div>

<!-- Reservation card -->
      <div class="cards reservationcard" v-for="(item, index) in items">
        <div class="card reservations" v-on:click="changeColor(index)" v-bind:class="{active: activeIndex === index}">
          <header class="card-header">
            <p class="card-header-title">
              Reservering
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p v-html="formatDateToString(item.startdate)"></p>
              <br />
              <div class="iconcard" v-on:click="onDeleteReservation(item)">
                <i class="fas fa-trash"></i>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <i class="fas fa-car"></i>
          </footer>
        </div>
      </div>
    </div>
  </section>

<!-- First tile with date and time -->
  <div class="tile is-ancestor">
    <div class="containertiles">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical is-3" v-if="items[activeIndex]">
            <div class="tile is-child box">
              <label class="label">Begin datum</label>
                <input class="input" type="date" v-model="startdate">
              <label class="label">Eind datum</label>
                <input class="input" type="date" v-model="enddate">
              <label class="label">Begin tijd</label>
                <input class="input" type="time" v-model="startTime">
              <label class="label">Eind tijd</label>
                <input class="input" type="time" v-model="endTime">
              <div class="reservatebutton">
                <button class="button is-primary" :disabled="reservatebuttonIsDisabled" v-on:click="onClickConfirmButton(index); changeColor2(index);">Reserveren</button>
              </div>
            </div>
          </div>

    <!-- Second tile with warning -->
          <div class="tile is-parent is-vertical is-3" v-if="items[activeIndex]">
            <div class="tile is-child box">
              <p><b>LET OP!</b><br /><br />Onthoud je kilometerstanden! Deze moeten na je rit worden ingevoerd bij de volgende stap.</p>
              <div class="nextbutton">
                <button class="button is-primary" :disabled="!reservateButton[activeIndex]" v-on:click="onClickNextButton(); changeColor3(index);">Volgende</button>
              </div>
            </div>
          </div>

    <!-- Third tile with inputfields for km, zipcodes and description -->
          <div class="tile is-parent is-vertical is-3" v-if="items[activeIndex]">
            <div class="tile is-child box">
              <div class="kilometers">
                <div class="kmbegin">
                  <label class="label">Kilometers begin</label>
                  <input class="input input2" type="number" placeholder="10" :disabled="!nextButton[activeIndex]" v-model="kmstart">
                </div>
                <div class="kmeind">
                  <label class="label">Kilometers eind</label>
                  <input class="input input2" type="number" placeholder="20" :disabled="!nextButton[activeIndex]" v-model="kmend">
                </div>
              </div>

              <div class="zipcodes">
                <div class="zipcodedeparture">
                  <br />
                  <label class="label">Postcode vertrek</label>
                  <input class="input input2" type="text" placeholder="1234 AB" :disabled="!nextButton[activeIndex]" v-model="zipcodedeparture">
                </div>

                <div class="zipcodedestination">
                  <label class="label">Postcode bestemming</label>
                  <input class="input input2" type="text" placeholder="1234 AB" :disabled="!nextButton[activeIndex]" v-model="zipcodedestination">
                </div>
              </div>

              <label class="label">Omschrijving/klant</label>
              <textarea class="textarea" :disabled="!nextButton[activeIndex]" v-model="description"></textarea>

              <div class="savebutton">
                <button class="button is-primary" :disabled="!nextButton[activeIndex]" v-on:click="onClickSaveButton">Opslaan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section stepindicator">
    <ul class="steps is-medium">
      <li class="steps-segment">
        <span class="steps-marker is-primary">1</span>
        <div class="steps-content">
        </div>
      </li>
      <li class="steps-segment is-active">
        <span class="steps-marker is-primary">2</span>
        <div class="steps-content">
        </div>
      </li>
      <li class="steps-segment">
        <span class="steps-marker is-primary">3</span>
        <div class="steps-content">
        </div>
      </li>
    </ul>
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
      activeIndex: -1,

      reservateButton: [

      ],

      nextButton: [

      ],

      // Editable Reserve Object
      startdate: '',
      enddate: '',
      startTime: '',
      endTime: '',
      id: 1,

      kmstart: 0,
      kmend: 0,
      zipcodedeparture: '',
      zipcodedestination: '',
      description: '',

      activeModalId: '',

      items: [

      ]
    };

  },

  computed: {
    reservatebuttonIsDisabled(){
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
        || datesAreEqualAndBeginTimeIsBeforeEndTime);
    },

    saveButtonIsDisabled(){
      const kmEndIsBiggerThanKmstart = this.kmend >= this.kmstart;
      return !(kmEndIsBiggerThanKmstart);
    }
  },

  watch: {
    activeIndex(){
  // if activeindex is valid, do the below
      if(this.items[this.activeIndex]){
        this.startTime = this.items[this.activeIndex].startTime;
        this.endTime = this.items[this.activeIndex].endTime;
        this.startdate = this.items[this.activeIndex].startdate;
        this.enddate = this.items[this.activeIndex].enddate;

        this.kmstart = this.items[this.activeIndex].kmstart;
        this.kmend = this.items[this.activeIndex].kmend;
        this.zipcodedeparture = this.items[this.activeIndex].zipcodedeparture;
        this.zipcodedestination = this.items[this.activeIndex].zipcodedestination;
        this.description = this.items[this.activeIndex].description;
      }
    }
  },

  methods: {
    changeColor: function(index){
      this.activeIndex = index;
      return;
    },

    formatDateToString: function(date){
      var d = new Date(date);
      var retVal;
      if(d instanceof Date && !isNaN(d)){
        var yyyy = d.getFullYear();
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var dd = String(d.getDate()).padStart(2, '0');
        retVal = `${dd}-${mm}-${yyyy}`;
      }else{
        retVal = 'dd-mm-yyyy';
      }
      return retVal;
    },

    onClickConfirmButton: function(event){
      this.items[this.activeIndex].id = this.id;
      this.items[this.activeIndex].startTime = this.startTime;
      this.items[this.activeIndex].endTime = this.endTime;
      this.items[this.activeIndex].startdate = this.startdate;
      this.items[this.activeIndex].enddate = this.enddate;

      this.reservateButton[this.activeIndex] = true;
      return;
    },

    onClickSaveButton: function(event){
      this.items[this.activeIndex].kmstart = this.kmstart;
      this.items[this.activeIndex].kmend = this.kmend;
      this.items[this.activeIndex].zipcodedeparture = this.zipcodedeparture;
      this.items[this.activeIndex].zipcodedestination = this.zipcodedestination;
      this.items[this.activeIndex].description = this.description;

      return;
    },

    onClickAddReservationButton: function(event){
      this.items.push ({
        id: "",
        startTime: "",
        endTime: "",
        startdate: "",
        enddate: "",
        kmend: 0,
        kmstart: 0,
        zipcodedeparture: '',
        zipcodedestination: '',
        description: ''
      });

      this.reservateButton.push(false);
      this.nextButton.push(false);
      this.changeColor(this.items.length -1);
      return;
    },

    onClickNextButton: function(event){
      this.nextButton.splice(this.activeIndex, 1, true);
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
          this.items.splice(this.activeIndex, 1);
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
