/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';

function EditProfilePopUP({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    nickname: '',
    hashtag: '',
  });
  const { nickname, hashtag } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const endpoint = `${getApiEndpoint()}/profile/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'patch',
    data: {
      nickname: 'dongslee_profile',
    },
  });

  function onChangeForm(event) {
    // eslint-disable-next-line no-unused-vars
    const data = { nickname: { nickname }, hashtag: { hashtag } };
    setInputs({
      nickname: '',
      hashtag: '',
    });
    // if (data) console.log(data);
    event.preventDefault();
    // request(data);
    setPopUp(!popUp);
  }

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>프로필 수정</div>
        <form css={[formWidth]} onSubmit={onChangeForm}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X{' '}
          </button>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>닉네임</div>
            <input
              css={[pagePopUpBoxInput]}
              name='nickname'
              value={nickname}
              placeholder='닉네임을 입력해주세요. 닉네임을 변경하면 URL도 변경됩니다.'
              onChange={onChange}
            />
          </div>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>관심 분야</div>
            <input
              css={[pagePopUpBoxInput]}
              placeholder='관심분야를 입력주세요. ex) 순수미술'
              name='hashtag'
              value={hashtag}
              onChange={onChange}
            />
          </div>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>프로필 이미지</div>
            <input
              css={[pagePopUpBoxInput]}
              type='file'
              placeholder='썸네일을 추가해주세요.'
            />
          </div>

          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={onChangeForm}
          >
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePopUP;

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
  width: 980px;
  height: 584px;
  background-color: #ffffff;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

const pagePopUpBoxTitle = css`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-top: 45px;
`;

const pagePopUpBoxContentsWraper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15x;
  width: 100%;
  justify-content: space-around;
  text-align: center;
`;

const pagePopUpBoxContents = css`
  font-size: 20px;
  line-height: 40px;
  font-weight: bold;
  margin-top: 50px;
  margin-left: 60px;
  margin-right: 0px;
`;

const pagePopUpBoxInput = css`
  width: 600px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  font-size: 17px;
  box-sizing: border-box;
  border: none;
  text-indent: 20px;
  margin-right: 50px;
  margin-top: 50px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  :focus {
    box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.18);
  }
`;

const formWidth = css`
  width: 100%;
`;

const commonLoginButtonStyle = css`
  width: 30%;
  height: 60px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 35%;
  margin-top: 10%;
`;

const pagePopUpBoxCloseButton = css`
  width: 3%;
  height: 30px;
  border-radius: 30px;
  border: 0;
  position: absolute;
  left: 95%;
  top: 3%;
  font-size: 15px;
  margin-bottom: 10px;
  background-color: lightgray;
  &:hover {
    background-color: darkgray;
  }
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  &:hover {
    background-color: rgba(300, 100, 8, 1);
  }
`;
