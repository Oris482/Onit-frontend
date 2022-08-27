import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {
  isExpiredToken,
  isInvalidToken,
  getApiEndpoint,
  setLocalStorage,
  isOk,
} from '../utils/util';

function useRequestAuth({ endpoint, method, data, contentType }) {
  const [firstRes, setFirstRes] = useState(null);
  const [secondRes, setSecondRes] = useState(null);
  const [renewRes, setRenewRes] = useState(null);
  const [renewSuccess, setRenewSuccess] = useState(false);

  const request = useCallback(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': contentType,
    };
    let axiosPromise;
    if (method === 'get') {
      axiosPromise = axios.get(endpoint, {
        headers,
        params: data,
      });
    } else if (method === 'post') {
      axiosPromise = axios.post(endpoint, data, {
        headers,
      });
    } else if (method === 'patch') {
      axiosPromise = axios.patch(endpoint, data, {
        headers,
      });
    } else if (method === 'delete') {
      axiosPromise = axios.delete(
        endpoint,
        {
          headers,
        },
        data
      );
    }

    axiosPromise
      .then((res) => {
        if (renewSuccess) {
          setSecondRes(res);
        } else {
          setFirstRes(res);
        }
      })
      .catch(() => {
        const errorRes = {
          data: {
            code: 'error',
            message: '404 not found-server connection failed',
          },
        };
        if (renewSuccess) {
          setSecondRes(errorRes);
        } else {
          setFirstRes(errorRes);
        }
      });
  }, [endpoint, method, data]);

  useEffect(() => {
    if (firstRes) {
      if (
        isExpiredToken(firstRes.data.code) ||
        isInvalidToken(firstRes.data.code)
      ) {
        renewToken();
      } else {
        setSecondRes(firstRes);
      }
    }
  }, [firstRes]);

  const renewToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    const params = {
      data: {
        refresh_token: refreshToken,
      },
    };
    axios
      .get(`${getApiEndpoint()}/auth/token/refresh`, {
        params,
      })
      .then((res) => {
        setRenewRes(res);
      })
      .catch(() => {
        console.error('token renew error');
      });
  }, []);

  useEffect(() => {
    if (renewRes && renewRes.data) {
      if (isOk(renewRes.data.code)) {
        setLocalStorage(renewRes.data.data);
        setRenewSuccess(true);
      } else {
        setSecondRes(firstRes);
      }
    }
  }, [renewRes]);

  useEffect(() => {
    if (renewSuccess) {
      request();
    }
  }, [renewSuccess]);

  return { res: secondRes, request };
}

export default useRequestAuth;
