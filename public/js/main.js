const form = document.querySelector("form");
const input = document.querySelector("input");
const dt = document.querySelector("p");
//dt.textContent = "Loading...";
form.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`http://localhost:3000/weather?search=${input.value}`).then(
    response => {
      response.json().then(data => {
        console.log(data.temperature);
        dt.innerHTML = `Temperature: ${data.temperature}<br>Precip Type: ${
          data.precip_type
        }<br>Precip Probability: ${data.precipProbability}<br>Summary: ${
          data.summary
        }`;
      });
    }
  );
});
