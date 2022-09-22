import { useState } from "react";
import styled from "styled-components";
import api from "../../service/api";
import { Confirmed, Trash, Pen, Canceled } from "../Icons/Trash";


const StyledListItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0px 0px 4px #cdcdcd;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  form {
    width: 100%;
  }

  p {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #aaa;
  outline: none;
`;

const ListItemActions = styled.div`
  display: flex;
  gap: 0.5rem;

  button{
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
  }
`;

export const ListItem = (props) => {
  const { listItem, onDelete, onEdit } = props;
  const [item, setItem] = useState(listItem.value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    onEdit({
      id: listItem.id,
      value: item,
    });

    setIsEditing(false);
  };

  const handlePrepareEdit = (e) => {
    e.preventDefault();
    window.console.log(listItem)
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formId = `item-${listItem.id}`;

  return (
    <StyledListItem>
      <form onSubmit={handleEdit} id={formId} onClick={handlePrepareEdit}>
        {isEditing ? (
          <Input
            name={listItem.id}
            id={listItem.id}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            autoFocus={true}
          />
        ) : (
          <p>{listItem.name}</p>
        )}
      </form>
      <ListItemActions>
        {isEditing ? (
          <>
            <button type="submit" form={formId}>
              <Confirmed />
            </button>
            <button onClick={handleCancelEdit} type="button">
              <Canceled />
            </button>
          </>
        ) : (
          <>
            <button onClick={handlePrepareEdit} type="button">
              <Pen />
            </button>
            <button onClick={() => onDelete(listItem.id)}>
              <Trash />
            </button>
          </>
        )}
      </ListItemActions>
    </StyledListItem>
  );
};
