async function fetchAndDisplayData() {
    try {
        // Fetch the JSON file
        const response = await fetch('freedom_fighters.json');

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Store the data globally for filtering
        window.freedomFightersData = data;

        // Display the data
        displayData(data);
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

// Function to display data
function displayData(data) {
    const container = document.getElementById('freedom-fighters');
    container.innerHTML = ''; // Clear any existing content

    for (const [letter, fighters] of Object.entries(data)) {
        // Iterate over each fighter and create a card
        fighters.forEach(fighter => {
            // Create a card element
            const card = document.createElement('div');
            card.className = 'card bg-dark';
            card.style.width = '18rem';
            card.style.margin='20px';
            

            // Set the inner HTML for the card
            card.innerHTML = `
                <img src="${fighter.image}" class="card-img-top" alt="${fighter.name}">
                <div class="card-body">
                    <h5>${fighter.name}</h5>
                    <p class="card-text">${fighter.description}</p>
                    <a href="${fighter.link}" class="card-link">Read more</a>
                </div>
                <span id='span'>${fighter.name}</span>
                
            `;
        

            // Append the card to the container
            container.appendChild(card);
            
        });
    }
}

// Function to filter data based on search input
function filterData(searchTerm) {
    const filteredData = {};

    for (const [letter, fighters] of Object.entries(window.freedomFightersData)) {
        const filteredFighters = fighters.filter(fighter =>
            fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredFighters.length > 0) {
            filteredData[letter] = filteredFighters;
        }
    }

    displayData(filteredData);
}

// Event listener for the search input
document.getElementById('search').addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterData(searchTerm);
});

// Call the function to fetch and display data
fetchAndDisplayData();
