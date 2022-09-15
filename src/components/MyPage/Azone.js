/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { logoImg } from '../../asset';
import { PAGE_MARGIN, PAGE_WIDTH } from '../../styles/style';
import ProfileBlock from './ProfileBlock';

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
          <img css={profileImg} src={!profileImage ? logoImg : profileImage} />
        </div>
        <div
          css={css`
            width: 100%;
            margin: 5px;
          `}
        >
          <div
            css={css`
              height: 41.25px;
              margin: 0 15px 11.25px;
              text-align: left;
              font-size: 30px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: normal;
              text-align: left;
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
            <div css={ProfileAZoneTagButton}>온잇은 지금 베타버전입니다</div>
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
  height: 30px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  justify-content: center;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  padding: 7.5px 12.75px;
  color: #888;
  box-sizing: border-box;
`;

export default Azone;
