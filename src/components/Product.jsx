import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import dummyProducts from "../dummyProducts";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fallbackImageUrl = "https://via.placeholder.com/400x300?text=No+Image";

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);

        if (response.data.imageName) {
          await fetchImage();
        } else {
          const dummyProduct = dummyProducts.find((p) => p.id === parseInt(id));
          setImageUrl(dummyProduct?.imageUrl || fallbackImageUrl);
        }
      } catch (error) {
        console.error("Error fetching product from backend:", error);
        const dummyProduct = dummyProducts.find((p) => p.id === parseInt(id));
        if (dummyProduct) {
          setProduct(dummyProduct);
          setImageUrl(dummyProduct.imageUrl);
        } else {
          setProduct(null);
          setImageUrl(fallbackImageUrl);
        }
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const blobUrl = URL.createObjectURL(response.data);
        setImageUrl(blobUrl);

        // Optional: revoke blob URL on cleanup to avoid memory leaks
        return () => URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error fetching product image:", error);
        const dummyProduct = dummyProducts.find((p) => p.id === parseInt(id));
        setImageUrl(dummyProduct?.imageUrl || fallbackImageUrl);
      }
    };

    fetchProduct();
  }, [id]);

  // Debug output to verify image URL
  // console.log("Rendering image URL:", imageUrl);

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="containers" style={{ display: "flex" }}>
      <img
        className="left-column-img"
        src={imageUrl}
        alt={product.imageName || product.name || "Product Image"}
        style={{ width: "50%", height: "auto", objectFit: "contain", border: "1px solid #ccc" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
        }}
      />
      <div className="right-column" style={{ width: "50%" }}>
        {/* Product details here (same as your existing code) */}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* ... rest of your markup */}
      </div>
    </div>
  );
};

export default Product;
