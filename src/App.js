// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import notfound from "./img/error.png";
import "./App.css";

import LayOut from "./components/layout/LayOut";
import WishListPage from "./pages/WishListPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import Categories from "./components/category/Categories";
import Subcategories from "./components/category/SubCategories";
import ProtectedRoute from "./components/user/ProtectedRoute";
import UserProfile from "./components/user/UserProfile";
import Dashboard from "./components/dashboard/Dashboard";
import ProductsDashboard from "./components/dashboard/ProductsDashboard";
import OrderHistory from "./components/order/OrderHistory";
import UsersDashboard from "./components/dashboard/UserDashboard";


function App() {
  // const url = " https://fakestoreapi.com/products";
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(70000);
  const [cartList, setCartList] = useState([]);

  
  const [productResponse, setProductResponse] = useState([]);
  let totalCount = 3;

  const handleChange = (event, value) => {
    setPage(value);
  };

  // to be dynamicURL (single qoutations '')
  let limit = 12;
  let offset = (page - 1) * limit;
  const url1 = `http://localhost:5125/api/v1/products`;

  // let productsURL = `http://localhost:5125/api/v1/products?offset=${offset}&limit=${limit}`;
  let productsURL = `http://localhost:5125/api/v1/products?offset=${offset}&limit=${limit}&search=${userInput}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  // console.log("Request URL:", productsURL);

  // function getUrl(userInput, minPrice, maxPrice) {
  // let productsURL = `http://localhost:5125/api/v1/products?offset=${offset}&limit=${limit}&search=${userInput}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  // //   // if (userInput) {
  // //   //   productUrl += `&search=${userInput}`;
  // //   // }
  //   console.log(productsURL, "p");
  //   return productsURL;
  // }

  // function getDataFromServer() {
  //   axios
  //     .get(getUrl(userInput, minPrice, maxPrice))
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //       setProductResponse(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   getDataFromServer();
  // }, [offset, limit, userInput, minPrice, maxPrice]);
  // const getData = async () => {
  //   try {
  //     const response = await axios.get(url1);

  //     setProductList(response.data);
  //     setLoading(false);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Failed to load products");
  //     setLoading(false);
  //   }
  //   console.log( productList);

  // };

  // // it works
  //   const getData = async () => {
  //   console.log("Fetching data from:", productsURL);
  //   axios
  //     .get(productsURL)
  //     .then((response) => {
  //       console.log(response);
  //       setProductResponse(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setError("Failed to load products");
  //       setLoading(false);
  //     });
  // };
  //  useEffect(() => {
  //    // console.log(wishList, "Updated wishlist");
  //    getData();
  //  }, [selectedCategory, offset, limit, userInput, minPrice, maxPrice]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5125/api/v1/categories"
      ); // Adjust the endpoint as necessary
      setCategories(response.data);
      console.log("Categories:", response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const userInputHandler = (event) => {
    const value = event.target.value;
    setUserInput(value);
  };

  const fetchProducts = async () => {
    try {
      // Construct the base URL
      let productsURL = `http://localhost:5125/api/v1/products?offset=${offset}&limit=${limit}`;

      // Add query parameters based on conditions
      if (userInput.trim() !== "") {
        productsURL += `&search=${encodeURIComponent(userInput)}`;
      }

      if (minPrice) {
        productsURL += `&minPrice=${minPrice}`;
      }

      if (maxPrice) {
        productsURL += `&maxPrice=${maxPrice}`;
      }

      // Fetch the products
      const response = await axios.get(productsURL);
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, offset, limit, userInput, minPrice, maxPrice]);

  // User authentication
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(null); 
      setIsUserDataLoading(false);
      return;
    }
    axios
      .get(`http://localhost:5125/api/v1/users/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        if (err.response && err.response.status === 401) {
          // Clear the token if unauthorized
          localStorage.removeItem("token");
          setUserData(null); // Reset user data
        }
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);
  

  // protected route
  let isAuthenticated = Boolean(userData); // Check if userData is truthy
  // console.log("User Data:", userData);
  // console.log("Is Authenticated:", isAuthenticated);
  //  function getData() {
  //    axios
  //      .get(url1)
  //      .then((response) => {
  //        setProductList(response.data);
  //        setLoading(false);
  //      })
  //      .catch((error) => {
  //        setError("failed");
  //        setLoading(false);
  //      });
  //  }
  //  useEffect(() => {
  //    // console.log(wishList, "Updated wishlist");
  //    getData();
  //  }, []);

  // if (loading) {
  //   return (
  //     <div className="progress">
  //       <CircularProgress color="inherit" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <img className="error" src={notfound} alt="404" />
  //     </div>
  //   );
  // }
const addToCart = (product) => {
  setCartList((prevCartList) => {
    // Check if the product already exists in the cart
    const productExists = prevCartList.find((item) => item.id === product.productId);

    if (productExists) {
      // If product exists, update its quantity
      return prevCartList.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If it's a new product, add it to the cart with quantity 1
      return [...prevCartList, { ...product, quantity: 1 }];
    }
  });

  // Log the updated cartList for debugging purposes
  setTimeout(() => console.log("Updated Cart:", cartList), 0);
};


function addToFav(product) {
  // Create a copy of the current wishlist
  const updatedWishList = [...wishList];

  // Check if the product is already in the wishlist by comparing IDs
  const isIncluded = updatedWishList.some((item) => item.id === product.productId);

  // If the product is not in the wishlist, add it
  if (!isIncluded) {
    updatedWishList.push(product);
    setWishList(updatedWishList); // Update the wishlist state with the new array
  }
  // else {
  //   console.log("Item already in wishlist", product);
  // }
}
  // const addItemToCart = (product) => {
  //   const updatedCartList = [...cartList, product];
  //   setCartList(updatedCartList);
  // };
  // const addToCart = (product) => {
  //   // Check if the product is already in the cart
  //   const isInclude = cartList.some(
  //     (item) => item.productId === product.productId
  //   );
  //   if (!isInclude) {
  //     // Add the product with quantity 1
  //     setCartList([...cartList, { ...product, quantity: 1 }]);
  //   } else {
  //     // Optional: Update the quantity if the product is already in the cart
  //     setCartList(
  //       cartList.map((item) =>
  //         item.productId === product.productId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   }
  // };
  // It works
  // const fetchProducts = async (searchTerm) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5125/api/v1/products?search=${searchTerm}&...`
  //     );
  //     setProductResponse(response.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     setError("Failed to fetch products");
  //   }
  // };
  let adminRole= true;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut wishList={wishList} isAuthenticated={isAuthenticated} />,
      children: [
        {
          path: "/",
          element: <HomePage categories={categories} />,
        },

        {
          path: "/products",
          element: (
            <ProductsPage
              productList={productList}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              setUserInput={setUserInput}
              userInput={userInput}
              userInputHandler={userInputHandler} //user input
              wishList={wishList}
              setWishList={setWishList}
              addToFav={addToFav}
              totalCount={totalCount}
              page={page}
              handleChange={handleChange} //pagination
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              cartList={cartList}
              setCartList={setCartList}
              addToCart={addToCart}
              // cartItems={cartItems}
              // setCartItems={setCartItems}
              // cartId={cartId}
              // cartList={cartList}
              // setCartList={setCartList}
              // addItemToCart={addItemToCart}
              // addToCart={addToCart}
            />
          ),
        },
        {
          path: "products/:productId",
          element: (
            <ProductDetailsPage
              wishList={wishList}
              setWishList={setWishList}
              addToFav={addToFav}
              // addToCart={addToCart}
              // addItemToCart={addItemToCart}
              cartList={cartList}
              setCartList={setCartList}
              addToCart={addToCart}
            />
          ),
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/wishList",
          element: (
            <WishListPage wishList={wishList} setWishList={setWishList} />
          ),
        },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },
        {
          path: "/userLogin",
          element: <UserLogin getUserData={getUserData} />,
        },
        {
          path: "/userRegister",
          element: <UserRegister />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userData={userData} setUserData={setUserData} />
              }
            />
          ),
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/subCategories",
          element: <Subcategories />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              adminRole={true}
              userData={userData}
              element={<Dashboard />}
            />
          ),
        },
        {
          path: "/productsDashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              adminRole={true}
              userData={userData}
              element={
                <ProductsDashboard
                // productList={productResponse.products}
                // loading={loading}
                />
              }
            />
          ),
        },
        {
          path: "/productsdashboard",
          element: (
            <ProductsDashboard
              setProductList={setProductList}
              productList={productList}
            />
          ),
        },
        {
          path: "/usersdashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<UsersDashboard />}
            />
          ),
        },
        { path: "/orders", element: <OrderHistory userData={userData} /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
