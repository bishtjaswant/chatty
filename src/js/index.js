const socket = io();;

let person_name;
const textarea= document.querySelector('#textarea');
const messageArea = document.querySelector('.message__area');
do{
    person_name = prompt('please enter your name');
}
while (!person_name) ;


textarea.addEventListener("keyup", function(e){
    console.log(e)
    if (e.key=='Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(msg) {
    let data=  {
        name: person_name,
        message: msg,
    };

    // show it to dom
    renderMessage(data,'outgoing');
    //send to server via websoocket
    socket.emit('my-msg', data)

}

function renderMessage(msg,type) {
      let mainDiv = document.createElement('div');
      mainDiv.classList.add(type,'message');
      let  markup=`
        <h1> ${msg.name}  </h1>
        <p> ${msg.message} </p>
      `;
      mainDiv.innerHTML=  markup;
      messageArea.appendChild(mainDiv);
      textarea.value=''
}

socket.on('my-msg',(data) => {
    console.log(data);
    renderMessage(data,'incoming');
})