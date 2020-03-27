<template>
    <div class="book-room">
        <h2 class="mb-3">Zarezerwuj pokój</h2>
        <v-stepper light v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Wybierz pokój</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Podaj swoje dane</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Podsumowanie</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="2">
                    <div class="content d-flex p-1">
                        <b-card v-if="room !== null" title="Dane rezerwacji" class="text-left w-25">
                            <b-card-text class="text-left">
                                <strong>Pokój: </strong> {{ room.name }}
                            </b-card-text>
                            <b-card-text class="text-left">
                                <strong>Data przyjazdu: </strong> {{ form.dateStart }}
                            </b-card-text>
                            <b-card-text class="text-left">
                                <strong>Data wyjazdu: </strong> {{ form.dateEnd }}
                            </b-card-text>
                            <b-card-text class="text-left">
                                <strong>Ilość nocy: </strong> {{ form.daysNumber }}
                            </b-card-text>
                            <b-card-text class="text-left">
                                <strong>Cena: </strong> {{ form.price }} zł
                            </b-card-text>
                            <b-card-text class="text-left">
                                <strong>Godzina przyjazdu: </strong>
                                <b-form-select v-model="form.startTime" :options="startTimeOptions">
                                </b-form-select>
                            </b-card-text>
                        </b-card>
                        <b-card v-if="room !== null" title="Dane osobowe" class="text-left w-75">
                            <b-form>
                                <b-form-group class="form-field" id="input-group-1" label="Imię:" label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.name"
                                            required
                                            placeholder="Imię"
                                    ></b-form-input>
                                    <div class="error" v-if="!$v.form.name.required">Pole wymagane</div>
                                </b-form-group>

                                <b-form-group class="form-field" id="input-group-2" label="Nazwisko:"
                                              label-for="input-2">
                                    <b-form-input
                                            id="input-2"
                                            v-model="form.surname"
                                            required
                                            placeholder="Nazwisko"
                                    ></b-form-input>
                                    <div class="error" v-if="!$v.form.surname.required">Pole wymagane</div>
                                </b-form-group>
                                <b-form-group class="form-field" id="input-group-3" label="Ulica:" label-for="input-3">
                                    <b-form-input
                                            id="input-3"
                                            v-model="form.street"
                                            required
                                            type="text"
                                            placeholder="Np. Kolorowa 6"
                                    ></b-form-input>
                                    <div class="error" v-if="!$v.form.street.required">Pole wymagane</div>
                                </b-form-group>
                                <b-form-group class="form-field" id="input-group-4" label="Miasto:" label-for="input-4">
                                    <b-form-input
                                            id="input-4"
                                            v-model="form.city"
                                            required
                                            type="text"
                                            placeholder="Np. Kraków"
                                    ></b-form-input>
                                    <div class="error" v-if="!$v.form.city.required">Pole wymagane</div>
                                </b-form-group>
                                <b-form-group class="form-field" id="input-group-5" label="Kod pocztowy:"
                                              label-for="input-5">
                                    <b-form-input
                                            id="input-5"
                                            v-model="form.postalCode"
                                            required
                                            type="text"
                                            placeholder="Np. 00-900"
                                    ></b-form-input>
                                    <div class="error" v-if="!$v.form.postalCode.required">Pole wymagane</div>
                                    <div class="error" v-if="!$v.form.postalCode.maxLength">Kod pocztowy nie może być
                                        dłuższy, niż
                                        {{$v.form.postalCode.$params.maxLength.max}}
                                        znaków.
                                    </div>
                                    <div class="error" v-if="!$v.form.postalCode.minLength">Kod pocztowy nie może być
                                        krótszy, niż
                                        {{$v.form.postalCode.$params.minLength.min}}
                                        znaków.
                                    </div>
                                </b-form-group>
                            </b-form>
                        </b-card>
                        <p class="typo__p" v-if="submitStatus === 'ERROR'">Uzupełnij formularz poprawnymi danymi</p>
                    </div>
                    <b-button
                            type="submit"
                            variant="primary"
                            @click="e1 = 3"
                            class="mt-2"
                            :disabled="$v.$invalid"
                    >
                        Następny krok
                    </b-button>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <div v-if="!this.bookingFinished">
                        <h4>Sprawdź poprawność danych: </h4>
                        <div class="content d-flex p-1">
                            <b-card v-if="room !== null" title="Dane rezerwacji" class="text-left w-25">
                                <b-card-text class="text-left">
                                    <strong>Pokój: </strong> {{ room.name }}
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Data przyjazdu: </strong> {{ form.dateStart }}
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Data wyjazdu: </strong> {{ form.dateEnd }}
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Ilość nocy: </strong> {{ form.daysNumber }}
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Cena: </strong> {{ form.price }} zł
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Godzina przyjazdu: </strong>
                                    <span> {{ form.dateStart }} </span>
                                </b-card-text>
                            </b-card>
                            <b-card v-if="room !== null" title="Dane osobowe" class="text-left w-75">
                                <b-card-text class="text-left">
                                    <strong>Imię: </strong>
                                    <span> {{ form.name }} </span>
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Nazwisko: </strong>
                                    <span> {{ form.surname }} </span>
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Ulica: </strong>
                                    <span> {{ form.street }} </span>
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Miasto: </strong>
                                    <span> {{ form.city }} </span>
                                </b-card-text>
                                <b-card-text class="text-left">
                                    <strong>Kod pocztowy: </strong>
                                    <span> {{ form.postalCode }} </span>
                                </b-card-text>
                            </b-card>
                        </div>
                    </div>
                    <b-alert variant="success" :show="bookingFinished"> {{ message }}</b-alert>
                    <v-btn
                            v-if="!bookingFinished"
                            color="blue"
                            @click="makeReservation"
                    >
                        Rezerwuj pokój
                    </v-btn>
                    <v-btn
                            type="submit"
                            v-if="bookingFinished"
                    >
                        <router-link to="/">
                            Wróć na stronę główną
                        </router-link>
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    import {required, numeric, maxLength, minLength, decimal} from 'vuelidate/lib/validators'

    export default {
        name: 'BookRoom',
        props: {
            id: String,
            userId: Number,
            dateStart: String,
            dateEnd: String
        },
        data() {
            return {
                e1: 2,
                room: null,
                bookingFinished: false,
                message: 'Rezerwacja zakończona pomyślnie.',
                user: null,
                form: {
                    roomId: this.id,
                    userId: this.$store.getters.getUserId,
                    name: '',
                    surname: '',
                    street: '',
                    city: '',
                    postalCode: '',
                    dateStart: this.dateStart,
                    dateEnd: this.dateEnd,
                    startTime: '15:00',
                    daysNumber: 0,
                    price: '',
                },
                startTimeOptions: [
                    {value: '15:00', text: '15:00'},
                    {value: '16:00', text: '16:00'},
                    {value: '17:00', text: '17:00'},
                    {value: '18:00', text: '18:00'},
                    {value: '19:00', text: '19:00'},
                    {value: '20:00', text: '20:00'},
                    {value: '21:00', text: '21:00'},
                ],
                submitStatus: null
            }
        },
        validations: {
            form: {
                roomId: {
                    required,
                    numeric
                },
                userId: {
                    required,
                    numeric
                },
                name: {
                    required
                },
                surname: {
                    required
                },
                street: {
                    required
                },
                city: {
                    required
                },
                postalCode: {
                    required,
                    maxLength: maxLength(6),
                    minLength: minLength(6)
                },
                dateStart: {
                    required
                },
                dateEnd: {
                    required
                },
                startTime: {
                    required
                },
                daysNumber: {
                    required,
                    numeric
                },
                price: {
                    required,
                    decimal
                }
            }
        },
        created() {
            this.$store.dispatch('getRoom', this.id)
                .then(() => {
                    this.room = this.$store.getters.getRoom;
                    this.form.daysNumber = this.calculateDateDifference(this.dateStart, this.dateEnd);
                    this.form.price = this.room.price * this.form.daysNumber;
                    this.user = this.$store.getters.getUser;
                    if (this.user) {
                        this.form.name = this.user.name;
                        this.form.surname = this.user.surname;
                        this.form.street = this.user.street;
                        this.form.city = this.user.city;
                        this.form.postalCode = this.user.postalcode;
                    }
                });

        },
        computed: {},
        methods: {
            calculateDateDifference(date1, date2) {
                const ONE_DAY = 1000 * 60 * 60 * 24;
                const parts1 = date1.split("-");
                const parts2 = date2.split("-");
                const startDate = new Date(`${parts1[1]}/${parts1[2]}/${parts1[0]}`);
                const endDate = new Date(`${parts2[1]}/${parts2[2]}/${parts2[0]}`);
                const differenceMs = Math.abs(endDate - startDate);
                return Math.round(differenceMs / ONE_DAY);
            },
            makeReservation(e) {
                e.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.$store.dispatch('addReservation', this.form)
                        .then(() => {
                            this.bookingFinished = true;
                        })
                }

            }
        }
    }
</script>