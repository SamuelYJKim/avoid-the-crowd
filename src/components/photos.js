const getPlaces = async (photoReference) => {
  const apiUrl = "https://maps.googleapis.com/maps/api/place/photo?";
  const paramsURL = "photoreference" + photoReference;
  try {
    fetch(requestUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          props.handleSearch(data);
        });
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};
