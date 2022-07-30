/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FlexColCenter, SHADOW_STYLE } from '../../styles/GlobalStyles';

const BindingSendingModal = (props) => {
  const { label, message } = props;
  return (
    <div css={[backGroundPopStyle]}>
      <div css={[widgetBoxPopStyle]}>
        <div css={[Container]}>
          <div css={PopupHeader}>
            <p css={[PopupLabel]}>{label}</p>
          </div>
          <span css={[PopUpMsg]}>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default BindingSendingModal;

const backGroundPopStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 13;
  background-color: rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const widgetBoxPopStyle = {
  position: 'fixed',
  zIndex: '11',
  top: `50%`,
  left: `50%`,
  transform: 'translate(-50%, -50%)',
  width: '340px',
  height: `150px`,
  backgroundColor: 'white',
  borderRadius: '20px',
};

const Container = css`
  ${FlexColCenter}
  ${SHADOW_STYLE.pale}
  width: 100%;
  margin: 30px 0 20px 0;
`;

const PopupHeader = css`
  margin-bottom: 35px;
  height: 20px;
`;

const PopupLabel = css`
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
`;

const PopUpMsg = css`
  font-size: 1rem;
  text-align: center;
`;
