/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { useMyInfo } from '../../hooks/myInfo';
import { getApiEndpoint } from '../../utils/util';
import {
  commonBtn,
  BlockDrag,
  getAbsoluteBtn,
} from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';
import ProfileImageBox from './ProfileImageBox';
import BindingInputBox from './BindingInputBox';

function EditProfilePopUP({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    nickname: '',
    hashtag: '',
    profileImage: ``,
  });
  const [profileImage, setProfileImage] = useState('');
  const { nickname, hashtag } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setInputs({
        ...inputs,
        nickname: value,
      });
    } else if (name === 'url') {
      setInputs({
        ...inputs,
        hashtag: value,
      });
    }
  };

  const endpoint = `${getApiEndpoint()}/profile/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'patch',
    data: inputs,
  });

  const { res: myInfoRes, request: myInfoRequest } = useMyInfo();

  useEffect(() => {
    setInputs({
      ...inputs,
      profileImage: profileImage,
    });
  }, [profileImage]);

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      console.log(res);
      myInfoRequest();
    }
    // 닉네임 중복 등 검사 필요
  }, [res]);

  useEffect(() => {
    if (myInfoRes && myInfoRes.data.user_seq !== -1) {
      // eslint-disable-next-line no-restricted-globals
      // location.reload();
      console.log(myInfoRes);
    }
  }, [myInfoRes]);

  function onSubmit() {
    request();
  }

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '닉네임',
    placeholder: '변경하시려는 닉네임을 입력해주세요!',
  };
  const secondInput = {
    head: '관심 분야',
    placeholder: '관심분야를 입력주세요. ex) 순수미술',
  };

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>프로필 수정</div>
        <form css={[formWidth]} onSubmit={onSubmit}>
          <button
            type='button'
            css={[commonBtn, btn]}
            onClick={() => {
              setPopUp(false);
            }}
          >
            <div css={img}>
              <img alt='img' height='50px' src={closeSet} />
            </div>
          </button>
          <div css={[HorizontalLayout, InputSection]}>
            <ProfileImageBox
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
            <BindingInputBox
              url={hashtag}
              title={nickname}
              onChange={onChange}
              firstInput={firstInput}
              secondInput={secondInput}
              isUrl={false}
            />
          </div>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={onSubmit}
          >
            변경하기
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
  width: 780px;
  height: 444px;
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

const HorizontalLayout = css`
  display: flex;
  flex-direction: row;
`;

const InputSection = css`
  align-items: flex-start;
  margin-top: 40px;
  justify-content: center;
`;
