const url = 'https://api.github.com/users/';
 const login = 'karolinahoover';
 let currentDate = new Date();

 setTimeout(() => {
   const preloader = document.getElementById('floatingCirclesG');
   preloader.classList.add('stop');
 }, 3000);

 const getDate = new Promise((resolve, reject) => {
   setTimeout(() => currentDate ? resolve(currentDate) : reject('имя не найдено'), 3000);
 });

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
 }, 3000);
