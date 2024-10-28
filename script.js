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

            // Extract relevant information
            const postText = recentPost.record.text; // Assuming the text is in record.text
            const postAuthor = recentPost.author.displayName; // Assuming displayName is here
            const postCreatedAt = new Date(recentPost.createdAt);
            const timeSince = timeAgo(postCreatedAt); // Call to a function that formats time
            const postUri = recentPost.uri;
            const avatarUrl = recentPost.author.avatar; // Assuming avatar URL is in the author object

            // Display the post in your HTML
            bskyDiv.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <h3>Bsky-ing</h3>
                    <img src="${avatarUrl}" alt="${postAuthor}'s avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                    <div>
                        <strong>${postAuthor}</strong> • <small>${timeSince}</small>
                        <div>${postText}</div>
                        <small><a href="${postUri}" target="_blank">View Post</a></small>
                    </div>
                </div>
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

// Function to calculate time since the post was created
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
}

// Call the function to fetch and display the post
fetchBlueskyPost();
