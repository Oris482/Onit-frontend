/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from '../../hooks/useRequest';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import { createReplacementSinglePagesAction } from '../../redux/slice';

function AddPagePopUp({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
  });
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

  // eslint-disable-next-line no-unused-vars
  const [test, setTest] = useState({ title: '', url: '' });

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
    (event) => {
      console.log('inputs', inputs);
      // eslint-disable-next-line no-unused-vars
      // setTest(1); // 이유가뭐지, test에 의존성이 걸려있는 애들을 업데이트하겠다., 페이지를 넘긴다는 의미, 그다음단계에서는 테스트가 1위 됏으니깐
      // // component안에서 함수 만들때는 무조건 useCallback을 써라?
      // // 관리하기 편해짐
      event.preventDefault();
      request();
    },
    [inputs, request] // 의존성을 넣는 이유, 리랜더링 하는 시점에서 목록안에 있는것들이 이전의 값들과 바꼇는지 안바꼇는지를 테스트한다음에 바꼇으면 함수를 다시만듬
  );

  useEffect(() => {
    if (res && res.data.code === 'ok') {
      requestSinglePagesData();
    }
  }, [res]);

  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
      setPopUp(!popUp);
    }
  }, [singlePagesData]);

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 추가</div>
        <form css={[formWidth]}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X
          </button>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>페이지 이름</div>
            <input
              name='title'
              value={title}
              css={[pagePopUpBoxInput]}
              placeholder='페이지 이름을 입력해주세요.'
              onChange={onChange}
            />
          </div>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>페이지 URL</div>
            <input
              css={[pagePopUpBoxInput]}
              name='url'
              value={url}
              placeholder='영문과 숫자 조합으로 설정해주세요.'
              onChange={onChange}
            />
          </div>
          <div css={[pagePopUpBoxContentsWraper]}>
            <div css={[pagePopUpBoxContents]}>페이지 썸네일</div>
            <input
              css={[pagePopUpBoxInput]}
              type='file'
              placeholder='썸네일을 추가해주세요.'
            />
          </div>

          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={onSubmit}
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
  width: 980px;
  height: 584px;
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
  margin-top: 10%;
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
