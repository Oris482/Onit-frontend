/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { logo } from '../../asset';

const BindingSinglePageBlock = (props) => {
  const { data, selectedPages, handleSelect } = props;
  const thumbnailUrl = data.thumbnail !== '' ? data.thumbnail : logo;
  const selectedIndex =
    selectedPages.findIndex((element) => element.singlePageUrl === data.url) +
    1;

  return (
    <div
      css={[singlePageBox]}
      onClick={() => handleSelect(data.url)}
      onKeyDown={() => handleSelect(data.url)}
    >
      <div css={[defaultPageOverlay]} />
      {selectedIndex !== 0 ? (
        <div>
          <div css={[selectedPageOverlay]} />
          <div css={[selectedPageIndexText, LoginButtonColor]}>
            {selectedIndex}
          </div>
        </div>
      ) : (
        <></>
      )}
      <img css={[thumbnailImg]} src={thumbnailUrl} />
      <div css={[singlePageTitle]}>{data.title}</div>
    </div>
  );
};

export default BindingSinglePageBlock;

const thumbnailImg = css`
  width: 100%;
  height: 70%;
  border-radius: 8px 8px 0px 0px;
  object-fit: contain;
`;

const singlePageBox = css`
  position: relative;
  width: 147px;
  height: 116px;
  margin: 0 0 15px 10px;
`;

const singlePageTitle = css`
  position: relative;
  top: 3%;
  left: 8%;
  width: 85%;
  box-sizing: border-box;
  font-size: 12px;
  overflow: hidden;
`;

const defaultPageOverlay = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(85, 85, 85, 0.2);
  z-index: 9;
`;

const selectedPageOverlay = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid 2px #fc3f1d;
  background-color: rgba(85, 85, 85, 0.6);
  z-index: 10;
`;

const selectedPageIndexText = css`
  position: absolute;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  line-height: 26px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'SUIT';
  font-size: 19px;
  border-radius: 30px;
  color: white;
  z-index: 11;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  border: none;
`;
