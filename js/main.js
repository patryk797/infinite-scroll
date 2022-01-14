console.log(`Warsztat - Infinite scroll`);

let endOfThePage = 0;

let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('showPreloader()');
    preloader.style.display = 'block';
    preloading = true;

}


const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display = 'none';
    preloading = false;

}


const getData = () => {

    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebSite = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`
                    pWebSite.innerHTML = `User URL: ${user.website}<br />---------`;

                    let body = document.body;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebSite);

                }

                hidePreloader();
                

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

}




const scrollToEndOfPage = () => {
    // console.log(`scrollToEndOfPage()`);

    let d = document.documentElement;

    // Wysokość zawartości elementów wraz z niewidoczną zawartością
    let scrollHeight = d.scrollHeight;

    // Ilość pikseli 
    let scrollTop = d.scrollTop;

    // Wewnętrzna wysokość okna przeglądarki
    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`sumScrollTopClientHeight ${sumScrollTopClientHeight}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log('========')

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfThePage++;
        
        console.log(`Przescrollowano do końca strony: ${endOfThePage}`)
        
        getData();
    }
    

    
}

window.addEventListener(`scroll`, scrollToEndOfPage);