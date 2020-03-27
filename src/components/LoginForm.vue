<template>
    <div :class="containerClass">
        <form>
            <div class="row justify-content-center align-center">
                <div class="col-12">
                    <v-text-field
                            v-model="form.username"
                            label="Login"
                    ></v-text-field>
                </div>
                <div class="error" v-if="!$v.form.username.required">Pole wymagane</div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <v-text-field
                            v-model="form.password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="Hasło"
                            hint="Min. 8 znaków"
                            counter
                            @click:append="show = !show"
                    ></v-text-field>
                    <div class="error" v-if="!$v.form.password.required">Pole wymagane</div>
                    <div class="error" v-if="!$v.form.password.minLength">Hasło musi składać się co najmniej z
                        {{$v.form.password.$params.minLength.min}}
                        znaków.
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <b-button type="submit" variant="outline-success" @click="submit"
                              :disabled="submitStatus === 'PENDING'">
                        {{ submitButtonText | uppercase }}
                    </b-button>
                </div>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Uzupełnij formularz poprawnymi danymi</p>
            </div>
            <div class="row">
                <div class="col-12">
                    <slot></slot>
                </div>
            </div>
            <div v-if="getPending" class="row">
                <div class="col-12">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                </div>
            </div>
            <div v-if="getFailed" class="row">
                <div class="col-12 red--text">
                    <p>
                        {{ getErrorMessage }}
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "LoginForm",
        props: {
            containerClass: String,
            buttonText: String,
            submitRedirect: String,
        },
        data() {
            return {
                submitButtonText: this.buttonText,
                show: false,
                submitStatus: null,
                form: {
                    username: '',
                    password: ''
                },
            }
        },
        computed: {
            getPending() {
                return this.$store.getters.isPending;
            },
            getFailed() {
                return this.$store.getters.loginFailed;
            },
            getErrorMessage() {
                return this.$store.getters.getErrorMessage;
            }
        },
        validations: {
            form: {
                username: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(8)
                }
            }
        },
        methods: {
            submit: function (e) {
                e.preventDefault();

                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.$emit('submit', this.form);
                    this.submitStatus = 'OK';
                }
            }
        }
    }
</script>
