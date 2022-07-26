import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import {
  getApiEndpoint,
  isError,
  urlOwnerNotFound,
  urlMatched,
} from '../utils/util';
import { useMyInfo } from '../hooks/myInfo';
import { useSaveWidgetsFromServer } from '../hooks/widget';
import { useRequest } from '../hooks/useRequest';
import Mobile, {
  isMobile,
} from '../components/PublishingPage/SinglePage/Mobile';

function SinglePage({ theme, pageNow }) {
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [nickname, setNickname] = useState(null);
  const history = useHistory();
  const { myInfo } = useMyInfo();
  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageNow}/user`,
    method: 'get',
  });

  const [width, setWidth] = useState(window.innerWidth);

  // resize 이벤트 받아서 width 변경
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
  }, []);
  // 인스타 그램용 사이즈 조절
  useEffect(() => {
    if (window.screen.width < window.innerWidth) {
      setWidth(window.screen.width);
    }
  }, []);

  // 내 페이지인지 남의 페이지인지 확인 로직
  useEffect(() => {
    // 로그인 유무
    if (pageNow) {
      // 내 페이지일 경우
      if (myInfo && urlMatched(myInfo.url, pageNow)) {
        setUserMatched(true);
        setUserSeq(myInfo.user_seq);
        setNickname(myInfo.nickname);
        // 다른 사람 페이지일 경우
      } else {
        setUserMatched(false);
        // 해당 페이지 정보 가져옴 -> pageUserRes에 변화
        requestPageUserInfo();
      }
    }
    return () => {
      setUserMatched(null);
      setUserSeq(null);
      setNickname(null);
    };
  }, [pageNow, myInfo]);

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

  // 위젯 데이터 받아올 준비
  const { res: widgetRes, request: requestWidgetData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets`,
    method: 'get',
  });

  // 유저 시퀀스가 있으면 -> 해당 유저의 위젯 데이터 받아오기
  useEffect(() => {
    if (userSeq) {
      requestWidgetData();
    }
  }, [userSeq, requestWidgetData]);

  const { save } = useSaveWidgetsFromServer();

  // 받아온 위젯 데이터 리덕스에 저장 (-> 이건 고민을 좀 해봐야할 듯. 남의 페이지 들어갔을 경우는 저장할 필요 없음.)
  useEffect(() => {
    if (widgetRes) {
      save(widgetRes.data.widget_list);
    }
  }, [widgetRes]);

  return (
    <PageWrapper>
      {isMobile(width) ? (
        <Mobile widgetRes={widgetRes} />
      ) : (
        <NormalWrapper>
          {theme === 'normalPage' && (
            <Header
              userMatch={userMatched}
              pageNow={pageNow}
              pageUserName={nickname}
              pageType='normal'
            />
          )}
          <NormalModeGrid />
        </NormalWrapper>
      )}
    </PageWrapper>
  );
}

SinglePage.defaultProps = {
  theme: 'normalPage',
};

export default SinglePage;
