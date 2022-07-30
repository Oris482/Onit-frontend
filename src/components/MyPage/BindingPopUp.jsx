/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import BindingThumbnailBox from './BindingThumbnailBox';
import BindingSelectSinglePages from './BindingSelectSinglePages';
import BindingThumbnailPopUp from './BindingThumbnailPopUp';
import BindingInputBox from './BindingInputBox';
import BindingButtonSet from './BindingButtonSet';

function BindingPopUp({ userSeq, popUp, setPopUp }) {
  const [inputs, setInputs] = useState({
    title: '',
    url: '',
    thumbnail: '',
    singlePages: [],
  });
  const [thumbnail, setThumbnail] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  const [thumbnailPopUp, setThumbnailPopUp] = useState(false);

  useEffect(() => {
    setInputs({
      ...inputs,
      singlePages: { selectedPages },
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

  function closeThumbnailPopUp() {
    setThumbnailPopUp(false);
  }

  console.log(inputs);
  return (
    <div css={[backGroundPopStyle]}>
      <div css={[pagePopUpBoxStyle]}>
        <div css={[pagePopUpBoxTitle]}>페이지 합치기</div>
        <form css={[formWidth]}>
          <button
            type='button'
            css={[pagePopUpBoxCloseButton]}
            onClick={() => setPopUp(!popUp)}
          >
            X{' '}
          </button>
          <div css={[VerticalLayout]}>
            <div css={[HorizontalLayout, InputSection]}>
              <BindingThumbnailBox
                thumbnail={thumbnail}
                setThumbnailPopUp={setThumbnailPopUp}
              />
              <BindingInputBox url={url} title={title} onChange={onChange} />
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
            <BindingButtonSet
              inputs={inputs}
              userSeq={userSeq}
              setPopUp={setPopUp}
            />
          </div>
        </form>
      </div>
      {thumbnailPopUp && (
        <div css={[backGroundPopStyle]}>
          <div css={[widgetBoxPopStyle]}>
            <BindingThumbnailPopUp
              label='썸네일 설정'
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              endPop={closeThumbnailPopUp}
            />
          </div>
        </div>
      )}
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

const widgetBoxPopStyle = {
  position: 'fixed',
  zIndex: '11',
  top: `50%`,
  left: `50%`,
  transform: 'translate(-50%, -50%)',
  width: '540px',
  height: `250px`,
  backgroundColor: 'white',
  borderRadius: '20px',
};
