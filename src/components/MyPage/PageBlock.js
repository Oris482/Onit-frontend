/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createReplacementSinglePagesAction,
  createReplacementMultiPagesAction,
} from '../../redux/slice';
import { useRequest } from '../../hooks/useRequest';
import useRequestAuth from '../../hooks/useRequestAuth';
import { getApiEndpoint } from '../../utils/util';
import {
  InitButtonStyle,
  commonBtn,
  getAbsoluteBtn,
} from '../../styles/GlobalStyles';
import { closeSet, settingSet, logo } from '../../asset';
import DoubleButtonPopUp from '../FeedbackBox/DoubleButtonPopUp';
import ModifyPageInfoPopUp from './ModifyPageInfoPopUp';

// eslint-disable-next-line no-unused-vars

function PageBlock(props) {
  const [publishingPath, setPublishingPath] = useState('');
  const [editPath, setEditPath] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [hover, setHover] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [modifyPopUp, setModifyPopUp] = useState(false);

  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.user,
  }));

  const { userMatched, data, popUp, setPopUp, userUrl, pageType } = props;

  const { res: deleteRes, request: DeleteRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/user/page/single/${pageUrl}/${
      userInfo.user_seq
    }`,
    method: 'delete',
  });

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { res: singlePagesData, request: requestSinglePagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/singles/${userInfo.user_seq}`,
    method: 'get',
  });

  // eslint-disable-next-line no-unused-vars
  const { res: multiPagesData, request: requestMultiPagesData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/multies/${userInfo.user_seq}`,
    method: 'get',
  });

  useEffect(() => {
    if (data && userUrl) {
      setEditPath(`/${userUrl}/${data.url}/edit`);
      setPublishingPath(`/${userUrl}/${data.url}`);
      setPageUrl(`${data.url}`);
    }
  }, [data, userUrl]);

  useEffect(() => {
    if (deleteRes && deleteRes.data.code === 'ok') {
      setDeletePopUp(false);
      if (pageType === 'single') requestSinglePagesData();
      else requestMultiPagesData();
    }
  }, [deleteRes, pageType, requestSinglePagesData, requestMultiPagesData]);

  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
    }
  }, [singlePagesData, dispatch]);
  useEffect(() => {
    if (multiPagesData && multiPagesData.data) {
      dispatch(createReplacementMultiPagesAction(multiPagesData.data));
    }
  }, [multiPagesData, dispatch]);

  const CloseModal = () => {
    setDeletePopUp(false);
  };

  const deletePopUpText = {
    topText: '페이지 삭제',
    middleText: '확인 버튼을 누르면 페이지가 삭제됩니다!',
    bottomText: '삭제하신 페이지는 복구가 어려우니 한 번 더 확인해주세요!',
  };

  const diameter = 44;
  const { btn, img } = getAbsoluteBtn(5, 33, diameter / 2);
  const { btn: settingBtn, img: settingBtnImg } = getAbsoluteBtn(
    5,
    5,
    diameter / 2,
    false
    // isPinned
  );

  const AddPageBox = () => {
    if (userMatched) {
      return (
        <>
          <button
            type='button'
            css={[InitButtonStyle, siteViewBZone]}
            onClick={() => setPopUp(!popUp)}
          >
            +
          </button>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {!data ? (
        <AddPageBox />
      ) : (
        <div
          css={siteViewBZone}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {userMatched && hover && (
            <>
              <button
                type='button'
                css={[commonBtn, btn, hoverButtonOrder]}
                onClick={() => setDeletePopUp(true)}
              >
                <div css={img}>
                  <img alt='img' height={diameter} src={closeSet} />
                </div>
              </button>
              <button
                type='button'
                css={[commonBtn, settingBtn, hoverButtonOrder]}
                onClick={() => setModifyPopUp(true)}
              >
                <div css={settingBtnImg}>
                  <img alt='img' height={diameter} src={settingSet} />
                </div>
              </button>
            </>
          )}
          <Link to={publishingPath}>
            <div
              css={css`
                position: relative;
                height: 70%;
                border-radius: 20px 20px 0px 0px;
                box-shadow: 0 1.5px 0 0 rgba(0, 0, 0, 0.2);
              `}
            >
              <img
                css={imgLayout}
                src={data.thumbnail !== '' ? data.thumbnail : logo}
              />
            </div>
          </Link>
          <div
            css={css`
              display: flex;
              height: 30%;
              align-items: center;
            `}
          >
            <div
              css={css`
                font-size: 20px;
                width: 70%;
                display: flex;
                margin-left: 5%;
                white-space: nowrap;
                overflow: hidden;
              `}
            >
              {data ? `${data.title}` : ''}
            </div>
            {pageType === 'single' && userMatched && (
              <Link to={editPath}>
                <div
                  css={css`
                    font-size: 20px;
                    display: flex;
                    margin-right: 5%;
                    white-space: nowrap;
                  `}
                >
                  수정
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
      {deletePopUp && (
        <DoubleButtonPopUp
          confirmFunction={DeleteRequest}
          close={CloseModal}
          textObject={deletePopUpText}
        />
      )}
      {modifyPopUp && (
        <ModifyPageInfoPopUp
          pageType={pageType}
          userSeq={userInfo.user_seq}
          data={data}
          setPopUp={setModifyPopUp}
        />
      )}
    </>
  );
}

export default PageBlock;

const siteViewBZone = css`
  position: relative;
  width: 17vw;
  height: 12vw;
  min-width: 240px;
  min-height: 173px;
  max-width: 320px;
  max-height: 230px;
  border-radius: 20px 20px 20px 20px;
  background-color: white;
  display: inline-block;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 35px;
  color: gray;
`;

const imgLayout = css`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 20px 20px 0 0;
  object-fit: cover;
`;

const hoverButtonOrder = css`
  z-index: 5;
`;
