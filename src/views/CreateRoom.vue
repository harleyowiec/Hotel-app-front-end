<template>
    <div>
        <h2 class="mb-4">Dodaj nowy pokój: </h2>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group class="form-field" id="input-group-3" label="Zdjęcie pokoju:" label-for="input-3">
                <b-form-file
                        v-if="isEditMode && !form.image['first']"
                        class="mb-1"
                        id="input-3"
                        v-model="form.image['first']"
                        @change="onFileChange($event, 'first')"
                        :state="Boolean(form.image['first'])"
                        required
                        placeholder="Wybierz zdjęcie, lub przeciągnij je tutaj..."
                        drop-placeholder="Upuść zdjęcie tutaj..."
                ></b-form-file>
                <b-button
                        class="mb-2"
                        v-if="this.form.image['first']"
                        @click="enableFileReader('first')"
                        type="button"
                        variant="primary">
                    Zresetuj zdjęcie
                </b-button>
                <div class="image-preview w-25 ml-auto mr-auto">
                    <img class="w-100" v-if="form.image['first'] !== ''" :src="form.image['first']"/>
                </div>
            </b-form-group>


            <b-form-group class="form-field" id="input-group-9" label="Zdjęcie pokoju:" label-for="input-9">
                <b-form-file
                        v-if="isEditMode && !form.image['second']"
                        class="mb-1"
                        id="input-9"
                        v-model="form.image['second']"
                        @change="onFileChange($event, 'second')"
                        :state="Boolean(form.image['second'])"
                        required
                        placeholder="Wybierz zdjęcie, lub przeciągnij je tutaj..."
                        drop-placeholder="Upuść zdjęcie tutaj..."
                ></b-form-file>
                <b-button
                        class="mb-2"
                        v-if="this.form.image['second']"
                        @click="enableFileReader('second')"
                        type="button"
                        variant="primary">
                    Zresetuj zdjęcie
                </b-button>
                <div class="image-preview w-25 ml-auto mr-auto">
                    <img class="w-100" v-if="form.image['second'] !== ''" :src="form.image['second']"/>
                </div>
                <!--                <div class="error" v-if="!$v.form['image'].required">Pole wymagane</div>-->
            </b-form-group>
            <b-form-group class="form-field" id="input-group-11" label="Zdjęcie pokoju:" label-for="input-11">
                <b-form-file
                        v-if="isEditMode && !form.image['third']"
                        class="mb-1"
                        id="input-11"
                        v-model="form.image['third']"
                        @change="onFileChange($event, 'third')"
                        :state="Boolean(form.image['third'])"
                        required
                        placeholder="Wybierz zdjęcie, lub przeciągnij je tutaj..."
                        drop-placeholder="Upuść zdjęcie tutaj..."
                ></b-form-file>
                <b-button
                        class="mb-2"
                        v-if="this.form.image['third']"
                        @click="enableFileReader('third')"
                        type="button"
                        variant="primary">
                    Zresetuj zdjęcie
                </b-button>
                <div class="image-preview w-25 ml-auto mr-auto">
                    <img class="w-100" v-if="form.image['third'] !== ''" :src="form.image['third']"/>
                </div>
                <!--                <div class="error" v-if="!$v.form['image'].required">Pole wymagane</div>-->
            </b-form-group>


            <b-form-group class="form-field" id="input-group-1" label="Nazwa pokoju:" label-for="input-1">
                <b-form-input
                        id="input-1"
                        v-model="form.name"
                        required
                        placeholder="Wpisz nazwę"
                ></b-form-input>
                <div class="error" v-if="!$v.form.name.required">Pole wymagane</div>
            </b-form-group>

            <b-form-group class="form-field" id="input-group-2" label="Rozmiar pokoju:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        class="w-100"
                        v-model="form.size"
                        required
                        min="1"
                        type="number"
                        placeholder="Wpisz rozmiar (w metrach)"
                ></b-form-input>
                <div class="error" v-if="!$v.form.size.required">Pole wymagane</div>
                <div class="error" v-if="!$v.form.size.minValue">Wartość musi być większa niż 0</div>
            </b-form-group>


            <b-form-group class="form-field" id="input-group-3" label="Opis pokoju:" label-for="input-3">
                <b-form-textarea
                        id="input-3"
                        v-model="form.description"
                        placeholder="Dodaj opis..."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
                <div class="error" v-if="!$v.form.description.required">Pole wymagane</div>
            </b-form-group>
            <b-form-group class="form-field" id="input-group-4" label="Udogodnienia:" label-for="input-4">
                <b-form-textarea
                        id="input-4"
                        v-model="form.equipment"
                        placeholder="Wpisz udogodnienia..."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
                <div class="error" v-if="!$v.form.equipment.required">Pole wymagane</div>
            </b-form-group>
            <b-form-group class="form-field" id="input-group-5" label="Cena (za noc):" label-for="input-5">
                <b-form-input
                        id="input-5"
                        v-model="form.price"
                        class="w-100"
                        required
                        step="0.01"
                        min="1"
                        type="number"
                        placeholder="Wprowadź cenę"
                ></b-form-input>
                <div class="error" v-if="!$v.form.price.required">Pole wymagane</div>
                <div class="error" v-if="!$v.form.price.minValue">Wartość musi być większa niż 0</div>
            </b-form-group>

            <b-button type="submit" variant="primary" class="mr-2">Zapisz</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-alert variant="success" class="mt-3" :show="showAlert"> {{ roomName }} został dodany do bazy.</b-alert>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Uzupełnij formularz poprawnymi danymi</p>
    </div>
</template>

<script>
    import {required, decimal, numeric, minValue} from 'vuelidate/lib/validators'

    export default {
        name: 'home',
        components: {},
        props: ['id'],
        data() {
            return {
                editMode: this.id !== undefined,
                form: {
                    image: {}
                },
                items: [],
                show: true,
                showAlert: false,
                roomName: '',
                submitStatus: null
            }
        },
        created() {
            if (this.id) {
                this.getRoomData();
            }
        },
        computed: {
            showFileReader: {
                get() {
                    return !this.isEditMode();
                },
                set() {
                    this.showFileReader = true;
                }

            }
        },
        validations: {
            form: {
                image: {
                    required
                },
                name: {
                    required
                },
                size: {
                    required,
                    numeric,
                    minValue: minValue(0)
                },
                description: {
                    required
                },
                equipment: {
                    required
                },
                price: {
                    required,
                    decimal,
                    minValue: minValue(0)
                }
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();

                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    if (this.isEditMode()) {
                        this.updateRoom();
                        return;
                    }
                    this.addItem();
                }
            },
            onReset(evt) {
                evt.preventDefault();

                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            },
            onFileChange(event, image) {
                let input = event.target;
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        this.form.image[image] = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            },
            addItem() {
                this.$store.dispatch('addRoom', this.form)
                    .then(() => {
                        this.triggerAlert();
                        this.form = {};
                        this.$router.replace('/rooms');
                    });
            },
            getRoomData() {
                this.$store.dispatch('getRoom', this.id)
                    .then(() => {
                        this.form = this.$store.getters.getRoom
                    });
            },
            isEditMode() {
                return this.editMode;
            },
            updateRoom() {
                this.$store.dispatch('updateRoom', this.form)
                    .then(() => {
                        this.$router.replace('/rooms');
                    });
            },
            enableFileReader(image) {
                this.form.image[image] = null;
            },
            triggerAlert() {
                this.showAlert = true;
                this.roomName = this.form.name;
            }
        },

    }
</script>