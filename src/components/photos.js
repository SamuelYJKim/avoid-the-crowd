const fetch = require("node-fetch");

const getPlaces = async (photoReference) => {
  const apiUrl =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&";
  const paramsURL = "photoreference=" + photoReference;
  const requestUrl = apiUrl + paramsURL + "&key=" + gmap_api_key;
  try {
    fetch(requestUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.log(response);
      //   if (response.ok) {
      //     response.json().then((data) => {
      //       //   console.log("data", data);
      //     });
      //   }
    });
  } catch (error) {
    console.log("error", error);
  }
};

const photoReference =
  "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU";
getPlaces(photoReference);
