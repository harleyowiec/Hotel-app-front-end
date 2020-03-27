<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-12 mb-5">
                <h1>Zaloguj się i zarezerwuj swój wymarzony pokój!</h1>
            </div>
        </div>
        <div class="row justify-content-center align-center flex-wrap-reverse">
            <LoginForm
                    container-class="col-md-5"
                    button-text="Zaloguj się"
                    submit-redirect="/loggedIn"
                    @submit="login"
            >
                <p>Nie masz jeszcze konta?
                    <router-link to="/signUp">Załóż je już teraz!</router-link>
                </p>
            </LoginForm>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-12">
                        <img src="../assets/images/logo.png" alt="logo"
                             class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import LoginForm from "../components/LoginForm";

    export default {
        name: "Login",
        components: {LoginForm},
        data() {
            return {}
        },
        methods: {
            login: function (form) {
                this.$store.dispatch('login', form)
                    .then(() => {
                        this.$router.replace('home');
                    })
            }
        }
    }
</script>
