/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import BindingThumbnailPopUp from './BindingThumbnailPopUp';
import { BlockDrag } from '../../styles/GlobalStyles';
import { mainColor, subColor } from '../../styles/color';

const ProfileImageBox = (props) => {
  const { profileImage, setProfileImage } = props;
  const [profileBoxHover, setProfileBoxHover] = useState(false);
  const [previewProfile, setPreviewProfile] = useState('');
  const [profileImagePopUp, setProfileImagePopUp] = useState(false);

  useEffect(() => {
    if (profileImagePopUp === false) {
      setPreviewProfile(profileImage);
    }
  }, [profileImagePopUp]);

  function closeThumbnailPopUp() {
    setProfileImagePopUp(false);
    setProfileBoxHover(false);
  }

  return (
    <div
      css={[thumbnailBox, BlockDrag]}
      onMouseEnter={() => setProfileBoxHover(true)}
      onMouseLeave={() => setProfileBoxHover(false)}
    >
      {!!previewProfile && <img css={[thumbnailImg]} src={previewProfile} />}
      {(!profileImage || profileBoxHover) && (
        <button
          css={[thumbnailButton, LoginButtonColor]}
          type='button'
          onClick={() => setProfileImagePopUp(true)}
        >
          {!previewProfile ? '이미지 설정' : '이미지 수정'}
        </button>
      )}
      {profileImagePopUp && (
        <BindingThumbnailPopUp
          label='프로필 이미지 설정'
          thumbnail={profileImage}
          setThumbnail={setProfileImage}
          endPop={closeThumbnailPopUp}
        />
      )}
    </div>
  );
};

export default ProfileImageBox;

const thumbnailBox = css`
  position: relative;
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 100px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  margin-right: 30px;
`;

const thumbnailButton = css`
  position: absolute;
  width: 128px;
  height: 45px;
  border-radius: 22.5px;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.07);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const thumbnailImg = css`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  object-fit: cover;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: ${subColor};
  border: none;
  &:hover {
    background-color: ${mainColor};
  }
`;
