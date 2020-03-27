<template>
    <div v-if="user" class="user-profile border pt-2 pb-2 pl-4 pr-4 ml-auto mr-auto">
        <h3>Uzupełnij swoje dane</h3>
        <b-form @submit="onSubmit">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-form-group
                            id="user-name"
                            label="Imię"
                            label-for="input-1"
                    >
                        <b-form-input id="input-1" v-model="user.name" trim></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-form-group
                            id="user-surname"
                            label="Nazwisko"
                            label-for="input-2"
                    >
                        <b-form-input id="input-2" v-model="user.surname" trim></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-form-group
                            id="user-street"
                            label="Ulica"
                            label-for="input-3"
                    >
                        <b-form-input id="input-3" v-model="user.street" trim></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-form-group
                            id="user-city"
                            label="Miasto"
                            label-for="input-4"
                    >
                        <b-form-input id="input-4" v-model="user.city" trim></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-form-group
                            id="user-name"
                            label="Kod pocztowy"
                            label-for="input-5"
                    >
                        <b-form-input id="input-5" v-model="user.postalcode" trim></b-form-input>
                        <div class="error" v-if="!$v.user.postalcode.maxLength">Kod pocztowy nie może być
                            dłuższy, niż
                            {{$v.user.postalcode.$params.maxLength.max}}
                            znaków.
                        </div>
                        <div class="error" v-if="!$v.user.postalcode.minLength">Kod pocztowy nie może byc
                            krótszy, niż
                            {{$v.user.postalcode.$params.minLength.min}}
                            znaków.
                        </div>
                    </b-form-group>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <b-button type="submit" variant="primary" class="mr-2">Zapisz</b-button>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import {maxLength, minLength} from 'vuelidate/lib/validators'

    export default {
        name: 'Profile',
        components: {},
        data() {
            return {
                user: null
            }
        },
        created() {
            this.user = this.$store.getters.getUser
        },
        validations: {
            user: {
                postalcode: {
                    maxLength: maxLength(6),
                    minLength: minLength(6)
                }
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch('updateUser', this.user)
                    .then((resp) => {
                        console.log(resp);
                    })
            }
        }
    }
</script>