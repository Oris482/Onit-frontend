/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import { getApiEndpoint, setLocalStorage } from '../utils/util';
import { useRequest } from '../hooks/useRequest';
import { FlexColCenter } from '../styles/GlobalStyles';
import useRequestAuth from '../hooks/useRequestAuth';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onPasswordChange = (event) =>
    setPasswordValue(event.currentTarget.value);
  const onEmailChange = (event) => setEmailValue(event.currentTarget.value);

  const endpointLogin = `${getApiEndpoint()}/auth/login/local`;
  const { res, request } = useRequest({
    endpoint: endpointLogin,
    method: 'post',
    data: {
      email: emailValue,
      password: passwordValue,
    },
  });
  const { res: userInfoRes, request: userInfoRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });

  const handleKakaoLogin = () => {
    const endpoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endpoint);
  };
  const history = useHistory();

  const inputRef = useRef(null);
  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  const handleLocalLogin = () => {
    request();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLocalLogin();
    }
  };

  useEffect(() => {
    if (res && res.data) {
      if (
        res.data.code === 'unauthorized' &&
        res.data.message === 'password incorrect'
      ) {
        alert('비밀번호를 잘못 입력하셨습니다.');
      } else if (res.data.code === 'unauthorized') {
        handleLocalJoin();
      } else if (res.data.code === 'ok') {
        setLocalStorage(res.data.data);
        userInfoRequest();
      }
    }
  }, [res, userInfoRequest]);

  useEffect(() => {
    if (userInfoRes && userInfoRes.data) {
      if (userInfoRes.data.code !== 'ok') {
        alert('정보를 가져오는 과정에서 오류가 발생하였습니다.');
      } else {
        window.location.reload();
      }
    }
  }, [userInfoRes]);

  const handleLocalJoin = () => {
    history.push({
      pathname: '/join',
      state: {
        endpoint: `${getApiEndpoint()}/auth/join/local`,
        joinType: 'local',
        userEmail: null,
      },
    });
  };

  return (
    <>
      <h1 css={[loginH1]}>로그인</h1>
      <div css={[contentBox]}>
        <form css={[formWidth]} onSubmit={handleLocalLogin}>
          <div css={[commonInputBoxStyle, marginBottom10px]}>
            <input
              css={[commonInputStyle]}
              type='text'
              value={emailValue}
              placeholder='아이디'
              onChange={onEmailChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </div>
          <div css={[commonInputBoxStyle]}>
            <input
              css={[commonInputStyle]}
              type='password'
              value={passwordValue}
              placeholder='비밀번호'
              onChange={onPasswordChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={handleLocalLogin}
          >
            이메일로 시작하기
          </button>
        </form>
        <div css={loginBoundary}>
          <div css={borderLine} />
          <p css={JoinMessageStyle}>또는</p>
          <div css={borderLine} />
        </div>
        <button
          type='button'
          css={[commonLoginButtonStyle, KakaoLoginButtonStyle]}
          onClick={handleKakaoLogin}
        >
          카카오로 시작하기
        </button>
      </div>
    </>
  );
}

export default Login;

const JoinMessageStyle = css`
  font-size: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
  color: #dbdbdb;
`;

const formWidth = css`
  width: 100%;
`;

const loginH1 = css`
  width: 100px;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin: 0 auto;
  padding: 45px 0;
`;

const contentBox = css`
  ${FlexColCenter};
  width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const commonInputBoxStyle = css`
  width: 100%;
  height: 45px;
  border-radius: 30px;
  border: 1px solid #707070;
  padding: 3px 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const marginBottom10px = css`
  margin-bottom: 10px;
`;

const commonInputStyle = css`
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 30px;
  border: 0;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
  }
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

const loginBoundary = css`
  display: flex;
  width: 100%;
  margin: 5px 0 15px 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const borderLine = css`
  width: 48%;
  height: 1px;
  border-bottom: 1px solid #dbdbdb;
`;

const KakaoLoginButtonStyle = css`
  color: rgba(55, 55, 55, 1);
  background-color: rgba(255, 225, 28, 1);
  &:hover {
    background-color: rgba(255, 235, 28, 1);
  }
  margin-bottom: 25px;
`;
