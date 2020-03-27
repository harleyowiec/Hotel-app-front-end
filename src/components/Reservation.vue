<template>
    <div>
        <div v-if="reservation" class="reservation d-flex flex-column justify-content-start align-start">
            <b-list-group class="w-100 mb-3">
                <ReservationDetail v-for="(value, name) in displayData"
                                   :key="name"
                                   :name="name"
                                   :value="value">
                </ReservationDetail>
            </b-list-group>
            <div class="cancel-reservation">
                <b-button @click="cancelReservation" variant="danger">Anuluj rezerwacje</b-button>
            </div>
        </div>
        <b-alert :show="cancelSuccess" variant="success">
            Twoja rezerwacja została anulowana.
        </b-alert>
    </div>
</template>

<script>
    import ReservationDetail from "./Reservation/ReservationDetail";

    export default {
        name: 'Reservation',
        components: {ReservationDetail},
        props: {
            reservation: Object
        },
        data() {
            return {
                adminFields: ['id', 'roomid', 'userid'],
                translateFields: {
                    'name': 'Imię',
                    'id': 'ID rezerwacji',
                    'roomid': 'ID pokoju',
                    'userid': 'ID użytkownika',
                    'surname': 'Nazwisko',
                    'street': 'Ulica',
                    'city': 'Miasto',
                    'postalcode': 'Kod pocztowy',
                    'startdate': 'Data przyjazdu',
                    'enddate': 'Data wyjazdu',
                    'starttime': 'Godzina przyjazdu',
                    'endtime': 'Godzina wyjazdu',
                    'days': 'Liczba nocy',
                    'finalprice': 'Cena',
                    'paymenttype': 'Rodzaj płatności'
                },
                displayData: {},
                cancelSuccess: false
            }
        },
        created() {
            for (let prop in this.reservation) {
                const translatedProp = this.translateFields[prop];
                if (!this.adminFields.includes(prop) && !this.$store.getters.isAdmin) {
                    this.displayData[translatedProp] = this.reservation[prop];
                } else if (this.$store.getters.isAdmin) {
                    this.displayData[translatedProp] = this.reservation[prop];
                }
                if (prop == 'startdate' || prop == 'enddate') {
                    this.displayData[translatedProp] = this.reservation[prop].substr(0, 10);
                }
            }

        },
        methods: {
            cancelReservation() {
                this.$bvModal.msgBoxConfirm('Na pewno chcesz anulować rezerwację?', {
                    title: 'Powtierdź',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Tak',
                    cancelTitle: 'Nie',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if (value) {
                            this.$store.dispatch('cancelReservation', this.reservation.id)
                                .then(() => {
                                    this.cancelSuccess = true;
                                    this.reservation = null;
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>