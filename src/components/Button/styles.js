import React from "react";
import styled, { css } from "styled-components";

export const Button = styled.button`
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
  ${({ isCreate }) =>
    isCreate &&
    css`
      background-color: #33ffce;
      font-weight: bold;
    `}
`;
