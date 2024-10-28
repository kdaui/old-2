document.addEventListener('DOMContentLoaded', () => {
    const bskyDiv = document.querySelector('.bsky');
    
    // Function to fetch the most recent Bluesky post
    async function fetchBlueskyPost() {
        try {
            const response = await fetch('https://api-amber-psi.vercel.app/api/fetchBluesky');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            // Assuming the data structure has the latest post in `data.post`
            const latestPost = data.post; // Update according to your API response structure

            // Update the DOM with the latest post details
            bskyDiv.innerHTML = `
                <h3>Bsky-ing</h3>
                <p>${latestPost.content}</p>
            `;
        } catch (error) {
            console.error('Error fetching the Bluesky post:', error);
            bskyDiv.innerHTML = '<p>Error loading post.</p>';
        }
    }

    // Call the function to fetch and display the post
    fetchBlueskyPost();
});
