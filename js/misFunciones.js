function traerInformacion(){
  $.ajax({
    url:"https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type:"GET",
    datatype:"JSON",

    error: function (xhr, status) {
      alert('ha sucedido un problema, ' + xhr.status);
     },
    complete: function (xhr, status) {
        alert('Petición realizada, ' + xhr.status);
    },

    success: function(respuesta){
      console.log(respuesta);
      pintarRespuesta(respuesta.items)
             
    }

  });
}

function pintarRespuesta(items){

  let myTable = "<table class='table table-striped table-dark'><tr><th>ID<th>NOMBRE<th>EMAIL<th>EDAD<th>MANTENIMIENTO";
  
  for (i = 0; i<items.length; i++){
      myTable+="<tr>";
      myTable += "<td>"+items[i].id+"</td>";
      myTable += "<td>"+items[i].name+"</td>";
      myTable += "<td>"+items[i].email+"</td>";
      myTable += "<td>"+items[i].age+"</td>";
      myTable += "<td> <button class='btn btn-danger' onclick='borrarElemento("+items[i].id+")'>Borrar cliente</button>";
      myTable+="</tr>";

  } 
  myTable+="</table>";
  $("#resultado").append(myTable);

}

/**Consultamos por ID */
/**
 * Esta funcion lipia el formulario
 */
 function limpiarFormulario(){
  if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
      let campo =  document.getElementById("codigo")
      let resultado =  document.getElementById("resultado")
      campo.value = "";
      resultado.innerHTML = ""
  }
}

function limpiarFormularioJq(){
  if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
      let campo =  $("#codigo")
      let resultado =   $("#resultado")
      campo.val("") ;
      resultado.html("")
  }
}

function guardarInformacion(){
    let MyData={
      //id:$("#id").val(),
      name:$("#nombre").val(),
      email:$("#email").val(),
      age:$("#edad").val(),
    };

    let dataTosend =JSON.stringify(MyData);
    $.ajax({

      url:"https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
      type:"POST",
      data:MyData,
      datatype:"JSON",
         error: function (xhr, status) {
         alert('ha sucedido un problema, ' + xhr.status);
     },
       complete: function (xhr, status) {
        alert('Petición realizada, ' + xhr.status);
    },

      success:function(respuesta){
          $("#resultado").empty();
          //$("#id").val("");
          $("#nombre").val("");
          $("#email").val("");
          $("#edad").val("");
         
          traerInformacion();

        alert("El cliente se ha guardado correctamente")
      
      }

    });

}

function editarInformacion(){
  let MyData={
    id:$("#id").val(),
    name:$("#nombre").val(),
    email:$("#email").val(),
    age:$("#edad").val(),
  };

  console.log(MyData);
  let dataTosend = JSON.stringify(MyData);
  $.ajax({

    url:"https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type:"PUT",
    data:dataTosend,
    contentType:"application/JSON",
    datatype:"JSON",
       error: function (xhr, status) {
       alert('ha sucedido un problema, ' + xhr.status);
   },
     complete: function (xhr, status) {
      alert('Petición realizada, ' + xhr.status);
  },

    success:function(respuesta){
        $("#resultado").empty();
        $("#id").val("");
        $("#nombre").val("");
        $("#email").val("");
        $("#edad").val("");
       
        traerInformacion();

      alert("El cliente actualizado correctamente")
    }

  });

}

function borrarElemento(idElemento) {
  let myData = {
    id:idElemento
  };

  let dataTosend=JSON.stringify(myData);
  $.ajax({
    url: "https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type: "DELETE",
    data:dataTosend,
    contentType:"application/JSON",
    datatype:"JSON",

    error: function (xhr, status) {
      alert("ha sucedido un problema, " + xhr.status);
    },
    complete: function (xhr, status) {
      alert("Petición realizada, " + xhr.status);
    },

    success:function(respuesta){
      $("#resultado").empty();
      traerInformacion();
      alert("Usuario eliminado correctamente!")

    }

  });
}