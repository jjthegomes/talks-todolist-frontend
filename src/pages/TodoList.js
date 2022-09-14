import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/TodoList/AddTodoForm";
import { ListItem } from "../components/TodoList/ListItem";
import api from "../service/api";

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

const ListContainer = styled.div`
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

const NavBar = styled.header`
  display: flex;
  gap: 1rem;
`;

const CustomLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 1rem 2rem;
  /* background: linear-gradient(to bottom, #4a54df, #15d4d8); */
  color: #fff;
  border: solid 1px #fff;
  text-shadow: 0px 0px 20px yellow;
  border-radius: 8px;

  &:hover {
    transition: all 0.3s;
    text-shadow: 0px 0px 30px yellow;
    border: solid 1px yellow;
  }
`;

export function TodoList() {
  const { id } = useParams();
  const [todoList, setTodoList] = useState(null);

  const getOne = async () => {
    try {
      const response = await api.get("/list/" + id);
      setTodoList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOne();
  }, []);

  const onSubmit = async ({ value }) => {
    console.log("call API", { value });

    try {
      const response = await api.post("/lists/" + id + "/item/", {
        name: value,
      });
      console.log(response.data);
      await getOne();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete("/list/" + id + "/item/" + itemId);
      await getOne();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (newItem) => {
    console.log("call API", newItem);

    try {
      await api.put("/lists/" + id + "/item/", {
        id: newItem.id,
        name: newItem.value,
      });
      await getOne();
    } catch (error) {
      console.log(error);
    }
  };

  if (!todoList) return <Container>Carregando...</Container>;

  return (
    <Container>
      <Header>
        <Title>{todoList.name}</Title>
      </Header>
      <ListContainer>
        <NavBar>
          <CustomLink to="/home">Home</CustomLink>
        </NavBar>
        <AddTodoForm onSubmit={onSubmit} />

        {todoList?.items?.length ? (
          <List>
            {todoList.items.map((todo) => (
              <ListItem
                key={todo.id}
                listItem={todo}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </List>
        ) : null}
      </ListContainer>
    </Container>
  );
}
