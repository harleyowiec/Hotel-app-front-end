<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="rooms__header mb-5">
                    <h3 class="rooms__header__title">
                        Lista dostępnych pokojów:
                    </h3>
                    <div class="div" v-if="getAuth">
                        <v-btn to="/create" class="ml-auto create-new-room">
                            <font-awesome-icon icon="plus"/>
                        </v-btn>
                    </div>
                </div>
                <RoomsList></RoomsList>
            </div>
        </div>

    </div>
</template>

<script>
    import RoomsList from "../components/Rooms/RoomsList";

    export default {
        name: "Rooms",
        components: {RoomsList},
        data() {
            return {}
        },
        computed: {
            getAuth() {
                return this.$store.getters.isAdmin;
            }
        }
    }
</script>