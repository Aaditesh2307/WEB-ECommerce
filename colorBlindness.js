document.addEventListener("DOMContentLoaded", function () {
    const colorBlindSelect = document.getElementById("color-blind-select");
    const body = document.body;  // Assuming you apply the filter to the entire page

    // Event listener for the dropdown
    colorBlindSelect.addEventListener("change", function () {
        const selectedValue = this.value;

        // Remove any existing color blindness classes
        body.classList.remove('color-blind-protanopia', 'color-blind-deuteranopia', 'color-blind-tritanopia', 'color-blind-none');

        // Add the class based on the selected value
        if (selectedValue) {
            body.classList.add(`color-blind-${selectedValue}`);
        } else {
            body.classList.add('color-blind-none');
        }
    });
});
