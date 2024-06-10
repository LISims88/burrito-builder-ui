import { useEffect, useState } from "react";
import "./App.css";
import getOrders  from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders]= useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const retrievedOrders = await getOrders();
        setOrders(retrievedOrders.orders)
      }catch(error){
        console.error('Problem fetching order', error)
      }
    }
    fetchOrders()
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
