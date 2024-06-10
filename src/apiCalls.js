// export const getOrders = () => {
//   return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
// };
async function getOrders() {
  try {
      const response = await fetch('http://localhost:3001/api/v1/orders');
      
      if (!response.ok) {
          throw new Error(`error status: ${response.status}`);
      }

      const order = await response.json();

      console.log(order);
      return order;
  } catch (error) {
      console.error("Something went wrong:", error.message);
      throw error;
  }
}
export default  getOrders