<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1>Załóż nowe konto!</h1>
            </div>
        </div>
        <div class="row justify-content-center align-center">
            <LoginForm
                    container-class="col-md-5"
                    button-text="Załóż konto"
                    @submit="register"
            >
                <p>
                    lub przejdź do strony
                    <router-link to="/login">logowania</router-link>
                </p>
            </LoginForm>
        </div>
    </div>
</template>

<script>
    import LoginForm from "../components/LoginForm";

    export default {
        name: "SignUp",
        components: {LoginForm},
        data() {
            return {}
        },
        methods: {
            register(form) {
                this.$store.dispatch('register', form)
                    .then(() => {
                        this.$router.replace('home');
                    });
            }
        }
    }
</script>
