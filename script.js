setTimeout(() => {
  let preloader = document.querySelector('.preloader');
  preloader.classList.add('visible');
  let body = document.querySelector('.card_container');
  let url = window.location.toString();
  let urlApi = 'https://api.github.com/users/';
  let date = new Date();
  console.log(url);

  let nameFromUrl = (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if (name == undefined) {
      name = 'karolinahoover';
    }
    return name;
  }

  let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('Ошибка даты'),100);
  });

  let getUrl = new Promise((resolve,reject) => {
    setTimeout(() => resolve(`${urlApi}${nameFromUrl(url)}`),100);
  });

  Promise.all([getUrl,getDate])
    .then(([url,date]) => fetch(url))
    .then(info => info.json())
    .then(json => {
      console.log(json.avatar_url);
      let userAvatar = new Image();
      userAvatar.src = json.avatar_url;
      userAvatar.classList.add('image');
      body.appendChild(userAvatar);

      let userName = document.createElement('a');
      userName.href = json.html_url;
      userName.innerHTML = json.name;
      userName.classList.add('link');
      console.log(json.name);
      body.appendChild(userName);

      let userBio = document.createElement('p');
      if (json.bio != null) {
        userBio.innerHTML = json.bio;
      } else {
        userBio.innerHTML = 'Информация о пользователе не доступна';
      }
      userBio.classList.add('bio');
      console.log(json.bio);
      body.appendChild(userBio);

      console.log(json.html_url);

      let dateContainer = document.createElement('p');
      dateContainer.classList.add('date');
      dateContainer.innerHTML = `Дата поиска: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
      body.appendChild(dateContainer);
    })
    .catch(err =>  alert('Информация о пользователе не доступна'));
},2000)


/* window.setTimeout(function () {
  document.body.classList.add('loaded');
  let body = document.body;
  let string = window.location.search;
  let url = 'https://api.github.com/users/karolinahoover';
  const date = new Date();
  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject("Ошибка"), 100)
  })
  const getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject("Ошибка URL!"), 100)
  })

   Promise.all([getUrl, getDate])
      .then(([url, date]) => fetch(url))
      .then(res => res.json())
      .then(json => {
          console.log(json.avatar_url);
          console.log(json.name);
          console.log(json.bio);
          console.log(json.html_url);

          let photo = new Image();
          photo.src = json.avatar_url;
          body.append(photo);

          let name = document.createElement('p');
          if (json.name != null) {
              name.innerHTML = json.name;
          } else {
              name.innerHTML = 'Информация о пользователе недоступна';
          }
          body.append(name);
          name.addEventListener("click", () => window.location = json.html_url);

          let bio = document.createElement('p');
          if (json.bio != null) {
              bio.innerHTML = json.bio;
          } else {
              bio.innerHTML = 'Информация о пользователе недоступна';
          }
          body.append(bio);
          body.append(date)

    })

    .catch(err => console.log('Информация о пользователе недоступна'));
 }, 3000); */
