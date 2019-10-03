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

<!-- The 3 tiles -->
  <div class="homepicture">
    <div class="tile is-ancestor">
      <div class="tile is-8 is-vertical">
        <div class="tile">
          <!-- Reserveringen tile -->
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p class="title">Reserveringen</p>

              <div class="level reservering" v-for="(item, id) in items">
                <div class="level-left" v-on:click="onClickShowInfoReservation">
                  <div class="level-item">
                    <p class="subtitle is-5"><span v-html="item.id"></span>: &ensp;</p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.begindatum"></p>
                  </div>
                  <div class="level-item">
                    <p> - </p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.einddatum"></p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5">| &ensp;<span v-html="item.beginTijd"></span></p>
                  </div>
                  <div class="level-item">
                    <p> - </p>
                  </div>
                  <div class="level-item">
                    <p class="subtitle is-5" v-html="item.eindTijd"></p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <p class="subtitle is-5"><span v-html="reserveringProgress"></span>%</p>
                  </div>
                  <div class="level-item" v-on:click="onClickEditReservation">
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
                  <input class="input" type="date" v-model="begindatum">
                <label class="label">Eind datum</label>
                  <input class="input" type="date" v-model="einddatum">
                <label class="label">Begin tijd</label>
                  <input class="input" type="time" v-model="beginTijd">
                <label class="label">Eind tijd</label>
                  <input class="input" type="time" v-model="eindTijd">
              </form>

              <button class="button is-primary is-normal reserveer" :disabled="reserveerbuttonIsDisabled" v-on:click="onClickReservateButton">Reserveer</button>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Gegevens</p>
          <div class="level" v-for="info in infos">
            <div class="level-left">
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
        <p class="subtitle is-5 dateinfo"></p>
        <label class="label">Eind datum</label>
        <p class="subtitle is-5 dateinfo2"></p>
        <label class="label">Begin tijd</label>
        <p class="subtitle is-5" v-html="beginTijd"></p>
        <label class="label">Eind tijd</label>
        <p class="subtitle is-5" v-html="eindTijd"></p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="onClickConfirmButton">Bevestigen</button>
        <button class="button is-text" v-on:click="onClickCloseModal">Annuleren</button>
      </footer>
    </div>
  </div>

<!-- Modal when you want to edit the reservation-->
  <div class="modal js-modaleditinformation" v-for="(item, index) in items" :class="{ 'is-active': activeModalId === 'modal-editinformation' }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-family-secondary">Gegevens invoeren</p>
        <button class="delete" aria-label="close" v-on:click="onClickCloseModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="column is-vcentered boxinfo">
          <div class="column is-half inforeservation">
            <label class="label">Begin datum</label>
              <input class="input" type="date" v-model="item.begindatum">
            <label class="label">Eind datum</label>
              <input class="input" type="date" v-model="item.einddatum">
            <label class="label">Begin tijd</label>
              <input class="input" type="time" v-model="item.beginTijd">
            <label class="label">Eind tijd</label>
              <input class="input" type="time" v-model="item.eindTijd">
          </div>

          <div class="column is-half infodata">
            <label class="label">Kilometers begin</label>
            <input class="input" type="number" placeholder="10" v-model="kmbegin">

            <label class="label">Kilometers eind</label>
            <input class="input" type="number" placeholder="20" v-model="kmeind">

            <label class="label">Postcode vertrek</label>
            <input class="input" type="text" placeholder="1234 AB" v-model="postcodevertrek">

            <label class="label">Postcode bestemming</label>
            <input class="input" type="text" placeholder="1234 AB" v-model="postcodebestemming">

            <label class="label">Omschrijving/klant</label>
            <textarea class="textarea" v-model="beschrijving"></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" :disabled="opslaanbuttonIsDisabled" v-on:click="onClickSaveButton">Opslaan</button>
        <button class="button is-text" v-on:click="onClickCloseModal">Annuleren</button>
      </footer>
    </div>
  </div>

