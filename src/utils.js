export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const renderOptions = (arr) => {
  let results = [];
  if(arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt,
      }
    })
  }
  results.push({
    value: 'Thêm type',
    label: 'Thêm loại sản phẩm',
  })
  return results;
}

export const convertPrice = (price) => {
  try {
      const result  = price?.toLocaleString().replaceAll(',', '.')
      return `${result} đ`
  } catch (error) {
      return null
  }
}

export const timeTranform = (time) => {
  const date = new Date(time);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  return date.toLocaleString('vi-VN',options) + '  (GMT+7)';
}


//Tự động nhúng script FB
export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID,// You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v2.1" // use version 2.1
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};