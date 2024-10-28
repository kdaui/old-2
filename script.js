async function fetchBlueskyPost() {
    try {
        const response = await fetch('https://api-amber-psi.vercel.app/api/fetchBluesky');
        const data = await response.json();

        // Log the entire data response to understand its structure
        console.log("Response Data:", data);

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch post');
        }

        // Check if feeds exist
        if (!data.feeds || data.feeds.length === 0) {
            document.querySelector('.bsky').innerHTML = '<h3>Bsky-ing</h3><p>No posts found.</p>';
            return;
        }

        // Get the latest post
        const latestPost = data.feeds[0]; // Get the first feed (latest post)

        // Assuming the post content is in a property like 'description'
        const postContent = latestPost.description || "No content available"; // Adjust based on actual structure
        const bskyDiv = document.querySelector('.bsky');
        bskyDiv.innerHTML = `<h3>Bsky-ing</h3><p>${postContent}</p>`;
    } catch (error) {
        console.error("Error loading post:", error);
        document.querySelector('.bsky').innerHTML = '<p>Error loading post.</p>';
    }
}

fetchBlueskyPost();
