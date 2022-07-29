/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const BindingPreview = () => {
  return <div css={[previewLayout]}>미리보기 영역</div>;
};

export default BindingPreview;

const previewLayout = css`
  height: 100%;
`;
