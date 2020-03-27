<template>
    <div class="users">
        <h3 class="mb-3">
            Role użytkowników
        </h3>
        <div v-if="users">
            <b-list-group v-for="user in this.users" :key="user.id">
                <b-list-group-item>
                    <User :user="user">
                    </User>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import User from '../components/User';

    export default {
        name: "Users",
        components: {User},
        data() {
            return {
                users: null
            }
        },
        created() {
            this.$store.dispatch('getUsers')
                .then(response => {
                    this.users = response.data;
                })
        }
    }
</script>