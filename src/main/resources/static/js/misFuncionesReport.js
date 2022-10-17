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

//Funcion para traer la informacion del reporte por status
function traerInformacionReporteStatus(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpS){
            console.log(respuestaRpS);
            pintarRespuestaReporteStatus(respuestaRpS);
        }
    });
}

//Funcion para pintar la informacion del reporte por status
function pintarRespuestaReporteStatus(respuestaRpS){
    let myTable="<h3>Estado Reservaciones</h3><table><thead><th>Reservas Completas</th><th>Reservas Canceladas</th></thead>";
    myTable += `<tr>
        <td>${respuestaRpS.completed}</td>
        <td>${respuestaRpS.cancelled}</td>
        </tr>`;

    myTable+="</table>";
    $("#resultadoReporteS").html(myTable);
}

//Funcion para traer la informacion del reporte entre fechas
function traerInformacionReporteFechas() {
    var inicialDate = document.getElementById("inicialDate").value;
    var finalDate = document.getElementById("finalDate").value;

    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-dates/" + inicialDate + "/" + finalDate,
        type: "GET",
        datatype: "JSON",
        success: function (respuestaRpF) {
            console.log(respuestaRpF);
            pintarRespuestaReporteFechas(respuestaRpF);

        }
    });
}

//Funcion para pintar la informacion del reporte entre fechas
function pintarRespuestaReporteFechas(respuestaRpF){
    let myTable="<h3>Entre Fechas</h3><table><thead><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th><th>Cliente</th></thead>";
    for(i=0; i<respuestaRpF.length; i++){
        myTable += `<tr>
        <td>${respuestaRpF[i].startDate.substring(0, 10)}</td>
        <td>${respuestaRpF[i].devolutionDate.substring(0, 10)}</td> 
        <td>${respuestaRpF[i].status}</td>
        <td>${respuestaRpF[i].client.name}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteF").html(myTable);
}

//Funcion para traer la informacion del reporte entre clientes
function traerInformacionReporteClient(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpC){
            console.log(respuestaRpC);
            pintarRespuestaReporteClientes(respuestaRpC);
        }
    });
}
//Funcion para pintar la informacion del reporte entre clientes
function pintarRespuestaReporteClientes(respuestaRpC){
    let myTable="<h3>Mejores Clientes</h3><table><thead><th>Total Reservas</th><th>Cliente</th><th>Correo</th><th>Edad</th></thead>";
    for(i=0; i<respuestaRpC.length; i++){
        myTable += `<tr>
        <td>${respuestaRpC[i].total}</td>
        <td>${respuestaRpC[i].client.name}</td>
        <td>${respuestaRpC[i].client.email}</td>
        <td>${respuestaRpC[i].client.age}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteC").html(myTable);
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
$(document).ready(function(){
    traerInformacionR();
    $.get("http://localhost:8080/user",function(data){
        console.log(data.name);
        $("#userloginname").html(data.name);
        // document.getElementById("userloginname").innerHTML =data.login;
    });
});
//Funcion para traer la informacion del reporte por status
function traerInformacionReporteStatus(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpS){
            console.log(respuestaRpS);
            pintarRespuestaReporteStatus(respuestaRpS);
        }
    });
}

//Funcion para pintar la informacion del reporte por status
function pintarRespuestaReporteStatus(respuestaRpS){
    let myTable="<h3>Estado Reservaciones</h3><table><thead><th>Reservas Completas</th><th>Reservas Canceladas</th></thead>";
    myTable += `<tr>
        <td>${respuestaRpS.completed}</td>
        <td>${respuestaRpS.cancelled}</td>
        </tr>`;

    myTable+="</table>";
    $("#resultadoReporteS").html(myTable);
}

//Funcion para traer la informacion del reporte entre fechas
function traerInformacionReporteFechas() {
    var inicialDate = document.getElementById("inicialDate").value;
    var finalDate = document.getElementById("finalDate").value;

    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-dates/" + inicialDate + "/" + finalDate,
        type: "GET",
        datatype: "JSON",
        success: function (respuestaRpF) {
            console.log(respuestaRpF);
            pintarRespuestaReporteFechas(respuestaRpF);

        }
    });
}

//Funcion para pintar la informacion del reporte entre fechas
function pintarRespuestaReporteFechas(respuestaRpF){
    let myTable="<h3>Entre Fechas</h3><table><thead><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th><th>Cliente</th></thead>";
    for(i=0; i<respuestaRpF.length; i++){
        myTable += `<tr>
        <td>${respuestaRpF[i].startDate.substring(0, 10)}</td>
        <td>${respuestaRpF[i].devolutionDate.substring(0, 10)}</td> 
        <td>${respuestaRpF[i].status}</td>
        <td>${respuestaRpF[i].client.name}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteF").html(myTable);
}

//Funcion para traer la informacion del reporte entre clientes
function traerInformacionReporteClient(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpC){
            console.log(respuestaRpC);
            pintarRespuestaReporteClientes(respuestaRpC);
        }
    });
}
//Funcion para pintar la informacion del reporte entre clientes
function pintarRespuestaReporteClientes(respuestaRpC){
    let myTable="<h3>Mejores Clientes</h3><table><thead><th>Total Reservas</th><th>Cliente</th><th>Correo</th><th>Edad</th></thead>";
    for(i=0; i<respuestaRpC.length; i++){
        myTable += `<tr>
        <td>${respuestaRpC[i].total}</td>
        <td>${respuestaRpC[i].client.name}</td>
        <td>${respuestaRpC[i].client.email}</td>
        <td>${respuestaRpC[i].client.age}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteC").html(myTable);
}