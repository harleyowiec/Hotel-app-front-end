<template>

    <div v-if="room" class="room container w-100">
        <div class="room__header mb-3">
            <div v-if="getAuth" class="align-self-end">
                <v-btn :to="`/rooms/${id}/edit`" :id="room.id" class="ml-auto create-new-room">
                    <font-awesome-icon icon="edit"/>
                </v-btn>
                <v-btn class="ml-auto" @click="deleteRoom">
                    <font-awesome-icon icon="trash-alt"/>
                </v-btn>
            </div>
            <h2 class="room__header__title">{{ room.name }}</h2>
        </div>
        <div class="row justify-content-center">
            <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    :interval="10000"
                    controls
                    indicators
                    background="#ababab"
                    style="text-shadow: 1px 1px 2px #333;"
                    class="w-75"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
            >
                <!-- Text slides with image -->
                <b-carousel-slide
                        :img-src="room.image['first']"
                ></b-carousel-slide>
                <b-carousel-slide
                        :img-src="room.image['second']"
                ></b-carousel-slide>
                <b-carousel-slide
                        :img-src="room.image['third']"
                ></b-carousel-slide>
            </b-carousel>
        </div>
        <div class="row">
            <div class="room__description w-100 ml-auto mr-auto">
                <b-card title="Opis pokoju" class="text-left">
                    <b-card-text class="text-left">
                        {{ room.description }}
                    </b-card-text>
                </b-card>
            </div>
        </div>
        <div class="row">
            <div class="room__details w-100 ml-auto mr-auto">
                <b-card title="Powierzchnia pokoju" class="text-left w-100">
                    <b-card-text class="text-left">
                        {{ room.size }}&#13217;
                    </b-card-text>
                </b-card>
                <b-card title="Cena pokoju(za noc)" class="text-right w-100">
                    <b-card-text class="text-right">
                        {{ room.price }}zł
                    </b-card-text>
                </b-card>
            </div>
        </div>
        <div class="row mb-5">
            <div class="room__equipment w-100 ml-auto mr-auto">
                <b-card title="Udogodnienia" class="text-left">
                    <b-card-text class="text-left">
                        <div class="equipment" v-for="item in equipment" :key="item" v-show="item !== ''">
                            -{{ item }}
                        </div>

                    </b-card-text>
                </b-card>
            </div>
            <div class="room__address w-100 ml-auto mr-auto">
                <b-card title="Nasz adres" class="text-left">
                    <b-card-text class="text-left">
                        <div class="address d-flex flex-column">
                            <span> ul. Kolorowa 8 </span>
                            <span> 32-590 Libiąż </span>
                        </div>
                    </b-card-text>
                </b-card>
            </div>
        </div>
        <div class="row" v-if="isLoggedIn">
            <div class="room__dates w-100">
                <b-card title="Data pobytu" class="text-left w-100">
                    <b-card-text class="text-left">
                        Wybierz datę swojego pobytu i sprawdź, czy pokój jest wtedy dostępny:
                    </b-card-text>
                    <div class="d-flex mb-5 flex-wrap">
                        <div class="room__dates__start mb-4">
                            <h6>Wybierz termin przybycia: </h6>
                            <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="computedStartDateFormatted"
                                            label="Date"
                                            hint="DD/MM/YYYY"
                                            persistent-hint
                                            prepend-icon="event"
                                            @blur="date = parseDate(dateFormatted)"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateStart" color="green lighten-1" no-title
                                               @input="handleDatePicker('start', true)"></v-date-picker>
                            </v-menu>
                        </div>
                        <div class="room__dates__end">
                            <h6>Wybierz termin wyjazdu: </h6>
                            <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="computedEndDateFormatted"
                                            label="Date"
                                            hint="DD/MM/YYYY"
                                            persistent-hint
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateEnd" color="green lighten-1"
                                               no-title
                                               @input="handleDatePicker('end', false)"></v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div v-if="loading" class="row text-center">
                        <div class="col-12">
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                        </div>
                    </div>
                    <b-alert :show="dateSuccess" variant="success">
                        Gratulacje! Ten pokój jest wolny w wybranym przez Ciebie terminie!
                    </b-alert>
                    <b-alert :show="dateFail" variant="danger">
                        Niestety ten pokój jest już zajęty w wybranym przez Ciebie terminie. Spróbuj wybrać inny
                        interesujący Cię termin. Najbłiższy dostępny termin to: {{ availableDate }}
                    </b-alert>
                    <b-alert :show="dateWrongFormat" variant="danger">
                        Nieprawidłowo wybrana data!
                    </b-alert>
                </b-card>
            </div>
        </div>
        <div class="row" v-if="isLoggedIn">
            <b-button
                    class="btn btn-info mt-4 ml-auto mr-auto"
                    variant="primary"
                    :class="{disabled: disableButton}"
                    :to="{ name: 'BookRoom', params: { id, dateStart, dateEnd, userId }}"
                    :roomId="5"
            >
                Rezerwuj
            </b-button>
        </div>
        <div class="row">
            <b-alert :show="!isLoggedIn" variant="danger" class="w-100">
                <router-link to="/login">Zaloguj się</router-link>
                , aby móc zarezerwować ten pokój!
            </b-alert>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'Room',
        props: ['id'],
        data() {
            return {
                dateStart: new Date().toISOString().substr(0, 10),
                dateEnd: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
                menu2: false,
                room: null,
                dateSuccess: false,
                dateFail: false,
                dateWrongFormat: false,
                availableDate: null,
                userId: 0,
                equipment: [],
                loading: false,
                slide: 0,
                sliding: null,
                disableButton: true
            }
        },
        created() {
            this.$store.dispatch('getRoom', this.id)
                .then(() => {
                    this.room = this.$store.getters.getRoom;
                    this.equipment = this.room.equipment.split('-');
                });

        },
        computed: {
            computedStartDateFormatted() {
                return this.formatDate(this.dateStart);
            },
            computedEndDateFormatted() {
                return this.formatDate(this.dateEnd)
            },
            getAuth() {
                return this.$store.getters.isAdmin;
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            deleteRoom() {
                this.$store.dispatch('deleteRoom', this.id)
                    .then(() => {
                        this.$router.replace('/rooms');
                    });
            },
            formatDate(date) {
                if (!date) return null;

                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`
            },
            parseDate(date) {
                if (!date) return null;
                const [month, day, year] = date.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            triggerDateAlert(state) {
                this.dateSuccess = state;
                this.dateFail = !this.dateSuccess;
            },

            handleDatePicker(dateField) {
                this.dateWrongFormat = false;
                this.dateFail = false;
                this.dateSuccess = false;
                this.loading = true;
                let dates = [];
                const dateFrom = this.dateStart.split("-");
                const dateTo = this.dateEnd.split("-");
                const from = new Date(`${dateFrom[1]}/${dateFrom[2]}/${dateFrom[0]}`);
                const to = new Date(`${dateTo[1]}/${dateTo[2]}/${dateTo[0]}`);
                if (dateField === 'start') {
                    this.menu1 = false
                } else {
                    this.menu2 = false;
                }
                if (from > to || from === to) {
                    this.dateWrongFormat = true;
                    this.loading = false;
                    this.disableButton = true;
                    return;
                }
                this.$store.dispatch('getReservations')
                    .then(response => {
                        this.disableButton = true;
                        response.forEach(reservation => {
                            if (reservation.roomid == this.id) {
                                dates[reservation.id] = [reservation.startdate, reservation.enddate];
                            }
                        });
                        let endDate = null;
                        const dateStatus = dates.some(el => {
                            const startDate = new Date(el[0]);
                            startDate.setHours(0, 0, 0, 0);
                            endDate = new Date(el[1]);
                            endDate.setHours(0, 0, 0, 0);
                            return (from <= endDate && from >= startDate) || (to <= endDate && to >= startDate) || (from <= startDate && to >= endDate)
                        });
                        if (dateStatus) {
                            this.triggerDateAlert(false);
                            const wrongDate = new Date(endDate);
                            const nextDate = new Date(wrongDate.setDate(wrongDate.getDate() + 1));
                            this.availableDate = `${nextDate.getDate()}/${nextDate.getMonth() + 1}/${nextDate.getFullYear()}`;
                        } else {
                            this.triggerDateAlert(true);
                            this.disableButton = false;
                        }
                        this.loading = false;
                    });
            },
            onSlideStart() {
                this.sliding = true
            },
            onSlideEnd() {
                this.sliding = false
            }
        }
    }
</script>