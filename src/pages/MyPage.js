/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Header } from '../components';
import AddPagePopUp from '../components/MyPage/AddPagePopUp';
import EditPropfilePopUp from '../components/MyPage/EditProfilePopUp';
import PageBlock from '../components/MyPage/PageBlock';
import { useMyInfo } from '../hooks/myInfo';
import { useRequest } from '../hooks/useRequest';
import { useGetPersonalUrl } from '../hooks/useParamsUrl';
import {
  getApiEndpoint,
  isError,
  urlMatched,
  urlOwnerNotFound,
} from '../utils/util';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Azone from '../components/MyPage/Azone';

function MyPage() {
  const { myInfo } = useMyInfo();
  const history = useHistory();
  const pageUrl = useGetPersonalUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);

  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  // eslint-disable-next-line no-unused-vars
  const { res: bZoneData, request: requestBZoneData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userSeq}`,
    method: 'get',
  });

  // 내 페이지인지 남의 페이지인지 확인 로직
  useEffect(() => {
    // 로그인 유무
    if (pageUrl) {
      // 내 페이지일 경우
      if (myInfo && urlMatched(myInfo.url, pageUrl)) {
        setUserMatched(true);
        setNickname(myInfo.nickname);
        setUserUrl(myInfo.url);
        if (userSeq) requestBZoneData();

        // 다른 사람 페이지일 경우
      } else {
        setUserMatched(false);
        // 해당 페이지 정보 가져옴 -> pageUserRes에 변화
        requestPageUserInfo();
      }
    }
    return () => {
      setUserMatched(null);
      setNickname(null);
    };
  }, [pageUrl, myInfo, userSeq, requestPageUserInfo, requestBZoneData]);

  // pageUserRes에 변화가 있으면 -> 데이터를 받아서 userseq, nickname 세팅.
  useEffect(() => {
    if (pageUserRes && pageUserRes.data) {
      const { code, data, message } = pageUserRes.data;
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('페이지를 찾을 수 없습니다.');
        history.goBack();
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
      if (data) {
        setUserSeq(data.user_seq);
        setNickname(data.nickname);
      }
    }
    return () => {
      setUserSeq(null);
      setNickname(null);
    };
  }, [pageUserRes, history]);

  function bzoneimage() {
    if (bZoneData && bZoneData.data.message === 'ok') {
      const usersb = bZoneData.data.data;

      return (
        <>
          {usersb.map((page, index) => {
            const semiIndex = index + 1;
            return (
              <div key={semiIndex}>
                <PageBlock
                  data={page}
                  addBlock={false}
                  setPopUp={setPopUp}
                  popUp={popUp}
                />
              </div>
            );
          })}
        </>
      );
    }
    return <div>no data</div>;
  }

  const AzoneComponent = useEffect(() => {
    return (
      <Azone myInfo={myInfo} setPopUp={setProfilePopUp} popUp={profilePopUp} />
    );
  }, [myInfo, setProfilePopUp, profilePopUp]);

  return (
    <div css={[positionRelative]}>
      <Header
        userMatch={userMatched}
        pageUrl={pageUrl}
        pageUserName={nickname}
        pageType='normal'
      />

      <div css={MyPageWrapper}>
        {AzoneComponent}
        <hr css={[divLine]} />

        <div css={MyPageBZoneWrapper}>
          <div css={MyPageBZone}>
            {bzoneimage()}
            <PageBlock userUrl={userUrl} setPopUp={setPopUp} popUp={popUp} />

            <div css={[overFlowHidden]} />
          </div>
        </div>
        <div
          css={css`
            width: 100vw;
            display: flex;
            justify-content: center;
          `}
        />
      </div>
      {profilePopUp && (
        <EditPropfilePopUp
          userSeq={userSeq}
          setPopUp={setProfilePopUp}
          popUp={profilePopUp}
        />
      )}
      {popUp && (
        <AddPagePopUp userSeq={userSeq} setPopUp={setPopUp} popUp={popUp} />
      )}
    </div>
  );
}

export default MyPage;

const positionRelative = css`
  position: relative;
`;

const MyPageWrapper = css`
  width: 1470px;
  height: 100vh;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MyPageBZoneWrapper = css`
  width: 100vw;
  height: 300px;
  background-color: white;
`;
const MyPageBZone = css`
  width: 1470px;
  flex-wrap: wrap;
  display: flex;
`;

const divLine = css`
  width: 100%;
  height: 1px;
  border: none;
  background-color: lightgray;
`;

const overFlowHidden = css`
  overflow: hidden;
`;
