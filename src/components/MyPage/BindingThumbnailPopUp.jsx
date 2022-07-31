/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import {
  COLOR_STYLE,
  commonBtn,
  FlexColCenter,
  FlexSpaceBetween,
  InitButtonStyle,
  OrangeColorButton,
  RoundButtonSmall,
  getAbsoluteBtn,
  BasicInputStyle,
  DisplayNone,
  autofillF2f2f2,
} from '../../styles/GlobalStyles';
import { usePostImage } from '../../hooks/widget';
import { closeSet } from '../../asset';

function BindingThumbnailPopUp(props) {
  const { label, endPop } = props;
  const [submitted, setSubmitted] = useState(false);
  const [isLocalUpload, setIsLocalUpload] = useState(true);
  const [localFiles, setLocalFiles] = useState(null);
  const { s3url, request } = usePostImage();

  const handleSubmit = (target) => {
    if (isLocalUpload && localFiles) {
      target.setAttribute('disabled', true);
      target.classList.remove('hover');
      target.textContent = '전송중';
      request(localFiles);
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && isLocalUpload) {
      if (props.thumbnail === s3url) endPop();
    } else if (submitted && !isLocalUpload && props.thumbnail) endPop();
  }, [props.thumbnail, submitted, isLocalUpload, s3url]);

  const handleThumbChange = ({ target: { value } }) => {
    props.setThumbnail(value);
  };

  useEffect(() => {
    if (s3url) {
      props.setThumbnail(s3url);
    }
  }, [s3url]);

  const handleLocalUpload = ({ target: { files } }) => {
    setLocalFiles(files);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const imageInput = useRef();

  const onClickFileInput = () => {
    imageInput.current.click();
  };

  return (
    <div css={[Container]} aria-hidden='true'>
      <div css={[Overlay]} aria-hidden='true'>
        <div css={[PopUpBox]}>
          <div css={PopupHeader}>
            <p css={[PopupLabel]}>{label}</p>
            <button
              type='button'
              css={[commonBtn, btn]}
              onClick={() => {
                endPop();
              }}
            >
              <div css={img}>
                <img alt='img' height='50px' src={closeSet} />
              </div>
            </button>
          </div>

          <div css={[PopupColumnWrapper]}>
            <button
              type='button'
              css={[
                InitButtonStyle,
                ChangeModeButton,
                textColor(isLocalUpload),
              ]}
              onClick={() => setIsLocalUpload(true)}
            >
              내 컴퓨터에서 업로드
            </button>
            <button
              type='button'
              css={[
                InitButtonStyle,
                ChangeModeButton,
                textColor(!isLocalUpload),
              ]}
              onClick={() => setIsLocalUpload(false)}
            >
              링크로 업로드
            </button>
          </div>
          <div css={[Line]} />
          <div css={[PopUpBody]}>
            {!isLocalUpload && (
              <input
                type='thumbnail'
                name='thumbnail'
                value={props.thumbnail}
                css={[urlInputStyle]}
                placeholder='이미지 링크를 입력해주세요'
                onChange={handleThumbChange}
                onKeyDown={handleKeyDown}
              />
            )}
            {isLocalUpload && (
              <>
                <button
                  type='button'
                  css={[urlInputStyle, fontColorGrey]}
                  onClick={onClickFileInput}
                >
                  {localFiles === null
                    ? '클릭하여 이미지 선택하기'
                    : localFiles[0].name}
                </button>

                <input
                  id='file'
                  type='file'
                  name='imgae_file'
                  accept='image/png, image/jpeg, image/gif'
                  css={[DisplayNone, autofillF2f2f2]}
                  onChange={handleLocalUpload}
                  ref={imageInput}
                />
              </>
            )}

            <button
              type='button'
              css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall]}
              onClick={(e) => {
                handleSubmit(e.target);
              }}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Container = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = css`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const PopUpBox = css`
  ${FlexColCenter}
  position: relative;
  width: 540px;
  height: 250px;
  border-radius: 20px;
  margin: 30px 0 20px 0;
  background-color: white;
`;

const PopupHeader = css`
  margin-bottom: 35px;
  height: 20px;
`;

const PopupLabel = css`
  font-size: 1.3rem;
  font-weight: 800;
`;

const PopupColumnWrapper = css`
  ${FlexSpaceBetween}
  width: 80%;
  margin: 0;
`;
const Line = css`
  border-bottom: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c9c9c9;
  width: 100%;
`;
const PopUpBody = css`
  ${PopupColumnWrapper}
  height: 60px;
  align-items: center;
  margin-top: 30px;
`;

const urlInputStyle = css`
  ${BasicInputStyle}
  width: 80%;
  height: 40px;
  margin: 28px 15px 32px 0;
  padding: 8px 17px;
  box-sizing: border-box;
`;

const fontColorGrey = css`
  color: #707070;
`;

function textColor(selected) {
  if (selected === true) {
    return css`
      color: ${COLOR_STYLE.black};
      border-bottom: 2px solid;
    `;
  } else {
    return css`
      color: ${COLOR_STYLE.brownishGrey};
    `;
  }
}

const ChangeModeButton = css`
  font-weight: 600;
  font-size: 1rem;
  padding: 5px 8%;
  display: block;
  margin: 0px;
`;

export default BindingThumbnailPopUp;
