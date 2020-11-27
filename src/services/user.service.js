// user.service.js
// User Data Service

import http from './http-common'
import authHeader from "@/services/auth-header";

class UsersService {
    getAll() {
        console.log(authHeader());
        return http.get('/users', { headers: authHeader() });
    }
    getUserById(id) {
        return http.get(`/users/${id}`, { headers: authHeader() });
    }
    editUser(user_id, data){
        return http.put(`/users/${user_id}`, data, { headers: authHeader() })
    }
    getPostCount(id) {
        return http.get(`/users/${id}/posts`, { headers: authHeader() });
    }
    getAllSubscriptions(user_id){
        return http.get(`/users/${user_id}/subscriptions`, { headers: authHeader() });
    }
    getSubscribers(user_id){
        return http.get(`/users/${user_id}/subscribers`, { headers: authHeader() });
    }
    getSubscription(user_id, subscriber_id) {
        return http.get(`/users/${user_id}/subscriptions/${subscriber_id}`, { headers: authHeader() });
    }
    subscribe(user_id, subscriber_id, data){
        return http.post(`/users/${user_id}/subscriptions/${subscriber_id}`, data, { headers: authHeader() })
    }
    unsubscribe(user_id, subscriber_id){
        return http.delete(`/users/${user_id}/subscriptions/${subscriber_id}`, { headers: authHeader() })
    }

    getAllBookmarks(user_id){
        return http.get(`/users/${user_id}/bookmarks`, {headers: authHeader()});
    }
    getBookmark(user_id, post_id){
        return http.get(`/users/${user_id}/posts/${post_id}/bookmarks`, {headers: authHeader()});
    }
    addBookmark(user_id, post_id, data){
        return http.post(`/users/${user_id}/posts/${post_id}/bookmarks`, data, {headers: authHeader()});
    }
    removeBookmark(user_id, post_id){
        return http.delete(`/users/${user_id}/posts/${post_id}/bookmarks`, {headers: authHeader()});
    }

    getQualification(user_id, post_id) {
        return http.get(`/users/${user_id}/posts/${post_id}/qualifications`, { headers: authHeader() });
    }
    addQualification(user_id, post_id, data){
        return http.post(`/users/${user_id}/posts/${post_id}/qualifications`, data, { headers: authHeader() })
    }
    editQualification(user_id, post_id, data){
        return http.put(`/users/${user_id}/posts/${post_id}/qualifications`, data, { headers: authHeader() })
    }
}

export default new UsersService();
