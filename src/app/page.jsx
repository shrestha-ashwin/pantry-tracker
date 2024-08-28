"use client";
import { useState, useEffect, use } from "react";
import { db } from "../config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const itemField = document.querySelector(".item");
  const priceField = document.querySelector(".price");
  const quantityField = document.querySelector(".quantity");

  const itemsCollection = collection(db, "items");

  const getItems = async () => {
    try {
      const data = await getDocs(itemsCollection);
      const itemsData = data.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      }));
      setItems(itemsData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  });

  const addNewItem = async () => {
    try {
      await addDoc(itemsCollection, {
        name: newItemName,
        price: newItemPrice,
        quantity: newItemQuantity,
      });
      itemField.value = "";
      priceField.value = "";
      quantityField.value = "";
      getItems();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    const document = doc(db, "items", id);
    await deleteDoc(document);
    getItems();
  };

  const updateQuantity = async (id, quantity) => {
    const document = doc(db, "items", id);
    await updateDoc(document, { quantity });
    getItems();
  };

  const addQuantity = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(id, newQuantity);
  };

  const removeQuantity = async (id, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="max-w-5xl mx-auto box-border mt-4">
      <h1 className="text-center text-2xl mb-6">Pantry Tracker</h1>
      <div className="grid justify-items-center mb-16 gap-y-1">
        <input
          type="text"
          placeholder="item"
          onChange={(e) => setNewItemName(e.target.value)}
          className="item px-1 py-2 ml-6"
        />

        <div className="flex gap-3 items-center">
          <label for="price">$</label>
          <input
            type="number"
            placeholder="price"
            id="price"
            onChange={(e) => setNewItemPrice(Number(e.target.value))}
            className="price px-1 py-2"
          />
        </div>
        <div className="flex gap-1 items-center">
          <label className="h-10" for="quantity">
            No.
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="quantity"
            onChange={(e) => setNewItemQuantity(Number(e.target.value))}
            className="quantity mb-4 px-1 py-2"
          />
        </div>
        <button
          onClick={addNewItem}
          className="bg-black text-white border-0 px-5 py-2 rounded-md"
        >
          Add item
        </button>
      </div>
      <div>
        <h2 className="text-center mb-4 text-xl font-semibold">Items: </h2>
        <div className="flex justify-center items-center flex-col">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex justify-center gap-3 mb-3 items-center border-blue-500 border-2 border-solid w-80"
            >
              <div className="flex gap-2">
                <button
                  className="text-xl hover:text-green-400 hover:font-semibold"
                  onClick={() => addQuantity(i.id, i.quantity)}
                >
                  +
                </button>
                <button
                  className="text-xl hover:text-red-400 hover:font-semibold"
                  onClick={() => removeQuantity(i.id, i.quantity)}
                >
                  -
                </button>
                <h2 className="ml-6 self-center">{i.quantity}</h2>
              </div>
              <div className="flex gap-4">
                <h2>{i.name}</h2>
                <p className="mr-6">${i.price}</p>
                <button
                  className="text-red-400 hover:text-red-700 hover:font-semibold"
                  onClick={() => deleteItem(i.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
