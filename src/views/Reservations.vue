<template>
    <div class="reservations">
        <h3 class="mb-3">
            Lista rezerwacji
        </h3>
        <div v-if="reservations">
            <b-list-group v-for="reservation in this.reservations" :key="reservation.id" class="mb-3">
                <b-list-group-item>
                    <Reservation :reservation="reservation">
                    </Reservation>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import Reservation from '../components/Reservation';

    export default {
        name: "Reservations",
        components: {Reservation},
        data() {
            return {
                reservations: null
            }
        },
        created() {
            const userId = this.$store.getters.getUserId;
            if (this.$store.getters.isAdmin) {
                this.$store.dispatch('getReservations')
                    .then(response => {
                        this.reservations = response;
                    })
            } else if (userId) {
                this.$store.dispatch('getUserReservations')
                    .then(response => {
                        this.reservations = response;
                    })
            }

        }
    }
</script>