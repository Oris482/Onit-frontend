/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import BindingThumbnailBox from './BindingThumbnailBox';
import BindingSelectSinglePages from './BindingSelectSinglePages';
import BindingInputBox from './BindingInputBox';
import BindingButtonSet from './BindingButtonSet';
import {
  commonBtn,
  BlockDrag,
  getAbsoluteBtn,
} from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';

function BindingPopUp({ userSeq, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
    singlePages: [],
  });
  const [thumbnail, setThumbnail] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);

  // 모달이 열린 상태에서는 뒷 페이지 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // inputs값 업데이트 부분
  useEffect(() => {
    setInputs({
      ...inputs,
      singlePages: selectedPages,
    });
  }, [selectedPages]);

  useEffect(() => {
    setInputs({
      ...inputs,
      thumbnail: thumbnail,
    });
  }, [thumbnail]);

  const { title, url } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const firstInput = {
    head: '페이지 제목',
    placeholder: '제목을 입력해주세요! 최상단에 표시됩니다.',
  };
  const secondInput = { head: '페이지 주소', placeholder: '' };

  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle, BlockDrag]}>페이지 합치기</div>
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
          <div css={[VerticalLayout]}>
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
            <div>
              <div css={[VerticalLayout]}>
                <div css={[pagePopUpBoxContents, BlockDrag]}>페이지 선택</div>
                <BindingSelectSinglePages
                  selectedPages={selectedPages}
                  setSelectedPages={setSelectedPages}
                />
              </div>
            </div>
            <BindingButtonSet
              inputs={inputs}
              userSeq={userSeq}
              setPopUp={setPopUp}
            />
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
  min-height: 720px;
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

const formWidth = css`
  width: 100%;
  height: 85%;
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
  align-items: flex-start;
  margin-top: 40px;
`;
