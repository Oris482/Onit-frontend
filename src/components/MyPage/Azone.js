/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ProfileBlock from './ProfileBlock';

function Azone({ myInfo, setPopUp, popUp, setBindingPopUp, bindingPopUp }) {
  return (
    <div css={MyPageAZone}>
      <div
        css={css`
          display: flex;
          height: 100%;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            margin: 5px;
          `}
        >
          <div className='profileImage' css={ProfileAZone} />
        </div>
        <div
          css={css`
            width: 100%;
            margin: 5px;
          `}
        >
          <div
            css={css`
              width: 40%;
              height: 30px;
              margin: 15px;
              text-align: left;
              font-size: 30px;
            `}
          >
            {myInfo ? myInfo.nickname : ''}
          </div>

          <div
            css={css`
              width: 40%;
              margin: 5px;
              text-align: left;
            `}
          />
          <div
            css={css`
              width: 40%;
              margin: 5px;
              text-align: left;
            `}
          >
            <div css={ProfileAZoneTagButton}>일러스트레이션</div>
            <div css={ProfileAZoneTagButton}>포토그래퍼</div>
            <div css={ProfileAZoneTagButton}>현대미술</div>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            margin: 5px;
            justify-content: center;
            text-align: center;
          `}
        >
          <ProfileBlock
            // 기존에 있던 버튼 컴포넌트 재활용_이름 변경 혹은 별도 컴포넌트로 분리 필요
            setPopUp={setBindingPopUp}
            popUp={bindingPopUp}
            buttonText='페이지 합치기'
          />
          <ProfileBlock setPopUp={setPopUp} popUp={popUp} />
        </div>
      </div>
    </div>
  );
}

const MyPageAZone = css`
  width: 1470px;
  height: 120px;
  background-color: white;
  margin-top: 100px;
`;

const ProfileAZone = css`
  width: 100px;
  height: 100px;
  background-color: lightgray;
  border-color: black;

  text-align: center;
  justify-content: center;
  border-radius: 50%;
  display: flex;
`;

const ProfileAZoneTagButton = css`
  display: inline-block;
  margin: 5px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  justify-content: center;
  text-align: center;
  font-size: 13px;
  padding: 10px 20px 10px 20px;
`;

export default Azone;
