// display with links
let links = $(".movies");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    movies(e.target.innerHTML);
  });
}

let allMovies = [];
async function movies(info) {
  result = {};
  if (info == "Trending") {
    result = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    );
  } else if (info == "") {
    result = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    );
  } else {
    result = await fetch(
      `https://api.themoviedb.org/3/movie/${info.toLowerCase()}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    );
  }

  let response = await result.json();

  allMovies = response.results;
  displayMovies();
}
movies("");

function getStar() {
  let stars = allMovies;
  console.log(stars);
}

async function displayMovies(result = []) {
  let cartona = ``;
  if (result.length <= 0) {
        result = allMovies;
    }
if(result.length > 0){
  for (let i = 0; i < result.length; i++) {
    cartona += `<div class="col-md-4">
                    <div class="p-1 m-2 info">
                            <img src='https://image.tmdb.org/t/p/w500/${
                              result[i].poster_path
                            }' class="w-100">
                            <div class="information text-center text-white ">
                                <h2>${result[i].title}</h2>
                                <p class="movieInfo">${result[i].overview}</p>
                                <span>Release Date : ${ result[i].release_date}</span>
                                <p class="stars">${result[i].vote_count}</p>
                                <p class='rate'>${result[i].vote_average.toFixed(1)}</p>
                            </div>
                    </div>
                </div>`;
  }
} 
  document.querySelector(".myData").innerHTML = cartona;
}

//Search
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  const searchMovies = e.target.value;
  const fillterMovies = allMovies.filter((mo) => {
    return mo.title.toLowerCase().includes(searchMovies);
  });
  displayMovies(fillterMovies);
});

// sidebar
let width = $(".barLinks").innerWidth();
$(".sidebar").animate({ left: `-${width}` }, 10);
$(".dash").click(function () {
  if ($(".sidebar").css("left") == "0px") {
    $(".sidebar").animate({ left: `-${width}` }, 700);
    $(".dash").removeClass("fa-xmark").addClass("fa-align-justify");
    $(".links").slideToggle(500);
  } else {
    $(".sidebar").animate({ left: "0px" }, 700);
    $(".dash").removeClass("fa-align-justify").addClass("fa-xmark");
    $(".links").slideToggle(1700);
  }
});

//scroll button
$(window).scroll(function () {
  let scrollValue = $(window).scrollTop();
  if (scrollValue >= 600) {
    $(".btUp").fadeIn(1000);
  } else {
    $(".btUp").fadeOut(1000);
  }
});

$(".btUp").click(function () {
  $("body , html").animate({ scrollTop: 0 }, 100);
});

$(".movies").click(function () {
  $("body , html").animate({ scrollTop: 0 }, 100);
});
$("#contact").click(function () {
  let conOffset = $("#contact").offset().top;
  $("body , html").animate({ scrollTop: conOffset }, 100);
});

//Validation Inputs
const regex = {
  Name: /^[A-Z][a-z]{3,10}$/,   
  Mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  Phone: /^01[0-2,5]{1}[0-9]{8}$/,  
  Age: /^(?:1[8-9]|[2-5][0-9]|60)$/, 
  Pass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  RePass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/  
};

function validateInputs(elem) {
  const errorMsg = elem.nextElementSibling;
  const fieldId = elem.id;

  if (regex[fieldId] && regex[fieldId].test(elem.value)) {
      errorMsg.style.display = 'none';
      $('#btn').addClass('bg-black')
      $('#btn').removeClass('bg-danger')
      $('#btn').removeClass('bg-danger');
    $('#btn').removeClass('btn-move');

  } else {
      errorMsg.style.display = 'block';
      $('#btn').addClass('bg-danger')
      $('#btn').removeClass('bg-black')
      $('#btn').removeClass('bg-black');
      $('#btn').addClass('btn-move');
  }
}

document.getElementById("contact").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  document.querySelectorAll("#contact input").forEach(input => {
      if (!regex[input.id] || !regex[input.id].test(input.value)) {
          isValid = false;
      }
  });

  if (isValid) {
      const formData = {
          Name: document.getElementById("Name").value,
          Mail: document.getElementById("Mail").value,
          Phone: document.getElementById("Phone").value,
          Age: document.getElementById("Age").value,
          Pass: document.getElementById("Pass").value,
          RePass: document.getElementById("RePass").value
      };

      console.log("Form data is valid:", formData);
      $('.error-msg').removeClass('d-block')
      $('.error-msg').addClass('d-none')
      $('#btn').addClass('bg-black')
      $('#btn').removeClass('bg-danger')
  } else {
      console.log("Please fill in the form correctly.");
      $('.error-msg').removeClass('d-none')
      $('.error-msg').addClass('d-block')
      $('#btn').addClass('bg-danger')
      $('#btn').removeClass('bg-black')
  }
});
