/* //Funcion para traer el usuario de git
$.get("/user", function (data) {
    $("#user").html(data.name);
    $(".unauthenticated").hide();
    $(".authenticated").show();
});
var logout = function () {
    $.post("/logout", function () {
        $("#user").html('');
        $(".unauthenticated").show();
        $(".authenticated").hide();
    });
    return true;
};


// Rutina para traer las Clientes a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaC){
            console.log(respuestaC);
            pintarRespuestaC(respuestaC);
        }
    });
}
$(document).ready(function (){
    traerInformacionC();
});

// Rutina para pintar los clientes a un <select>
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para traer las motocicletas a un <select>
function traerInformacionG(){
    $.ajax({
        url:"http://localhost:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaG){
            console.log(respuestaG);
            pintarRespuestaG(respuestaG);
        }
    });
}
$(document).ready(function (){
    traerInformacionG();
});

// Rutina para pintar las motocicletas a un <select>
function pintarRespuestaG(respuestaG){
    var mylistaG=document.getElementById("resultadoG");
    for(i=0; i<respuestaG.length; i++){
        mylistaG.innerHTML+=`<option value="${respuestaG[i].id}">${respuestaG[i].name}</option>`;
    }
    console.log(mylistaG);
}

//Funciones de la tabla Message
$(document).ready(function (){
    traerInformacionMessage();
});

//Funcione que trae la informacion de Message
function traerInformacionMessage(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMessage){
            console.log(respuestaMessage);
            pintarRespuestaMessage(respuestaMessage);
        }
    });
}

//Funcione que pinta en cards la informacion de Message
function pintarRespuestaMessage(respuestaMessage){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaMessage.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">Cliente: ${respuestaMessage[i].client.name}</h4>
            <h4 class="card-title">Motocicleta: ${respuestaMessage[i].motorbike.name}</h4>
            <p class="card-text">Mensaje: ${respuestaMessage[i].messageText}</p>
            <button class="btn btn-danger" onclick="borrarElementoMessage(${respuestaMessage[i].idMessage})">Borrar</button>
            <button class="btn btn-success"  onclick="actualizarElementoMessage(${respuestaMessage[i].idMessage})">Actualizar</button>
        </div>        
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoMessage").append(myTable);
}
//Funcion que guarda un nuevo Mensaje
function guardarElementoMessage(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Message/save",
        success:function(response) {
            console.log(response);
            console.log("El Mensaje se guardó correctamente");
            alert("El Mensaje se guardó correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("El Mensaje no se guardó correctamente");
        }
    });
}

//Funcion que actualiza un Message
function actualizarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#idMessage").val("");
            $("#resultadoC").val("");
            $("#resultadoG").val("");
            traerInformacionMessage();
            alert("Mensaje actualizado con éxito");
        }
    });
}

//Funcion que borra un Menesaje
function borrarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Mensaje eliminado con éxito.");
        }
    });
}
 */

//Funcion para el fondo de pantalla


//Funcion para traer el usuario de git
$.get("/user", function (data) {
    $("#user").html(data.name);
    $(".unauthenticated").hide();
    $(".authenticated").show();
});
var logout = function () {
    $.post("/logout", function () {
        $("#user").html('');
        $(".unauthenticated").show();
        $(".authenticated").hide();
    });
    return true;
};


// Rutina para taer las Clientes a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaC){
            console.log(respuestaC);
            pintarRespuestaC(respuestaC);
        }
    });
}
$(document).ready(function (){
    traerInformacionC();
    $.get("http://localhost:8080/user",function(data){
        console.log(data.name);
        $("#userloginname").html(data.name);
        // document.getElementById("userloginname").innerHTML =data.login;
    });

});

// Rutina para pintar los clientes a un <select>
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para taer los Juegos a un <select>
function traerInformacionG(){
    $.ajax({
        url:"http://localhost:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaG){
            console.log(respuestaG);
            pintarRespuestaG(respuestaG);
        }
    });
}
$(document).ready(function (){
    traerInformacionG();
});
// Rutina para pintar los Juegos a un <select>
function pintarRespuestaG(respuestaG){
    var mylistaG=document.getElementById("resultadoG");
    for(i=0; i<respuestaG.length; i++){
        mylistaG.innerHTML+=`<option value="${respuestaG[i].id}">${respuestaG[i].name}</option>`;
    }
    console.log(mylistaG);
}

//Funciones de la tabla Message
$(document).ready(function (){
    traerInformacionMessage();
});

//Funcione que trae la informacion de Message
function traerInformacionMessage(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMessage){
            console.log(respuestaMessage);
            pintarRespuestaMessage(respuestaMessage);
        }
    });
}

//Funcione que pinta en cards la informacion de Message
function pintarRespuestaMessage(respuestaMessage){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaMessage.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">Cliente: ${respuestaMessage[i].client.name}</h4>
            <h4 class="card-title">Motocicleta: ${respuestaMessage[i].motorbike.name}</h4>
            <p class="card-text">Mensaje: ${respuestaMessage[i].messageText}</p>
            <button class="btn btn-danger" onclick="borrarElementoMessage(${respuestaMessage[i].idMessage})">Borrar</button>
            <button class="btn btn-success"  onclick="actualizarElementoMessage(${respuestaMessage[i].idMessage})">Actualizar</button>
        </div>        
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoMessage").append(myTable);
}
//Funcion que guarda un nuevo Mensaje
function guardarElementoMessage(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Message/save",
        success:function(response) {
            console.log(response);
            console.log("El Mensaje se Guardo Correctamente");
            alert("El Mensaje se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("El Mensaje no se Guardo Correctamente");
        }
    });
}

//Funcion que actualiza un Message
function actualizarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#idMessage").val("");
            $("#resultadoC").val("");
            $("#resultadoG").val("");
            traerInformacionMessage();
            alert("Mensaje Actualizado con Exito");
        }
    });
}

//Funcion que borra un Menesaje
function borrarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Mensaje Eliminado con Exito.");
        }
    });
}