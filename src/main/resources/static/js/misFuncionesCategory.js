/*Funcion para traer el usuario de git
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

//Funciones de la tabla Category
$(document).ready(function (){
    traerInformacionCategory();
});

//Funcione que traen la informacion de Category
function traerInformacionCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaCategory){
            console.log(respuestaCategory);
            pintarRespuestaCategory(respuestaCategory);
        }
    });
}

//Funcione que pinta en cards la informacion de Category
function pintarRespuestaCategory(respuestaCategory){
    let myTable="<table>";
    for(i=0; i<respuestaCategory.length; i++){
        myTable += `<tr>
        <td>${respuestaCategory[i].name}</td>
        <td>${respuestaCategory[i].description}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoCategory").html(myTable);
}
//Funcion que guarda una nueva Category
function guardarElementoCategory(){
    let myData={
        name:$("#nameCategory").val(),
        description:$("#description").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Category/save",
        success:function(response) {
            console.log(response);
            console.log("La Categoría se guardó correctamente");
            alert("La Categoría se guardó correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Categoría no se guardó correctamente");
        }
    });
}
//Funcion que actualiza una Category
function actualizarElementoCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameCategory").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#id").val("");
            $("#nameCategory").val("");
            $("#description").val("");
            traerInformacionCategory();
            alert("Categoría actualizada con éxito");
        }
    });
}
//Funcion que borra una Category
function borrarElementoCategory(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Categoría eliminada con éxito.");
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

//Funciones de la tabla Category
$(document).ready(function (){
    traerInformacionCategory();
    $.get("http://localhost:8080/user",function(data){
        console.log(data.name);
        $("#userloginname").html(data.name);
        // document.getElementById("userloginname").innerHTML =data.login;
    });
});

//Funcione que trae la informacion de Category
function traerInformacionCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaCategory){
            console.log(respuestaCategory);
            pintarRespuestaCategory(respuestaCategory);
        }
    });
}

//Funcione que pinta en cards la informacion de Category
function pintarRespuestaCategory(respuestaCategory){
    let myTable="<table>";
    for(i=0; i<respuestaCategory.length; i++){
        myTable += `<tr>
        <td>${respuestaCategory[i].name}</td>
        <td>${respuestaCategory[i].description}</td>
        <td><button type="submit" class="btn btn-primary" onclick="actualizarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-primary" onclick="borrarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoCategory").html(myTable);
}
//Funcion que guarda una nueva Category
function guardarElementoCategory(){
    let myData={
        name:$("#nameCategory").val(),
        description:$("#description").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://localhost:8080/api/Category/save",
        success:function(response) {
            console.log(response);
            console.log("La Categoria se Guardo Correctamente");
            alert("La Categoria se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("La Categoria no se Guardo Correctamente");
        }
    });
}
//Funcion que actualiza una Category
function actualizarElementoCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameCategory").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#id").val("");
            $("#nameCategory").val("");
            $("#description").val("");
            traerInformacionCategory();
            alert("Categoria Actualizada con Exito");
        }
    });
}
//Funcion que borra una Category
function borrarElementoCategory(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Categoria Eliminada con Exito.");
        }
    });
}