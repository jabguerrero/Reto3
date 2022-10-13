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

//Funciones de la tabla Administrador
$(document).ready(function (){
    traerInformacionAdmin();
});

//Funcion que trae la informacion de la tabla Administrador
function traerInformacionAdmin(){
    $.ajax({
        url:"http://localhost:8080/api/Admin/all", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdmin(respuesta);
        }
    });
}

//Funcion que pinta la informacion de la tabla Administrador
function pintarRespuestaAdmin(respuesta){
    let myTable="<table><thead><th>Nombre</th><th>Correo</th></thead>";
    for(i=0; i<respuesta.length; i++){
        myTable += `<tr>
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].email}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoAdmin(${respuesta[i].idAdmin})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoAdmin(${respuesta[i].idAdmin})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </td>`;
    }
    myTable+="</table>";
    $("#resultadoAdmin").html(myTable);
}

//Funcion que  guarda la informacion de la tabla Administrador
function guardarElementoAdmin(){
    let myData={
        name:$("#nameAdmin").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),

        url:"http://localhost:8080/api/Admin/save",


        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("El Administrador se guardó correctamente");
            window.location.reload();

        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("El Administrador no se guardó correctamente");


        }
    });
}
//Funcion que actualiza la informacion de la tabla Administrador
function actualizarElementoAdmin(idElemento){
    let myData={
        idAdmin:idElemento,
        name:$("#nameAdmin").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Admin/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            $("#idAdmin").val("");
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacionAdmin();
            alert("Administrador actualizado con éxito");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("Administrador no se guardo correctamente");
        }
    });
}
//Funcion que borra la informacion de la tabla Administrador
function borrarElementoAdmin(idElemento){
    let myData={
        idAdmin:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Admin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            traerInformacionAdmin();
            alert("Administrador no se borró correctamente");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("Administrador no se borró correctamente");
        }
    });
}
