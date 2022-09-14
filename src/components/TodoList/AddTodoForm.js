import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: none;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
`;


export const AddTodoForm = (props) => {
  const { onSubmit } = props;
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.trim()) return;

    onSubmit({ value: item });
    setItem("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="item"
        onChange={(e) => setItem(e.target.value)}
        value={item}
        placeholder="Digite seu todo"
      />
      <button type="submit">Adicionar</button>
    </Form>
  );
};
