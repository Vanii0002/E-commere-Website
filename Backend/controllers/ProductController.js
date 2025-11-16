import Product from "../models/productModel.js";
import uploadOnCloudinary from "../services/cloundianary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, sizes, bestseller, subCategory } = req.body;

    // Images
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const image4 = await uploadOnCloudinary(req.files.image4[0].path);

    // Sizes safe parse
    let sizesArray = [];

    if (category === "Clothes") {
      try {
        sizesArray = sizes ? JSON.parse(sizes) : [];
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid sizes format" });
      }
    } else {
      // Clothes nahi → default value
      sizesArray = [0];
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizesArray,
      stock: Number(stock),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (e) {
    console.log("Error in add product:", e.message);
    res.status(500).json({ success: false, message: "Product addition failed", error: e.message });
  }
};
