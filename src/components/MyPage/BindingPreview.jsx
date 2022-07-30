/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MultiPage from '../../pages/MultiPage';
import {
  commonBtn,
  BlockDrag,
  getAbsoluteBtn,
} from '../../styles/GlobalStyles';
import { closeSet } from '../../asset';

const BindingPreview = (props) => {
  const { inputs, setPopUp } = props;
  const { btn, img } = getAbsoluteBtn(25, 42, 25);

  return (
    <div css={[previewLayout, BlockDrag]}>
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
      <MultiPage />
    </div>
  );
};

export default BindingPreview;

const previewLayout = css`
  position: fixed;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 97vw;
  max-width: 1483px;
  height: 55vw;
  max-height: 836px;
  @media screen and (max-height: 830px) {
    width: 85vw;
    height: 48vw;
  }
  z-index: 12;
  padding: 30px 40px 30px 40px;
  background-color: white;
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
