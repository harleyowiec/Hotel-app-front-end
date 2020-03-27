<template>
    <div class="user d-flex flex-row justify-content-start align-center">
        <div class="user__name text-left">
            <strong> Użytkownik: </strong> {{ user.username }}
        </div>
        <div class="user__role d-flex justify-content-between flex-row align-center">
            <b-form-select v-model="form.selectedRole" :options="roles"></b-form-select>
            <b-button
                    @click="saveUsersRoles"
                    class="white--text ml-2"
                    variant="primary"
            >
                <font-awesome-icon icon="save"/>
            </b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'User',
        props: {
            user: Object
        },
        data() {
            return {
                form: {
                    id: this.user.id,
                    selectedRole: this.user.role,
                },
                roles: ['user', 'admin']
            }
        },
        methods: {
            saveUsersRoles() {
                this.$store.dispatch('saveRole', this.form);
            }
        },
    }
</script>