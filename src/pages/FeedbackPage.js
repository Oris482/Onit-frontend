/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import FeedbackList from '../components/FeedbackBox/FeedbackList';
import FeedbackInputBox from '../components/FeedbackBox/FeedbackInputBox';
import MainSentence from '../components/FeedbackBox/MainSentence';
import { Header } from '../components';
import useRequestAuth from '../hooks/useRequestAuth';
import { getApiEndpoint, isError, urlOwnerNotFound } from '../utils/util';
import MyfeedbackList from '../components/FeedbackBox/MyfeedbackList';
import { useMyInfo } from '../hooks/myInfo';
import { useRequest } from '../hooks/useRequest';

function FeedbackPage() {
  const [myFeedbacks, setMyFeedbacks] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);
  const [loading, setLoading] = useState(null);
  const [needReload, setNeedReload] = useState(false);
  const { loggedIn, myInfo } = useMyInfo();

  const endpoint = `${getApiEndpoint()}/feedback`;
  const { res: myFeedbacksRes, request: requestMyFeedbacks } = useRequestAuth({
    endpoint: endpoint,
    method: 'get',
  });

  const { res: feedbacksRes, request: requestFeedbacks } = useRequest({
    endpoint: endpoint,
    method: 'get',
  });

  const sendReloadSignal = useCallback(() => {
    setNeedReload(!needReload);
  }, [needReload]);

  useEffect(() => {
    if (loggedIn === false) requestFeedbacks();
    else if (loggedIn === true) requestMyFeedbacks();
  }, [loggedIn, needReload, requestFeedbacks, requestMyFeedbacks]);
  useEffect(() => {
    if (feedbacksRes && feedbacksRes.data) {
      const { code, data, message } = feedbacksRes.data;
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('정보를 가져올 수 없습니다.');
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
      if (data) {
        setFeedbacks(data.publicFeedback);
        setMyFeedbacks(data.myFeedback);
      }
    }
  }, [feedbacksRes]);

  useEffect(() => {
    if (myFeedbacksRes && myFeedbacksRes.data) {
      const { code, data, message } = myFeedbacksRes.data;
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('정보를 가져올 수 없습니다.');
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
      if (data) {
        setFeedbacks(data.publicFeedback);
        setMyFeedbacks(data.myFeedback);
      }
    }
  }, [myFeedbacksRes]);

  useEffect(() => {
    if (loggedIn === true && myFeedbacks !== null) setLoading('loggedIn');
    else if (loggedIn !== null && myFeedbacks !== null) setLoading('guest');
  }, [loggedIn, myFeedbacks, setLoading]);

  return (
    <div css={[pageBox, paddingBottom]}>
      <Header pageType='feedback' />
      <div css={contentsBox}>
        <MainSentence />
        <FeedbackInputBox sendReloadSignal={sendReloadSignal} />
        {loading === 'loggedIn' && (
          <MyfeedbackList myFeedbacks={myFeedbacks} myInfo={myInfo} />
        )}
        {(loading === 'guest' || loading === 'loggedIn') && (
          <FeedbackList feedbacks={feedbacks} />
        )}
      </div>
    </div>
  );
}

const pageBox = css`
  background-color: #f2f2f2;
  min-width: 1124px;
`;

const paddingBottom = css`
  padding-bottom: 300px;
`;

const contentsBox = css`
  position: relative;
  top: 81px;
  min-height: 100vh;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
`;

export default FeedbackPage;
