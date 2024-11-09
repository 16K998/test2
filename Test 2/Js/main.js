// display with links
let links=$('.movies')
for(let i=0; i<links.length; i++){
    links[i].addEventListener('click',function(e){
        movies(e.target.innerHTML)
    })
}

let allMovies=[]
async function movies(info){
    let reult= await fetch(`https://api.themoviedb.org/3/movie/${info.toLowerCase()}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let ternd = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
    let home = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
    if(info == 'trending'){
        reult = ternd
    }if(info == ''){
        reult=home
    }
    else{
        info = reult
    }
    let response= await reult.json()
    allMovies=response.results
    displayMovies() 
}
movies('')

function getStar(){
    let stars = allMovies
    console.log(stars)
}

async function displayMovies(){
    let cartona=``
    for(let i=0; i < allMovies.length; i++){
        cartona+=`<div class="col-md-4">
                <div class="p-1 m-2 info">
                        <img src='https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}' class="w-100">
                        <div class="information text-center text-white ">
                            <h2>${allMovies[i].title}</h2>
                            <p class="movieInfo">${allMovies[i].overview}</p>
                            <span>Release Date : ${allMovies[i].release_date}</span>
                            <p class="stars">${allMovies[i].vote_count}</p>
                            <p class='rate'>${allMovies[i].vote_average.toFixed(1)}</p>
                        </div>
                </div>
            </div>`
    }
    document.querySelector('.myData').innerHTML=cartona
}


//Search

const searchBar=document.getElementById('searchBar' )
searchBar.addEventListener('keyup', (e) =>{
    const searchMovies = e.target.value;
    const fillterMovies = allMovies.filter((mo) =>{
        return(
            mo.title.includes(searchMovies)
        );
    })
    console.log(fillterMovies)
    displayMovies(fillterMovies)
})


// sidebar
let width=$('.barLinks').innerWidth()
$('.sidebar').animate({left:`-${width}`},10)
$('.dash').click(function(){
    if($('.sidebar').css('left')=='0px'){
        $('.sidebar').animate({left:`-${width}`},700)
        $('.dash').removeClass('fa-xmark').addClass('fa-align-justify')
        $('.links').slideToggle(500)
        
        

    }else{
        $('.sidebar').animate({left:'0px'},700)
        $('.dash').removeClass('fa-align-justify').addClass('fa-xmark')
        $('.links').slideToggle(1700)
    }
})

//scroll button
$(window).scroll(function(){
    let scrollValue=$(window).scrollTop()
    if(scrollValue >= 600){
        $('.btUp').fadeIn(1000)
    }else{
        $('.btUp').fadeOut(1000) 
    }
})

$('.btUp').click(function(){
    $('body , html').animate({scrollTop:0}, 100)
})

$('.movies').click(function(){
    $('body , html').animate({scrollTop:0}, 100)
})
$('#contact').click(function(){
    let conOffset=$('#contact').offset().top
    $('body , html').animate({scrollTop:conOffset}, 100)
})

//validate inputs
        function validateInputs(elem){
            console.log(elem.id)
        const regex={
            Name:/^[A-Z][a-z]{3,10}$/,
            Mail:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            Phone:/^01[0-2,5]{1}[0-9]{8}$/,
            Age:/^(?:1[8-9]|[2-5][0-9]|60)$/,
            Pass:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            rePass:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        }
        if(regex[elem.id].test(elem.value)==true){
            elem.classList.add('text-info')
            elem.classList.remove('text-danger')
        }else{
            elem.classList.add('text-danger')
            elem.classList.remove('text-info')
        }
        $('#btn').click(function(e){
            e.preventDefault()
            
        })
        }
        // let subInput=document.querySelector('#btn');
        // subInput.addEventListener('click',function(e){
        //         e.preventDefault()
        // })
        // const subInput=document.querySelector('#btn');
        // subInput.addEventListener('click',function(e){
        //     e.preventDefault()
        // })
            

// const nameInput=document.getElementById('Name');
// const mailInput=document.getElementById('Mail');
// const phoneInput=document.getElementById('Phone');
// const ageInput=document.getElementById('Age');
// const passInput=document.getElementById('Pass');
// const repassInput=document.getElementById('RePass');
// 


// nameInput.oninput=function(){
//     let name= nameInput.value;
//     let nameRegex=/^[A-Z][a-z]{3,10}$/;
//     if(name.match(nameRegex)){
//         nameInput.nextElementSibling.classList.replace('d-block', 'd-none')
//     }else{
        
//         nameInput.nextElementSibling.classList.replace('d-none', 'd-block')
//     }
// }


// 
    
    // let mail= nameInput.value;
    // let phone= nameInput.value;
    // let age= nameInput.value;
    // let pass= nameInput.value;
    // let repass= nameInput.value;
    // // console.log(field)
    
    // let mailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    // let phoneRegex=/^01[0-2,5]{1}[0-9]{8}$/;
    // let ageRegex=/^01[0125][0-9]{8}$/;
    // let passRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    // let rePassRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    //     if(name.match(nameRegex)){
    //         console.log('ok')
    //     }else{
    //         console.log('Not ok')
    //     }
// });
