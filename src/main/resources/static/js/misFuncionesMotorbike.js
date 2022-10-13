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

// Rutina para traer las categorias a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",  //"http://150.230.95.100:8080/api/Category/all"
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

// Rutina para pinta las categorias a un <select>
function pintarRespuestaC(respuestaC){
    var mylista=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylista.innerHTML+=`<option value="${respuestaC[i].id}">${respuestaC[i].name}</option>`;
    }
    console.log(mylista);
}

//Funciones de la tabla Motorbike
$(document).ready(function (){
    traerInformacionMotorbike();
});

//Funcione que trae la informacion de Motorbike
function traerInformacionMotorbike(){
    $.ajax({
        url:"http://localhost:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMotorbike){
            console.log(respuestaMotorbike);
            pintarRespuestaMotorbike(respuestaMotorbike);
        }
    });
}

//Funcione que pinta en cards la informacion de Motorbike
function pintarRespuestaMotorbike(respuestaMotorbike){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaMotorbike.length; i++){
        myTable +=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
            <div class="card-body">
                <h4 class="card-title">Motocicleta: ${respuestaMotorbike[i].name}</h4>
                <h5 class="card-subtitle">Marca: ${respuestaMotorbike[i].brand}</h5>
                <p class="card-text">Descripcion: ${respuestaMotorbike[i].description}</p>
                <p class="card-text">Modelo: ${respuestaMotorbike[i].year}</p>
                <button class="btn btn-danger" onclick="borrarElementoMotorbike(${respuestaMotorbike[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
                <button class="btn btn-success" onclick="actualizarElementoMotorbike(${respuestaMotorbike[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
            </div>
        </div>`;
    }
    myTable+='<div></div>';
    $("#resultadoMotorbike").append(myTable);
}
//Funcion que guarda una nueva Motocicleta
function guardarElementoMotorbike(){
    let myData={
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameMotorbike").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        year:$("#year").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Motorbike/save",
        success:function(response) {
            console.log(response);
            console.log("La motocicleta se guardó correctamente");
            alert("La motocicleta se guardó correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La motocicleta no se guardó correctamente");
        }
    });
}
//Funcion que actualiza una motocicleta
function actualizarElementoMotorbike(idElemento){
    let myData={
        id:idElemento,
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameMotorbike").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        year:$("#year").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Motorbike/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMotorbike").empty();
            $("#id").val("");
            $("#nameMotorbike").val("");
            $("#brand").val("");
            $("#description").val("");
            $("#year").val("");
            traerInformacionMotorbike();
            alert("Motocicleta actualizada con éxito");
        }
    });
}
//Funcion que borra elimina una motocicleta
function borrarElementoMotorbike(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Motorbike/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMotorbike").empty();
            traerInformacionMotorbike();
            alert("Motocicleta eliminada con éxito");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La motocicleta no se eliminó con éxito");
        }
    });
}

