/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Header } from '../components';
import AddPagePopUp from '../components/MyPage/AddPagePopUp';
import EditPropfilePopUp from '../components/MyPage/EditProfilePopUp';
import BindingPagePopUp from '../components/MyPage/BindingPopUp';
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
import ProfileBlock from '../components/MyPage/ProfileBlock';
import { createReplacementSinglePagesAction } from '../redux/slice';

function MyPage() {

  const { myInfo } = useMyInfo();
  const history = useHistory();
  const pageUrl = useGetPersonalUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [bindingPopUp, setBindingPopUp] = useState(false);
  const dispatch = useDispatch();

  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  // eslint-disable-next-line no-unused-vars
  const { res: bZoneData, request: requestBZoneData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userSeq}`,
    method: 'get',
  });

  const { res: singlePagesData, request: requestSinglePagesData } = useRequest({
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
        if (userSeq) {
          requestBZoneData();
          requestSinglePagesData();
        }

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
  }, [pageUrl, myInfo, userSeq]);

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
  }, [pageUserRes]);

  // 바인딩 페이지용 싱글페이지 목록 데이터 리덕스에 저장
  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
    }
  }, [singlePagesData]);
  
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

  return (
    <div css={[positionRelative]}>
      <Header
        userMatch={userMatched}
        pageUrl={pageUrl}
        pageUserName={nickname}
        pageType='normal'
      />

      <div css={MyPageWrapper}>

        <div css={MyPageAZone}>
          <div
            css={css`
              display: flex;
              height: 100%;
              align-items: center;
              /* border: 1px solid lightgray; */
            `}
          >
            <div
              css={css`
                display: flex;
                margin: 5px;
                /* border: 1px solid lightgray; */
              `}
            >
              <div
                className='profileImage'
                css={ProfileAZone}
                // src={profilePicture}
              />
            </div>
            <div
              css={css`
                width: 100%;
                margin: 5px;
                /* border: 1px solid lightgray; */
              `}
            >
              <div
                css={css`
                  width: 40%;
                  height: 30px;
                  margin: 15px;
                  /* border: 1px solid lightgray; */
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
                  /* border: 1px solid lightgray; */
                  text-align: left;
                `}
              >
                {/* Following 64 Follower 1982 */}
              </div>
              <div
                css={css`
                  width: 40%;
                  margin: 5px;
                  /* border: 1px solid lightgray; */
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
                // border: 1px solid lightgray;
                justify-content: center;
                text-align: center;
              `}
            >
              <ProfileBlock
                // 기존에 있던 버튼 컴포넌트 재활용_이름 변경 혹은 별도 컴포넌트로 분리 필요
                addBlock
                setPopUp={setBindingPopUp}
                popUp={bindingPopUp}
                buttonText='페이지 합치기'
              />
              <ProfileBlock
                addBlock
                setPopUp={setProfilePopUp}
                popUp={profilePopUp}
                buttonText='프로필 수정'
              />

              {/* <div css={ProfileAZoneInputButton}>팔로우</div> */}
              {/* <div css={ProfileAZoneMessageButton}>메시지</div> */}
            </div>
          </div>
        </div>
        <hr css={[divLine]} />

        <div css={MyPageBZoneWrapper}>
          <div css={MyPageBZone}>

            {bzoneimage()}
            <PageBlock addBlock setPopUp={setPopUp} popUp={popUp} />

            <div css={[overFlowHidden]} />
          </div>
        </div>
        <div
          css={css`
            width: 100vw;
            display: flex;
            justify-content: center;
          `}
        >
          {/* <div css={MyPageCZone}>
            <MyPageProfile />
          </div>
          <div css={MyPageDZone}>
            <MyPageCommentWrite />
            <MyPageComment />
          </div> */}
        </div>
      </div>
      {profilePopUp && (
        <EditPropfilePopUp
          userSeq={userSeq}
          setPopUp={setProfilePopUp}
          popUp={profilePopUp}
        />
      )}
      {bindingPopUp && (
        <BindingPagePopUp userSeq={userSeq} setPopUp={setBindingPopUp} />
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
  /* background-color: lightblue; */
  /* text-align: center; */
`;

const MyPageAZone = css`
  width: 1470px;
  height: 120px;
  background-color: white;
  margin-top: 100px;
  /* border: 1px solid lightgray; */
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
  /* padding-top: 10px; */
  /* padding-bottom: 10px; */
`;

const overFlowHidden = css`
  overflow: hidden;
`;
