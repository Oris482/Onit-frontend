/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getApiEndpoint } from '../../utils/util';
import useRequestAuth from '../../hooks/useRequestAuth';
import { useRequest } from '../../hooks/useRequest';
import BindingPreview from './BindingPreview';
import { PlainPopUp } from '../FeedbackBox/PlainPopUp';
import { BlockDrag } from '../../styles/GlobalStyles';
import { createReplacementMultiPagesAction } from '../../redux/slice';

const BindingButtonSet = (props) => {
  const { userSeq, inputs, setPopUp } = props;
  const [previewPopUp, setPreviewPopUp] = useState(false);
  const [sendingPopUp, setSendingPopUp] = useState(false);
  const [errorRes, setErrorRes] = useState(0);
  const [popUpText, setPopUpText] = useState({
    topText: '',
    middleText: '',
    bottomText: '',
  });
  const [hasButton, setHasButton] = useState(true);
  const endpoint = `${getApiEndpoint()}/user/page/multi/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    data: inputs,
  });

  const dispatch = useDispatch();

  const { res: urlOverlapRes, request: requestUrlOverlap } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/overlap/${inputs.url}/${userSeq}`,
    method: 'get',
  });

  const { res: multiPagesData, request: requestMultiPagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/multies/${userSeq}`,
    method: 'get',
  });

  const SUCCESS = 0;
  const EXTRA_ERROR = 1;
  const URL_OVERLAP_ERROR = 2;
  const URL_FORMAT_ERROR = 3;

  useEffect(() => {
    if (multiPagesData) {
      dispatch(createReplacementMultiPagesAction(multiPagesData.data));
      setPopUp(false);
    }
  }, [multiPagesData]);

  useEffect(() => {
    // 마이페이지 업데이트를 위해 멀티페이지 GET 필요
    if (res) {
      setSendingPopUp(false);
      if (res.data.message === 'ok') {
        requestMultiPagesData();
      } else setErrorRes(EXTRA_ERROR);
    }
  }, [res]);

  useEffect(() => {
    // 서버 응답 에러 시 메시지 출력 부분
    if (errorRes !== SUCCESS) {
      if (errorRes === EXTRA_ERROR) {
        setHasButton(true);
        setPopUpText({
          topText: '전송 실패',
          middleText: '서버에 저장하는데 문제가 발생했어요!',
          bottomText:
            '죄송하시만 다시 한 번 시도해주세요 ㅠ.ㅠ\n지속적으로 오류가 발생하면 꼭 저희에게 알려주세요!',
        });
      } else if (errorRes === URL_OVERLAP_ERROR) {
        setHasButton(true);
        setPopUpText({
          topText: '문제가 발생했어요!',
          middleText: '가지고 계신 페이지에 이미 해당 주소가 있어요.',
          bottomText:
            '같은 주소에는 하나의 페이지만 있을 수 있습니다.\n아쉽지만 다른 주소로 설정해주세요!',
        });
      } else if (errorRes === URL_FORMAT_ERROR) {
        setHasButton(true);
        setPopUpText({
          topText: '문제가 발생했어요!',
          middleText: '설정하신 페이지 주소가 규칙에 맞지 않아요.',
          bottomText:
            '페이지 주소는 4글자 이상 20글자 이하\n영어와 숫자만 사용가능해요!',
        });
      }
      setSendingPopUp(true);
    }
  }, [errorRes]);

  useEffect(() => {
    if (urlOverlapRes) {
      if (urlOverlapRes.data.code === 'ok') {
        setSendingPopUp(true);
        request();
      } else if (urlOverlapRes.data.code === 'overlap') {
        setErrorRes(URL_OVERLAP_ERROR);
      } else if (urlOverlapRes.data.message === 'url is invalid') {
        setErrorRes(URL_FORMAT_ERROR);
      } else {
        setErrorRes(1);
      }
    }
  }, [urlOverlapRes]);

  function submitMultiPageForm() {
    // eslint-disable-next-line no-unused-vars
    setHasButton(false);
    setPopUpText({
      topText: '데이터 전송 중',
      middleText: '열심히 데이터를 보내고 있습니다!',
      bottomText: '조금만 더 기다려주시면 멋진 페이지를 보여드릴게요!',
    });
    requestUrlOverlap();
  }

  function closeSendingPopUp() {
    setErrorRes(0);
    setSendingPopUp(false);
  }

  const checkFormInputs = (e) => {
    if (
      inputs.url === '' ||
      inputs.title === '' ||
      inputs.singlePages.length === 0
    ) {
      setHasButton(true);
      setPopUpText({
        topText: '잊으신 부분이 있어요!',
        middleText: '',
        bottomText: '썸네일을 제외한 나머지 부분은 꼭 설정해주셔야합니다!',
      });
      setSendingPopUp(true);
    } else {
      submitMultiPageForm();
    }
  };

  const saveTemporarily = () => {
    // 추후 구현
    setHasButton(true);
    setPopUpText({
      topText: '앗..! 죄송합니다',
      middleText: '아직 사용할 수 없는 기능입니다 ㅠ.ㅠ',
      bottomText: '오닛팀이 열심히 노력 중이니 조금만 기다려주세요!',
    });
    setSendingPopUp(true);
  };

  return (
    <div css={[HorizontalLayout, buttonLayout, BlockDrag]}>
      <button
        type='button'
        css={[CommonButtonStyle, WhiteButtonColor]}
        onClick={saveTemporarily}
      >
        미리보기
      </button>
      <button
        type='button'
        css={[CommonButtonStyle, GreyButtonColor]}
        onClick={saveTemporarily}
      >
        임시저장
      </button>
      <button
        type='button'
        css={[CommonButtonStyle, LoginButtonColor]}
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
      {previewPopUp && (
        <BindingPreview
          inputs={inputs}
          setPopUp={setPreviewPopUp}
          userSeq={userSeq}
        />
      )}
    </div>
  );
};

export default BindingButtonSet;

const HorizontalLayout = css`
  display: flex;
  flex-direction: row;
`;

const buttonLayout = css`
  width: 100%;
  font-size: 20px;
  justify-content: space-between;
  margin-top: 20px;
`;

const CommonButtonStyle = css`
  width: 212px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  font-weight: 500;
  font-size: 20px;
`;

const WhiteButtonColor = css`
  color: #707070;
  border: solid 1px #707070;
  background-color: white;
  &:hover {
    background-color: #eee;
  }
`;

const GreyButtonColor = css`
  color: white;
  border: none;
  background-color: #888;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  border: none;
  &:hover {
    background-color: rgba(300, 100, 8, 1);
  }
`;
