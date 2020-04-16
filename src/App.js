import React, { useContext } from "react";
import Context from "./Provider";
import User from "./User";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let { handleChange, input, addData, users } = useContext(Context);

  return (
    <div className="App">
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User
              key={index}
              index={index}
              id={user.id}
              name={user.name}
              age={user.age}
              isEditing={user.isEditing}
            />
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={input.name}
                onChange={handleChange}
              />{" "}
            </td>
            <td>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={input.age}
                onChange={handleChange}
              />{" "}
            </td>
            <td>
              <input
                type="text"
                name="id"
                placeholder="Enter your id"
                value={input.id}
                onChange={handleChange}
              />{" "}
            </td>
            <td>
              <button className="btn btn-primary" onClick={addData}>
                ADD +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
