/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
// const baseUrl =
//   'https://948e-2405-201-4028-5811-9066-1182-e5c-b4b3.ngrok-free.app';
const baseUrl = 'http://192.168.1.5:3000';
// const baseUrl = 'https://ecb7-110-224-226-69.ngrok-free.app';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: async ({ username, password }) => {
    let resp = await apicall({
      url: `${baseUrl}/auth/login/admin`,
      data: { username, password },
    });

    return resp.data;
  },
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
  createGatePass: async function ({
    userId,
    companyName,
    expiryDate,
    visitingUsers,
  }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/generate-gate-pass`,
      data: { userId, companyName, expiryDate, visitingUsers },
    });
    return resp.data;
  },
  detectFaces: async function ({ imgSrc }) {
    const base64 = imgSrc; // Place your base64 url here.
    console.log(base64);
    let blob = await fetch(base64);
    blob = await blob.blob();
    console.log(blob);
    const formData = new FormData();
    const file = new File([blob], 'filename.jpeg');
    formData.append('image', file);
    const token = localStorage.getItem('token');
    const API_URL = `${baseUrl}/admin/detect-faces`;
    let res = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    res = await res.json();
    return res.data;
  },

  detectFacesDirect: async function ({ imgSrc }) {
    const formData = new FormData();
    formData.append('image', imgSrc);
    const token = localStorage.getItem('token');
    const API_URL = `${baseUrl}/admin/detect-faces`;
    let res = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    res = await res.json();
    return res.data;
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
  updateFeed: async function ({ updateData, feedId }) {
    let resp = await apicall({
      url: `${baseUrl}/admin/feed`,
      method: 'PUT',
      data: { updateData, feedId },
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

  addUser: async ({
    imgSrc,
    name,
    aadhaarNumber,
    mobile,
    address,
    vehicles = [],
    type,
    zoneIds,
    email,
    designation,
    file,
  }) => {
    console.log(file);
    const formData = new FormData();
    if (imgSrc) {
      console.log('>>>>>>>>>>>');
      const base64 = imgSrc; // Place your base64 url here.
      console.log(base64);
      let blob = await fetch(base64);
      blob = await blob.blob();
      console.log(blob);
      const file = new File([blob], 'filename.jpeg');
      formData.append('image', file);
    } else {
      formData.append('image', file);
    }

    formData.append('type', type);
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('vehicles', JSON.stringify(vehicles));

    formData.append('zoneIds', JSON.stringify(zoneIds));

    formData.append('aadhaarNumber', aadhaarNumber);

    formData.append('address', address);
    const token = localStorage.getItem('token');
    const API_URL = `${baseUrl}/admin/upload-face`;
    let res = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    res = await res.json();
    return res.data;
  },
  addUserWithBlob: async ({ file }) => {
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
