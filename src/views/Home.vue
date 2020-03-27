<template>
    <div class="row home flex-column align-center">
        <img alt="Vue logo" src="../assets/images/logo.png">
        <h1 class="h1">Witaj na stronie myHotel!</h1>
        <p>Przejdź do listy dostępnych pokojów, wybierz odpowiadający Ci termin i skorzystaj z naszej oferty!</p>
        <div class="home-rooms">
            <b-button to="/rooms" class="home-rooms__button" variant="info">
                Pokoje
            </b-button>
            <img src="../assets/images/bedroom-door-entrance-271639.jpg" alt="door" class="w-100">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>
