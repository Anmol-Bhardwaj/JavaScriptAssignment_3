document.addEventListener("DOMContentLoaded", function() {
    // Dynamically adding student info
    const studentInfo = document.getElementById("studentInfo");
    studentInfo.textContent = "Student ID: 200554109 | Name: Anmol Bhardwaj";

    // Hide pizza options initially
    const pizzaOptions = document.getElementById("pizzaOptions");
    const sizeSelect = document.getElementById("size");
    const crustSelect = document.getElementById("crust");
    const sauceInputs = document.querySelectorAll('input[name="sauce"]');
    const cheeseInputs = document.querySelectorAll('input[name="cheese"]');
    const toppingsInputs = document.querySelectorAll('input[name="toppings"]');
    pizzaOptions.style.display = "none";
    sizeSelect.disabled = true;
    crustSelect.disabled = true;
    sauceInputs.forEach(input => input.disabled = true);
    cheeseInputs.forEach(input => input.disabled = true);
    toppingsInputs.forEach(input => input.disabled = true);

    // Pizza type selection
    const pizzaTypeSelect = document.getElementById("pizzaType");
    pizzaTypeSelect.addEventListener("change", function() {
        const selectedPizzaType = pizzaTypeSelect.value;

        if (selectedPizzaType === "custom") {
            pizzaOptions.style.display = "block";
            sizeSelect.disabled = false;
            crustSelect.disabled = false;
            sauceInputs.forEach(input => input.disabled = false);
            cheeseInputs.forEach(input => input.disabled = false);
            toppingsInputs.forEach(input => input.disabled = false);
        } else {
            pizzaOptions.style.display = "block";
            sizeSelect.disabled = false;
            crustSelect.disabled = true;
            sauceInputs.forEach(input => input.disabled = true);
            cheeseInputs.forEach(input => input.disabled = true);
            toppingsInputs.forEach(input => input.disabled = true);

            // Show pop-up message for non-customizable pizzas
        if (selectedPizzaType === "pepperoni" || selectedPizzaType === "vegetable") {
            alert(`Sorry, customization is not available for ${selectedPizzaType} pizza. But you can select the size you want.`);
        }

        }
    });

    // Form submission event
    const form = document.getElementById("pizzaForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const selectedPizzaType = pizzaTypeSelect.value;

        // If custom pizza is selected, capture all form values
        if (selectedPizzaType === "custom") {
            
            const size = sizeSelect.value;
            const crust = crustSelect.value;
            const sauce = document.querySelector('input[name="sauce"]:checked').value;
            const cheese = [];
            document.querySelectorAll('input[name="cheese"]:checked').forEach(cheeseOption => {
                cheese.push(cheeseOption.value);
            });
            const toppings = [];
            document.querySelectorAll('input[name="toppings"]:checked').forEach(topping => {
                toppings.push(topping.value);
            });

            // Create Pizza object
            const pizza = new Pizza(size, crust, sauce, cheese, toppings);

            // Output pizza description
            const pizzaOutput = document.getElementById("pizzaOutput");
            pizzaOutput.innerHTML = `
                <h2>Your Pizza:</h2>
                <p>Size: ${pizza.size}</p>
                <p>Crust: ${pizza.crust}</p>
                <p>Sauce: ${pizza.sauce}</p>
                <p>Cheese: ${pizza.cheese.join(", ")}</p>
                <p>Toppings: ${pizza.toppings.join(", ")}</p>
            `;
        } else {
            // Capture form values
            const size = sizeSelect.value;

            // Output pizza description
            const pizzaOutput = document.getElementById("pizzaOutput");
            pizzaOutput.innerHTML = `
                <h2>Your ${selectedPizzaType.charAt(0).toUpperCase() + selectedPizzaType.slice(1)} Pizza:</h2>
                <p>Size: ${size}</p>
            `;
        }
    });
});

// Pizza class definition
class Pizza {
    constructor(size, crust, sauce, cheese, toppings) {
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.cheese = cheese;
        this.toppings = toppings;
    }
}
