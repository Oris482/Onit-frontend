/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from '../../hooks/useRequest';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import { createReplacementSinglePagesAction } from '../../redux/slice';
import { commonBtn, getAbsoluteBtn } from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';
import BindingThumbnailBox from './BindingThumbnailBox';
import BindingInputBox from './BindingInputBox';

function AddPagePopUp({ userSeq, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
  });
  const [thumbnail, setThumbnail] = useState('');
  const { title, url } = inputs;

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
  // eslint-disable-next-line no-unused-vars
  const { res: singlePagesData, request: requestSinglePagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userSeq}`,
    method: 'get',
  });

  const endpoint = `${getApiEndpoint()}/user/page/single/${userSeq}`;

  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    data: inputs,
  });

  const onSubmit = useCallback(
    (target) => {
      // eslint-disable-next-line no-unused-vars
      // setTest(1); // 이유가뭐지, test에 의존성이 걸려있는 애들을 업데이트하겠다., 페이지를 넘긴다는 의미, 그다음단계에서는 테스트가 1위 됏으니깐
      // // component안에서 함수 만들때는 무조건 useCallback을 써라?
      // // 관리하기 편해짐
      target.setAttribute('disabled', true);
      target.textContent = '전송 중...';
      request();
    },
    [request] // 의존성을 넣는 이유, 리랜더링 하는 시점에서 목록안에 있는것들이 이전의 값들과 바꼇는지 안바꼇는지를 테스트한다음에 바꼇으면 함수를 다시만듬
  );

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      requestSinglePagesData();
    }
  }, [res, requestSinglePagesData]);

  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
      setPopUp(false);
    }
  }, [singlePagesData, dispatch, setPopUp]);

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '페이지 제목',
    placeholder: '제목을 입력해주세요!',
  };
  const secondInput = { head: '페이지 주소', placeholder: '' };

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 추가</div>
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
            onClick={(e) => onSubmit(e.target)}
          >
            추가하기
          </button>
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
`;
