

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

const leftSectionSeats = [
    [6, 1],  // Row A, 6 seats
    [6, 1],  // Row B, 6 seats
    [6, 1],  // Row C, 6 seats
    [6, 1],  // Row D, 6 seats
    [6, 1],  // Row E, 6 seats
    [6, 1],  // Row F, 6 seats
    [6, 1],  // Row G, 6 seats
    [6, 1],  // Row H, 6 seats
    [6, 1],  // Row I, 6 seats
    [6, 1],  // Row J, 6 seats
    [6, 1],  // Row K, 6 seats
    [6, 1],  // Row L, 6 seats
    [6, 1],  // Row M, 6 seats
    [6, 1]   // Row N, 6 seats
];

const middleSectionSeats = [
    [14, 1], // Row A, 14 seats
    [14, 1], // Row B, 14 seats
    [14, 1], // Row C, 14 seats
    [14, 1], // Row D, 14 seats
    [14, 1], // Row E, 14 seats
    [14, 1], // Row F, 14 seats
    [14, 1], // Row G, 14 seats
    [14, 1], // Row H, 14 seats
    [14, 1], // Row I, 14 seats
    [14, 1], // Row J, 14 seats
    [14, 1], // Row K, 14 seats
    [14, 1], // Row L, 14 seats
    [14, 1], // Row M, 14 seats
    [14, 1]  // Row N, 14 seats
];

const rightSectionSeats = [
    [6, 1],  // Row A, 6 seats
    [6, 1],  // Row B, 6 seats
    [6, 1],  // Row C, 6 seats
    [6, 1],  // Row D, 6 seats
    [6, 1],  // Row E, 6 seats
    [6, 1],  // Row F, 6 seats
    [6, 1],  // Row G, 6 seats
    [6, 1],  // Row H, 6 seats
    [6, 1],  // Row I, 6 seats
    [6, 1],  // Row J, 6 seats
    [6, 1],  // Row K, 6 seats
    [6, 1],  // Row L, 6 seats
    [6, 1],  // Row M, 6 seats
    [6, 1]   // Row N, 6 seats
];

// Create row labels for the left and right side (vertical column)
function createRowLabels(labelContainerId) {
    const labelContainer = document.getElementById(labelContainerId);
    rows.forEach((rowLabel) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'label row-label';
        rowDiv.textContent = rowLabel;
        labelContainer.appendChild(rowDiv);
    });
}

// Create sections with column labels
function createSection(sectionId, sectionSeats, sectionCols) {
    const sectionDiv = document.getElementById(sectionId);

    // Create column labels (1, 2, 3, etc.) specific to each section
    const columnLabelDiv = document.createElement('div');
    columnLabelDiv.className = 'row column-label';
    // Avoid the empty corner on the left side (do not add extra empty space)
    for (let colIndex = 1; colIndex <= sectionCols; colIndex++) {
        const colLabel = document.createElement('div');
        colLabel.className = 'label';
        colLabel.textContent = colIndex;
        columnLabelDiv.appendChild(colLabel);
    }
    sectionDiv.appendChild(columnLabelDiv);

    // Create seating rows
    sectionSeats.forEach((rowSeats, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        // Add seat elements
        for (let seatIndex = 0; seatIndex < rowSeats[0]; seatIndex++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.id = `${sectionId}-row${rows[rowIndex]}-seat${seatIndex + 1}`;
            rowDiv.appendChild(seat);
        }

        sectionDiv.appendChild(rowDiv);
    });
}

// Create row labels once for the entire seating layout
createRowLabels('left-row-labels');
createRowLabels('right-row-labels');

// Create seating sections
createSection('left-section', leftSectionSeats, 6);
createSection('middle-section', middleSectionSeats, 14);
createSection('right-section', rightSectionSeats, 6);

// Functionality for selecting seats
let selectedSeats = [];
document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', function () {
        if (seat.classList.contains('booked')) {
            alert('This seat is already booked');
        } else {
            seat.classList.toggle('selected');
            const seatId = seat.id;
            if (selectedSeats.includes(seatId)) {
                selectedSeats = selectedSeats.filter(s => s !== seatId);
            } else {
                selectedSeats.push(seatId);
            }
        }
    });
});

// Function to book selected seats
document.getElementById('book-seats').addEventListener('click', function () {
    if (selectedSeats.length === 0) {
        alert('No seats selected');
        return;
    }
    // Send selected seats to the server (book_seats.php)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'book_seats.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            alert('Seats booked successfully');
            selectedSeats.forEach(seatId => {
                const seatElement = document.getElementById(seatId);
                seatElement.classList.remove('selected');
                seatElement.classList.add('booked');
            });
            selectedSeats = [];
        }
    };
    xhr.send(`seats=${JSON.stringify(selectedSeats)}`);
});
