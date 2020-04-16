import React, { useContext, useRef } from "react";
import Context from "./Provider";

const User = ({ id, name, age, isEditing, index }) => {
  let { delData, updateData, handleEditButton } = useContext(Context);

  //handle updating a user
  const handleUpdate = (e) => {
    updateData(newName.value, newAge.value, e.target.id);
  };

  let newAge = useRef();
  let newName = useRef();
  if (!isEditing) {
    return (
      <>
        <tr>
          <td>{name}</td>
          <td>{age}</td>
          <td>{id}</td>
          <td>
            <button
              className="btn btn-outline-warning"
              id={id}
              onClick={() => {
                handleEditButton(index);
              }}
            >
              EDIT
            </button>{" "}
            |{" "}
            <button
              className="btn btn-outline-danger"
              id={id}
              onClick={delData}
            >
              DEL
            </button>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <>
        <tr style={{ border: "1px solid red" }}>
          <td>
            <input
              type="text"
              ref={(val) => (newName = val)}
              defaultValue={name}
            />
          </td>
          <td>
            <input
              type="number"
              ref={(val) => (newAge = val)}
              defaultValue={age}
            />
          </td>
          <td>{id}</td>
          <td>
            <button className="btn btn-success" id={id} onClick={handleUpdate}>
              DONE!
            </button>
          </td>
        </tr>
      </>
    );
  }
};

export default User;
