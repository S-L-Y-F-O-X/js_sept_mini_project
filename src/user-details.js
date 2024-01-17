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
class UserDetailsRenderer {
    static renderUserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const user = yield userResponse.json();
            const userDetailsDiv = document.getElementById('user-details');
            userDetailsDiv.innerHTML = `
                <div id="details">
                <h2>${user.name}</h2>
                <p>ID: ${user.id}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Username: ${user.username}</p>
                <p>Address: ${user.address.city}, ${user.address.street}, ${user.address.suite}, ${user.address.zipcode}</p>
                <p>Geo: ${user.address.geo.lat}, ${user.address.geo.lng}</p>
                <p>Company: ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}</p>
                <p>Website: ${user.website}</p>
                </div>
                <button id="show-posts-button">Show Posts</button>
            `;
            const showPostsButton = document.getElementById('show-posts-button');
            showPostsButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                yield this.showUserPosts(userId);
            }));
        });
    }
    static showUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsResponse = yield fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            const posts = yield postsResponse.json();
            const userPostsDiv = document.getElementById('user-posts');
            let postBlocks = '';
            posts.forEach((post) => {
                postBlocks += `<div class="post">
                <h3>${post.title}</h3>
                <button data-userid="${userId}" data-postid="${post.id}" class="show-post-details-button">Show Details</button>
            </div>`;
            });
            userPostsDiv.innerHTML = `<div class="postContainer">${postBlocks} </div>`;
            document.querySelectorAll('.show-post-details-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const target = event.target;
                    const userId = Number(target.dataset.userid);
                    const postId = Number(target.dataset.postid);
                    UserDetailsRenderer.showPostDetails(userId, postId);
                });
            });
        });
    }
    static showPostDetails(userId, postId) {
        window.location.href = `post-details.html?userId=${userId}&postId=${postId}`;
    }
}
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
UserDetailsRenderer.renderUserDetails(parseInt(userId !== null && userId !== void 0 ? userId : "0", 10));
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});
