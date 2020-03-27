<template>
    <b-navbar toggleable="lg" type="dark" variant="transparent">
        <b-navbar-brand to="/home" class="logo d-flex justify-content-center align-center">
            <img src="../assets/images/logo.png" alt="" class="h-100">
        </b-navbar-brand>


        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <div v-if="!getAuth" class="d-flex">
                    <b-nav-item to="/login">Zaloguj się</b-nav-item>
                    <b-nav-item to="/signUp">Zarejestruj się</b-nav-item>
                </div>
                <b-nav-item to="/profile" v-if="getAuth"> {{ getUsername }} - Profil</b-nav-item>
                <b-nav-item to="/rooms">Pokoje</b-nav-item>
                <b-nav-item v-if="this.$store.getters.isAdmin" to="/users">Użytkownicy</b-nav-item>
                <b-nav-item to="/reservations" v-if="getAuth">Rezerwacje</b-nav-item>
                <b-nav-item to="#" v-if="getAuth" @click="logout">Wyloguj się</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>

    export default {
        name: "Menu",
        components: {},
        data() {
            return {
                email: '',
                drawer: null,
                items: [
                    {title: 'Home', icon: 'dashboard'},
                    {title: 'About', icon: 'question_answer'},
                ],
            }
        },
        computed: {
            getAuth() {
                return this.$store.getters.isLoggedIn;
            },
            getUsername() {
                return this.$store.getters.getUsername
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.replace('home');
                    });
            }
        },
    }
</script>

<style scoped>

</style>
