import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  display: block;
  margin-bottom: 25px;

  height: 230px;

  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
`;

type Props = {
  base64: string;
}
const SourceImage = ({ base64 }: Props) => {
  return (
    <Image src={base64} />
  )
};

export default SourceImage;