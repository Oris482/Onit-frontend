/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory, useLocation } from 'react-router';
import {
  COLOR_STYLE,
  FlexColCenter,
  FlexSpaceBetweenStart,
  InitButtonStyle,
  mq,
  TextUnderline,
  OrangeColorButton,
  RoundButtonSmall,
  FlexSpaceBetweenCenter,
} from '../../styles/GlobalStyles';
import useInput from '../../hooks/useInput';
import { useRequest } from '../../hooks/useRequest';
import { isOk } from '../../utils/util';
import EmailCertModal from '../EmailCertModal';
import TermModal from '../TermModal';

function RightBox() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [certModal, setCertModal] = useState(false);
  const [termModal, setTermModal] = useState(false);
  const [certState, setCertState] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { endpoint, joinType, userEmail } = location.state;

  const certificateEmail = () => {
    setCertModal(true);
  };

  const emailCertButton = useMemo(() => {
    if (certState) {
      return (
        <button type='button' css={[InputInnerButton, InputInnerButtonMQ()]}>
          인증완료!
        </button>
      );
    } else {
      return (
        <button
          type='button'
          css={[InputInnerButton, InputInnerButtonMQ()]}
          onClick={certificateEmail}
        >
          이메일 인증하기
        </button>
      );
    }
  }, [certState]);

  const email = useInput({
    inputType: 'email',
    id: 'email',
    type: 'email',
    label: '이메일',
    disabled: certState,
    overlapCheckRequired: true,
    button: emailCertButton,
  });

  const password = useInput({
    inputType: 'password',
    id: 'password',
    label: '비밀번호',
    type: showPassword ? 'text' : 'password',
    button: (
      <button
        type='button'
        css={[InputInnerButton, InputInnerButtonMQ()]}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
      </button>
    ),
  });

  const name = useInput({
    inputType: 'nickname',
    id: 'nickname',
    type: 'text',
    label: '닉네임',
    overlapCheckRequired: true,
  });

  const url = useInput({
    inputType: 'url',
    id: 'url',
    type: 'text',
    prefix: <p>iamonit.kr/</p>,
    label: '개인 url',
    overlapCheckRequired: true,
  });

  const getPostData = () => {
    if (joinType === 'kakao') {
      return {
        email: userEmail,
        nickname: name.value,
        url: url.value,
      };
    } else {
      return {
        email: email.value,
        password: password.value,
        nickname: name.value,
        url: url.value,
      };
    }
  };

  const { res, request } = useRequest({
    endpoint,
    method: 'post',
    data: getPostData(),
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (agreement) request();
  };

  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'ok') {
        history.push('/main');
      } else {
        alert('전송에 실패했습니다. 다시 시도해주세요.');
      }
    }
  }, [res]);

  const isInvalid = useCallback((inputState) => inputState !== 'ok', []);

  const disableSubmit = useMemo(() => {
    if (
      (joinType === 'local' && isInvalid(password.state)) ||
      (joinType === 'local' && isInvalid(email.state)) ||
      isInvalid(url.state) ||
      isInvalid(name.state) ||
      (joinType === 'local' && !certState)
    )
      return true;
    else return false;
  }, [email.state, password.state, name.state, url.state, certState]);

  const agreementState = useMemo(() => {
    if (!disableSubmit && !agreement) {
      return '약관에 동의해주세요.';
    }
    return 'ok';
  }, [disableSubmit, agreement]);

  const emailState = useMemo(() => {
    if (certModal && isOk(email.state) && !email.overlapState) {
      return true;
    }
    return false;
  }, [email.state, certModal]);

  function inputBox(_htmlFor, _label, _component, _id) {
    return (
      <div id={_id} css={[InputItem, InputItemMQ()]}>
        <label css={[InputLabel, InputLabelMQ()]} htmlFor={_htmlFor}>
          {_label}
        </label>
        {_component}
      </div>
    );
  }
  return (
    <>
      {certModal && (
        <EmailCertModal
          closeModal={() => setCertModal(false)}
          certSucceed={() => setCertState(true)}
          email={email.value}
          state={emailState}
        />
      )}
      {termModal && (
        <TermModal
          closeModal={() => setTermModal(false)}
          setAgreementTrue={() => {
            setAgreement(true);
          }}
        />
      )}
      <div css={[InputListWrapper, InputListWrapperMQ()]}>
        <form css={[InputList, InputListMQ()]} onSubmit={onSubmitHandler}>
          {joinType === 'local' &&
            inputBox(email.id, '이메일', email.component)}
          {joinType === 'local' &&
            inputBox('password', '비밀번호', password.component)}
          {inputBox('nickname', '닉네임', name.component)}
          {inputBox('url', '개인 url', url.component)}
          <div css={InputConfirm}>
            <div>
              <input
                type='checkbox'
                id='agreement'
                checked={agreement}
                onChange={(event) => {
                  setAgreement(event.target.checked);
                }}
              />
              <label htmlFor='agreement' css={AgreementLabel}>
                <button
                  type='button'
                  css={[InitButtonStyle]}
                  onClick={() => setTermModal(true)}
                >
                  <p css={[TextUnderline]}>약관</p>
                </button>
                에 동의합니다.
              </label>
              <p>{agreementState === 'ok' ? '' : agreementState}</p>
            </div>
            <button
              type='submit'
              css={ConfirmButtonStyle}
              disabled={disableSubmit}
            >
              생성 완료
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

const InputListWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: inherit;
  width: 60.9%;
  border-radius: 30px;
  background-color: white;
`;

export const InputListWrapperMQ = () => {
  const normal = '100px 0px 0px 100px';
  const narrow = '100px 100px 0px 0px';
  const normalWidth = '60.9%';
  const narrowWidth = '100vw';
  return mq({
    width: [narrowWidth, narrowWidth, normalWidth, normalWidth],
    borderRadius: [narrow, narrow, normal, normal],
  });
};

const InputList = css`
  ${FlexColCenter}
  margin: 5vh 3.5vw 2vh 2.5vw;
`;

export const InputListMQ = () => {
  const normalHeight = '70vh';
  const narrowHeight = 'auto';
  const normalWidth = '39.1%';
  const narrowWidth = '70%';

  return mq({
    height: [narrowHeight, narrowHeight, normalHeight, normalHeight],
    width: [narrowWidth, narrowWidth, normalWidth, normalWidth],
  });
};

const InputItem = css`
  ${FlexSpaceBetweenStart}
  margin: 10px;
  width: 100%;
`;

export const InputItemMQ = () => {
  return mq({
    flexDirection: ['column', 'column', 'row', 'row'],
  });
};

const InputLabel = css`
  font-weight: bold;
  font-size: 1rem;
  word-break: keep-all;
  margin-top: 1vh;
  margin-right: 1vw;
`;

const InputLabelMQ = () => {
  return mq({
    width: ['15vw', '15vw', '7vw', '7vw'],
    marginBottom: ['2vh', '2vh', '0', '0'],
  });
};

const InputConfirm = css`
  ${FlexSpaceBetweenCenter}
  width: 100%;
  height: 10%;
  p {
    font-size: 0.8rem;
  }
`;

const ConfirmButtonStyle = css`
  ${InitButtonStyle}
  ${RoundButtonSmall}
  ${OrangeColorButton}
  line-height: 14.4px;
  width: fit-content;
  white-space: nowrap;
`;

const InputInnerButton = css`
  ${InitButtonStyle}
  font-size: 0.8rem;
  color: ${COLOR_STYLE.brownishGrey};
`;

const AgreementLabel = css`
  font-size: 0.8rem;
`;

const InputInnerButtonMQ = () => {
  return mq({
    width: ['30vw', '25vw', '13vw', '10vw'],
  });
};

export default RightBox;
