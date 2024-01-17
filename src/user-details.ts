interface IUser {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: number
        geo: {
            lat: number
            lng: number
        }
    }
    phone: number
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}
class UserDetailsRenderer {
    static async renderUserDetails(userId: number) {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user: IUser = await userResponse.json();

        const userDetailsDiv = document.getElementById('user-details') as HTMLDivElement;

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
        const showPostsButton = document.getElementById('show-posts-button') as HTMLButtonElement;
        showPostsButton.addEventListener('click', async () => {
            await this.showUserPosts(userId);
        });
    }
    static async showUserPosts(userId: number) {
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();

        const userPostsDiv = document.getElementById('user-posts') as HTMLDivElement;
        let postBlocks = '';

        posts.forEach((post: any) => {
            postBlocks += `<div class="post">
                <h3>${post.title}</h3>
                <button data-userid="${userId}" data-postid="${post.id}" class="show-post-details-button">Show Details</button>
            </div>`;
        });

        userPostsDiv.innerHTML =`<div class="postContainer">${postBlocks} </div>`;

        document.querySelectorAll('.show-post-details-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const userId = Number(target.dataset.userid);
                const postId = Number(target.dataset.postid);
                UserDetailsRenderer.showPostDetails(userId, postId);
            });
        });
    }
    static showPostDetails(userId: number, postId: number) {
        window.location.href = `post-details.html?userId=${userId}&postId=${postId}`;
    }

}

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

UserDetailsRenderer.renderUserDetails(parseInt(userId ?? "0", 10));

window.addEventListener('pageshow', function(event): void {
    if (event.persisted) {
        window.location.reload();
    }
});