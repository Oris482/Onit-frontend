/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';

import {
  autofillF2f2f2,
  BasicInputStyle,
  COLOR_STYLE,
  commonBtn,
  FlexColCenter,
  getAbsoluteBtn,
  InitButtonStyle,
  OrangeColorButton,
  RoundButtonSmall,
  SHADOW_STYLE,
} from '../../../styles/GlobalStyles';
import { closeSet } from '../../../asset';
import { useInitWidget } from '../../../hooks/widget';
import { TYPE_VIDEO } from '../../../utils/constantValue';

function PopVideo({ label, endPop }) {
  const { init } = useInitWidget();

  const [url, setUrl] = useState('');

  function editWidget() {
    init({ type: TYPE_VIDEO, data: { thumbnail: url } });
  }

  const handleSubmit = () => {
    if (url !== '') {
      editWidget();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setUrl(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
      endPop();
    }
  };

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  return (
    <div css={[Container]}>
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
        <p css={GuideMessage}>지금은 YouTube 링크로만 추가할 수 있어요.</p>
      </div>

      <input
        type='url'
        name='url'
        value={url}
        css={[urlInputStyle, autofillF2f2f2]}
        placeholder='링크를 입력해주세요'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type='button'
        css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall, buttonFont]}
        onClick={() => {
          handleSubmit();
          endPop();
        }}
      >
        업로드
      </button>
    </div>
  );
}

export default PopVideo;

const Container = css`
  ${FlexColCenter}
  ${SHADOW_STYLE.pale}
  width: 100%;
  margin: 35px 0 20px 0;
`;

const urlInputStyle = css`
  ${BasicInputStyle}
  width: 80%;
  margin: 0px auto 25px auto;
  padding: 13px 20px;
`;

const PopupHeader = css`
  ${FlexColCenter}
  margin-bottom: 10px;
  height: 70px;
`;

const PopupLabel = css`
  font-size: 1.3rem;
  font-weight: 800;
`;
const GuideMessage = css`
  width: 100%;
  font-size: 0.8rem;
  word-break: keep-all;
  margin-top: 30px;
  font-weight: bold;
  color: ${COLOR_STYLE.brownishGrey};
`;

const buttonFont = css`
  font-size: 14.4px;
  line-height: 14.4px;
`;
