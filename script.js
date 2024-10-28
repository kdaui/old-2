async function fetchBlueskyPost() {
    try {
        const response = await fetch('https://api-amber-psi.vercel.app/');
        const data = await response.json();

        if (data.feed && data.feed.length > 0) {
            const post = data.feed[0].post;
            const postContent = post.record.text;
            const author = post.author;
            const avatar = author.avatar;
            const displayName = author.displayName;

            // Calculate time since the post
            const createdAt = new Date(post.createdAt);
            const now = new Date();
            const secondsAgo = Math.floor((now - createdAt) / 1000);
            let timeAgo;

            if (secondsAgo < 60) {
                timeAgo = `${secondsAgo} seconds ago`;
            } else if (secondsAgo < 3600) {
                timeAgo = `${Math.floor(secondsAgo / 60)} minutes ago`;
            } else if (secondsAgo < 86400) {
                timeAgo = `${Math.floor(secondsAgo / 3600)} hours ago`;
            } else {
                timeAgo = `${Math.floor(secondsAgo / 86400)} days ago`;
            }

            document.querySelector(".bsky").innerHTML = `
                <h3>Bsky-ing</h3>
                <div class="post">
                    <img src="${avatar}" alt="Avatar" class="avatar">
                    <span><strong>${displayName}</strong> • ${timeAgo}</span>
                    <p>${postContent}</p>
                </div>
            `;
        } else {
            document.querySelector(".bsky").innerHTML = "<h3>Bsky-ing</h3><p>No posts found.</p>";
        }
    } catch (error) {
        console.error("Error loading post:", error);
        document.querySelector(".bsky").innerHTML = "<h3>Bsky-ing</h3><p>Error loading post.</p>";
    }
}

fetchBlueskyPost();
