import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

interface PostMessageData {
  subject: string;
  message_id: string;
  key?: string;
  value?: string;
}

const get = (key: string = ACCESS_TOKEN_KEY) => {
  const AccessToken = Cookies.get(key);

  return AccessToken;
};

const remove = (key: string = ACCESS_TOKEN_KEY) => Cookies.remove(key);

const set = (param1: string, param2?: string) => {
  let key: string;
  let value: string;
  if (param2 === undefined) {
    key = ACCESS_TOKEN_KEY;
    value = param1;
  } else {
    key = param1;
    value = param2;
  }

  const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour

  Cookies.set(key, value, {
    expires: oneHourFromNow, // Expires in 1 hour
    sameSite: 'lax', // Strict SameSite policy
  });
};

const setValue = (key: string, value: string, targetOrigin: string) => {
  const location = window.location.href;
  if (location.includes('localhost')) {
    return set(key, value);
  }
  const data: PostMessageData = {
    subject: 'lti.put_data',
    message_id: `${key}_message_id`,
    key,
    value,
  };
  window.parent.postMessage(data, targetOrigin);
};

const getValue = (
  key: string,
  targetOrigin: string,
  timeout = 3000,
): Promise<string | undefined> => {
  const location = window.location.href;

  return new Promise((resolve, reject) => {
    if (location.includes('localhost')) {
      const token = get(key);

      return resolve(token);
    }

    const messageId = `${key}_message_id`;

    const handleMessage = (event: MessageEvent<PostMessageData>) => {
      if (event.data.message_id === messageId && event.data.subject === 'lti.get_data.response') {
        window.removeEventListener('message', handleMessage);
        resolve(event.data.value);
      }
    };

    window.addEventListener('message', handleMessage);

    const data: PostMessageData = {
      subject: 'lti.get_data',
      message_id: messageId,
      key,
    };
    window.parent.postMessage(data, targetOrigin);

    // Set a timeout to reject if no response is received within the specified time
    setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      reject(new Error('Request timed out'));
    }, timeout);
  });
};

window.addEventListener('message', (event: MessageEvent<PostMessageData>) => {
  if (typeof event.data !== 'object') return;

  const { subject } = event.data;

  if (subject === 'lti.get_data.response') {
  } else if (subject === 'lti.put_data.response') {
  }
});

export const manageAccessToken = {
  get,
  remove,
  set,
  setValue,
  getValue,
};
