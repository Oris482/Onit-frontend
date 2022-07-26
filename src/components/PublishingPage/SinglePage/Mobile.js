/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  breakpoints,
  FlexCenter,
  FlexColCenter,
} from '../../../styles/GlobalStyles';
import { TYPE_IMAGE, TYPE_VIDEO } from '../../../utils/constantValue';
import VideoBox from '../../Widgets/Video/VideoBox';

// width에 따라서 모바일버전 on, off
export function isMobile(width) {
  if (width <= breakpoints[0]) return true;
  return false;
}

function getOrderedWidgetList(arr) {
  if (origin === null) {
    return null;
  }
  arr.sort((a, b) => {
    if (a.pos_y === b.pos_y) {
      return a.pos_x > b.pos_x ? 1 : -1;
    }
    return a.pos_y > b.pos_y ? 1 : -1;
  });
  return arr;
}

function Mobile({ widgetRes }) {
  function mobileWidget() {
    if (widgetRes) {
      const { widget_list } = widgetRes.data;
      const filtered = widget_list.filter(
        (element) => element.widget_data !== {} && element.widget_data.thumbnail
      );
      const ordered = getOrderedWidgetList(filtered);
      if (ordered) {
        return ordered.map((element) => {
          if (element.widget_type === TYPE_IMAGE) {
            return (
              <img
                key={element.widget_code}
                src={element.widget_data.thumbnail}
                alt='thumbnail'
                css={ThumbnailStyle}
              />
            );
          } else if (element.widget_type === TYPE_VIDEO) {
            return (
              <div key={element.widget_code} css={ThumbnailStyle}>
                <VideoBox element={element} mode='normal' />
              </div>
            );
          } else {
            return <></>;
          }
        });
      }
    }
    return <></>;
  }
  return <div css={[mobileWidgetContainer]}>{mobileWidget()}</div>;
}

export default Mobile;

const mobileWidgetContainer = css`
  max-width: 100%;
  height: 100%;
  ${FlexColCenter}
  padding: 48px 40px 0 40px;
`;

const ThumbnailStyle = css`
  ${FlexCenter}
  max-width: 100%;
  margin-bottom: 16px;
  width: 348px;
  height: 260px;
  object-fit: cover;
`;
