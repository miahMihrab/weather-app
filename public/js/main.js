const form = document.querySelector("form");
const input = document.querySelector("input");
const dt = document.querySelector("p");
//dt.textContent = "Loading...";
form.addEventListener("submit", e => {
  e.preventDefault();

  //http://localhost:3000 for local
  fetch(`/weather?search=${input.value}`).then(
    response => {
      response.json().then(data => {

        if (data.error) {

          dt.innerHTML = data.error;
        } else {
          dt.innerHTML = `Temperature: ${data.temperature}<br>Precip Type: ${
          data.precip_type
        }<br>Precip Probability: ${data.precipProbability}<br>Summary: ${
          data.summary}<br>Address: ${data.location}`;
        }
      });

    }
  );
});