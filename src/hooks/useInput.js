/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { isEmail } from 'validator';
import { css } from '@emotion/react';
import {
  COLOR_STYLE,
  FlexColCenter,
  FlexSpaceBetweenCenter,
  SHADOW_STYLE,
} from '../styles/GlobalStyles';
import {
  isPassword,
  getApiEndpoint,
  isURL,
  isValidNickname,
} from '../utils/util';
import useRequestAuth from './useRequestAuth';

function useInput({ inputType, id, type, ...args }) {
  const [value, setValue] = useState('');

  const endpoint = `${getApiEndpoint()}/auth/validation/${inputType}/${value}`;
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'get',
  });

  const onChange = (event) => setValue(event.currentTarget.value);

  // input type에 따라 에러 메세지 출력
  const state = useMemo(() => {
    if (value === '') return null;
    if (inputType === 'email') {
      if (!isEmail(value)) return '잘못된 형식입니다.';
    } else if (inputType === 'password') {
      if (!isPassword(value))
        return '영어, 숫자, 특수문자 중 최소 2가지 조합으로 입력해주세요.';
      else if (value.length < 5) return '5글자 이상 입력해주세요.';
    } else if (inputType === 'nickname') {
      if (!isValidNickname(value)) return '한글, 영어, 숫자만 사용가능합니다!';
      else if (value.length > 15) return '15글자 이하로 입력해주세요';
    } else if (inputType === 'url') {
      // const formedUrl = `http://${value}.kr`;
      if (!isURL(value)) return '숫자와 영어만 사용하실 수 있습니다!';
      else if (value.length < 4) return '4글자 이상 입력해주세요.';
      else if (value.length > 20) return '20글자 이하로 입력해주세요';
    }
    return 'ok';
  }, [value]);

  //
  useEffect(() => {
    if (state === 'ok' && args.overlapCheckRequired) {
      request();
    }
  }, [value, state]);

  const overlapState = useMemo(() => {
    if (res && res.data) {
      if (res.data.code === 'error') {
        alert('에러발생');
      } else if (res.data.data[`${inputType}_overlap`] === true) {
        return `이미 사용중인 ${args.label}입니다.`;
      }
    }
    return null;
  }, [res]);

  const errorMessage = useMemo(() => {
    if (state !== 'ok') return state;
    else if (overlapState) return overlapState;
    else if (inputType === 'email' && !args.disabled)
      return '이메일 인증을 완료해주세요!';
    return '';
  }, [state, overlapState, args]);

  const input = () => {
    if (inputType === 'url')
      return (
        <div css={InputUrl}>
          {args.prefix}
          <input id={id} type={type} value={value} onChange={onChange} />
        </div>
      );
    else if (inputType === 'password' || inputType === 'email')
      return (
        <div css={InputPassword}>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={!!args.disabled}
          />
          {args.button}
        </div>
      );
    else
      return (
        <div css={InputNormal}>
          <input id={id} type={type} value={value} onChange={onChange} />
        </div>
      );
  };

  return {
    value,
    state,
    overlapState,
    label: args.label,
    component: (
      <div css={InputContainer}>
        <div css={InputStyle}>{input()}</div>
        <div css={ErrorMessageWrapper}>
          <div css={ErrorMessageStyle}>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    ),
  };
}

export default useInput;

const InputContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const InputStyle = css`
  width: 100%;
  padding: 1.1vh 0vw;
  background-color: ${COLOR_STYLE.white};
  border-radius: 30px;
  box-shadow: ${SHADOW_STYLE.pale};
  ${FlexColCenter}
  input {
    background-color: inherit;
    width: 100%;
    border: 0;
  }
`;

const InputNormal = css`
  width: 90%;
`;
const InputUrl = css`
  ${FlexSpaceBetweenCenter}
  width: 90%;
  font-weight: bold;
  color: ${COLOR_STYLE.brownishGrey};
  font-size: 0.9rem;
  input {
    margin-left: 0.5vw;
  }
`;

const InputPassword = css`
  width: 90%;
  ${FlexSpaceBetweenCenter}
`;

const ErrorMessageWrapper = css`
  display: flex;
  justify-content: end;
  align-items: start;
  width: 100%;
  height: 3.5vh;
`;

const ErrorMessageStyle = css`
  display: flex;
  margin: 1.2vh 1vw 0vh 1vw;

  p {
    font-size: 0.8rem;
    color: ${COLOR_STYLE.coral};
  }
`;
