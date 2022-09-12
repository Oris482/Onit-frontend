import { useEffect, useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import {
  useGetPageUrl,
  useGetPersonalUrl,
  useGetPublishingUrl,
} from '../hooks/useParamsUrl';
import { TYPE_IMAGE, TYPE_NEW, TYPE_TEXT, TYPE_VIDEO } from './constantValue';

export function getApiEndpoint() {
  const endpoint =
    process.env.REACT_APP_SERVER_DOMAIN ?? 'http://localhost:8080';
  if (!endpoint.startsWith('http')) {
    return `http://${endpoint}`;
  }
  return endpoint;
}

export function GetLoginState() {
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = useGetPersonalUrl();

  if (user_seq === page_user_seq) {
    return true;
  }
  return false;
}

export function isInvalidToken(code) {
  return code === 401 || code === 'wrong_token';
}

export function isNotOwner(code) {
  return code === 601 || code === 'unauthorized';
}

export function isExpiredToken(code) {
  return code === 419 || code === 'expired_token';
}

export function urlOwnerNotFound(message) {
  return message === 'no user information';
}

export function isOk(code) {
  return code === 'ok';
}

export function isError(code) {
  return code === 'error';
}

export function isWrongToken(code) {
  return code === 'wrong_token';
}

export function isURL(formedUrl) {
  const matched = formedUrl.match(regexAlnum);
  return matched && matched.length === formedUrl.length;
}

export const regexNumber = /\d/gi;
export const regexAlpha = /[a-zA-Z]/gi;
export const regexAlnum = /[0-9a-zA-Z]/gi;
export const regexSymbol = /[\^~`$@$+="':;/\\,.<>[\]{}|₩!%*#?&()_-]/gi;

export function hasNumber(word) {
  const matched = word.match(regexNumber);
  return matched ? matched.length : 0;
}
export function hasAlpha(word) {
  const matched = word.match(regexAlpha);
  return matched ? matched.length : 0;
}

export function hasSymbol(word) {
  const matched = word.match(regexSymbol);
  return matched ? matched.length : 0;
}

export function isPassword(word) {
  const numberLen = hasNumber(word);
  const alphaLen = hasAlpha(word);
  const symbolLen = hasSymbol(word);
  if (!!numberLen + !!alphaLen + !!symbolLen < 2) return false;
  if (numberLen + alphaLen + symbolLen !== word.length) return false;
  return true;
}

export function setLocalStorage(data) {
  if (data) {
    const { tokens, user_info } = data;
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('user_seq', user_info.user_seq);
  }
}

export const urlMatched = (myUrl, pageUrl) => {
  return myUrl === pageUrl;
};

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_seq');
  localStorage.removeItem('page_url');
  window.location.reload();
}

export function isNewWidget(type) {
  if (type === TYPE_NEW) {
    return true;
  }
  return false;
}

export function convertType2String(type) {
  if (type === TYPE_IMAGE) {
    return 'image';
  } else if (type === TYPE_VIDEO) {
    return 'video';
  } else if (type === TYPE_TEXT) {
    return 'text';
  }
  return 'none';
}

export function convertType2Label(type) {
  if (type === 'image' || type === TYPE_IMAGE) return '이미지';
  else if (type === 'video' || type === TYPE_VIDEO) return '영상';
  else return '';
}

// 임시 코드
export function useIsPathExist() {
  const [userSeq, setUserSeq] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isMultiPage, setIsMultiPage] = useState(false);
  const pageUrl = useGetPageUrl();
  const personalUrl = useGetPersonalUrl();
  const publishingUrl = useGetPublishingUrl();
  const { res: userRes, request: requestUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${personalUrl}/user`,
    method: 'get',
  });
  const { res: publishPageRes, request: requestPageInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/${publishingUrl}/${userSeq}`,
    method: 'get',
  });

  const { res: singlePageRes, request: requestSinglePageInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/user/page/${pageUrl}/${userSeq}`,
    method: 'get',
  });

  useEffect(() => {
    requestUserInfo();
  }, [personalUrl]);

  useEffect(() => {
    if (userRes && userRes.data) {
      if (userRes.data.code !== 'ok') setErrorCode('user_error');
      else setUserSeq(userRes.data.data.user_seq);
    }
  }, [userRes]);

  useEffect(() => {
    if (userSeq && publishingUrl) {
      requestPageInfo();
    }
  }, [userSeq, publishingUrl]);

  useEffect(() => {
    if (publishPageRes && publishPageRes.data) {
      if (publishPageRes.data.code !== 'ok') setErrorCode('page_error');
      else if (publishPageRes.data.data.isMultiPage === true)
        setIsMultiPage(true);
      else setErrorCode('ok');
    }
  }, [publishPageRes]);

  useEffect(() => {
    if (isMultiPage && pageUrl) requestSinglePageInfo();
  }, [isMultiPage, pageUrl]);

  useEffect(() => {
    if (singlePageRes && singlePageRes.data) {
      if (singlePageRes.data.code !== 'ok') setErrorCode('page_error');
      else setErrorCode('ok');
    }
  }, [singlePageRes]);

  return errorCode;
}
