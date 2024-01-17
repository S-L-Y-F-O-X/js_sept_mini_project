"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PostDetailsRenderer {
    static renderPostDetails(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postResponse = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const post = yield postResponse.json();
            const postDetailsDiv = document.getElementById('post-details');
            postDetailsDiv.innerHTML = `
            <h2>Post Details</h2>
        <p><u>ID:</u> ${post.id}</p>
        <p><u>Title:</u> ${post.title}</p>
        <p><u>Body:</u> ${post.body}</p>`;
            yield this.renderPostComments(postId);
        });
    }
    static renderPostComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsResponse = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comments = yield commentsResponse.json();
            const postCommentsDiv = document.getElementById('post-comments');
            postCommentsDiv.innerHTML = `
            ${comments.map((comment) => `<div class="comment">
                <p><u>Id:</u> ${comment.id}</p>
                <p><u>PostId:</u> ${comment.postId}</p>
                <p><u>Name:</u> ${comment.name}</p>
            <p><u>Email:</u> ${comment.email}</p>
        <p><u>Body:</u> ${comment.body}</p>
        </div>
    `).join('')}`;
        });
    }
}
const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    PostDetailsRenderer.renderPostDetails(parseInt(postId !== null && postId !== void 0 ? postId : "0", 10));
};
init();
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});
