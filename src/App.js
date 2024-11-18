import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import OrdersDashboard from "./components/dashboard/OrdersDashboard";
// import PaymentPage from "./components/payment/Payment";
import SubCategoryProducts from "./components/category/SubCategoryProducts";
import NavBar from "./components/nav/NavBar";

function App() {
  const [productList, setProductList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(70000);
  const [cartList, setCartList] = useState([]);
  let totalCount = 3;

  const handleChange = (event, value) => {
    setPage(value);
  };

  let limit = 9;
  let offset = (page - 1) * limit;
  const url1 = `https://e-commerce-backend-project-1.onrender.com/api/v1/products`;

  let productsURL = `https://e-commerce-backend-project-1.onrender.com/api/v1/products?offset=${offset}&limit=${limit}&search=${userInput}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backend-project-1.onrender.com/api/v1/categories"
      );
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
      let productsURL = `https://e-commerce-backend-project-1.onrender.com/api/v1/products?offset=${offset}&limit=${limit}`;

      if (userInput.trim() !== "") {
        productsURL += `&search=${encodeURIComponent(userInput)}`;
      }

      if (minPrice) {
        productsURL += `&minPrice=${minPrice}`;
      }

      if (maxPrice) {
        productsURL += `&maxPrice=${maxPrice}`;
      }

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
      .get(
        `https://e-commerce-backend-project-1.onrender.com/api/v1/users/auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          setUserData(null);
        }
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  let isAuthenticated = Boolean(userData);

  const addToCart = (product) => {
    setCartList((prevCartList) => {
      const productExists = prevCartList.find(
        (item) => item.id === product.productId
      );

      if (productExists) {
        return prevCartList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartList, { ...product, quantity: 1 }];
      }
    });
  };
  setTimeout(() => console.log("Updated Cart:", cartList), 0);

  function addToFav(product) {
    const updatedWishList = [...wishList];
    const isIncluded = updatedWishList.some(
      (item) => item.id === product.productId
    );

    if (!isIncluded) {
      updatedWishList.push(product);
      setWishList(updatedWishList);
    }
    // else {
    //   console.log("Item already in wishlist", product);
    // }
  }
  let adminRole = true;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          wishList={wishList}
          isAuthenticated={isAuthenticated}
          userData={userData}
        />
      ),
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
            <WishListPage
              wishList={wishList}
              setWishList={setWishList}
              addToCart={addToCart}
            />
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
          path: "/subcategories",
          element: <Subcategories />,
        },
        {
          path: "/subcategories/:subCategoryId/products",
          element: (
            <SubCategoryProducts
              productList={productList}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              setUserInput={setUserInput}
              userInput={userInput}
              userInputHandler={userInputHandler}
              wishList={wishList}
              setWishList={setWishList}
              addToFav={addToFav}
              totalCount={totalCount}
              page={page}
              handleChange={handleChange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              cartList={cartList}
              setCartList={setCartList}
              addToCart={addToCart}
            />
          ),
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
              element={<ProductsDashboard />}
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
              adminRole={true}
              userData={userData}
              element={<UsersDashboard />}
            />
          ),
        },
        {
          path: "/ordersdashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              adminRole={true}
              userData={userData}
              element={<OrdersDashboard />}
            />
          ),
        },
        { path: "/orders", element: <OrderHistory userData={userData} /> },
      ],
    },
    <NavBar categories={categories} />,
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
