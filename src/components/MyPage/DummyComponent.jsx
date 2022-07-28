/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

function component() {
  return (
    <div>
      <div css={siteViewBZone}>
        <div
          css={css`
            height: 70%;
            background-image: url('https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjNfNDEg/MDAxNDk4MjExMTE1OTYy.RGjgC51-8rYSISInewpiERaIWLuYkk6h8-DHImZWlNog.6nJ1cYNwJuFRBYbzuXIlfFC2vAz9SSYihxEpnVX2ttUg.PNG.kkp0079/1.PNG?type=w800');
            border-radius: 20px 20px 0px 0px;
          `}
        />
        <div
          css={css`
            display: flex;
            text-align: center;
            align-items: center;
          `}
        >
          <div
            css={css`
              font-size: 20px;
              width: 70%;
              display: flex;
              margin: auto;
              margin-top: 20px;
            `}
          >
            일러스트레이터 cloudy
          </div>
          <div
            css={css`
              font-size: 20px;
              display: flex;
              display: flex;
              margin: auto;
              margin-top: 20px;
            `}
          >
            삭제
          </div>
        </div>
      </div>
    </div>
  );
}

export default component;

const siteViewBZone = css`
  width: 329px;
  height: 234px;
  border-radius: 20px 20px 20px 20px;
  background-color: white;
  display: inline-block;
  margin: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 35px;
  color: gray;
`;
