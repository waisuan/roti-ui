import API from './Api'

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    // TODO: Auth, err handling
    getFeed(limit, offset) {
        return API.get(`machines?page_limit=${limit}&page_offset=${offset}`)
            .then(res => {
                console.log(res.data);
                return res.data;
            }).catch(err => {
                console.error(err);
                return {};
            });
    },
    updateFeedItem(id, body) {
        return API.put(`machines/${id}`, body)
            .then(_ => {
                return true;
            }).catch(err => {
                console.error(err);
                return false;
            })
    },
}