interface IPost {
    id: number;
    title: string;
    body: string;
}
interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

class PostDetailsRenderer {
    static async renderPostDetails(postId: number) {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post: IPost = await postResponse.json();

        const postDetailsDiv = document.getElementById('post-details') as HTMLDivElement;
        postDetailsDiv.innerHTML = `
            <h2>Post Details</h2>
        <p><u>ID:</u> ${post.id}</p>
        <p><u>Title:</u> ${post.title}</p>
        <p><u>Body:</u> ${post.body}</p>`;

        await this.renderPostComments(postId);
    }

    static async renderPostComments(postId: number) {
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments: IComment[] = await commentsResponse.json();

        const postCommentsDiv = document.getElementById('post-comments') as HTMLDivElement;

        postCommentsDiv.innerHTML = `
            ${comments.map((comment: IComment) =>
              `<div class="comment">
                <p><u>Id:</u> ${comment.id}</p>
                <p><u>PostId:</u> ${comment.postId}</p>
                <p><u>Name:</u> ${comment.name}</p>
            <p><u>Email:</u> ${comment.email}</p>
        <p><u>Body:</u> ${comment.body}</p>
        </div>
    `).join('')}`;
}
}
const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    PostDetailsRenderer.renderPostDetails(parseInt(postId ?? "0", 10));
}
init();

window.addEventListener('pageshow', function(event): void {
    if (event.persisted) {
        window.location.reload();
    }
});
