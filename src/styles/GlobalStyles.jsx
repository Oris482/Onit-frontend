import { css } from '@emotion/react';
import facepaint from 'facepaint';

export const BUTTON_COLOR = {
  white: '#ffffff',
  whiteSecond: '#f2f2f2',
  whiteThird: '#c9c9c9',
  grey: '#f2f2f2',
  greySecond: '#c9c9c9',
  greyThird: '#707070',
  orange: '#ff3d00',
  orangeSecond: '#ff754a',
  orangeThird: '#c12e00',
};

export const COLOR_STYLE = {
  orange: '#ff3d00',
  veryLightPink: '#f2f2f2',
  paleGrey: '#f5f7f8',
  brownishGrey: '#707070',
  black: '#000000',
  lightGrey: '#f8f8f8',
  white: '#ffffff',
  coral: '#ff4545',
};

export const TextUnderline = css`
  text-decoration: underline;
`;

export const SHADOW_STYLE = {
  pale: ' 3px 0px 20px -5px rgba(0, 0, 0, 0.09)',
  lightGrey: ' 50px 0px 200px -5px rgba(0, 0, 0, 0.5)',
};

export const FONT_SIZE = {
  xs: '1rem',
  s: '1.5rem',
  m: '2.0rem',
  l: '2.5rem',
  xl: '3rem',
};

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColCenter = css`
  ${FlexCenter}
  flex-direction: column;
  justify-content: center;
`;

export const FlexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const FlexColSpaceBetween = css`
  ${FlexSpaceBetween};
  flex-direction: column;
`;

export const FlexSpaceBetweenCenter = css`
  ${FlexSpaceBetween};
  align-items: center;
`;
export const FlexSpaceBetweenStart = css`
  ${FlexSpaceBetween};
  align-items: start;
`;

export const FlexColSpaceBetweenCenter = css`
  ${FlexColSpaceBetween};
  align-items: center;
`;

export const FlexColSpaceBetweenEnd = css`
  ${FlexColSpaceBetween};
  align-items: end;
`;
export const FlexColSpaceBetweenStart = css`
  ${FlexColSpaceBetween};
  align-items: start;
`;

export const FlexSpaceAround = css`
  display: flex;
  justify-content: space-around;
`;

export const FlexSpaceAroundStart = css`
  ${FlexSpaceAround}
  align-items: start;
`;
export const FlexSpaceAroundCenter = css`
  ${FlexSpaceAround}
  align-items: center;
`;

export const FlexColSpaceAround = css`
  ${FlexSpaceAround}
  flex-direction: column;
`;

export const FlexColSpaceAroundCenter = css`
  ${FlexColSpaceAround}
  align-items: center;
`;

export const FlexColSpaceAroundStart = css`
  ${FlexColSpaceAround}
  align-items: start;
`;

// display
export const DisplayNone = css`
  display: none;
`;

export const autofillF2f2f2 = css`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px #f2f2f2 inset;
  }
`;

export const DisplayBlock = css`
  display: block;
`;

export const DisplayInlineBlock = css`
  display: inline-block;
`;

export const DisplayUnset = css`
  display: unset;
`;

export const InitButtonStyle = css`
  padding: 0;
  border: 0;
  outline: 0;
  background-color: inherit;
  word-break: keep-all;
`;

export const RoundButtonSmall = css`
  height: 40px;
  padding: 0.8rem 3.5rem;
  border-radius: 30px;
`;

export const WhiteColorButton = css`
  background-color: ${COLOR_STYLE.white};
  color: ${COLOR_STYLE.brownishGrey};
`;

export const OrangeColorButton = css`
  background-color: ${BUTTON_COLOR.orangeSecond};
  color: ${COLOR_STYLE.white};
  &:hover {
    background-color: ${BUTTON_COLOR.orange};
  }
`;

// 드래그 방지
export const BlockDrag = css`
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
// media query

export const breakpoints = [576, 768, 992, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

export const PageTitleMQ = () => {
  return mq({
    fontSize: [FONT_SIZE.s, FONT_SIZE.s, FONT_SIZE.m, FONT_SIZE.l],
  });
};

export const closeBtn = css`
  top: 10px;
  right: 42px;
  width: 25px;
  height: 25px;
  &:hover {
    background-color: #222;
  }
`;

export const closeBtnImg = css`
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    top: -25px;
  }
`;

export const settingBtn = css`
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  &:hover {
    background-color: #222;
  }
`;

export const settingBtnImg = css`
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    top: -25px;
  }
`;

export const commonBtn = css`
  appearance: none;
  position: absolute;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  overflow: hidden;
`;

export function getAbsoluteBtn(top, right, r, pinned) {
  let isPinned = 0;
  if (pinned === true) {
    isPinned = -(44 / 2);
  }
  const btn = css`
    top: ${top}px;
    right: ${right}px;
    width: ${r}px;
    height: ${r}px;
    &:hover {
      background-color: #222;
    }
  `;

  const img = css`
    position: absolute;
    top: ${isPinned}px;
    right: 0px;
    &:hover {
      top: calc(-1 * ${r}px);
    }
  `;
  return { btn, img };
}

export const BasicInputStyle = css`
  display: block;
  border-radius: 30px;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${COLOR_STYLE.veryLightPink};
`;
