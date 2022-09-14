/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import { commonBtn, getAbsoluteBtn } from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';
import ProfileImageBox from './ProfileImageBox';
import BindingInputBox from './BindingInputBox';
import { PlainPopUp } from '../FeedbackBox/PlainPopUp';
import { mainColor, subColor } from '../../styles/color';

function EditProfilePopUP({
  prevNickname,
  prevProfileImage,
  userSeq,
  setPopUp,
}) {
  const [inputs, setInputs] = useState({
    nickname: prevNickname,
    hashtag: '',
    profileImage: prevProfileImage,
  });
  const [profileImage, setProfileImage] = useState(prevProfileImage);
  const [popUpText, setPopUpText] = useState({
    topText: '',
    middleText: '',
    bottomText: '',
  });
  const [sendingPopUp, setSendingPopUp] = useState(false);
  const { nickname, hashtag } = inputs;
  const buttonRef = useRef(null);

  const onChange = useCallback(
    (e) => {
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
    },
    [inputs]
  );

  const endpoint = `${getApiEndpoint()}/profile/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'patch',
    data: inputs,
  });

  useEffect(() => {
    setInputs({
      ...inputs,
      profileImage: profileImage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } else if (res && res.data.code === 'invalid_schema') {
      setPopUpText({
        topText: '전송 실패',
        middleText: '입력하신 내용이 양식에 맞지 않아요.',
        bottomText:
          '닉네임은 한글, 영어, 숫자만 가능하답니다.\n공백과 특수문자는 사용하실 수 없으니 다시 한 번 확인해주세요!',
      });
      setSendingPopUp(true);
      buttonRef.current.removeAttribute('disabled');
      buttonRef.current.textContent = '변경 하기';
    }
    // 닉네임 중복 등 검사 필요
  }, [res]);

  const onSubmit = useCallback(
    (target) => {
      target.setAttribute('disabled', true);
      target.textContent = '전송 중...';
      request();
    },
    [request]
  );

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '닉네임',
    placeholder: '한글, 영어, 숫자만 가능합니다!(공백 및 특수문자 불가능)',
  };
  const secondInput = {
    head: '관심 분야',
    placeholder: '관심분야를 입력주세요. ex) 순수미술',
  };

  function closeSendingPopUp() {
    setSendingPopUp(false);
  }

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
            ref={buttonRef}
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={(e) => onSubmit(e.target)}
          >
            변경하기
          </button>
        </form>
      </div>
      <PlainPopUp
        state={sendingPopUp}
        close={closeSendingPopUp}
        textObject={popUpText}
        hasButton
      />
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

const formWidth = css`
  width: 100%;
`;

const commonLoginButtonStyle = css`
  width: 140px;
  height: 45px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 15px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 10px;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: ${subColor};
  &:hover {
    background-color: ${mainColor};
  }
  &:disabled {
    pointer-events: none;
    background-color: rgba(300, 100, 8, 0.5);
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
