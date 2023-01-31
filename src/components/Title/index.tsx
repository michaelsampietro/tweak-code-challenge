import React from 'react';

type TitleProps = {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h3>{title}</h3>
}

export default Title;