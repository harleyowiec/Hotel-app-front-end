<template>
    <div class="rooms__list d-flex flex-column align-start">
        <router-link :to="`/rooms/${room.id}`" class="rooms-list__item w-100" v-for="room in this.rooms"
                     :key="room.id">
            <RoomShortInfo
                    :image="room.image['first']"
                    :name="room.name"
                    :size="Number(room.size)"
                    :description="room.description"
            >
            </RoomShortInfo>
        </router-link>
    </div>
</template>

<script>
    import RoomShortInfo from "./RoomShortInfo";
    import {mapGetters} from 'vuex';

    export default {
        name: "RoomsList",
        components: {RoomShortInfo},
        data() {
            return {}
        },
        created: function () {
            this.$store.dispatch('getRooms')
        },
        computed: {
            ...mapGetters({
                rooms: 'getRooms'
            })
        },
        methods: {}
    }
</script>