
// Função para criação do perfil da pessoa que está logada

import { posts, suggestUsers, users } from "./database.js"



// Função para criar perfil do usuário
function createProfile(user) {

    //Criando elementos pro HTML do usuário

    const profile = document.querySelector(".profile")
    const div = document.createElement('div')
    const div__information = document.createElement('div')
    const image = document.createElement('img')
    const name = document.createElement("h2")
    const company = document.createElement("h3")
    const form = document.createElement("form")
    const titlePost = document.createElement("input")
    const descriptionPost = document.createElement("input")
    const buttonPost = document.createElement("button")

    // Atribuindo os dados
    image.src = user.img
    name.innerText = user.user
    company.textContent = user.stack
    buttonPost.textContent = "Postar"

    //Adicionando Classes 
    div__information.classList.add("profile__container")
    div.classList.add("profile__information")
    image.classList.add("profile__image")
    name.classList.add("profile__name")
    company.classList.add("profile__company")
    form.classList.add("profile__form")
    titlePost.classList.add("profile__title-post")
    descriptionPost.classList.add("profile__description-Post")
    buttonPost.classList.add("profile__button")


    //Definindo tipo dos inputs e seus placeholder
    titlePost.type = "text"
    titlePost.placeholder = "Digitar título do post"
    descriptionPost.type = "text"
    descriptionPost.placeholder = "Digitar descrição do post"


    // Adicionando as tags às tags pais no HTML
    div.append(name, company)
    div__information.append(image, div)
    form.append(titlePost, descriptionPost, buttonPost)
    profile.append(div__information, form)

}


// Criando uma div com o DOM, para assim adicionar todas as sugestões de usuários
const suggestions = document.querySelector(".suggestions")
const suggestContainer = document.createElement("div")
suggestContainer.classList.add("suggestions__container")
suggestions.append(suggestContainer)


// Função para criar sugestões de seguidores
function suggestionUsers(suggestUsers) {

    //Criando elementos pro HTML dos usuários sugeridos
    const suggestions = document.querySelector(".suggestions__container")

    const suggestionsProfile = document.createElement("div")
    const suggestionsProfileContainer = document.createElement("div")
    const image = document.createElement("img")
    const divInformation = document.createElement("div")
    const name = document.createElement("h3")
    const company = document.createElement("p")
    const buttonFollow = document.createElement("button")


    // Atribuindo os dados
    image.src = suggestUsers.img
    name.innerText = suggestUsers.user
    company.innerHTML = suggestUsers.stack
    buttonFollow.textContent = "Seguir"

    //Adicionando Classes 
    suggestionsProfileContainer.classList.add("sugeestions__profile-container")
    suggestionsProfile.classList.add("sugeestions__profile")
    image.classList.add("suggestions__image")
    divInformation.classList.add("suggestions__information")
    name.classList.add("suggestions__name")
    company.classList.add("suggestions__company")
    buttonFollow.classList.add("suggestions__button-Follow")

    // Adicionando Evento de mudar o botão ao clicar em seguir ele irá mudar as propriedades do CSS, alterando cor, escrita,bordas
    // EVENTO De Seguir
    buttonFollow.addEventListener("click", () => {
        if (buttonFollow.textContent == "Seguir") {
            buttonFollow.textContent = "Seguindo"
            buttonFollow.style.backgroundColor = "var(--brand-1)"
            buttonFollow.style.color = "var(--WhiteFixed)"
            buttonFollow.style.border = "none"
        } else {
            buttonFollow.textContent = "Seguir"
            buttonFollow.style.backgroundColor = "var(--WhiteFixed)"
            buttonFollow.style.color = "var(--grey-1)"
            buttonFollow.style.border = ".0625rem solid var(--grey-1)"
        }
    })



    // Adicionando as tags às tags pais no HTML
    suggestionsProfileContainer.append(image, divInformation)
    divInformation.append(name, company)
    suggestionsProfile.append(suggestionsProfileContainer, buttonFollow)
    suggestions.appendChild(suggestionsProfile)

}






