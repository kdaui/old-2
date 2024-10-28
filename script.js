document.addEventListener("DOMContentLoaded", async () => {
    const bskyDiv = document.querySelector(".bsky p");

    try {
        // Fetch recent posts
        const response = await fetch("https://corsproxy.io/?https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=kdaui.bsky.social");

        if (!response.ok) throw new Error("Failed to fetch the feed");

        const data = await response.json();
        
        // Check for posts
        if (data.feed.length === 0) {
            bskyDiv.innerHTML = "No posts found.";
            return;
        }

        const latestPostUri = data.feed[0].post.uri;

        // Generate the oEmbed URL
        const oEmbedUrl = `https://corsproxy.io/?https://bsky.app/oembed?url=${latestPostUri}`;

        // Fetch the oEmbed HTML for the latest post
        const oEmbedResponse = await fetch(oEmbedUrl);
        if (!oEmbedResponse.ok) throw new Error("Failed to fetch oEmbed data");

        const oEmbedData = await oEmbedResponse.json();
        const postHtml = oEmbedData.html;

        // Display the post
        bskyDiv.innerHTML = postHtml;
    } catch (error) {
        console.error("Error fetching the Bluesky post:", error);
        bskyDiv.innerHTML = "Failed to load the post.";
    }
});