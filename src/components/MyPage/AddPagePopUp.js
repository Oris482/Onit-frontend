/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';

function AddPopUp({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
  });
  const { title, url } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  // eslint-disable-next-line no-unused-vars

  // const [test, setTest] = useState({ title: '', url: '' });

  function onChangeForm(event) {
    // eslint-disable-next-line no-unused-vars
    // const data = { title, url, thumbnail: 'later' };
    // setDatas(data);
    // setTest('hi');
    // setTest(data);
    // setInputs({
    //   title: '',
    //   url: '',
    // });
    // console.log(data.title);
    event.preventDefault();
    console.log(inputs);
    request();
    // setPopUp(!popUp);
  }

  const endpoint = `${getApiEndpoint()}/user/page/single/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    // data: test,
    data: inputs,
  });

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 추가</div>
        <form css={[formWidth]} onSubmit={onChangeForm}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X{' '}
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
            onClick={onChangeForm}
          >
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPopUp;

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
