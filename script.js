document.addEventListener('DOMContentLoaded', () => {
    const loadingText = `


 ██████╗ ██╗  ██╗██████╗  █████╗ ██╗   ██╗██╗              
██╔═══██╗██║ ██╔╝██╔══██╗██╔══██╗██║   ██║██║              
██║██╗██║█████╔╝ ██║  ██║███████║██║   ██║██║              
██║██║██║██╔═██╗ ██║  ██║██╔══██║██║   ██║██║              
╚█║████╔╝██║  ██╗██████╔╝██║  ██║╚██████╔╝██║██╗           
 ╚╝╚═══╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝           
                                                           
 █████╗ ███╗   ██╗██████╗                                  
██╔══██╗████╗  ██║██╔══██╗                                 
███████║██╔██╗ ██║██║  ██║                                 
██╔══██║██║╚██╗██║██║  ██║                                 
██║  ██║██║ ╚████║██████╔╝                                 
╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝                                  
                                                           
███████╗██████╗ ██╗███████╗███╗   ██╗██████╗ ███████╗      
██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔══██╗██╔════╝      
█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║  ██║███████╗      
██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║  ██║╚════██║      
██║     ██║  ██║██║███████╗██║ ╚████║██████╔╝███████║      
╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝      
                                                           
██████╗ ██████╗ ███████╗███████╗███████╗███╗   ██╗████████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝████╗  ██║╚══██╔══╝
██████╔╝██████╔╝█████╗  ███████╗█████╗  ██╔██╗ ██║   ██║   
██╔═══╝ ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██║╚██╗██║   ██║   
██║     ██║  ██║███████╗███████║███████╗██║ ╚████║   ██║   
╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   


`;

    const loadingScreen = document.getElementById('loading-screen');
    const loadingTextElement = document.getElementById('loading-text');
    const content = document.getElementById('content');
    
    let currentLine = 0;
    const lines = loadingText.trim().split('\n');

    function showNextLine() {
        if (currentLine < lines.length) {
            loadingTextElement.innerText += lines[currentLine] + '\n';
            currentLine++;
            setTimeout(showNextLine, 100); // Adjust delay as needed
        } else {
            loadingScreen.style.opacity = 0;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
            }, 1000);
        }
    }

    showNextLine();

    async function fetchKanyeQuote() {
        try {
            const response = await fetch('https://api.kanye.rest/');
            const data = await response.json();
            const quoteElement = document.getElementById('kanye-quote');
            quoteElement.innerText = `"${data.quote}" - Kanye West`;
        } catch (error) {
            console.error('Error fetching the Kanye quote:', error);
        }
    }

    fetchKanyeQuote();
});
