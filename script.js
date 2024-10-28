async function fetchBlueskyPost() {
    try {
        const response = await fetch('https://api-amber-psi.vercel.app/api/fetchBluesky'); // Adjust this URL based on your Vercel deployment
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch post');
        }

        // Update your div with the fetched data
        const bskyDiv = document.querySelector('.bsky');
        bskyDiv.innerHTML = `<h3>Bsky-ing</h3><p>${data.postContent}</p>`;
    } catch (error) {
        console.error("Error loading post:", error);
        document.querySelector('.bsky').innerHTML = '<p>Error loading post.</p>';
    }
}

fetchBlueskyPost();
