/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { subColor } from '../../styles/color';

function ProfileBlock({ addBlock, popUp, setPopUp, buttonText }) {
  return (
    <button
      type='button'
      css={[ProfileAZoneInputButton, profileAzoneInputFont]}
      onClick={() => setPopUp(!popUp)}
    >
      {buttonText}
    </button>
  );
}

export default ProfileBlock;

const ProfileAZoneInputButton = css`
  padding: 0;
  border: 0;
  outline: 0;
  width: 100px;
  height: 33.75px;
  /* background-color: inherit; */
  /* word-break: keep-all; */
  display: flex;
  margin: 5px;
  background-color: #f5f5f5;
  border-radius: 20px;
  justify-content: center;
  line-height: 45px;
  text-align: center;
  &:hover {
    background-color: ${subColor};
    color: #fff;
  }
`;

const profileAzoneInputFont = css`
  object-fit: contain;
  font-size: 12px;
  padding: 7.125px 0 9.125px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #888;
`;
