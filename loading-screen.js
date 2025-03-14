document.addEventListener('DOMContentLoaded', () => {
    const text = `Great holes secretly are digged
where earth's pores ought to suffice,
and things have learnt to walk
that ought to crawl.`;

    let i = 0;
    
    const loadingScreen = document.createElement('div');
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = 'black';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.flexDirection = 'column';
    loadingScreen.style.justifyContent = 'center'; 
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.zIndex = '9999';
    document.body.appendChild(loadingScreen);

    const gif = document.createElement('img');
    gif.src = 'https://rose-engine.org/signalis/images/kingInYellow_rotation.gif';
    gif.style.width = '150px';
    gif.style.height = 'auto';
    loadingScreen.appendChild(gif);

    const loadingTextElement = document.createElement('div');
    loadingTextElement.style.whiteSpace = 'pre-wrap';
    loadingTextElement.style.overflow = 'hidden';
    loadingTextElement.style.display = 'inline-block';
    loadingTextElement.style.borderRight = '3px solid #fff';
    loadingTextElement.style.paddingRight = '5px';
    loadingScreen.appendChild(loadingTextElement);

    function typeText() {
        if (i < text.length) {
            loadingTextElement.textContent += text.charAt(i);
            i++;

            const delay = Math.random() * (70 - 30) + 15;

            setTimeout(typeText, delay);
        } else {
            setTimeout(showMainContent, 1000); // Delay to let the typing finish
        }
    }

    function showMainContent() {
        // Create the main content section
        const mainContent = document.createElement('div');
        mainContent.style.display = 'none';
        document.body.appendChild(mainContent);

        // Main site
        const header = document.createElement('header');
        const headerTitle = document.createElement('h1');
        header.appendChild(headerTitle);
        mainContent.appendChild(header);

        // Main
        const main = document.createElement('main');
        const mainParagraph = document.createElement('p');
        main.appendChild(mainParagraph);
        mainContent.appendChild(main);

        // Fade in main
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);

        // Fade out loading screen
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Remove loading screen
            }, 1000);
        }, 1000); // Delay fade-out
    }

    typeText();
});