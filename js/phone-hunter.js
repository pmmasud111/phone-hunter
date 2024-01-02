// ** fetch api */
const loadData = async (searchInput, dataLimite) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, dataLimite);
};

//** data show */
const displayData = (phones, dataLimite) => {
  const cardContainer = document.getElementById("card-main");
  cardContainer.innerHTML = "";

  //   Show all elements
  const showBtn = document.getElementById("show-btn");
  if (dataLimite && phones.length > 10) {
    phones = phones.slice(0, 10);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }

  //**worning alert */
  const worningText = document.getElementById("warning-text");
  if (phones.length === 0) {
    worningText.classList.remove("d-none");
  } else {
    worningText.classList.add("d-none");
  }

  //*find elemrnt with loop and data set**/
  phones.forEach((phone) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="card px-2 pt-3 pb-2 shadow-lg rounded-xl">
        <img class="w-[80%] mx-auto " src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-xl font-semibold">Model: ${phone.phone_name}</h5>
            <h5 class="card-title text-md font-semibold text-gray-600">Brand: ${phone.brand}</h5>
            <p class="card-text my-2 text-gray-600">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a onclick="modalsPhoneDetails('${phone.slug}')" href="#" class="btn   btn-primary"data-bs-toggle="modal"data-bs-target="#modalsPhoneDetails">Vew Details</a>
        </div>
    </div>`;

    cardContainer.appendChild(cardDiv);
  });
  toggoleSpinner(false);
};

//** */ search fumction//
const prossesSearch = (dataLimite) => {
  toggoleSpinner(true);
  const searchField = document.getElementById("search-field");
  const search = searchField.value;
  loadData(search, dataLimite);
};

// search enter add
document
  .getElementById("search-field")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      prossesSearch(10);
    }
  });

// search

const searchText = document
  .getElementById("btn-search")
  .addEventListener("click", () => {
    prossesSearch(10);
  });

//   spinner
function toggoleSpinner(isLoading) {
  const spinnerelement = document.getElementById("spinner");
  if (isLoading) {
    spinnerelement.classList.remove("d-none");
  } else {
    spinnerelement.classList.add("d-none");
  }
}

document.getElementById("show-btn").addEventListener("click", function () {
  prossesSearch();
});

//  <!-- Button trigger modal -->
const modalsPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayModal(data);
};

const displayModal = (data) => {
  const modalTitle = document.getElementById("modalsPhoneDetailsLabel");
  modalTitle.innerText = data.data.name;

  const img = document.getElementById("img");
  img.src = data.data.image;

  const brand = document.getElementById("brand");
  brand.innerText = `Brand: ${data.data.brand}`;

  const releaseDate = document.getElementById("releaseDate");
  releaseDate.innerText = data.data
    ? data.data.releaseDate
    : "no release date found";

  const storege = document.getElementById("storege");
  storege.innerText = `storage: ${data.data.mainFeatures.storage}`;

  const displaySize = document.getElementById("displaySize");
  displaySize.innerText = `Display Size: ${data.data.mainFeatures.displaySize}`;

  const memeory = document.getElementById("memory");
  memeory.innerText = `Memory: ${
    data.data.mainFeatures.memory
      ? data.data.mainFeatures.memory
      : "no memory found"
  }`;

  const chipSet = document.getElementById("chipset");
  chipSet.innerText = `Chipset: ${
    data.data.mainFeatures.chipSet
      ? data.data.mainFeatures.chipSet
      : "Chipset not found"
  }`;

  const sensors = document.getElementById("sensors");
  sensors.innerText = `Sensors: ${
    data.data.mainFeatures.sensors
      ? data.data.mainFeatures.sensors
      : "sensors status is not found"
  }`;
};
loadData("apple");
