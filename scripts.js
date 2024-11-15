const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})


const inputTags = document.getElementById('categoria')
const tagsList = document.getElementById('lista-tags')



tagsList.addEventListener('click', (evento)=> {
    if(evento.target.classList.contains('remove-tag')) {
        const removedTag = evento.target.parentElement;
        tagsList.removeChild(removedTag);
    }

    })


const tagsDisponiveis = ['JavaScript', 'HTML', 'CSS', 'Python', 'JAVA', 'c#', 'c++', 'BrainFuck']

async function verifytags(tagTexto){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
            
        }, 100);

    })
}

inputTags.addEventListener('keypress', async (evento)=>{
    if(evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        try{
                if (tagTexto !== ""){
                    const tagVerificada = await verifytags(tagTexto)
                    if(tagVerificada){
                    const newTag = document.createElement('li');
                    newTag.innerHTML = `<p>${tagTexto}</p>  <img src="./img/close-black.svg" class="remove-tag">`
                    tagsList.appendChild(newTag);
                    inputTags.value = "";}
                    else{
                        alert('A tag escrita não corresponde a nenhuma tag válida')
                    }
                }
    } catch(error){
        console.error('Erro na verificação das tags')
        alert('Erro ao verificar tag. Verifique o console usando F12')
    }
    }
})


const btnPost = document.querySelector('.botao-publicar');




async function postproject(projectName, projectsDesc, projectTags){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const deuCerto = Math.random() > 10;

            if(deuCerto){
                resolve('Projeto públicado com sucesso')

            }else{ reject('Erro ao públicar projeto')}
        }, 1000)
        
    })
}

btnPost.addEventListener('click', async (evento)=>{
    evento.preventDefault();
    const projectName = document.getElementById('nome').value
    const projectsDesc = document.getElementById('descricao').value
    const projectTags = Array.from(tagsList.querySelectorAll("p")).map((tag)=> tag.textContent)

    try{
        const results = await postproject(projectName, projectsDesc, projectTags)
        location.reload()
        alert('Públicado com sucesso')
        
    
    }catch{
        alert('Ops... Não foi possível públicar')
    }
})


const btnDescart = document.querySelector('.botao-descartar')

btnDescart.addEventListener('click', (evento)=>{
    evento.preventDefault();
    const form = document.querySelector('form');

    form.reset();

    imagemPrincipal.src = './img/imagem1.png'
    nomeDaImagem.textContent = 'image_projeto.png'

    tagsList.innerHTML = '';
})
