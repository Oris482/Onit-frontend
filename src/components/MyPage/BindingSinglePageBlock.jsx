/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const BindingSinglePageBlock = (props) => {
  const thumbnailUrl =
    props.data.thumbnail !== ''
      ? props.data.thumbnail
      : 'https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjNfNDEg/MDAxNDk4MjExMTE1OTYy.RGjgC51-8rYSISInewpiERaIWLuYkk6h8-DHImZWlNog.6nJ1cYNwJuFRBYbzuXIlfFC2vAz9SSYihxEpnVX2ttUg.PNG.kkp0079/1.PNG?type=w800';

  return (
    <div
      css={[singlePageBox]}
      onClick={() => props.handleSelect(props.data.url)}
      onKeyDown={() => props.handleSelect(props.data.url)}
    >
      <img css={[thumbnailImg]} src={thumbnailUrl} />
      <div css={[singlePageTitle]}>{props.data.title}</div>
    </div>
  );
};

export default BindingSinglePageBlock;

const thumbnailImg = css`
  width: 100px;
  height: 80%;
  border-radius: 20px 20px 0px 0px;
  object-fit: cover;
`;

const singlePageBox = css`
  width: 100px;
  height: 160px;
  border: 10px black;
  border-radius: 20px;
  margin-right: 5px;
`;

const singlePageTitle = css`
  font-size: 15px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  overflow: hidden;
`;
