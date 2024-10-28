document.addEventListener("DOMContentLoaded", async () => {
    const bskyDiv = document.querySelector(".bsky p");

    try {
        const response = await fetch("https://api-amber-psi.vercel.app/api/fetchBluesky");

        if (!response.ok) throw new Error("Failed to fetch the feed");

        const data = await response.json();
        
        if (!data.feed || data.feed.length === 0) {
            bskyDiv.innerHTML = "No posts found.";
            return;
        }

        const latestPostUri = data.feed[0].post.uri;

        const oEmbedUrl = `https://bsky.app/oembed?url=${latestPostUri}`;
        const oEmbedResponse = await fetch(oEmbedUrl);

        if (!oEmbedResponse.ok) throw new Error("Failed to fetch oEmbed data");

        const oEmbedData = await oEmbedResponse.json();
        bskyDiv.innerHTML = oEmbedData.html;
    } catch (error) {
        console.error("Error fetching the Bluesky post:", error);
        bskyDiv.innerHTML = "Failed to load the post.";
    }
});
