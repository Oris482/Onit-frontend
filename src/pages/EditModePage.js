/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';
import { PageWrapper, EditModeGrid, EditWrapper } from '../components';
import { getApiEndpoint, urlMatched, useIsPathExist } from '../utils/util';
import { useRequest } from '../hooks/useRequest';
import useRequestAuth from '../hooks/useRequestAuth';
import { usePostData, useSaveWidgetsFromServer } from '../hooks/widget';
import { useGetPersonalUrl, useGetPublishingUrl } from '../hooks/useParamsUrl';
import { useMyInfo } from '../hooks/myInfo';
import { mainColor } from '../styles/color';
import { edit_toggle } from '../asset';

function EditMode() {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const personalUrl = useGetPersonalUrl();
  const publishingUrl = useGetPublishingUrl();
  const errorCode = useIsPathExist();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const history = useHistory();
  const { myInfo } = useMyInfo();
  const { post } = usePostData();
  const [statAnimationStart, setStatAnimationStart] = useState(400);
  const [statAnimationEnd, setStatAnimationEnd] = useState(0);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  // 임시 코드
  useEffect(() => {
    if (errorCode && errorCode !== 'ok') {
      if (errorCode === 'user_error') alert('유저를 찾을 수 없습니다.');
      else if (errorCode === 'page_error') alert('페이지를 찾을 수 없습니다.');
      history.goBack();
    }
  }, [errorCode]);

  useEffect(() => {
    if (personalUrl && myInfo) {
      if (myInfo && urlMatched(myInfo.url, personalUrl)) {
        setUserMatched(true);
        setUserSeq(myInfo.user_seq);
      } else {
        alert('내 페이지가 아닙니다.');
        history.push(`/${personalUrl}/${publishingUrl}`);
      }
    }
    return () => {
      setUserMatched(null);
      setUserSeq(null);
    };
  }, [personalUrl, myInfo]);

  const { res: widgetRes, request: requestWidgetData } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets/${publishingUrl}`,
    method: 'get',
  });

  const { res: pageRes, request: requestPageData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/${publishingUrl}/${userSeq}`,
    method: 'get',
  });

  // 임시 코드
  useEffect(() => {
    if (userSeq && publishingUrl) {
      requestPageData();
    }
  }, [userSeq, publishingUrl, requestPageData]);

  useEffect(() => {
    if (pageRes) {
      if (pageRes.data.data.isMultiPage === false) requestWidgetData();
      else {
        alert('싱글페이지만 위젯 수정이 가능합니다.');
        history.goBack();
      }
    }
  }, [pageRes, requestWidgetData]);

  const { save } = useSaveWidgetsFromServer();

  useEffect(() => {
    if (widgetRes) {
      save(widgetRes.data.widget_list);
    }
  }, [widgetRes]);

  const moveAnimationHidden = keyframes`
  0% {
    transform: translateX(${statAnimationStart}px);
  }
 100% {
  transform: translateX(${statAnimationEnd}px);
  }
`;

  const moveHidden = css`
    animation-name: ${moveAnimationHidden};
    animation-duration: 1s;
    animation-direction: normal;
    transition-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  `;

  // 애니메이션 끝난 후 div 없애는 함수, 다시 만듦
  const buttonMoveAnimation = () => {
    if (statAnimationStart === 400 && isAnimationEnd === false) {
      setTimeoutId(
        setTimeout(() => {
          setIsAnimationEnd(true);
        }, 1000)
      );
      setStatAnimationStart(0);
      setStatAnimationEnd(400);
    } else if (statAnimationStart === 0 && isAnimationEnd === true) {
      setIsAnimationEnd(false);
      setStatAnimationStart(400);
      setStatAnimationEnd(0);
    } else if (statAnimationStart === 0 && isAnimationEnd === false) {
      clearTimeout(timeoutId);
      setStatAnimationStart(400);
      setStatAnimationEnd(0);
    }
  };

  return (
    <PageWrapper>
      {userMatched && (
        <>
          <div css={[positionFixed]}>
            {!isAnimationEnd && (
              <div css={[overflowHidden]}>
                <button
                  type='button'
                  css={[commonButtonStyle, moveHidden]}
                  onClick={() => {
                    history.push(`/${personalUrl}`);
                  }}
                >
                  변경 취소
                </button>
                <button
                  type='button'
                  css={[commonButtonStyle, moveHidden]}
                  onClick={() => {
                    post(widgets.list, publishingUrl);
                  }}
                >
                  저장하기
                </button>
              </div>
            )}
            <button
              type='button'
              css={[hiddenButton]}
              onClick={() => {
                if (statAnimationEnd === 0) {
                  buttonMoveAnimation();
                } else {
                  buttonMoveAnimation();
                }
              }}
            >
              <img src={edit_toggle} css={[toggle]} />
            </button>
          </div>
          <EditWrapper>
            {modal.popUpWindow && <PopWidgets />}
            <EditModeGrid />
          </EditWrapper>
        </>
      )}
    </PageWrapper>
  );
}

export default EditMode;

const positionFixed = css`
  display: flex;
  align-items: center;
  position: fixed;
  top: 28px;
  right: 50px;
  z-index: 999;
`;

const overflowHidden = css`
  overflow: hidden;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: justify;
  width: fit-content;
  padding: 6.75px 33px;
  margin-right: 10px;
  background-color: #fff;
  height: 35px;
  border-radius: 17px;
  border: solid 1px #c9c9c9;
  font-size: 13.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
  &:hover {
    color: #fff;
    background-color: ${mainColor};
  }
`;

const hiddenButton = css`
  height: 34px;
  width: 34px;
  border-radius: 50%;
  border: none;
  padding: 0px;
  overflow: hidden;
`;

const toggle = css`
  height: 68px;
  width: 34px;
  &:hover {
    margin-top: -34px;
  }
`;
