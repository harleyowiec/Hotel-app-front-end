<template>
    <b-list-group-item class="reservation d-flex flex-row justify-content-between align-center w-100 text-left">
        <strong class="w-25">{{ name }}: </strong>
        <span class="text-center w-25">{{ value }}</span>
    </b-list-group-item>
</template>

<script>

    export default {
        name: 'ReservationDetail',
        props: ['name', 'value'],
        data() {
            return {}
        }
    }
</script>