/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from '../../hooks/useRequest';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import {
  createReplacementSinglePagesAction,
  createReplacementMultiPagesAction,
} from '../../redux/slice';
import { commonBtn, getAbsoluteBtn } from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';
import BindingThumbnailBox from './BindingThumbnailBox';
import BindingInputBox from './BindingInputBox';

function ModifyPageInfoPopUp({ pageType, userSeq, data, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: data.title,
    thumbnail: '',
  });
  const [thumbnail, setThumbnail] = useState(data.thumbnail);
  const { title } = inputs;

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

  const dispatch = useDispatch();

  const getEndpoint = () => {
    if (pageType === 'single')
      return `${getApiEndpoint()}/user/page/single/${data.url}/${userSeq}`;
    else return `${getApiEndpoint()}/user/page/multi/${data.url}/${userSeq}`;
  };

  const { res: singlePagesData, request: requestSinglePagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userSeq}`,
    method: 'get',
  });

  const { res: multiPagesData, request: requestMultiPagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/multies/${userSeq}`,
    method: 'get',
  });

  const endpoint = getEndpoint();

  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'patch',
    data: inputs,
  });

  const onSubmit = useCallback(
    (target) => {
      // eslint-disable-next-line no-unused-vars
      target.setAttribute('disabled', true);
      target.textContent = '전송 중...';
      request();
    },
    [request]
  );

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      if (pageType === 'single') requestSinglePagesData();
      else requestMultiPagesData();
    }
  }, [res, pageType, requestSinglePagesData, requestMultiPagesData]);

  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
      setPopUp(false);
    }
  }, [singlePagesData, dispatch, setPopUp]);
  useEffect(() => {
    if (multiPagesData && multiPagesData.data) {
      dispatch(createReplacementMultiPagesAction(multiPagesData.data));
      setPopUp(false);
    }
  }, [multiPagesData, dispatch, setPopUp]);

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '페이퍼 제목',
    placeholder: data.title,
  };

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이퍼 수정</div>
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
              url=''
              title={title}
              onChange={onChange}
              firstInput={firstInput}
              isUrl
            />
          </div>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={(e) => onSubmit(e.target)}
          >
            변경하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifyPageInfoPopUp;

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
  z-index: 11;
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
  background-color: rgba(239, 100, 8, 1);
  &:hover {
    background-color: rgba(300, 100, 8, 1);
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
  align-items: center;
  margin-bottom: 5%;
`;
