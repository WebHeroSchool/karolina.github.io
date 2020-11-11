fetch('https://api.github.com/users/karolina.github.io')
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
   })
