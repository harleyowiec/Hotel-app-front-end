<template>
    <div class="room-short-info w-100 mb-3">
        <div class="room-short-info__thumbnail mr-3">
            <img :src="image" alt="thumbnail">
        </div>
        <div class="room-short-info__description">
            <span>{{ name }} </span>
            <span>{{ description }} </span>
            <span>{{ size }}&#13217; </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Room",
        props: {
            name: String,
            size: Number,
            description: String,
            image: String
        },
        data() {
            return {}
        }
    }
</script>