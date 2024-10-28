function fetchBlueskyPost() {
    fetch('https://api-amber-psi.vercel.app/api/fetchBluesky')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching Bluesky post');
            }
            return response.json();
        })
        .then(data => {
            const posts = data.feed;
            const bskyDiv = document.querySelector('.bsky');
            bskyDiv.innerHTML = ''; // Clear previous content

            if (posts.length > 0) {
                const { post } = posts[0]; // Get the most recent post
                const postUri = post.uri;

                // Display only the post
                bskyDiv.innerHTML = `<p>${post.record.text}</p><a href="${postUri}" target="_blank">View Post</a>`;
            } else {
                bskyDiv.innerHTML = '<p>No posts found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading post:', error);
            document.querySelector('.bsky').innerHTML = '<p>Error loading post.</p>';
        });
}
