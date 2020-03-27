import Vue from 'vue';

Vue.filter('uppercase', function (value) {
    return value.toUpperCase() || '';
});

Vue.filter('splitString', function (value) {
    return value.split('-');
});
