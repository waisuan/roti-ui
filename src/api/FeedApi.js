import API from './Api'

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    // TODO: Auth, err handling
    getFeed(limit, offset) {
        return API.get(`machines?page_limit=${limit}&page_offset=${offset}`)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return {};
            });
    },
    updateFeedItem(id, body) {
        return API.put(`machines/${id}`, body)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return null;
            })
    },
    deleteFeedItem(id) {
        return API.delete(`machines/${id}`)
            .then(_ => {
                return true;
            }).catch(err => {
                console.error(err);
                return false;
            })
    },
    addFeedItem(body) {
        return API.post(`machines`, body)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.error(err);
                return null;
            })
    },
    uploadFile(id, file) {
        const formData = new FormData();
        formData.append("file", file, file.name);

        return API.post(`files/${id}`, formData)
            .then(_ => {
                return true;
            }).catch(err => {
                console.error(err);
                return false;
            })
    }
}