/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

function ProfileBlock({ addBlock, popUp, setPopUp, buttonText }) {
  return (
    <>
      {addBlock ? (
        <>
          <button
            type='button'
            css={[ProfileAZoneInputButton]}
            onClick={() => setPopUp(!popUp)}
          >
            {buttonText}
          </button>
        </>
      ) : (
        <button
          type='button'
          css={[ProfileAZoneInputButton]}
          onClick={() => {
            /* 여기에 함수 넣으면 됩니다. */
          }}
        >
          image
        </button>
      )}
    </>
  );
}

export default ProfileBlock;

const ProfileAZoneInputButton = css`
  padding: 0;
  border: 0;
  outline: 0;
  /* background-color: inherit; */
  /* word-break: keep-all; */
  display: flex;
  margin: 5px;
  background-color: #f5f5f5;
  border-radius: 20px;
  width: 100px;
  height: 45px;
  justify-content: center;
  line-height: 45px;
  text-align: center;
`;
