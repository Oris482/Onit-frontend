/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { InitButtonStyle } from '../../styles/GlobalStyles';

function AddPageBlock({ userMatched, setPopUp, popUp }) {
  if (userMatched) {
    return (
      <>
        <button
          type='button'
          css={[InitButtonStyle, siteViewBZone]}
          onClick={() => setPopUp(!popUp)}
        >
          +
        </button>
      </>
    );
  } else {
    return <div css={noPageMsg}>현재 만들어진 페이지가 없어요!</div>;
  }
}

export default AddPageBlock;

const siteViewBZone = css`
  position: relative;
  width: 17vw;
  height: 12vw;
  min-width: 240px;
  min-height: 173px;
  max-width: 320px;
  max-height: 230px;
  border-radius: 20px 20px 20px 20px;
  background-color: white;
  display: inline-block;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 35px;
  color: gray;
`;

const noPageMsg = css`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 25px;
`;
