import React, { useState, useEffect } from "react";
import { currency, getProductById } from "home/products";
import { addToCart, useLoggedIn } from "cart/cart";
import { useParams } from "react-router-dom";

export const PDPContent = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <></>;

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <img src={product.image} alt={product.name}></img>
      </div>
      <div>
        <div className="flex">
          <h1 className="flex-grow text-3xl font-bold">{product.name}</h1>
          <div className="text-3xl font-bold flex-end">
            {currency.format(product.price)}
          </div>
        </div>
        <div className="mt-10">{product.description}</div>
        <div className="mt-10">{product.longDescription}</div>
        {loggedIn && (
            <div className="text-right mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                onClick={() => addToCart(product.id)}
                id={`addtocart_${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
