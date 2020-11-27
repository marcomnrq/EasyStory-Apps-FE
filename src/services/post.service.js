import http from './http-common'
import authHeader from "@/services/auth-header";

class PostService {
    getAllPosts() {
        console.log(authHeader());
        return http.get('/posts', { headers: authHeader() });
    }
    getPostById(postId) {
        return http.get(`/posts/${postId}`, { headers: authHeader() });
    }
    editPost(post_id, data) {
        return http.put(`/posts/${post_id}`, data, {headers: authHeader()})
    }
    deletePost(post_id){
        return http.delete(`/posts/${post_id}`, {headers: authHeader()})
    }
    getPostHashtags(postId) {
        return http.get(`/posts/${postId}/hashtags`, {headers: authHeader()})
    }
    getPostComments(postId) {
        return http.get(`/posts/${postId}/comments`, {headers: authHeader()})
    }
    addPost(user_id, data) {
        return http.post(`/users/${user_id}/posts`, data, {headers: authHeader()})
    }
    getPostQualifications(post_id){
        return http.get(`/posts/${post_id}/qualifications`, {headers: authHeader()});
    }
    addComment(user_id, post_id, data) {
        return http.post(`/users/${user_id}/posts/${post_id}/comments`, data, {headers: authHeader()})
    }
    getAllHashtags() {
        return http.get(`/hashtags`, {headers: authHeader()})
    }
    getHashtagById(hashtag_id) {
        return http.get(`/hashtags/${hashtag_id}`, {headers: authHeader()})
    }
    getAllPostsByHashtagId(hashtag_id) {
        return http.get(`/hashtags/${hashtag_id}/posts`, {headers: authHeader()})
    }
    assignHashtag(post_id, hashtag_id, data) {
        return http.post(`/posts/${post_id}/hashtags/${hashtag_id}`, data, {headers: authHeader()})
    }
    unassignHashtag(post_id, hashtag_id) {
        return http.delete(`/posts/${post_id}/hashtags/${hashtag_id}`,  {headers: authHeader()})
    }

}

export default new PostService();
