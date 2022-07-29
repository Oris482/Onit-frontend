/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import useRequestAuth from '../../hooks/useRequestAuth';
import { useGetPersonalUrl } from '../../hooks/useParamsUrl';
import { getApiEndpoint } from '../../utils/util';
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
    setPaddingSize(fixedTextRef.current.clientWidth + 1);
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
  function onChangeForm(event) {
    // eslint-disable-next-line no-unused-vars
    event.preventDefault();
    request();
    setPopUp(!popUp);
  }

  console.log(inputs);
  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 합치기</div>
        <form css={[formWidth]} onSubmit={onChangeForm}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X{' '}
          </button>
          <div css={[HorizontalLayout]}>
            <div css={[PreviewWidth]}>
              <BindingPreview />
            </div>
            <div css={[InputWidth]}>
              <div css={[pagePopUpBoxContentsWraper]}>
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
                    autoComplete='off'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div css={[pagePopUpBoxContentsWraper]}>
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
              <div css={[pagePopUpBoxContentsWraper]}>
                <div css={[pagePopUpBoxContents]}>페이지 선택</div>
                <div css={[SelectSinglePagesLayout]}>
                  <BindingSelectSinglePages
                    selectedPages={selectedPages}
                    setSelectedPages={setSelectedPages}
                  />
                </div>
              </div>
              <button
                type='button'
                css={[AddButtonStyle, LoginButtonColor]}
                onClick={onChangeForm}
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
  align-items: stretch;
  width: 100%;
  justify-content: space-between;
  text-align: center;
`;

const pagePopUpBoxContents = css`
  font-size: 15px;
  line-height: 30px;
  font-weight: bold;
  margin-top: 47px;
  margin-left: 5px;
  margin-right: 0px;
`;

const formText = css`
  position: relative;
`;

const pagePopUpBoxInput = css`
  width: 330px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  font-size: 15px;
  box-sizing: border-box;
  border: none;
  text-indent: 15px;
  margin-right: 50px;
  margin-top: 40px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  :focus {
    box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.18);
  }
`;

const fixedText = css`
  position: absolute;
  left: 15px;
  top: 50px;
  color: gray;
  z-index: 9;
`;

const formWidth = css`
  width: 100%;
  height: 85%;
`;

const AddButtonStyle = css`
  position: absolute;
  left: 650px;
  top: 480px;
  width: 15%;
  height: 50px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 20px;
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

const HorizontalLayout = css`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  text-align: center;
`;

const PreviewWidth = css`
  width: 50%;
`;

const InputWidth = css`
  width: 50%;
`;

const SelectSinglePagesLayout = css`
  margin-right: 50px;
  margin-top: 40px;
  width: 330px;
  height: 210px;
`;
