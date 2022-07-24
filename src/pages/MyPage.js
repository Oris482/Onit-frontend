/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { Header } from '../components';
import AddPagePopUp from '../components/MyPage/AddPagePopUp';
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
import DummyComponent from '../components/MyPage/DummyComponent';
import useRequestAuth from '../hooks/useRequestAuth';

// import MyPageComment from '../components/MyPage/MyPageComment';
// import MyPageCommentWrite from '../components/MyPage/MyPageCommentWrite';
// import MyPageProfile from '../components/MyPage/MyPageProfile';

// function MyPageProfileInput() {
//   const { res, request } = useRequestAuth({
//     endpoint: endpoint,
//     method: 'post',
//     data: {
//       //불변성
//       nickname: kdkdkdk,
//     },
//   });
// }

function MyPage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const { myInfo } = useMyInfo();
  const history = useHistory();
  const pageUrl = useGetPersonalUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [popUp, setPopUp] = useState(false);

  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });
  const [nicknametest, setNicknametext] = useState('');

  // request
  const endpoint = `${getApiEndpoint()}/profile/${userSeq}`;
  const { res, request } = useRequestAuth({
    endpoint: endpoint,
    method: 'patch',
    data: {
      nickname: nicknametest,
    },
  });

  console.log(`res: ${res}`);
  function sendProfile() {
    request();
  }

  const onChangenickname = (e) => {
    setNicknametext(e.target.value);
  };
  // 내 페이지인지 남의 페이지인지 확인 로직
  useEffect(() => {
    // 로그인 유무
    if (pageUrl) {
      // 내 페이지일 경우
      if (myInfo && urlMatched(myInfo.url, pageUrl)) {
        setUserMatched(true);
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
      setNickname(null);
    };
  }, [pageUrl, myInfo]);

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

  return (
    <div css={[positionRelative]}>
      <Header
        userMatch={userMatched}
        pageUrl={pageUrl}
        pageUserName={nickname}
        pageType='normal'
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      닉네임 입력 :
      <input onChange={onChangenickname} value={nicknametest} />
      <br />
      {!nicknametest ? '빈문자' : nicknametest}
      <button type='button' onClick={sendProfile}>
        보내기
      </button>
      <div css={MyPageWrapper}>
        <div
          css={css`
            height: 50px;
          `}
        />
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
              <div css={ProfileAZone}> </div>
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
                <div
                  css={css`
                    display: inline-block;
                    margin: 5px;
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    justify-content: center;
                    text-align: center;
                    font-size: 13px;
                    padding: 10px 20px 10px 20px;
                  `}
                >
                  일러스트레이션
                </div>
                <div
                  css={css`
                    display: inline-block;
                    margin: 5px;
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    justify-content: center;
                    text-align: center;
                    font-size: 13px;
                    padding: 10px 20px 10px 20px;
                  `}
                >
                  포토그래퍼
                </div>
                <div
                  css={css`
                    display: inline-block;
                    margin: 5px;
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    justify-content: center;
                    text-align: center;
                    font-size: 13px;
                    padding: 10px 20px 10px 20px;
                  `}
                >
                  현대미술
                </div>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                margin: 5px;
                /* border: 1px solid lightgray; */
                justify-content: center;
                text-align: center;
              `}
            >
              <div
                css={css`
                  display: flex;
                  margin: 5px;
                  background-color: #f5f5f5;
                  border-radius: 20px;
                  width: 100px;
                  height: 45px;
                  justify-content: center;
                  line-height: 45px;
                  text-align: center;
                `}
              >
                수정하기
              </div>

              {/* <div
                css={css`
                  display: flex;
                  margin: 5px;
                  background-color: #f5f5f5;
                  border-radius: 20px;
                  width: 150px;
                  height: 45px;
                  justify-content: center;
                  line-height: 45px;
                  text-align: center;
                `}
              >
                팔로우
              </div> */}
              {/* <div
                css={css`
                  display: flex;
                  margin: 5px;
                  width: 150px;
                  height: 45px;
                  justify-content: center;
                  text-align: center;
                  background-color: #f5f5f5;
                  line-height: 45px;
                  border-radius: 20px;
                `}
              >
                메시지
              </div> */}
            </div>
          </div>
        </div>
        <div css={MyPageBZoneWrapper}>
          <div css={MyPageBZone}>
            <Slider {...settings}>
              <DummyComponent />
              <DummyComponent />
              <DummyComponent />
              <PageBlock addBlock setPopUp={setPopUp} popUp={popUp} />
              <PageBlock addBlock setPopUp={setPopUp} popUp={popUp} />
            </Slider>
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
      {popUp && (
        <AddPagePopUp setPopUp={setPopUp} popUp={popUp} userSeq={userSeq} />
      )}
    </div>
  );
}

export default MyPage;

const positionRelative = css`
  position: relative;
`;

const MyPageWrapper = css`
  text-align: center;
`;

const MyPageAZone = css`
  width: 1470px;
  margin-top: 70px;
  height: 200px;
  background-color: white;
  display: inline-block;
  /* border: 1px solid lightgray; */
`;

const ProfileAZone = css`
  width: 100px;
  height: 100px;
  background-color: lightgray;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  display: flex;
`;

const MyPageBZoneWrapper = css`
  width: 100vw;
  height: 300px;
  background-color: white;
  display: flex;
  justify-content: center;
  /* border: 1px solid lightgray; */
`;
const MyPageBZone = css`
  width: 1470px;
  /* min-width: 1470px; */
  /* height: 360px; */
  background-color: white;
  /* text-align: center; */
  /* justify-content: center; */
  /* align-items: center; */
  /* display: flex; */
`;

// const MyPageCZone = css`
//   min-width: 700px;
//   margin: 20px 10px;
//   height: 900px;
//   background-color: white;
//   /* border: 1px solid lightgray; */
//   border-radius: 20px 20px 20px 20px;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
//   /* align-items: center; */
//   text-align: center;

//   display: flex;
// `;

// const MyPageDZone = css`
//   min-width: 700px;
//   margin: 20px 10px;
//   height: 900px;
//   background-color: white;
//   border-radius: 20px 20px 20px 20px;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
//   /* align-items: center; */
//   text-align: center;
//   display: flex;
//   flex-direction: column;
// `;

const overFlowHidden = css`
  overflow: hidden;
`;
