/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const BindingThumbnailBox = (props) => {
  const [thumbnailBoxHover, setThumbnailBoxHover] = useState(false);

  return (
    <div
      css={[thumbnailBox]}
      onMouseEnter={() => setThumbnailBoxHover(true)}
      onMouseLeave={() => setThumbnailBoxHover(false)}
    >
      {props.thumbnail !== '' && (
        <img css={[thumbnailImg]} src={props.thumbnail} />
      )}
      {(props.thumbnail === '' || thumbnailBoxHover) && (
        <button
          css={[thumbnailButton, LoginButtonColor]}
          type='button'
          onClick={() => props.setThumbnailPopUp(true)}
        >
          {props.thumbnail === '' ? '썸네일 업로드' : '썸네일 수정'}
        </button>
      )}
    </div>
  );
};

export default BindingThumbnailBox;

const thumbnailBox = css`
  position: relative;
  width: 255px;
  height: 190px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  margin-right: 30px;
`;

const thumbnailButton = css`
  position: absolute;
  width: 198px;
  height: 45px;
  border-radius: 22.5px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const thumbnailImg = css`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  border: none;
  &:hover {
    background-color: rgba(300, 100, 8, 1);
  }
`;
