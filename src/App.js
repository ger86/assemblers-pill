import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const fetchData = async () => {
      try {
        const data = await api.getProducts();
        this.setState({
          products: data,
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          hasError: true,
          products: [],
          loadingError: error,
        });
      }
    };
    fetchData();
  }

  handleAddToCart = (productId) => {
    const { products, cartItems } = this.state;
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const productInCart = cartItems.find((item) => item.id === productId);
    if (productInCart) {
      const newProductIntCart = {
        ...productInCart,
        quantity: productInCart.quantity + 1,
      };
      const cartItemsWithoutProduct = cartItems.filter(
        (item) => item.id !== productId,
      );
      this.setState({
        cartItems: [...cartItemsWithoutProduct, newProductIntCart],
      });
    } else {
      const { id, title, img, price, unitsInStock } = product;
      const newProductIntCart = {
        id,
        title,
        img,
        price,
        unitsInStock,
        quantity: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.setState({
        cartItems: [...cartItems, newProductIntCart],
      });
    }
  };

  // handleChange(event, productId) {}

  handleRemove(productId) {
    const { cartItems } = this.state;
    const cartItemsWithoutProduct = cartItems.filter(
      (item) => item.id !== productId,
    );
    this.setState({
      cartItems: cartItemsWithoutProduct,
    });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={this.handleAddToCart}
        handleRemove={() => {}}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
