let i = 0;
let caixinha = "b"
let scroll = 'x';
let promisse;
const mensagens = document.querySelector('ul');
let nome = "";
let mandaNome;
let msg = {
    from:"", to:"", text:"",type:""
};
perguntaNome();
chat();
setInterval(chat, 3000);

function perguntaNome(){
    nome = prompt("vosso nome caro usuario(a)");
    mandaNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    mandaNome.then(intervalOn);
}

function On(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nome});
}

function intervalOn(){
    setInterval(On, 5000);
}

function chat(){
    promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(resposta => renderMsgs(resposta));
    promisse.catch(erro);
}

function renderMsgs(resposta) {

    resposta = resposta.data;

    mensagens.innerHTML = "";

    let lista = document.querySelector('ul');

    for(let i = 0; i < resposta.length; i++){
        console.log(resposta)
        if(resposta[i].type === 'message'){
            lista.innerHTML +=`
            <li class="mensagem">
            <h1>
            <span class='tempo'>(${resposta[i].time}) </span> <span class='negrito'>${resposta[i].from}</span> para <span class="negrito">${resposta[i].to}</span>: ${resposta[i].text}
            </h1>
            </li>
            `
        }else if(resposta[i].type == "status"){
            lista.innerHTML +=`
            <li class="status">
            <h1>
            <span class="tempo">(${resposta[i].time}) </span>  <span class="negrito">${resposta[i].from}</span> ${resposta[i].text}
            </h1>
            </li>
            `
        }
        else if(resposta[i].type == "private_message" && (resposta[i].to == nome.name || resposta[i].from == nome.name )){
            lista.innerHTML +=`
            <li class="private"> 
            <h1>
            <span class="tempo">(${resposta[i].time}) </span>  <span class="negrito">${resposta[i].from}</span> reservadamente para <span class="negrito">${resposta[i].to}</span>: ${resposta[i].text}
            </h1>
            </li>
            `
        }

        i++;
    }
}
scroll = mensagens.lastElementChild;
if(caixinha.innerHTML != scroll.innerHTML){
    scroll.scrollIntoView();
caixinha = scroll;
}

function erro(){
    alert('erro');
}
function enviarMensagem(){
    let msgvalue = document.querySelector('input').value;
    msg.from = nome;
    msg.to = "Todos";
    msg.text = msgvalue;
    msg.type = "message";
    if(msg.text != ""){
        let postarMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);
        postarMsg.catch(refresh);
        console.log(postarMsg)
        postarMsg.then(chat);
    }
    document.getElementsByClassName('input').value = ""
    console.log(msg);
}
function refresh(){
    window.location.reload();
}


