async function fetchBlueskyPost() {
    try {
        const response = await fetch("https://api-amber-psi.vercel.app/api/fetchBluesky");
        if (!response.ok) {
            throw new Error("Failed to fetch Bluesky post");
        }
        
        const data = await response.json();
        console.log("Response Data:", data); // Log the full response for debugging

        // Ensure the feed exists and has posts
        if (data.feed && data.feed.length > 0) {
            // Get the most recent post
            const recentPost = data.feed[0].post;

            // Extract relevant information
            const postText = recentPost.record.text; // Assuming the text is in record.text
            const postAuthor = recentPost.author.displayName; // Assuming displayName is here
            const postCreatedAt = new Date(recentPost.createdAt).toLocaleString(); // Convert to a readable format
            const postUri = recentPost.uri;

            // Display the post in your HTML (you may need to adjust selectors)
            const postContainer = document.getElementById("post-container");
            postContainer.innerHTML = `
                <div>
                    <h3>${postAuthor} said:</h3>
                    <p>${postText}</p>
                    <small>Posted on ${postCreatedAt}</small>
                    <a href="${postUri}" target="_blank">View Post</a>
                </div>
            `;
        } else {
            console.error("No posts found in the feed.");
            document.getElementById("post-container").innerText = "No posts available.";
        }
    } catch (error) {
        console.error("Error loading post:", error);
        document.getElementById("post-container").innerText = "Error loading post.";
    }
}

// Call the function to fetch and display the post
fetchBlueskyPost();
