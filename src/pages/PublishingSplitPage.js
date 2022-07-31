import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import MultiPage from './MultiPage';
import SinglePage from './SinglePage';
import { useMyInfo } from '../hooks/myInfo';
import { getApiEndpoint, isError, urlOwnerNotFound } from '../utils/util';
import { useSaveWidgetsFromServer } from '../hooks/widget';
import { useRequest } from '../hooks/useRequest';
import { useGetPageUrl, useGetPublishingUrl } from '../hooks/useParamsUrl';

function PublishingSplitPage() {
  const { myInfo } = useMyInfo();
  const [pageType, setPageType] = useState(null);
  const [userSeq, setUserSeq] = useState(null);
  const [pathname, setPathname] = useState(null);
  const [widgetList, setWdigetList] = useState(null);
  const [multiData, setMultiData] = useState(null);

  const history = useHistory();
  const publishUrl = useGetPublishingUrl();
  const pageUrl = useGetPageUrl();

  // 위젯 데이터 받아올 준비
  const { res: pagesData, request: requestPagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/${pathname}`,
    method: 'get',
  });

  // 유저 데이터를 받아서 userseq 세팅.
  useEffect(() => {
    if (myInfo?.user_seq) {
      setUserSeq(myInfo.user_seq);
    }
    return () => {
      setUserSeq(null);
    };
  }, [myInfo]);

  // 요청 보낼 path 설정
  useEffect(() => {
    if (publishUrl && pageUrl && userSeq)
      setPathname(`${publishUrl}/${pageUrl}/${userSeq}`);
    else if (publishUrl && userSeq) setPathname(`${publishUrl}/${userSeq}`);
  }, [userSeq, publishUrl, pageUrl]);

  // 유저 시퀀스가 있으면 -> 해당 유저의 위젯 데이터 받아오기
  useEffect(() => {
    if (userSeq && publishUrl) {
      requestPagesData();
    }
  }, [pathname]);

  // 받아온 위젯 데이터 리덕스에 저장
  const { save } = useSaveWidgetsFromServer();

  useEffect(() => {
    if (pagesData) {
      console.log(pagesData);
      const { code, data, message } = pagesData.data;

      if (data) {
        console.log(data);
        if (data?.isMultiPage === false) {
          setPageType('single');
          setWdigetList(data.widgets);
        } else {
          setPageType('multi');
          console.log('---');
          console.log(data);
          console.log('---');
          setMultiData(data);
        }
        save(data.widgets);
      } else if (isError(code) && urlOwnerNotFound(message)) {
        alert('페이지를 찾을 수 없습니다.');
        history.goBack();
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
    }
  }, [pagesData]);

  const publishingPage = useMemo(() => {
    if (pageType === 'single') {
      // 싱글 -> 페이지 정보 받아서 띄워주기
      return <SinglePage widgetList={widgetList} />;
    } else if (pageType === 'multi') {
      return <MultiPage multiData={multiData} pageUrl={pageUrl} />;
    }
    return <div>불러오는 중입니다</div>;
  }, [pageType, widgetList, multiData, pageUrl]);

  return <>{publishingPage}</>;
}

export default PublishingSplitPage;
