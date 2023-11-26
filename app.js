// Function to fetch and display blog posts (poems) from Medium
async function fetchPoems() {
    try {
        const mediumUsername = 'RiversOfThought';
        const mediumApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

        const response = await fetch(mediumApiUrl);
        const data = await response.json();

        // Assuming data.items is an array of blog posts
        const blogPosts = data.items.slice(0, 5); // Displaying the latest 5 posts

        const poems = blogPosts.map(post => {
            const title = post.title;
            const contentWithoutImages = post.description.replace(/<img.*?>/g, ''); // Remove img tags
            const contentWithoutAnchors = contentWithoutImages.replace(/<a.*?<\/a>/g, ''); // Remove anchor tags
            return { title, content: contentWithoutAnchors };
        });

        return poems;
    } catch (error) {
        console.error('Error fetching poems:', error);
        return [];
    }
}

const poemContainer = document.getElementById('poem-container');
const pageButtonsContainer = document.getElementById('pageButtons');

let poems = [];
let currentPoemIndex = 0;

async function initializeApp() {
    // Fetch poems from Medium
    poems = await fetchPoems();

    if (poems.length > 0) {
        // Display the first poem
        displayPoem(currentPoemIndex);

        // Show page buttons
        renderPageButtons();

        // Enable keyboard navigation
        document.addEventListener('keydown', handleKeyPress);
    } else {
        // If no poems are available, display a message or handle accordingly
        poemContainer.innerHTML = '<p>No poems available at the moment.</p>';
        pageButtonsContainer.innerHTML = '';
    }
}

function displayPoem(index) {
    const poem = poems[index];
    poemContainer.innerHTML = `
        <h2>${poem.title}</h2>
        <div class="poem-content blog-post">${poem.content}</div>
    `;

    // Add a class to trigger the fade-in effect
    setTimeout(() => {
        const blogPost = document.querySelector('.blog-post');
        blogPost.classList.add('show');
    }, 100);
}

function showPoemByIndex(index) {
    noMorePoemsElement = document.getElementById('noMorePoems');
    if (index >= 0 && index < poems.length) {
        currentPoemIndex = index;
        displayPoem(currentPoemIndex);
        pageButtonsContainer.style.display = 'flex';
        noMorePoemsElement.style.display = 'none';
    } else {
        // If no more poems, hide pagination and show "No more poems" message
        pageButtonsContainer.style.display = 'none';
        noMorePoemsElement.style.display = 'block';
    }
}


function renderPageButtons() {
    const totalPages = poems.length;
    pageButtonsContainer.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('li');
        button.className = 'page-item';
        button.innerHTML = `<a class="page-link" href="#" onclick="showPoemByIndex(${i});">${i + 1}</a>`;
        pageButtonsContainer.appendChild(button);
    }
}

function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        // Navigate to the previous poem on left arrow key press
        if (currentPoemIndex > 0) {
            showPoemByIndex(currentPoemIndex - 1);
        }
    } else if (event.key === 'ArrowRight') {
        // Navigate to the next poem on right arrow key press
        if (currentPoemIndex <= poems.length) {
            showPoemByIndex(currentPoemIndex + 1);
        }
    }
}

// Initialize the app
initializeApp();
