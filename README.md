# loving-kittens

Antes de nada solo decir que me he divertido realizando la prueba, gracias.

Para montar la aplicación loving-kittens asegurarse de tener intalado NodeJS la LTS version https://nodejs.org/en/ así como npm.

A continuación instalamos la CLI de Ionic con 
$npm install -g ionic.

Navega a tu carpeta de preferencia con tu terminal y haz un clone del repositorio con 
$git clone git@github.com:Jmvega-code/loving-kittens.git

Seguidamente creamos la carpeta node_modules con
$npm install

Y finalmente montamos la app en memoria con el comando
$ionic serve

En cuanto a los retos los he hecho todos menos el de optimizar las llamadas al servidor los días de la semana que se actualiza.
Sin embargo los he hecho a la vez. En la página de Dueños he hecho el de infinite scrolling y en la de Búsqueda he hecho las dos juntas en lugar de crear otra del botón Soy pro.
También he considerado menos interesante, por la falta de tiempo, el jugar con los strings y crear direcciones web, separar el nombre, etc.
Sin embargo he añadido cosas que sí me han parecido necesarias: 

1- Una papelera en la lista de favoritos cuando se le hace slide a la izquierda a un elemento para borrar dicho elemento de favoritos.

2- Añadir una propiedad a los dueños si ya los tengo en mi lista de favoritos y si se le hace click otra vez aparece un corazón delante del nombre indicando que ya están en mi lista. Si de todas formas se hace click en Añadir a favoritos nos salta una alerta.

3- También he fijado la zona de detalles para crear una mejor experiencia de usuario. Ya que con el infinite scroll si quería agragar a un usuario de los útimos, tenía que subir toda la página y de este modo siempre aparece en el mismo sitio. 
