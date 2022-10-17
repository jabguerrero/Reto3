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

// Rutina para taer los Clientes a un <select>
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

// Rutina para pintar los Clientes a un <select>
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para taer las motocicletas a un <select>
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

//Funciones de la tabla Reservation
$(document).ready(function (){
    traerInformacionReservation();
});

//Funcione que trae la informacion de Reservation
function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaReservation){
            console.log(respuestaReservation);
            pintarRespuestaReservation(respuestaReservation);
        }
    });
}

//Funcione que pinta la informacion de Reservation
function pintarRespuestaReservation(respuestaReservation){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaReservation.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Id Reserva: ${respuestaReservation[i].idReservation}</h5>
                <h5 class="card-subtitle">Fecha Inicio: ${respuestaReservation[i].startDate.substring(0, 10)}</h5>
                <h5 class="card-subtitle">Fecha Final: ${respuestaReservation[i].devolutionDate.substring(0, 10)}</h5>
                <h5 class="card-subtitle">Estado: ${respuestaReservation[i].status}</h5>
                <h5 class="card-title">Motocicleta: ${respuestaReservation[i].motorbike.name}</h5>
                <h5 class="card-subtitle">Marca: ${respuestaReservation[i].motorbike.brand}</h5>
                <h5 class="card-subtitle">Modelo: ${respuestaReservation[i].motorbike.year}</h5>
                <h5 class="card-title">Id Cliente: ${respuestaReservation[i].client.idClient}</h5>
                <h5 class="card-title">Nombre: ${respuestaReservation[i].client.name}</h5>
                <h5 class="card-subtitle">Correo: ${respuestaReservation[i].client.email}</h5>
                <button class="btn btn-danger" onclick="borrarElementoReservation(${respuestaReservation[i].idReservation})">Borrar</button>
                <button class="btn btn-success"  onclick="actualizarElementoReservation(${respuestaReservation[i].idReservation})">Actualizar</button>
            </div>
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoReservation").append(myTable);
}

//Funcion que guarda una nueva Reservation
function guardarElementoReservation(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Reservation/save",
        success:function(response) {
            console.log(response);
            console.log("La Reserva se guardó correctamente");
            alert("La Reserva se guardó correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Reserva no se guardó correctamente");
        }
    });
}

//Funcion que actualiza una Reservation
function actualizarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#resultadoEstado").val("");
            traerInformacionReservation();
            alert("Reserva actualizada con éxito");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Reserva no se guardó correctamente");
        }
    });
}

//Funcion que borra una Reservation
function borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            traerInformacionReservation();
            alert("Reserva eliminada con éxito.");
        }
    });
}
 */

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

// Rutina para taer los Clientes a un <select>
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

// Rutina para pintar los Clientes a un <select>
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para taer las motocicletas a un <select>
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

//Funciones de la tabla Reservation
$(document).ready(function (){
    traerInformacionReservation();
});

//Funcione que trae la informacion de Reservation
function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaReservation){
            console.log(respuestaReservation);
            pintarRespuestaReservation(respuestaReservation);
        }
    });
}

//Funcione que pinta la informacion de Reservation
function pintarRespuestaReservation(respuestaReservation){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaReservation.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Id Reserva: ${respuestaReservation[i].idReservation}</h5>
                <h5 class="card-subtitle">Fecha Inicio: ${respuestaReservation[i].startDate.substring(0, 10)}</h5>
                <h5 class="card-subtitle">Fecha Final: ${respuestaReservation[i].devolutionDate.substring(0, 10)}</h5>
                <h5 class="card-subtitle">Estado: ${respuestaReservation[i].status}</h5>
                <h5 class="card-title">Motocicleta: ${respuestaReservation[i].motorbike.name}</h5>
                <h5 class="card-subtitle">Marca: ${respuestaReservation[i].motorbike.brand}</h5>
                <h5 class="card-subtitle">Modelo: ${respuestaReservation[i].motorbike.year}</h5>
                <h5 class="card-title">Id Cliente: ${respuestaReservation[i].client.idClient}</h5>
                <h5 class="card-title">Nombre: ${respuestaReservation[i].client.name}</h5>
                <h5 class="card-subtitle">Correo: ${respuestaReservation[i].client.email}</h5>
                <button class="btn btn-danger" onclick="borrarElementoReservation(${respuestaReservation[i].idReservation})">Borrar</button>
                <button class="btn btn-success"  onclick="actualizarElementoReservation(${respuestaReservation[i].idReservation})">Actualizar</button>
            </div>
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoReservation").append(myTable);
}

//Funcion que guarda una nueva Reservation
function guardarElementoReservation(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"/api/Reservation/save",
        success:function(response) {
            console.log(response);
            console.log("La Reserva se guardó correctamente");
            alert("La Reserva se guardó correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Reserva no se guardó correctamente");
        }
    });
}

//Funcion que actualiza una Reservation
function actualizarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#resultadoEstado").val("");
            traerInformacionReservation();
            alert("Reserva actualizada con éxito");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Reserva no se guardó correctamente");
        }
    });
}

//Funcion que borra una Reservation
function borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            traerInformacionReservation();
            alert("Reserva eliminada con éxito.");
        }
    });
}






