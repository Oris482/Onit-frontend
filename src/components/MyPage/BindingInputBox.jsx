/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BlockDrag } from '../../styles/GlobalStyles';
import { isURL } from '../../utils/util';
import { useGetPersonalUrl } from '../../hooks/useParamsUrl';

const BindingInputBox = (props) => {
  const { url, title, onChange, firstInput, secondInput, isUrl } = props;
  const [paddingSize, setPaddingSize] = useState(0);
  const fixedTextRef = useRef(null);
  const pageUrl = useGetPersonalUrl();

  useEffect(() => {
    if (secondInput) {
      setPaddingSize(fixedTextRef.current.clientWidth + 17);
    }
  }, [secondInput]);

  const validateURL = useMemo(() => {
    if (url === '' || !isUrl) return '';
    if (!isURL(url)) return '숫자와 영어만 사용하실 수 있습니다!';
    else if (url.length < 4) return '4글자 이상 입력해주세요.';
    else if (url.length > 20) return '16글자 이하로 입력해주세요';
    else {
      // 중복 체크 API 들어갈 부분
      return 'ok';
    }
  }, [url, isUrl]);

  return (
    <div css={[VerticalLayout]}>
      <div css={[pagePopUpBoxContents, BlockDrag]}>{firstInput.head}</div>
      <input
        css={[pagePopUpBoxInput]}
        placeholder={firstInput.placeholder}
        name='title'
        value={title}
        autoComplete='off'
        spellCheck={false}
        onChange={onChange}
      />
      {secondInput && (
        <>
          <div css={[pagePopUpBoxContents, BlockDrag]}>{secondInput.head}</div>
          <div css={[formText]}>
            <input
              css={[
                pagePopUpBoxInput,
                css`
                  padding-left: ${paddingSize}px;
                `,
              ]}
              name='url'
              value={url}
              placeholder={secondInput.placeholder}
              maxLength='24'
              autoComplete='off'
              spellCheck={false}
              onChange={onChange}
            />
            <span css={[fixedText]} ref={fixedTextRef}>
              {secondInput.placeholder === ''
                ? `https://iamonit.kr/${pageUrl}/`
                : ''}
            </span>
            {validateURL !== 'ok' ? (
              <span css={[checkURLMsg]}>{validateURL}</span>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BindingInputBox;

const VerticalLayout = css`
  display: flex;
  flex-direction: column;
`;

const pagePopUpBoxContents = css`
  font-size: 16px;
  line-height: normal;
  font-weight: bold;
`;

const formText = css`
  position: relative;
`;

const fixedText = css`
  position: absolute;
  left: 4%;
  top: 25%;
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
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 35px;
  line-height: 40px;
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
