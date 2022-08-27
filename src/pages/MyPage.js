/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components';
import AddPagePopUp from '../components/MyPage/AddPagePopUp';
import EditPropfilePopUp from '../components/MyPage/EditProfilePopUp';
import BindingPagePopUp from '../components/MyPage/BindingPopUp';
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
import {
  createReplacementSinglePagesAction,
  createReplacementMultiPagesAction,
} from '../redux/slice';
import Azone from '../components/MyPage/Azone';
import { PAGE_MARGIN, PAGE_WIDTH } from '../styles/style';
import Bzone from '../components/MyPage/Bzone';

function MyPage() {
  const history = useHistory();
  const pageUrl = useGetPersonalUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [profileImage, setprofileImage] = useState(null);
  const [addSinglePagePopUp, setAddSinglePagePopUp] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [bindingPopUp, setBindingPopUp] = useState(false);

  const { myInfoState, singlePagesState, multiPagesState } = useSelector(
    (state) => ({
      myInfoState: state.info.user,
      singlePagesState: state.info.singlePages,
      multiPagesState: state.info.multiPages,
    })
  );
  const dispatch = useDispatch();

  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  const { res: singlePagesData, request: requestSinglePagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userSeq}`,
    method: 'get',
  });

  const { res: multiPagesData, request: requestMultiPagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/multies/${userSeq}`,
    method: 'get',
  });

  // 해당 페이지 정보 가져옴
  useEffect(() => {
    if (pageUrl) {
      requestPageUserInfo();
    }
  }, [pageUrl, requestPageUserInfo]);

  // 데이터를 받아서 userSeq, nickname, userUrl, profileImage 세팅
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
        setUserUrl(data.url);
        setprofileImage(data.profileImage);
      }
    }
    return () => {
      setUserSeq(null);
      setNickname(null);
      setUserUrl(null);
      setprofileImage(null);
    };
  }, [pageUserRes, history]);

  // 내 페이지인지 남의 페이지인지 확인 로직
  useEffect(() => {
    // 내 페이지일 경우
    if (myInfoState && urlMatched(myInfoState.url, pageUrl)) {
      setUserMatched(true);
      // 다른 사람 페이지일 경우
    } else {
      setUserMatched(false);
    }
    return () => {
      setUserMatched(null);
    };
  }, [pageUrl, myInfoState]);

  // 해당 유저의 싱글, 멀티 페이지 받아옴
  useEffect(() => {
    if (userSeq) {
      requestSinglePagesData();
      requestMultiPagesData();
    }
  }, [userSeq, requestSinglePagesData, requestMultiPagesData]);

  // 싱글, 멀티페이지 데이터 리덕스에 저장
  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
    }
    if (multiPagesData && multiPagesData.data) {
      dispatch(createReplacementMultiPagesAction(multiPagesData.data));
    }
  }, [singlePagesData, multiPagesData, dispatch]);

  return (
    <div css={[positionRelative]}>
      <Header
        userMatched={userMatched}
        pageUrl={pageUrl}
        pageUserName={nickname}
        pageType='myPage'
      />
      <div css={MyPageWrapper}>
        <Azone
          profileImage={profileImage}
          nickname={nickname}
          userSeq={userSeq}
          setPopUp={setProfilePopUp}
          popUp={profilePopUp}
          bindingPopUp={bindingPopUp}
        />
        <Bzone
          singlePagesState={singlePagesState}
          multiPagesState={multiPagesState}
          userMatched={userMatched}
          userUrl={userUrl}
          setAddSinglePagePopUp={setAddSinglePagePopUp}
          addSinglePagepopUp={addSinglePagePopUp}
          setBindingPopUp={setBindingPopUp}
          bindingPopUp={bindingPopUp}
        />
      </div>
      {profilePopUp && (
        <EditPropfilePopUp
          prevNickname={nickname}
          prevProfileImage={profileImage}
          userSeq={userSeq}
          setPopUp={setProfilePopUp}
        />
      )}
      {bindingPopUp && (
        <BindingPagePopUp userSeq={userSeq} setPopUp={setBindingPopUp} />
      )}
      {addSinglePagePopUp && (
        <AddPagePopUp userSeq={userSeq} setPopUp={setAddSinglePagePopUp} />
      )}
    </div>
  );
}

export default MyPage;

const positionRelative = css`
  position: relative;
`;

const MyPageWrapper = css`
  min-width: ${PAGE_WIDTH};
  width: 90vw;
  margin: ${PAGE_MARGIN};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
