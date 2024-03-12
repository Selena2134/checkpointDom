document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        const decreaseBtn = item.querySelector(".decrease");
        const increaseBtn = item.querySelector(".increase");
        const likeBtn = item.querySelector(".like-btn");
        const removeBtn = item.querySelector(".remove-btn");
        const quantitySpan = item.querySelector(".quantity");
        const priceSpan = item.querySelector(".price");

        decreaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotal();
            }
        });

        increaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateTotal();
        });

        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("liked");
        });

        removeBtn.addEventListener("click", () => {
            item.remove();
            updateTotal();
        });
    });

    function updateTotal() {
        const prices = Array.from(document.querySelectorAll(".price")).map(price => parseInt(price.textContent.replace('$', '')));
        const quantities = Array.from(document.querySelectorAll(".quantity")).map(quantity => parseInt(quantity.textContent));
        const total = prices.reduce((acc, curr, index) => acc + (curr * quantities[index]), 0);
        document.getElementById("total").textContent = `Total: $${total}`;
    }
});
