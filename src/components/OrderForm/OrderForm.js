import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && ingredients.length) {
      const newOrder = {
        name,
        ingredients,
      };

      try {
        const response = await fetch("http://localhost:3001/api/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const createdOrder = await response.json();
        addOrder(createdOrder);
        clearInputs();
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      console.log("Name and at least one ingredient are required");
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        type="button"
        name={ingredient}
        onClick={() => {
          setIngredients((prevIngredients) =>
            prevIngredients.includes(ingredient) ? prevIngredients.filter((item) => item !== ingredient) : [...prevIngredients, ingredient]
          );
        }}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
         onChange={(e) => setName(e.target.value) }
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
