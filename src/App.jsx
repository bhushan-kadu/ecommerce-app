import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { LoginIcon } from "@heroicons/react/outline";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route index element={<Signin />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

const Home = () => {
  const [productsArray, setProductsArray] = useState([
    { rating: { rate: 70 } },
  ]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((x) => {
        setProductsArray(x);
      });
  }, []);

  return (
    <div>
      <p>Your products</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productsArray.map((x, index) => (
          <div
            style={{
              width: 600,
              height: 450,
              padding: 10,
              border: "5px solid",
              margin: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={x.image} style={{ width: 50 }} />
            <br />
            <div> Category: {x.category} &nbsp;</div>
            <br />
            <div> Rating: {x.rating.rate} &nbsp;</div>
            <br />
            <div> Title: {x.title} &nbsp;</div>
            <br />
            <div> Description: {x.description} &nbsp;</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  const [productsArray, setProductsArray] = useState([
    { products: [{ quantity: 5 }] },
  ]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((x) => {
        setProductsArray(x);
      });
  }, []);

  return (
    <div>
      <p>Your products</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productsArray.map((x, index) => (
          <div
            style={{
              width: 200,
              height: 200,
              padding: 10,
              border: "5px solid",
              margin: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div> products in cart: {x.products[0].quantity} &nbsp;</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  return <h1>Contact Me page</h1>;
};

const NoPage = () => {
  return <h1>404 page not found</h1>;
};
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && navigate("/home");
  }, [loggedIn]);

  return (
    <div>
      <div>
        <div>
          <h2>Login</h2>
        </div>
        <form autoComplete="off" onSubmit={handleSignIn}>
          <div>
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div>
              <div>
                <span>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit">
                <LoginIcon className="my-auto h-5 w-6" aria1-hidden="true" />
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
