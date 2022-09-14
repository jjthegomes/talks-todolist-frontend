import { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { Container } from "../components/styles";
import api from "../service/api";

import {  useNavigate } from "react-router-dom";


// HTML x JSX
// class = className
// onclick = onClick

export function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreate, setIsCreate] = useState(true);

  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const response = await api.post("/login/", {
        email: email,
        password: password,
      });
      const token = response.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/home")

      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  const handleCadastro = async () => {
    try {
      if (!user && !email && !password) return;
      if (password.length <= 3) throw Error("Senha invalida");
      //A-Z = A,B,C,D....Z
      //a-z = a,b,c,d
      //{3,10} = 3, 4, 5, 6, 7, 8, 9, 10
      // /g global
      // /i camel case

      let validatedEmail = email.toLowerCase();
      const regexEmail =
        /[a-z0-9._-]{3,15}@([a-z0-9]{3,10}|\w*mail)(\.\w{2,5}){1,2}/gi;

      if (!regexEmail.test(validatedEmail)) {
        throw Error("Email invalido!");
      }

      const cadastro = await api.post("/users/", {
        email,
        password,
        name: user,
      });
      console.log(cadastro.data);

      setUser("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const renderEmailAndPassword = () => {
    return (
      <>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />

        <label htmlFor="password">
          <b>Senha</b>
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </>
    );
  };

  const renderInputs = () => {
    if (isCreate) {
      return (
        <Container>
          <label htmlFor="username">
            <b>User name</b>
          </label>
          <Input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite seu user name"
            required
          />
          {renderEmailAndPassword()}
          <Button isCreate={isCreate} onClick={handleCadastro}>
            Cadastrar
          </Button>
          <span onClick={() => setIsCreate((prev) => !prev)} className="psw">
            {" "}
            Já tenho cadastro!
          </span>
        </Container>
      );
    } else {
      return (
        <Container>
          {renderEmailAndPassword()}
          <Button isCreate={isCreate} onClick={handleLogin}>
            Logar
          </Button>
          <span
            onClick={() => setIsCreate((prev) => !prev)}
            className="psw"
            style={{ color: "red" }}
          >
            {" "}
            Nao tenho cadastro!
          </span>
        </Container>
      );
    }
  };

  return (
    <div>
      <div className="formulario">
        <div className="imgContainer">
          <img
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt="Avatar"
            className="avatar"
          />
        </div>

        {renderInputs()}
      </div>
    </div>
  );
}
