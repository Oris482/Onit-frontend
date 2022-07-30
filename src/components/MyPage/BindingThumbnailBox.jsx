/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import BindingThumbnailPopUp from './BindingThumbnailPopUp';
import { BlockDrag } from '../../styles/GlobalStyles';

const BindingThumbnailBox = (props) => {
  const { thumbnail, setThumbnail } = props;
  const [thumbnailBoxHover, setThumbnailBoxHover] = useState(false);
  const [thumbnailPopUp, setThumbnailPopUp] = useState(false);

  function closeThumbnailPopUp() {
    setThumbnailPopUp(false);
    setThumbnailBoxHover(false);
  }

  return (
    <div
      css={[thumbnailBox, BlockDrag]}
      onMouseEnter={() => setThumbnailBoxHover(true)}
      onMouseLeave={() => setThumbnailBoxHover(false)}
    >
      {thumbnail !== '' && <img css={[thumbnailImg]} src={thumbnail} />}
      {(thumbnail === '' || thumbnailBoxHover) && (
        <button
          css={[thumbnailButton, LoginButtonColor]}
          type='button'
          onClick={() => setThumbnailPopUp(true)}
        >
          {thumbnail === '' ? '썸네일 업로드' : '썸네일 수정'}
        </button>
      )}
      {thumbnailPopUp && (
        <BindingThumbnailPopUp
          label='썸네일 설정'
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          endPop={closeThumbnailPopUp}
        />
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
