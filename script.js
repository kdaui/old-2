async function fetchBlueskyPost() {
    try {
        const response = await fetch("https://api-amber-psi.vercel.app/api/fetchBluesky");
        if (!response.ok) {
            throw new Error("Failed to fetch Bluesky post");
        }
        
        const data = await response.json();
        console.log("Response Data:", data); // Log the full response for debugging

        // Ensure the feed exists and has posts
        const bskyDiv = document.querySelector(".bsky"); // Select by class
        if (data.feed && data.feed.length > 0) {
            // Get the most recent post
            const recentPost = data.feed[0].post;

            // Create an embedded post using the URI
            const postUri = recentPost.uri;

            // Display the embedded post
            bskyDiv.innerHTML = `
                <blockquote class="bsky-embed" data-uri="${postUri}">
                    <p>Loading post...</p>
                </blockquote>
                <script async src="https://bsky.app/embed.js"></script>
            `;
        } else {
            console.error("No posts found in the feed.");
            bskyDiv.innerHTML = "<p>No posts found.</p>"; // Replace content here
        }
    } catch (error) {
        console.error("Error loading post:", error);
        document.querySelector(".bsky").innerHTML = "<p>Error loading post.</p>"; // Update this message as well
    }
}

// Call the function to fetch and display the post
fetchBlueskyPost();
