/** @jsxImportSource @emotion/react */
import { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import { HeaderWrapper } from '..';
import { logoImg } from '../../asset';
import { logout } from '../../utils/util';
import { useMyInfo } from '../../hooks/myInfo';
import Login from '../Login';
import { mainColor } from '../../styles/color';

function Header({ userMatched, pageType }) {
  const history = useHistory();
  const [popUpLogin, setPopUpLogin] = useState(false);

  const { loggedIn, myInfo } = useMyInfo();
  const feedbackBtn = (
    <button
      type='button'
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      onClick={() => history.push(`/feedback`)}
    >
      제안하기
    </button>
  );

  const myPageBtn = (
    <button
      type='button'
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      onClick={() => history.push(`/${myInfo.url}/`)}
    >
      내 페이지
    </button>
  );

  const mainBtn = (
    <button
      type='button'
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      onClick={() => history.push(`/`)}
    >
      메인으로
    </button>
  );

  const logInBtn = (
    <button
      type='button'
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      onClick={() => setPopUpLogin(!popUpLogin)}
    >
      시작하기
    </button>
  );

  const logOutBtn = (
    <button
      type='button'
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      onClick={() => logout()}
    >
      로그아웃
    </button>
  );

  const guideBtn = (
    <a
      css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
      rel='noreferrer'
      target='_blank'
      href='https://heom.notion.site/ONIT-3d91a0aee6b545aab841167248f54fb4'
    >
      온잇 가이드
    </a>
  );
  const logoBtn = (
    <a href='/main' css={[marginLeft17, height21]}>
      <img alt='img' src={logoImg} css={hieght100p} />
    </a>
  );

  const noBtn = <></>;

  const loginPopupWindow = (
    <div css={[loginPosition]}>
      <div css={[loginWindowCSS]}>
        <Login />
      </div>
    </div>
  );

  // 히스토리 푸시
  const headerBtn = useCallback(
    (btn1, btn2, btn3, btn4, btn5, btn6) => {
      if (loggedIn)
        return (
          <>
            {btn1}
            {btn2}
            {btn3}
            {guideBtn}
          </>
        );
      else
        return (
          <>
            {btn4}
            {btn5}
            {btn6}
            {guideBtn}
          </>
        );
    },
    [loggedIn, popUpLogin]
  );

  const headerForm = useCallback(
    (btn1, btn2, btn3, btn4, btn5, btn6) => {
      return (
        <>
          <div css={[flex, flexBtw]}>
            {logoBtn}
            <div css={rightCloumn}>
              {headerBtn(btn1, btn2, btn3, btn4, btn5, btn6)}
            </div>
          </div>
          {popUpLogin ? loginPopupWindow : <></>}
        </>
      );
    },
    [loggedIn, popUpLogin]
  );

  const myPageHeader = (
    <>
      {userMatched &&
        headerForm(mainBtn, feedbackBtn, logOutBtn, noBtn, noBtn, noBtn)}
      {!userMatched &&
        headerForm(
          mainBtn,
          feedbackBtn,
          myPageBtn,
          mainBtn,
          feedbackBtn,
          logInBtn
        )}
    </>
  );

  function chooseFitHeader() {
    if (pageType === 'main') {
      return headerForm(
        myPageBtn,
        feedbackBtn,
        logOutBtn,
        feedbackBtn,
        logInBtn,
        noBtn
      );
    } else if (pageType === 'myPage') {
      return myPageHeader;
    } else if (pageType === 'feedback') {
      return headerForm(myPageBtn, mainBtn, logOutBtn, noBtn, logInBtn, noBtn);
    } else {
      return <div>정의되지 않은 타입입니다.</div>;
    }
  }

  return <HeaderWrapper>{chooseFitHeader()}</HeaderWrapper>;
}

const height21 = css`
  height: 21px;
`;

const hieght100p = css`
  height: 100%;
`;

const marginLeft17 = css`
  margin-left: 17px;
`;

const marginRight40 = css`
  margin-right: 40px;
`;

const flex = css`
  display: flex;
  height: 100%;
`;

const flexBtw = css`
  justify-content: space-between;
  align-items: center;
`;

const confirmButtonWidth = css`
  width: fit-content;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: justify;
  height: 35px;
  line-height: 35px;
  border-radius: 17px;
  border: none;
  font-size: 13.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #000;
  padding: 0px;
  &:hover {
    color: ${mainColor};
  }
`;

const rightCloumn = css`
  display: flex;
  flex-direction: row;
`;

const loginWindowCSS = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -15%);
  width: 360px;
  height: 500px;
  background-color: #fff;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

const loginPosition = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Header;
