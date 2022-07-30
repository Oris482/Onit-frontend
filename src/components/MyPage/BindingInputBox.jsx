/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { isURL } from '../../utils/util';
import { useGetPersonalUrl } from '../../hooks/useParamsUrl';

const BindingInputBox = (props) => {
  const [paddingSize, setPaddingSize] = useState(0);
  const fixedTextRef = useRef(null);
  const pageUrl = useGetPersonalUrl();

  useEffect(() => {
    setPaddingSize(fixedTextRef.current.clientWidth + 16);
  }, []);

  const validateURL = useMemo(() => {
    if (props.url === '') return '';
    if (!isURL(props.url)) return '숫자와 영어만 사용하실 수 있습니다!';
    else if (props.url.length < 4) return '4글자 이상 입력해주세요.';
    else if (props.url.length > 20) return '16글자 이하로 입력해주세요';
    else {
      // 중복 체크 API 들어갈 부분
      return 'ok';
    }
  }, [props.url]);

  return (
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
          value={props.url}
          maxLength='24'
          autoComplete='off'
          onChange={props.onChange}
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
        value={props.title}
        autoComplete='off'
        onChange={props.onChange}
      />
    </div>
  );
};

export default BindingInputBox;

const VerticalLayout = css`
  display: flex;
  flex-direction: column;
`;

const pagePopUpBoxContents = css`
  font-size: 18px;
  line-height: normal;
  font-weight: bold;
`;

const formText = css`
  position: relative;
`;

const fixedText = css`
  position: absolute;
  left: 15px;
  top: 25px;
  color: gray;
  z-index: 9;
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

const checkURLMsg = css`
  position: absolute;
  left: 17px;
  top: 60px;
  font-size: 13px;
  color: red;
  opacity: 0.6;
  z-index: 9;
`;
