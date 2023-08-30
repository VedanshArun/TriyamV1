/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
// const baseUrl =
//   'https://948e-2405-201-4028-5811-9066-1182-e5c-b4b3.ngrok-free.app';
const baseUrl = 'http://192.168.29.183:3000';
// const baseUrl =
//   'http://dd01-2405-201-4028-5811-fc87-6ab5-299a-9ee8.ngrok-free.app';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchZones: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/zones`,
      method: 'GET',
    });
    return resp.data;
  },
  createZone: async function ({ name, description }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/zone`,
      data: { name, description },
    });
    return resp.data;
  },
  getRtspUrls: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/rtsp/links`,
      method: 'GET',
    });
    return resp.data;
    console.log(resp.data);
  },
  scanRtspLinks: async function ({ username, password }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/rtsp/scan`,
      data: { username, password },
    });
    return resp.data;
  },
  getStreamLink: async function ({ rtspLink }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/stream-link`,
      data: { rtspLink },
    });
    return resp.data;
  },
  fetchFeeds: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/feeds`,
      method: 'GET',
    });
    return resp.data;
  },
  fetchAlerts: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/alerts/filter`,
      method: 'POST',
      data: { limit: 100, offset: 0 },
    });
    return resp.data;
  },

  addFeed: async function ({ rtspUrl, zoneId, cameraName, description }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/feed`,
      data: { rtspUrl, zoneId, cameraName, description },
    });
    return resp.data;
  },

  getUsers: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/users?type=EMPLOYEE`,
      method: 'GET',
    });
    return resp.data;
  },
  getVisitors: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/users?type=VISITOR`,
      method: 'GET',
    });
    return resp.data;
  },
  getBlacklist: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/users?type=BLACKLISTED`,
      method: 'GET',
    });
    return resp.data;
  },

  addUser: async ({ file }) => {
    let resp = await apiCallMediaUpload({
      url: `${baseUrl}/admin/upload-face`,
      multipartData: file,
    });

    return resp.data;
  },
  updateUser: async ({ type, _id }) => {
    let resp = await apicall({
      url: `${baseUrl}/admin/user`,
      method: 'PUT',
      data: { type, _id },
    });

    return resp.data;
  },
};

async function apiCallMediaUpload(
  { method = 'POST', url, data = null, multipartData },
  token = localStorage.getItem('token')
) {
  try {
    var formData = new FormData();
    //formData.append("name", "Vedansh");
    formData.append('image', multipartData);
    const zoneIds = ['6492eafca2644abc341def9f'];
    formData.append('zoneIds', JSON.stringify(zoneIds));
    console.log({
      uri: multipartData,
      type: multipartData.type,
      name: multipartData.name,
    });
    formData.append('name', 'test');
    console.log(formData);
    let resp = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (resp.status != 200 && resp.status != 304) {
      let data = await resp.json();
      alert(data.message || 'something went wrong');
      throw data.message || 'something went wrong.';
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
}

async function apicall(
  { method = 'POST', url, data = null },
  token = localStorage.getItem('token')
) {
  try {
    let resp = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    });
    if (resp.status != 200 && resp.status != 304) {
      let data = await resp.json();
      alert(data.message || 'something went wrong');
      throw data.message || 'something went wrong.';
    }
    return resp.json();
  } catch (error) {
    throw error;
  }
}
