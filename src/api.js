const baseUrl = 'http://192.168.29.183:3000';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getZones: async function () {
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
  getFeeds: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/feeds`,
      method: 'GET',
    });
    return resp.data;
  },
  getAlerts: async function () {
    let resp = await apicall({
      url: `${baseUrl}/admin/alerts/filter`,
      method: 'POST',
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
      url: `${baseUrl}/admin/users`,
      method: 'GET',
    });
    return resp.data;
  },

  addUser: async ({ file, name, zones }) => {
    let resp = await apiCallMediaUpload({
      url: `${baseUrl}/admin/upload-face`,
      multipartData: file,
      name : name , 
      zoneIds : zones,
    });

    return resp.data;
  },
};

async function apiCallMediaUpload(
  { method = 'POST', url, name , zoneIds, multipartData },
  token
) {
  try {
    var formData = new FormData();
    //formData.append("name", "Vedansh");
    formData.append('image', multipartData);
    console.log(zoneIds);
    formData.append('zoneIds', JSON.stringify(zoneIds));
    console.log({
      uri: multipartData,
      type: multipartData.type,
      name: multipartData.name,
    });
    formData.append('name', name);
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

async function apicall({ method = 'POST', url, data = null }, token) {
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