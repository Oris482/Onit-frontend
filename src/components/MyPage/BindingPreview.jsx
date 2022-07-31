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
  const { inputs, setPopUp, userSeq } = props;
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
      <MultiPage pagesData={inputs} userSeq={userSeq} isPreview />
    </div>
  );
};

export default BindingPreview;

const previewLayout = css`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding: 110px 40px 30px 40px;
  background-color: white;
`;