<!-- When you click on the reservation to see the data -->
  <div class="modal js-modalinformation" v-for="(item, index) in items" :class="{ 'is-active': activeModalId === 'modal-information' }">
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
            <p class="subtitle is-5" v-html="item.begindatum"></p>

            <label class="label">Eind datum</label>
            <p class="subtitle is-5" v-html="item.einddatum"></p>

            <label class="label">Begin tijd</label>
            <p class="subtitle is-5" v-html="item.beginTijd"></p>

            <label class="label">Eind tijd</label>
            <p class="subtitle is-5" v-html="item.eindTijd"></p>
          </div>

          <div class="column is-half infodata">
            <label class="label">Kilometers begin</label>
            <p class="subtitle is-5"><span v-html="kmbegin"></span> km</p>

            <label class="label">Kilometers eind</label>
            <p class="subtitle is-5"><span v-html="kmeind"></span> km</p>

            <label class="label">Totaal aantal kilometers</label>
            <p class="subtitle is-5"><span v-html="kmtotaal"></span> km</p>

            <label class="label">Postcode vertrek</label>
            <p class="subtitle is-5" v-html="postcodevertrek"></p>

            <label class="label">Postcode bestemming</label>
            <p class="subtitle is-5" v-html="postcodebestemming"></p>

            <label class="label">Omschrijving/klant</label>
            <p class="subtitle is-5" v-html="beschrijving"></p>
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

export default {
  name: 'app',
  data(){
    return {
      begindatum: '',
      einddatum: '',
      beginTijd: '',
      eindTijd: '',
      id: 1,

      kmbegin: 0,
      kmeind: 0,
      kmtotaal: 0,
      postcodevertrek: '',
      postcodebestemming: '',
      beschrijving: '',

      activeModalId: '',

      items: [
      ],

      infos: [

      ],
    };

  },

  computed: {
    reserveerbuttonIsDisabled() {
      var currentDate = new Date();
      var convertedcurrentdate = this.formatDateToString(currentDate);
      return !( this.begindatum.length > 0
        && this.einddatum.length > 0
        && this.beginTijd.length > 0
        && this.eindTijd.length > 0
        && this.einddatum >= this.begindatum
        // && this.begindatum >= convertedcurrentdate
      );
    },

    opslaanbuttonIsDisabled() {
      return !(this.kmeind >= this.kmbegin)
    },

    reserveringProgress() {
      return String(
        ( this.kmbegin > 0 ? 20 : 0 ) +
        ( this.kmeind > 0 ? 20 : 0 ) +
        ( this.postcodevertrek.length > 0 ? 20 : 0 ) +
        ( this.postcodebestemming.length > 0 ? 20 : 0 ) +
        ( this.beschrijving.length > 0 ? 20 : 0 ) );
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

      var str = this.formatDateToString(this.begindatum);
      var str2 = this.formatDateToString(this.einddatum);

      document.querySelector(".dateinfo").innerHTML = str;
      document.querySelector(".dateinfo2").innerHTML = str2;
      return;
    },

    onClickConfirmButton: function(event){
      var str = this.formatDateToString(this.begindatum);
      var str2 = this.formatDateToString(this.einddatum);

      const convertedDate = str;
      const convertedDate2 = str2;
      this.activeModalId = "";

      this.items.push({
        id: this.id,
        beginTijd: this.beginTijd,
        eindTijd: this.eindTijd,
        begindatum: convertedDate,
        einddatum: convertedDate2
      });

      this.beginTijd = '';
      this.eindTijd = '';
      this.begindatum = '';
      this.einddatum = '';
      this.id++;

      return;
    },

    onClickSaveButton: function(event){
      this.infos.push({
        kmeind: this.kmeind,
        kmbegin: this.kmbegin,
        postcodevertrek: this.postcodevertrek,
        postcodebestemming: this.postcodebestemming,
        beschrijving: this.beschrijving
      });

      this.activeModalId = "";
      return;
    },

    onClickShowInfoReservation: function(event){
      this.activeModalId = "modal-information";
      this.kmtotaal = this.kmeind - this.kmbegin;
      return;
    },

    onClickEditReservation: function(event){
      this.activeModalId = "modal-editinformation";
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
