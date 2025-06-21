// Function to format the date as "date month year"
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Get the last modified date of the HTML file
const lastModifiedDate = new Date(document.lastModified);

// Format the date
const formattedDate = formatDate(lastModifiedDate);

// Insert the formatted date into the footer
document.getElementById("last-updated").textContent = `Last Updated: ${formattedDate}`;