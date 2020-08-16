export const getPlaces = async (latitude, longitude, keyword) => {
  const apiUrl = "http://localhost:5000/places/";
  const paramsURL = latitude + "/" + longitude + "/" + keyword;
  const requestUrl = apiUrl + paramsURL;
  console.log(requestUrl);
  try {
    fetch(requestUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("response", response);
        response.json().then((data) => {
          console.log("data", data);
        });
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};

export default getPlaces;
