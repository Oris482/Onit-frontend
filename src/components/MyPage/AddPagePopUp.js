/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRequest } from '../../hooks/useRequest';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import { useGetPersonalUrl } from '../../hooks/useParamsUrl';
import { commonBtn, getAbsoluteBtn } from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';
import { PlainPopUp } from '../FeedbackBox/PlainPopUp';
import BindingThumbnailBox from './BindingThumbnailBox';
import BindingInputBox from './BindingInputBox';
import { mainColor, subColor } from '../../styles/color';

function AddPagePopUp({ userSeq, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
  });
  const [thumbnail, setThumbnail] = useState('');
  const [sendingPopUp, setSendingPopUp] = useState(false);
  const [errorRes, setErrorRes] = useState(null);
  const [popUpText, setPopUpText] = useState({
    topText: '',
    middleText: '',
    bottomText: '',
  });
  const [hasButton, setHasButton] = useState(true);
  const { title, url } = inputs;

  const SUCCESS = 0;
  const EXTRA_ERROR = 1;
  const URL_OVERLAP_ERROR = 2;
  const URL_FORMAT_ERROR = 3;

  const onChange = useCallback(
    (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  useEffect(() => {
    setInputs({
      ...inputs,
      thumbnail: thumbnail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnail]);

  const history = useHistory();
  const personalUrl = useGetPersonalUrl();

  const { res: urlOverlapRes, request: requestUrlOverlap } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/overlap/${inputs.url}/${userSeq}`,
    method: 'get',
  });

  const endpoint = `${getApiEndpoint()}/user/page/single/${userSeq}`;

  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    data: inputs,
  });

  // const onSubmit = useCallback(
  //   (target) => {
  //     // eslint-disable-next-line no-unused-vars
  //     // setTest(1); // 이유가뭐지, test에 의존성이 걸려있는 애들을 업데이트하겠다., 페이지를 넘긴다는 의미, 그다음단계에서는 테스트가 1위 됏으니깐
  //     // // component안에서 함수 만들때는 무조건 useCallback을 써라?
  //     // // 관리하기 편해짐
  //     target.setAttribute('disabled', true);
  //     target.textContent = '전송 중...';
  //     request();
  //   },
  //   [request] // 의존성을 넣는 이유, 리랜더링 하는 시점에서 목록안에 있는것들이 이전의 값들과 바꼇는지 안바꼇는지를 테스트한다음에 바꼇으면 함수를 다시만듬
  // );

  useEffect(() => {
    // 서버 응답 에러 시 메시지 출력 부분
    if (errorRes === SUCCESS) {
      setHasButton(false);
      setPopUpText({
        topText: '데이터 전송 중',
        middleText: '열심히 데이터를 보내고 있습니다!',
        bottomText: '조금만 더 기다려주시면 멋진 페이퍼를 보여드릴게요!',
      });
      setSendingPopUp(true);
      request();
    } else if (errorRes === EXTRA_ERROR) {
      setHasButton(true);
      setPopUpText({
        topText: '전송 실패',
        middleText: '서버에 저장하는데 문제가 발생했어요!',
        bottomText:
          '죄송하시만 다시 한 번 시도해주세요 ㅠ.ㅠ\n지속적으로 오류가 발생하면 꼭 저희에게 알려주세요!',
      });
      setSendingPopUp(true);
    } else if (errorRes === URL_OVERLAP_ERROR) {
      setHasButton(true);
      setPopUpText({
        topText: '문제가 발생했어요!',
        middleText: '가지고 계신 페이퍼에 이미 해당 주소가 있어요.',
        bottomText:
          '같은 주소에는 하나의 페이퍼만 있을 수 있습니다.\n아쉽지만 다른 주소로 설정해주세요!',
      });
      setSendingPopUp(true);
    } else if (errorRes === URL_FORMAT_ERROR) {
      setHasButton(true);
      setPopUpText({
        topText: '문제가 발생했어요!',
        middleText: '설정하신 페이퍼 주소가 규칙에 맞지 않아요.',
        bottomText:
          '페이퍼 주소는 4글자 이상 20글자 이하\n영어와 숫자만 사용가능해요!',
      });
      setSendingPopUp(true);
    }
  }, [errorRes]);

  useEffect(() => {
    if (urlOverlapRes) {
      if (urlOverlapRes.data.code === 'ok') {
        setErrorRes(SUCCESS);
      } else if (urlOverlapRes.data.code === 'overlap') {
        setErrorRes(URL_OVERLAP_ERROR);
      } else if (urlOverlapRes.data.message === 'url is invalid') {
        setErrorRes(URL_FORMAT_ERROR);
      } else {
        setErrorRes(1);
      }
    }
  }, [urlOverlapRes]);

  const closeSendingPopUp = useCallback(() => {
    setErrorRes(null);
    setSendingPopUp(false);
  }, []);

  const checkFormInputs = (e) => {
    if (inputs.url === '' || inputs.title === '') {
      setHasButton(true);
      setPopUpText({
        topText: '잊으신 부분이 있어요!',
        middleText: '',
        bottomText: '썸네일을 제외한 나머지 부분은 꼭 설정해주셔야합니다!',
      });
      setSendingPopUp(true);
    } else {
      requestUrlOverlap();
    }
  };

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      closeSendingPopUp();
      history.push(`/${personalUrl}/${inputs.url}/edit`);
    }
  }, [res]);

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '페이퍼 제목',
    placeholder: '제목을 입력해주세요!',
  };
  const secondInput = { head: '페이퍼 주소', placeholder: '' };

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이퍼 추가</div>
        <form css={[formWidth]}>
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
            <BindingThumbnailBox
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
            />
            <BindingInputBox
              url={url}
              title={title}
              onChange={onChange}
              firstInput={firstInput}
              secondInput={secondInput}
              isUrl
            />
          </div>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={checkFormInputs}
          >
            추가하기
          </button>
          <PlainPopUp
            state={sendingPopUp}
            close={closeSendingPopUp}
            textObject={popUpText}
            hasButton={hasButton}
          />
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
  width: 30%;
  height: 60px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 35%;
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
