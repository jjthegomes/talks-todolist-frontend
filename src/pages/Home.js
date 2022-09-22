import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Confirmed, Trash } from "../components/Icons/Trash";
import api from "../service/api";
import { useNavigate } from "react-router-dom";

const Title = styled.h1`
  font-size: 32pt;
  margin: 0;
`;

const Container = styled.div`
  background-image: url("/images/post-it-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;

  a {
    text-decoration: none;
  }
`;

const Card = styled.div`
  padding-left: 1.5rem;
  width: 300px;
  border-radius: 8px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: #fff;
  /* height: 100px; */

  // button {
  //   transition: all 0.3s;
  //   opacity: 0;
  // }

  // &:hover {
  //   button {
  //     opacity: 1;
  //   }
  // }

  div {
    display: flex;
    align-items: center;
  }
`;

const CustomCard = styled(Card)`
  background: #feff9c;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  max-width: 324px;
 
  cursor: pointer;

  h1 {
    font-weight: 500;
  }
`;

const CardTitle = styled.h1`
  color: #3b3b3b;
  font-size: 1.5em;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: #e3535c;
  color: #fff;
  font-size: 1.2em;
  padding: 2rem 0.75rem;
  border: none;
  color: color;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
    &:hover {
      opacity: 1;
  }
`;

const ConfirmedButton = styled.button`
  gap: 1em;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;


`
const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #aaa;
  outline: none;
`;


export function Home() {
  const [todoLists, setTodoLists] = useState([]);
  const [newListInput, setNewListInput] = useState(false);
  const [showNewListInput, setShowNewListInput] = useState(false);

  const navigate = useNavigate();

  const getAll = async () => {
    try {
      const response = await api.get("/lists/");
      setTodoLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const result = window.confirm("Deseja realmente deletar essa lista?");

    if (!result) return;

    try {
      await api.delete("/list/" + id);
      await getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e) => {
    try {
      const response = await api.post("/lists/", { name: newListInput });
      const listId = response.data.id;
      navigate("/todo/" + listId);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowListName = () => setShowNewListInput(!showNewListInput);

  const handleNewListInput = async (e) => {
    // event.preventDefault();
    if (e.key !== 'Enter' && e.button !== 0 || !newListInput) return setNewListInput(e.currentTarget.value);
    await handleCreate(e);
    setNewListInput("");
    toggleShowListName();
  }

  const handleCancelInput = () => {
    setShowNewListInput(false);
  };

  return (
    <Container>
      <Header>
        <Title>Lista de todos</Title>
      </Header>
      <CardContainer>
        <CustomCard>
          {/* <div> */}
          {showNewListInput ? <>
            <Input
              type="text"
              placeholder="Insira o nome da lista"
              onKeyDown={handleNewListInput} />;
            <ConfirmedButton type="submit" /*form={formId}*/ onClick={handleNewListInput}>
              <Confirmed />
            </ConfirmedButton>
            <ConfirmedButton onClick={handleCancelInput}>
              <Trash />
            </ConfirmedButton>
          </>
            : !showNewListInput && <CardTitle onClick={toggleShowListName}>+ Adicionar lista</CardTitle>}
          {/* </div> */}
        </CustomCard>
        {todoLists.map((todoList) => (
          <Link to={`/todo/${todoList.id}`} key={todoList.id}>
            <Card>
              <div>
                <CardTitle>{todoList.name}</CardTitle>
              </div>
              <DeleteButton onClick={(e) => handleDelete(e, todoList.id)}>
                <Trash />
              </DeleteButton>
            </Card>
          </Link>
        ))}
      </CardContainer>
    </Container>
  );
}