// Função de criação dos posts a serem colocados no FEED
function createPost(posts) {

    //Criando elementos para o Feed de posts dos usuários
    const feed = document.querySelector(".feed")
    const image = document.createElement("img")
    const name = document.createElement("h3")
    const company = document.createElement("p")
    const titlePost = document.createElement("h2")
    const post = document.createElement("p")
    const likes = document.createElement("p")
    const button = document.createElement("button")
    const heartLike = document.createElement("img")
    const divAction = document.createElement("div")
    const divNameStack = document.createElement("div")
    const divLikes = document.createElement("div")
    const divProfile = document.createElement("div")
    const divPost = document.createElement("div")

    // Atribuindo os dados
    image.src = posts.img
    name.innerText = posts.user
    company.innerText = posts.stack
    titlePost.innerText = posts.title
    post.innerText = posts.text
    likes.innerText = posts.likes
    heartLike.src = ("./src/assets/img/heart-default.svg")
    button.textContent = "Abrir Post"

    //Adicionando Classes e ID 
    divPost.classList.add("post")
    divPost.id = posts.id
    divNameStack.classList.add("feed__name-stack")
    divAction.classList.add("feed__action")
    divLikes.classList.add("feed_action-like")
    divProfile.classList.add("feed__profile")
    image.classList.add("feed__image")
    name.classList.add("feed__name")
    company.classList.add("feed__company")
    titlePost.classList.add("feed__title-post")
    post.classList.add("feed__post")
    likes.classList.add("feed__likes")
    button.classList.add("feed__button")
    heartLike.classList.add("feed__heart-like")


    // Ao clicar no coração, ele irá ficar vermelho adicionando 1 like a mais 
    // Ao clicar novamente, ele irá deixar o coração no modo default, retirando o like
    //EVENTO De Like
    heartLike.addEventListener("click", () => {
        if (heartLike.src.includes("/heart-default.svg")) {
            heartLike.src = "./src/assets/img/heart-hover.svg"

            likes.innerText = posts.likes + 1
        } else {
            heartLike.src = "./src/assets/img/heart-default.svg"
            post.likes -= 1
            likes.innerText = posts.likes
        }
    })



    // Adicionando as tags às tags pais no HTML
    divNameStack.append(name, company)
    divAction.append(button, divLikes)
    divLikes.append(heartLike, likes)
    divProfile.append(image, divNameStack)
    divPost.append(divProfile, titlePost, post, divAction)
    feed.append(divPost)
}




// MODAL para visualizar o post por completo clicando em todos os botões 
// Ao clicar no post, cria-se várias tags html para mostrar o conteúdo

function handleModal() {
    const buttons = document.querySelectorAll(".feed__button")
    const modalController = document.querySelector(".modal__controller")
    const modalContainer = document.querySelector(".modal__container ")


    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {


            // Criando os elementos HTML
            const image = document.createElement("img")
            const name = document.createElement("h3")
            const company = document.createElement("p")
            const titlePost = document.createElement("h2")
            const post = document.createElement("p")
            const buttonClose = document.createElement("button")
            const divProfile = document.createElement("div")
            const divNameStack = document.createElement("div")
            const divPost = document.createElement("div")
            const divAction = document.createElement("div")


            //Adicionando o conteúdo às tags
            image.src = posts[i].img
            name.textContent = posts[i].user
            company.textContent = posts[i].stack
            titlePost.innerText = posts[i].title
            post.innerText = posts[i].text
            buttonClose.innerText = "X"


            //Adicionando as classes 
            image.classList.add("modal__image")
            name.classList.add("modal__name")
            company.classList.add("modal__company")
            titlePost.classList.add("modal__title-post")
            post.classList.add("modal__post")
            divProfile.classList.add("modal__profile")
            divPost.classList.add("modal__posts")
            divNameStack.classList.add("modal__namestack")
            divAction.classList.add("modal__action")
            buttonClose.classList.add("modal__close")

            // Adicionando as tags às tags pais no HTML 
            divProfile.append(image, divNameStack)
            divPost.append(divAction, titlePost, post)
            divAction.append(divProfile, buttonClose)
            divNameStack.append(name, company)

            modalContainer.appendChild(divPost)

            modalController.showModal()
            closeModal()
        })
    }
}


// Fechamento do Modal. Ao clicar no X para fechar o modal
// ele deleta os elementos html
function closeModal() {
    const button = document.querySelector(".modal__close")
    const modalControlle = document.querySelector(".modal__controller")

    button.addEventListener("click", () => {
        const modal__post = document.querySelector(".modal__posts")

        modal__post.remove()





        console.log("Fechado")
        modalControlle.close()
    })
}









// Chamada do for para rodar toda a lista e aplicar a função e cada item do objeto 
for (let i = 0; i < suggestUsers.length; i++) {
    suggestionUsers(suggestUsers[i])
}


for (let i = 0; i < posts.length; i++) {
    createPost(posts[i])
}

// Chamada da função de mostrar o usuário
createProfile(users[0])

handleModal()
