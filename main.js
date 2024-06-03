class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
      this.totalElement = document.getElementById('total');
      this.itemsElement = document.getElementById('items');
    }
  
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const newItem = new ShoppingCartItem(product, quantity);
        this.items.push(newItem);
      }
      this.render();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.render();
    }
  
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
      this.render();
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    render() {
      this.itemsElement.innerHTML = '';
      this.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
          <span class="name">${item.product.name}</span>
          <button class="quantity-btn decrease" data-id="${item.product.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.product.id}">+</button>
          <button class="like-btn">❤️</button>
          <button class="remove-btn" data-id="${item.product.id}">Remove</button>
          <span class="price">$${item.product.price}</span>
        `;
        this.itemsElement.appendChild(itemElement);
      });
      this.totalElement.textContent = `Total: $${this.getTotalPrice()}`;
      this.addEventListeners();
    }
  
    addEventListeners() {
      document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const item = this.items.find(item => item.product.id === id);
          if (item.quantity > 1) {
            this.updateQuantity(id, item.quantity - 1);
          }
        });
      });
  
      document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const item = this.items.find(item => item.product.id === id);
          this.updateQuantity(id, item.quantity + 1);
        });
      });
  
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          this.removeItem(id);
        });
      });
    }
  }
  

  const apple = new Product(1, 'Apple', 0.5);
  const banana = new Product(2, 'Banana', 0.3);
  const orange = new Product(3, 'Orange', 0.8);
  

  const cart = new ShoppingCart();
  
 
  cart.addItem(apple, 4);
  cart.addItem(banana, 6);
  cart.addItem(orange, 3);
  