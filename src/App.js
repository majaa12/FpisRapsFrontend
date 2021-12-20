import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddCustomerScreen from "./screens/AddCustomerScreen";
import AddRacunScreen from "./screens/AddRacunScreen";
import AllCustomersScreen from "./screens/AllCustomersScreen";
import AllRacuniScreen from "./screens/AllRacuniScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="content">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/kupac" element={<AddCustomerScreen />} />
            <Route path="/racun" element={<AddRacunScreen />} />
            <Route path="/kupci" element={<AllCustomersScreen />} />
            <Route path="/racuni" element={<AllRacuniScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
