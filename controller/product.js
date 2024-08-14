const Product = require("../model/Product");

const createProduct = async (req, res) => {
  try {
    // console.log(req.body);
    // const { name, price, description, catagory, weight, ProductImage } = req.body;
    console.log(req.body);

    const newProduct = new Product(req.body);
    const saveProduct = newProduct.save();
    res.status(200).json({
      message: "Product successfully added",
      success: true,
      data: {
        product: saveProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    console.log(category, search);

    let productItems;
    if (category === "all") {
      productItems = await Product.find();
    } else {
      productItems = await Product.find({ catagory: category });
    }
    if (search) {
      productItems = productItems.filter((Product) =>
        Product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      data: {
        product: productItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const productItems = await Product.find().sort({ createdAt: -1 }).limit(12);

    res.status(200).json({
      message: "12 register Product showing",
      success: true,
      data: {
        product: productItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getProductsFromDistinctCatagory = async (req, res) => {
  try {
    const distinctCatagory = await Product.distinct("catagory");
    const distinctProduct = await Promise.all(
      distinctCatagory.slice(0, 4).map(async (catagory) => {
        const product = await Product.findOne({ catagory });
        return product;
      })
    );

    res.status(200).json({
      message: "4 different catagory Product",
      success: true,
      data: {
        product: distinctProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getTopRating = async (req, res) => {
  try {
    const topRatedProducts = await Product.find()
      .sort({ "reviews.rating": -1 })
      .limit(4);

    res.status(200).json({
      message: "4 different catagory Product",
      success: true,
      data: {
        product: topRatedProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productItems = await Product.findById(id);

    res.status(200).json({
      message: "Product detaitls",
      success: true,
      data: {
        product: productItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const removeProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product successfully removed",
      success: true,
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getNewProducts,
  getProductsFromDistinctCatagory,
  getTopRating,
  removeProductById,
};
