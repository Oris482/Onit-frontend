/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';

function AddPagePopUp({ popUp, setPopUp, userSeq }) {
  const endpoint = `${getApiEndpoint()}/user/page/single/${userSeq}`;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    data: {
      title,
      url,
      // hash_tag: ['예술가', '아티스트', '바보'],
      thumbnail,
    },
  });
  // res인자 사용 후에 삭제할 것
  console.log(res);
  function onChangeForm(event) {
    event.preventDefault();
    request();
  }

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <form css={[formWidth]} onSubmit={onChangeForm}>
          <p>
            title :
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.currentTarget.value);
              }}
            />
          </p>
          <p>
            url :
            <input
              value={url}
              onChange={(event) => {
                setUrl(event.currentTarget.value);
              }}
            />
          </p>
          <p>
            thumbnail :
            <input
              value={thumbnail}
              onChange={(event) => {
                setThumbnail(event.currentTarget.value);
              }}
            />
          </p>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={onChangeForm}
          >
            보내기
          </button>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={() => setPopUp(!popUp)}
          >
            모달 닫기
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPagePopUp;

const backGroundPopStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const pagePopUpBoxStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 500px;
  background-color: #fff;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

const formWidth = css`
  width: 100%;
`;

const commonLoginButtonStyle = css`
  width: 100%;
  height: 48px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  &:hover {
    background-color: rgba(300, 100, 8, 1);
  }
`;
