import { wodsService, responsesService } from '../_services';

const state = {
    wods: {},
    status: {},
    response: {}
};

const actions = {
    getWods({ commit }) {
        commit('getWodsRequest');

        wodsService.getWods().then(
            wods => commit('getWodsSuccess', wods),
            error => commit('getWodsFailure', error)
        );
    },

    postWod({ commit }, wod) {
        commit('postWodRequest');

        wodsService.postWod(wod).then(
            wod => commit('postWodSuccess', wod),
            error => commit('postWodFailure', error)
        );
    },

    updateWod({ commit }, wod) {
        commit('updateRequest', wod._id);
        wodsService.updateWod(wod).then(
            wod => commit('updateSuccess', wod),
            error =>
                commit('updateFailure', {
                    id: error._id,
                    error: error.toString()
                })
        );
    },

    deleteWod({ commit }, id) {
        commit('deleteRequest', id);

        wodsService.deleteWod(id).then(
            wod => commit('deleteSuccess', id),
            error => commit('deleteFailure', { id, error: error.toString() })
        );
    },

    postResponse({ commit }, response) {
        commit('postResponseRequest');

        responsesService.postResponse(response).then(
            response => commit('postResponseSuccess', response),
            error => commit('postResponseFailure', error)
        );
    },

    updateResponse({ commit }, { wod, response }) {
        commit('updateResponseRequest', wod, response._id);
        responsesService.updateResponse(response).then(
            response =>
                commit('updateResponseSuccess', {
                    wodId: wod,
                    editResponse: response
                }),
            error =>
                commit('updateResponseFailure', {
                    id: error._id,
                    error: error.toString()
                })
        );
    },

    deleteResponse({ commit }, { wod, _id }) {
        commit('deleteResponseRequest', wod, _id);

        responsesService.deleteResponse(_id).then(
            response =>
                commit('deleteResponseSuccess', { wodId: wod, _id: _id }),
            error =>
                commit('deleteResponseFailure', {
                    _id,
                    error: error.toString()
                })
        );
    }
};

const mutations = {
    getWodsRequest(state) {
        state.wods = { loading: true };
    },
    getWodsSuccess(state, wods) {
        state.wods = wods;
    },
    getAllFailure(state, error) {
        state.wods = { error: error };
    },
    postWodRequest(state) {
        state.status = { adding: true };
    },
    postWodSuccess(state, wod) {
        state.status = { added: true };
        state.wods.push(wod);
    },
    postWodFailure(state) {
        state.status = {};
    },
    updateRequest(state, id) {
        // add 'updating:true' property to wod by id
        state.wods = state.wods.map(wod =>
            wod._id === id ? { ...wod, updating: true } : wod
        );
    },
    updateSuccess(state, editWod) {
        state.wods = state.wods.map(wod =>
            wod._id === editWod._id ? { ...wod, ...editWod } : wod
        );
    },
    updateFailure(state, error) {
        // remove 'updating:true' property and add 'deleteError:[error]' property to wod
        state.wods = state.wods.map(wod => {
            if (wod._id === error._id) {
                // make copy of wod without 'updating:true' property
                const { updating, ...wodCopy } = wod;
                // return copy of wod with 'updateError:[error]' property
                return { ...wodCopy, updateError: error };
            }
            return wod;
        });
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to wod being deleted
        state.wods = state.wods.map(wod =>
            wod._id === id ? { ...wod, deleting: true } : wod
        );
    },
    deleteSuccess(state, id) {
        // remove deleted wod from state
        state.wods = state.wods.filter(wod => wod._id !== id);
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to wod
        state.wods = state.wods.map(wod => {
            if (wod._id === id) {
                // make copy of wod without 'deleting:true' property
                const { deleting, ...wodCopy } = wod;
                // return copy of wod with 'deleteError:[error]' property
                return { ...wodCopy, deleteError: error };
            }
            return user;
        });
    },
    postResponseRequest(state) {
        state.response = { adding: true };
    },
    postResponseSuccess(state, response) {
        state.response = { added: true };
        console.log(state.wods);
        state.wods = state.wods.map(wod => {
            if (wod._id === response.wod) {
                wod.responses.push(response);
            }
            return wod;
        });
        // console.log(state.wods);
    },
    postResponseFailure(state) {
        state.response = {};
    },
    updateResponseRequest(state, id) {
        // add 'deleting:true' property to wod being deleted
        // state.wods = state.wods.map(wod => (wod._id === id ? { ...wod, deleting: true } : wod));
    },
    updateResponseSuccess(state, { wodId, editResponse }) {
        // remove deleted wod from state
        // state.wods = state.wods.map(wod => (wod._id === editWod._id ? { ...wod, ...editWod } : wod));
        state.wods = state.wods.map(wod => {
            if (wod._id === wodId) {
                wod.responses = wod.responses.map(response =>
                    response._id === editResponse._id
                        ? { ...response, ...editResponse }
                        : response
                );
            }
            return wod;
        });
    },
    updateResponseFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to wod
        // state.wod = state.wod.map(wod => {
        //   if (wod._id === id) {
        //     // make copy of wod without 'deleting:true' property
        //     const { deleting, ...wodCopy } = wod;
        //     // return copy of wod with 'deleteError:[error]' property
        //     return { ...wodCopy, deleteError: error };
        //   }
        //   return user;
        // });
    },
    deleteResponseRequest(state, id) {
        // add 'deleting:true' property to wod being deleted
        // state.wods = state.wods.map(wod => (wod._id === id ? { ...wod, deleting: true } : wod));
    },
    deleteResponseSuccess(state, { wodId, _id }) {
        // remove deleted wod from state
        state.wods = state.wods.map(wod => {
            if (wod._id === wodId) {
                wod.responses = wod.responses.filter(
                    response => response._id !== _id
                );
            }
            return wod;
        });
    },
    deleteResponseFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to wod
        // state.wod = state.wod.map(wod => {
        //   if (wod._id === id) {
        //     // make copy of wod without 'deleting:true' property
        //     const { deleting, ...wodCopy } = wod;
        //     // return copy of wod with 'deleteError:[error]' property
        //     return { ...wodCopy, deleteError: error };
        //   }
        //   return user;
        // });
    }
};

export const wods = {
    namespaced: true,
    state,
    actions,
    mutations
};
