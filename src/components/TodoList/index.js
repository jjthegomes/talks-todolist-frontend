import { useState } from "react";
import styled from "styled-components";
import { AddTodoForm } from "./AddTodoForm";
import { ListItem } from "./ListItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2rem;
  max-width: 640px;
  width: 100%;
  gap: 2rem;

  form {
    width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TodoList = () => {
  const [list, setList] = useState([]);

  const onSubmit = ({ value }) => {
    setList((oldList) => [
      {
        id: Math.random().toString(36).substring(2, 10),
        value,
      },
      ...oldList,
    ]);
  };

  const handleDelete = (id) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
  };

  const handleEdit = (newItem) => {
    const newList = list.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    setList(newList);
  };

  return (
    <Container>
      <AddTodoForm onSubmit={onSubmit} />
      <List>
        {list.map((listItem) => (
          <ListItem
            key={listItem.id}
            listItem={listItem}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )).reverse()}
      </List>
    </Container>
  );
};
