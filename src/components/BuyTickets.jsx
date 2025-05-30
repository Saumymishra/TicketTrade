import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import dummyProducts from "../dummyProducts";

const BuyTickets = () => {
  const { data, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fetchedOnce = useRef(false); // Track if refreshData already called

  // Call refreshData only once on mount
  useEffect(() => {
    if (!fetchedOnce.current) {
      refreshData();
      fetchedOnce.current = true;
    }
  }, [refreshData]);

  // Fetch images for products once after 'data' updates, only if products empty
  useEffect(() => {
    if (!data || data.length === 0 || products.length > 0) return;

    const fetchImagesForProducts = async () => {
      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            const blobUrl = URL.createObjectURL(response.data);
            return { ...product, imageUrl: blobUrl };
          } catch (error) {
            console.error(
              "Error fetching image for product ID:",
              product.id,
              error
            );
            const dummyProd = dummyProducts.find((p) => p.id === product.id);
            return {
              ...product,
              imageUrl:
                dummyProd?.imageUrl || "https://via.placeholder.com/250?text=No+Image",
            };
          }
        })
      );
      setProducts(updatedProducts);
    };

    fetchImagesForProducts();

    // Cleanup blob URLs on unmount
    return () => {
      products.forEach((prod) => {
        if (prod.imageUrl && prod.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(prod.imageUrl);
        }
      });
    };
  }, [data, products.length]);

  // Fallback to dummy products if no data and products not loaded
  useEffect(() => {
    if ((!data || data.length === 0) && products.length === 0) {
      const dummyWithImages = dummyProducts.map((product) => ({
        ...product,
        imageUrl:
          product.imageUrl || "https://via.placeholder.com/250?text=No+Image",
      }));
      setProducts(dummyWithImages);
    }
  }, [data, products.length]);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory?.toLowerCase()
      )
    : products;

  return (
    <>
      {/* Category Selection Section */}
      <div
        className="bg-gray-100 p-4"
        style={{ width: "100%", marginTop: "64px" }}
      >
        <h4 className="mb-3 text-center fw-semibold">Select Category</h4>
        <div className="text-center">
          <select
            className="form-select w-50 mx-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className="grid bg-orange-500"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, available, imageUrl } = product;
            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "380px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      padding: "5px",
                      borderRadius: "10px 10px 10px 10px",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                      >
                        {name.toUpperCase()}
                      </h5>
                      <i
                        className="card-brand"
                        style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                      >
                        {"~ " + brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          marginBottom: "5px",
                        }}
                      >
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover text-white"
                      style={{
                        margin: "10px 25px 10px",
                        backgroundColor: "#f97316",
                        color: "",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!available}
                    >
                      {available ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default BuyTickets;
