import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.input`
  background-color: ${props => props.theme.bgColor};
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  height: 35px;
  padding: 0 15px;
  font-size: 12px;
`;

const Input = ({placeholder}) => <Container placeholder={placeholder}/>;

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired
}

