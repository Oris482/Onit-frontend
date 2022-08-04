/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InitButtonStyle } from '../../styles/GlobalStyles';

// eslint-disable-next-line no-unused-vars

function PageBlock({ data, popUp, setPopUp, userUrl }) {
  const [publishingPath, setPublishingPath] = useState(null);
  const [editPath, setEditPath] = useState(null);

  useEffect(() => {
    if (data && userUrl) {
      setEditPath(`/${userUrl}/${data.url}/edit`);
      setPublishingPath(`/${userUrl}/${data.url}`);
    }
  }, [data, userUrl]);

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
        <div css={siteViewBZone}>
          <Link to={publishingPath}>
            <div
              css={css`
                height: 70%;
                background-image: url('https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5b23a21e-5242-473e-91a3-34939a806247%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-08-04_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.39.14.png?table=block&id=193b2ef6-f9ec-4339-8719-3a996f31b4b0&spaceId=39262b28-deb0-4e99-938a-d51f7073ff6f&width=2000&userId=119b3bb9-3f60-4f5b-b981-5795a1cc6cde&cache=v2');
                background-size: 200px;
                background-position: 60px 65px;
                background-repeat: no-repeat;
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
    </>
  );
}

export default PageBlock;

const siteViewBZone = css`
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
