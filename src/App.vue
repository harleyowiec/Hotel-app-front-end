<template>
    <b-container id="app" fluid>
        <Menu></Menu>
        <div class="row">
            <div class="col-12">
            </div>
        </div>
        <div class="row justify-content-center align-center h-100">
            <div class="col-md-8 my-auto">
                <b-jumbotron>
                    <transition
                            name="fade"
                            mode="out-in"
                    >
                        <router-view/>
                    </transition>
                </b-jumbotron>
            </div>
        </div>
    </b-container>
</template>


<script>
    import Menu from "./components/Menu";

    export default {
        components: {Menu},
        created() {
            const token = localStorage.getItem('token');
            if (token) {
                this.$store.dispatch('authToken', token)
                    .then(() => {
                        if (!this.$store.getters.isLoggedIn) {
                            this.$store.dispatch('logout')
                                .then(() => {
                                    this.$router.replace('');
                                });
                        }
                    })
            }

        }
    }
</script>
