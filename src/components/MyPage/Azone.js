/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { PAGE_MARGIN, PAGE_WIDTH } from '../../styles/style';
import ProfileBlock from './ProfileBlock';
import { logoImg } from '../../asset';

function Azone({ profileImage, nickname, userSeq, setPopUp, popUp }) {
  const { myInfoState } = useSelector((state) => ({
    myInfoState: state.info.user,
  }));

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
          <img
            css={profileImg}
            src={profileImage !== '' ? profileImage : logoImg}
          />
        </div>
        <div
          css={css`
            width: 100%;
            margin: 5px;
          `}
        >
          <div
            css={css`
              height: 30px;
              margin: 15px;
              text-align: left;
              font-size: 30px;
            `}
          >
            {nickname ?? ''}
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
          {myInfoState && myInfoState.user_seq === userSeq && (
            <ProfileBlock
              addBlock
              setPopUp={setPopUp}
              popUp={popUp}
              buttonText='프로필 수정'
            />
          )}
        </div>
      </div>
    </div>
  );
}

const MyPageAZone = css`
  min-width: ${PAGE_WIDTH};
  width: 80vw;
  margin: ${PAGE_MARGIN};
  height: 120px;
  background-color: white;
  margin-top: 100px;
`;

const ProfileAZone = css`
  position: absolute;
  width: 100px;
  height: 100px;
  border-color: black;

  text-align: center;
  justify-content: center;
  border-radius: 50%;
  display: flex;
`;

const profileImg = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
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
