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
import { closeSet } from '../../asset';
import DoubleButtonPopUp from '../FeedbackBox/DoubleButtonPopUp';

// eslint-disable-next-line no-unused-vars

function PageBlock({ data, popUp, setPopUp, userUrl, pageType }) {
  const [publishingPath, setPublishingPath] = useState(null);
  const [editPath, setEditPath] = useState(null);
  const [pageUrl, setPageUrl] = useState('');
  const [hover, setHover] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.user,
  }));

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
  }, [deleteRes]);

  useEffect(() => {
    if (singlePagesData && singlePagesData.data) {
      dispatch(createReplacementSinglePagesAction(singlePagesData.data));
    }
    if (multiPagesData && multiPagesData.data) {
      dispatch(createReplacementMultiPagesAction(multiPagesData.data));
    }
  }, [singlePagesData, multiPagesData]);

  const CloseModal = () => {
    setDeletePopUp(false);
  };

  const deletePopUpText = {
    topText: '페이지 삭제',
    middleText: '확인 버튼을 누르면 페이지가 삭제됩니다!',
    bottomText: '삭제하신 페이지는 복구가 어려우니 한 번 더 확인해주세요!',
  };

  const diameter = 44;
  const { btn, img } = getAbsoluteBtn(10, 10, diameter / 2, false);

  return (
    <>
      {!data ? (
        <>
          <button
            type='button'
            css={[InitButtonStyle, siteViewBZone]}
            onClick={() => setPopUp(!popUp)}
          >
            +
          </button>
        </>
      ) : (
        <div
          css={siteViewBZone}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <button
              type='button'
              css={[commonBtn, btn]}
              onClick={() => setDeletePopUp(true)}
            >
              <div css={img}>
                <img alt='img' height={diameter} src={closeSet} />
              </div>
            </button>
          )}
          <Link to={publishingPath}>
            <div
              css={css`
                height: 70%;
                background-image: url('https://mblogthumb-phinf.pstatic.net/MjAxNzA2MjNfNDEg/MDAxNDk4MjExMTE1OTYy.RGjgC51-8rYSISInewpiERaIWLuYkk6h8-DHImZWlNog.6nJ1cYNwJuFRBYbzuXIlfFC2vAz9SSYihxEpnVX2ttUg.PNG.kkp0079/1.PNG?type=w800');
                border-radius: 20px 20px 0px 0px;
              `}
            />
          </Link>
          <div
            css={css`
              display: flex;
              text-align: center;
              align-items: center;
            `}
          >
            <div
              css={css`
                font-size: 20px;
                width: 70%;
                display: flex;
                margin: auto;
                margin-top: 20px;
                overflow: hidden;
              `}
            >
              {data ? `${data.title}` : ''}
            </div>
            <Link to={editPath}>
              <div
                css={css`
                  font-size: 20px;
                  display: flex;
                  display: flex;
                  margin: auto;
                  margin-top: 20px;
                  margin-right: 20px;
                `}
              >
                수정
              </div>
            </Link>
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
    </>
  );
}

export default PageBlock;

const siteViewBZone = css`
  position: relative;
  width: 320px;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: 23.75px;
  margin-right: 23.75px;
  border-radius: 20px 20px 20px 20px;
  background-color: white;
  display: inline-block;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 35px;
  color: gray;
`;
