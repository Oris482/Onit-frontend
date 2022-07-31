/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const BindingSinglePageBlock = (props) => {
  const { data, selectedPages, handleSelect } = props;
  const thumbnailUrl =
    data.thumbnail !== ''
      ? data.thumbnail
      : 'https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjNfNDEg/MDAxNDk4MjExMTE1OTYy.RGjgC51-8rYSISInewpiERaIWLuYkk6h8-DHImZWlNog.6nJ1cYNwJuFRBYbzuXIlfFC2vAz9SSYihxEpnVX2ttUg.PNG.kkp0079/1.PNG?type=w800';
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
  object-fit: cover;
`;

const singlePageBox = css`
  position: relative;
  width: 147px;
  height: 116px;
  margin: 0 0 15px 10px;
  border-radius: 8px;
`;

const singlePageTitle = css`
  box-sizing: border-box;
  font-size: 12px;
  margin: 5px 10px 0 10px;
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
  border-radius: 9px;
  border: solid 2px #fc3f1d;
  /* background-color: rgba(85, 85, 85, 0.4); */
  z-index: 10;
`;

const selectedPageIndexText = css`
  position: absolute;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  top: 85%;
  left: 87%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 19px;
  border-radius: 30px;
  padding-top: 2px;
  padding-bottom: 1;
  color: white;
  z-index: 11;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  border: none;
`;
