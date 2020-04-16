import React, { useState, useEffect } from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  let emptyVal = { id: "", name: "", age: "", isEditing: false };
  let [db, setDb] = useState({});
  let [users, setUsers] = useState([]);
  let [input, setInput] = useState(emptyVal);

  //open a database
  useEffect(() => {
    const req = window.indexedDB.open("database", 1);

    req.onupgradeneeded = (e) => {
      let db = e.target.result;
      let objStore = db.createObjectStore("objStore", { keyPath: "id" });
      objStore.createIndex("name", "name", { unique: false });
    };

    req.onsuccess = (e) => {
      const { result } = e.target;
      setDb(result);
      result
        .transaction(["objStore"], "readwrite")
        .objectStore("objStore")
        .getAll().onsuccess = (event) => {
        setUsers(event.target.result);
      };
    };
  }, []);

  //handling input changing
  const handleChange = (e) => {
    e.stopPropagation();
    let { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  //handle adding data to database
  const addData = () => {
    if (input.name === "" || input.age === "" || input.id === "") return;
    db
      .transaction(["objStore"], "readwrite")
      .objectStore("objStore")
      .add(input).onsuccess = () => setInput(emptyVal);

    //*I call this func to update
    getAllData();
  };

  //deleting data
  const delData = (e) => {
    db.transaction(["objStore"], "readwrite")
      .objectStore("objStore")
      .delete(e.target.id);

    //*I call this func to update
    getAllData();
  };

  //! getting all Data , here I failed to update with useEffect ,
  //! so I create this func and...
  //! I call it after each of CRUD process to update screen as database
  const getAllData = (e) => {
    db
      .transaction(["objStore"], "readwrite")
      .objectStore("objStore")
      .getAll().onsuccess = (event) => setUsers(event.target.result);
  };

  //retrieve data to handle and edit
  const handleEditButton = (i) => {
    users[i].isEditing = true;
    db.transaction(["objStore"], "readwrite")
      .objectStore("objStore")
      .put(users[i]);

    //*I call this func to update
    getAllData();
  };

  //update data
  const updateData = (name, age, id) => {
    let obj = { name, age, id, isEditing: false };
    db.transaction(["objStore"], "readwrite").objectStore("objStore").put(obj);

    //*I call this func to update
    getAllData();
  };

  return (
    <Context.Provider
      value={{
        handleChange,
        input,
        addData,
        users,
        delData,
        updateData,
        handleEditButton,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { Provider };
