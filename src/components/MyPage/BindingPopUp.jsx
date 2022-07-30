/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { useGetPersonalUrl } from '../../hooks/useParamsUrl';
import { getApiEndpoint, isURL } from '../../utils/util';
import BindingPreview from './BindingPreview';
import BindingSelectSinglePages from './BindingSelectSinglePages';

function BindingPopUp({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
    singlePages: [],
  });
  const [paddingSize, setPaddingSize] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);

  const endpoint = `${getApiEndpoint()}/user/page/multi/${userSeq}`;
  // eslint-disable-next-line no-unused-vars
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'post',
    data: inputs,
  });

  const pageUrl = useGetPersonalUrl();
  const fixedTextRef = useRef(null);
  useEffect(() => {
    setPaddingSize(fixedTextRef.current.clientWidth + 16);
  }, []);
  useEffect(() => {
    setInputs({
      ...inputs,
      singlePages: { selectedPages },
    });
  }, [selectedPages]);

  const { title, url } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const validateURL = useMemo(() => {
    console.log(url.length);
    if (url === '') return '';
    if (!isURL(url)) return '숫자와 영어만 사용하실 수 있습니다!';
    else if (url.length < 4) return '4글자 이상 입력해주세요.';
    else if (url.length > 20) return '16글자 이하로 입력해주세요';
    else {
      // 중복 체크 API 들어갈 부분
      return 'ok';
    }
  }, [url]);

  function submitMultiPageForm(event) {
    // eslint-disable-next-line no-unused-vars
    event.preventDefault();
    request();
    // 마이페이지 업데이트를 위해 멀티페이지 GET 필요
    if (res && res.message === 'ok') setPopUp(!popUp);
    else {
      console.log(res);
    }
  }

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 합치기</div>
        <form css={[formWidth]} onSubmit={submitMultiPageForm}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X{' '}
          </button>
          <div css={[VerticalLayout]}>
            <div css={[InputSection]}>
              <div css={[thumbnailBox]}>
                <button css={[thumbnailButton, LoginButtonColor]} type='button'>
                  썸네일 업로드
                </button>
              </div>
              <div css={[VerticalLayout]}>
                <div css={[pagePopUpBoxContents]}>페이지 주소</div>
                <div css={[formText]}>
                  <span css={[fixedText]} ref={fixedTextRef}>
                    https://iamonit.kr/{pageUrl}/
                  </span>
                  <input
                    css={[
                      pagePopUpBoxInput,
                      css`
                        padding-left: ${paddingSize}px;
                      `,
                    ]}
                    name='url'
                    value={url}
                    maxLength='24'
                    autoComplete='off'
                    onChange={onChange}
                  />
                  {validateURL !== 'ok' ? (
                    <span css={[checkURLMsg]}>{validateURL}</span>
                  ) : (
                    <></>
                  )}
                </div>
                <div css={[pagePopUpBoxContents]}>페이지 제목</div>
                <input
                  css={[pagePopUpBoxInput]}
                  placeholder='제목을 입력해주세요! 최상단에 표시됩니다.'
                  name='title'
                  value={title}
                  autoComplete='off'
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <div css={[VerticalLayout]}>
                <div css={[pagePopUpBoxContents]}>페이지 선택</div>
                <BindingSelectSinglePages
                  selectedPages={selectedPages}
                  setSelectedPages={setSelectedPages}
                />
              </div>
            </div>
            <div css={[HorizontalLayout, buttonLayout]}>
              <button
                type='button'
                css={[CommonButtonStyle, WhiteButtonColor]}
                onClick={submitMultiPageForm}
              >
                미리보기
              </button>
              <button
                type='button'
                css={[CommonButtonStyle, GreyButtonColor]}
                onClick={submitMultiPageForm}
              >
                임시저장
              </button>
              <button
                type='button'
                css={[CommonButtonStyle, LoginButtonColor]}
                onClick={submitMultiPageForm}
              >
                추가하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BindingPopUp;

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
  box-sizing: border-box;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 872px;
  min-height: 700px;
  max-height: 800px;
  height: 85vh;
  padding-left: 96px;
  padding-right: 96px;
  background-color: #ffffff;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
`;

const pagePopUpBoxTitle = css`
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  margin-top: 35px;
`;

const pagePopUpBoxContents = css`
  font-size: 18px;
  line-height: normal;
  font-weight: bold;
`;

const formText = css`
  position: relative;
`;

const pagePopUpBoxInput = css`
  box-sizing: border-box;
  width: 400px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: white;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 35px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  :focus {
    box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.18);
  }
`;

const fixedText = css`
  position: absolute;
  left: 15px;
  top: 25px;
  color: gray;
  z-index: 9;
`;

const checkURLMsg = css`
  position: absolute;
  left: 17px;
  top: 85px;
  font-size: 13px;
  color: red;
  opacity: 0.6;
  z-index: 9;
`;

const formWidth = css`
  width: 100%;
  height: 85%;
`;

const pagePopUpBoxCloseButton = css`
  width: 25px;
  height: 25px;
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

const buttonLayout = css`
  width: 100%;
  font-size: 20px;
  justify-content: space-between;
  margin-top: 20px; ;
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

const VerticalLayout = css`
  display: flex;
  flex-direction: column;
`;

const HorizontalLayout = css`
  display: flex;
  flex-direction: row;
`;

const InputSection = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 40px;
`;

const thumbnailBox = css`
  position: relative;
  width: 255px;
  height: 190px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  margin-right: 30px;
`;
const thumbnailButton = css`
  position: absolute;
  width: 198px;
  height: 45px;
  border-radius: 22.5px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const SelectSinglePagesLayout = css`
  margin-right: 50px;
  margin-top: 40px;
  width: 330px;
  height: 210px;
`;
