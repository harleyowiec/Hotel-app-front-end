import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const GET_ROOMS = "GET_ROOMS";
const SET_USER_NAME = "SET_USER_NAME";
const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
const RESET_AUTH_TOKEN = "RESET_AUTH_TOKEN";
const ADD_ROOM = "ADD_ROOM";
const GET_ROOM = "GET_ROOM";
const UPDATE_ROOM = "UPDATE_ROOM";
const DELETE_ROOM = "DELETE_ROOM";
const ADD_RESERVATION = "ADD_RESERVATION";
const UPDATE_ROLE = "UPDATE_ROLE";
const SET_USER_ID = "SET_USER_ID";
const SET_ADMIN = "SET_ADMIN";
const CANCEL_RESERVATION = "CANCEL_RESERVATION";
const SET_USER = "SET_USER";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        isAdmin: false,
        pending: false,
        loginFailed: false,
        errorMessage: '',
        roomAddedMessage: '',
        username: '',
        userId: null,
        rooms: [],
        room: null,
        user: {
            name: '',
            surname: '',
            street: '',
            city: '',
            postalcode: ''
        },
        book: false,
        reservations: false,
        updateRole: false,
        cancelStatus: false
    },
    mutations: {
        [LOGIN](state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS](state) {
            state.isLoggedIn = true;
            state.loginFailed = false;
            state.pending = false;
        },
        [LOGIN_FAILED](state, message) {
            state.pending = false;
            state.loginFailed = true;
            state.errorMessage = message;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.userId = null;
        },
        [GET_ROOMS](state, roomsContainer) {
            state.rooms = roomsContainer;
        },
        [SET_USER_NAME](state, name) {
            state.username = name;
        },
        [SET_USER_ID](state, id) {
            state.userId = id;
        },
        [SET_USER](state, user) {
            state.user = user;
        },
        [SET_AUTH_TOKEN](state, token) {
            localStorage.setItem("token", token.token);
        },
        [RESET_AUTH_TOKEN]() {
            localStorage.removeItem("token");
        },
        [ADD_ROOM](state) {
            state.roomAddedMessage = 'added';
        },
        [ADD_ROOM](state, room) {
            state.room = room;
        },
        [GET_ROOM](state, room) {
            state.room = room;
        },
        [UPDATE_ROOM](state, newRoom) {
            state.room = newRoom;
        },
        [DELETE_ROOM](state) {
            state.room = null;
        },
        [ADD_RESERVATION](state) {
            state.book = true;
        },
        [UPDATE_ROLE](state) {
            state.updateRole = true;
        },
        [SET_ADMIN](state) {
            state.isAdmin = true;
        },
        [CANCEL_RESERVATION](state) {
            state.cancelStatus = false;
        }
    },
    actions: {
        register({commit, dispatch}, creds) {
            commit(LOGIN); // show spinner
            return new Promise(resolve => {
                axios
                    .post('users/new', {
                        username: creds.username,
                        password: creds.password
                    })
                    .then(() => {
                        dispatch('login', {
                            username: creds.username,
                            password: creds.password
                        })
                            .then(() => {
                                resolve();
                            });

                    })
            });
        },
        login({commit}, creds) {
            commit(LOGIN);
            return new Promise((resolve, reject) => {
                axios
                    .post(`login`, {
                        username: creds.username,
                        password: creds.password
                    })
                    .then((response) => {
                        const token = {
                            token: response.data.token
                        };
                        commit(LOGIN_SUCCESS);
                        commit(SET_AUTH_TOKEN, token);
                        commit(SET_USER_NAME, response.data.user.username);
                        commit(SET_USER_ID, response.data.user.id);
                        commit(SET_USER, response.data.user);
                        if (response.data.user.role === 'admin') {
                            commit(SET_ADMIN);
                        }
                        resolve();
                    })
                    .catch(() => {
                        commit(LOGIN_FAILED, 'Niepoprawny login lub hasło. Spróbuj ponownie');
                        reject();
                    });
            });

        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit(RESET_AUTH_TOKEN);
                commit(LOGOUT);
                resolve();
            })
        },
        getRooms({commit}) {
            return new Promise((resolve, reject) => {
                let roomsContainer = [];
                axios
                    .get('rooms')
                    .then(response => {
                        roomsContainer = response.data;
                        commit(GET_ROOMS, roomsContainer);
                        resolve(roomsContainer);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        addRoom({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .post('rooms/new', {
                        name: creds.name,
                        description: creds.description,
                        equipment: creds.equipment,
                        image: creds.image,
                        size: creds.size,
                        price: creds.price
                    })
                    .then((response) => {
                        commit(ADD_ROOM, response);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getRoom({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`rooms/${creds}`, {
                        headers: {
                            apiKey: 'kp4c8fPITT'
                        }
                    })
                    .then(response => {
                        commit(GET_ROOM, response.data[0]);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            })
        },
        updateRoom({commit}, creds) {
            return new Promise((resolve, reject) => {
                const newRoom = {
                    name: creds.name,
                    description: creds.description,
                    equipment: creds.equipment,
                    image: creds.image,
                    size: creds.size,
                    price: creds.price
                };
                axios
                    .put(`rooms/${creds.id}/update`, {
                        name: creds.name,
                        description: creds.description,
                        equipment: creds.equipment,
                        image: creds.image,
                        size: creds.size,
                        price: creds.price
                    })
                    .then(() => {
                        commit(UPDATE_ROOM, newRoom);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            })
        },
        deleteRoom({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`rooms/${creds}/delete`)
                    .then(() => {
                        commit(DELETE_ROOM);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        addReservation({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .post('reservations/new', {
                        roomId: creds.roomId,
                        userId: creds.userId,
                        name: creds.name,
                        surname: creds.surname,
                        street: creds.street,
                        city: creds.city,
                        postalCode: creds.postalCode,
                        startDate: creds.dateStart,
                        startTime: creds.startTime,
                        endTime: '11:00',
                        endDate: creds.dateEnd,
                        days: creds.daysNumber,
                        finalPrice: creds.price,
                        paymentType: 'online'
                    })
                    .then((response) => {
                        commit(ADD_RESERVATION, response);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getReservations() {
            return new Promise((resolve, reject) => {
                axios
                    .get('reservations', {
                        headers: {
                            apiKey: 'kp4c8fPITT'
                        }
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getUserReservations() {
            return new Promise((resolve, reject) => {
                axios
                    .get(`reservations/${this.getters.getUserId}`, {
                        headers: {
                            apiKey: 'kp4c8fPITT'
                        }
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        cancelReservation({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`reservations/${creds}/delete`, {
                        headers: {
                            apiKey: 'kp4c8fPITT'
                        }
                    })
                    .then((response) => {
                        resolve(response.data);
                        commit(CANCEL_RESERVATION);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getUsers() {
            return new Promise((resolve, reject) => {
                axios
                    .get('users')
                    .then(response => {
                        resolve(response);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        updateUser({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .put(`users/${this.getters.getUserId}/update`, {
                        name: creds.name,
                        surname: creds.surname,
                        street: creds.street,
                        city: creds.city,
                        postalcode: creds.postalcode
                    })
                    .then(response => {
                        resolve(response);
                        commit(SET_USER, creds)
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        saveRole({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .post('updateRole', {
                        id: creds.id,
                        role: creds.selectedRole
                    })
                    .then((response) => {
                        commit(UPDATE_ROLE);
                        resolve(response);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        authToken({commit}, creds) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`authToken`, {
                        token: creds
                    })
                    .then((response) => {
                        if (response.data.user) {
                            commit(LOGIN_SUCCESS);
                            commit(SET_USER_NAME, response.data.user.username);
                            commit(SET_USER_ID, response.data.user.id);
                            commit(SET_USER, response.data.user);
                            if (response.data.user.role === 'admin') {
                                commit(SET_ADMIN);
                            }
                        }
                        resolve(response);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        isPending: state => state.pending,
        loginFailed: state => state.loginFailed,
        getErrorMessage: state => state.errorMessage,
        getUsername: state => state.username,
        getRooms: state => state.rooms,
        getRoom: state => state.room,
        getUserId: state => state.userId,
        getUser: state => state.user,
        isAdmin: state => state.isAdmin,
        getCancelStatus: state => state.cancelStatus
    }
})
