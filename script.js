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

 Promise.all([getDate])
   .then(([currentDate]) => fetch(`${url}${login}`))
   .then(res => res.json())
   .then(json => {
     console.log(json);
     const user = {
       avatar: json.avatar_url,
       name: json.login,
      bio: json.bio,
       link: json.html_url
     }
     for (key in user) {
       if (user[key] == null) {
         let err = document.createElement('h2');
         err.innerHTML = 'Информация недоступна(';
         document.body.appendChild(err);
         return;
       }
     }
     let name = document.createElement('a');
     name.innerHTML = user.name;
     name.href = user.link;
     document.body.appendChild(name);

     let bio = document.createElement('p');
     bio.innerHTML = user.bio;
     document.body.appendChild(bio);

     let avatar = document.createElement('img');
     avatar.src = user.avatar;
     avatar.classList.add('avatar');
     document.body.appendChild(avatar);

     let date = document.createElement('p');
     date.innerHTML = currentDate;
     document.body.appendChild(date);
   })
   .catch(err => console.log(err));
