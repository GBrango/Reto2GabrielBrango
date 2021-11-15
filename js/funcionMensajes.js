function cargarMensajes() {
  $.ajax({
    url: "https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "GET",
    datatype: "JSON",

    error: function (xhr, status) {
      alert("ha sucedido un problema, " + xhr.status);
    },
    complete: function (xhr, status) {
      alert("Petición realizada, " + xhr.status);
    },

    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuesta(respuesta.items);
    },
  });
}

function pintarRespuesta(items) {
  let myTable =
    "<table class='table table-striped table-dark'><tr><th>ID<th>DESCIPCION DEL MENSAJE<th>MANTENIMIENTO";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].messagetext + "</td>";
    myTable +=
      "<td> <button class='btn btn-danger'  onclick='borrarMensaje(" +
      items[i].id +
      ")'>Borrar Mensaje </button>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}


/**Limpiar campos */

function limpiarFormularioJq(){
    if(confirm("Se borrará la informacion del campo mensaje")){
        let campo =  $("#mensajeId")
        let message =   $("#rmensaje")
        campo.val("") ;
        message.val("")
    }
  }

/**Funcion Guardar Informacion */

function guardarMensaje() {
  let MyData = {
    //id:$("#id").val(),
    messagetext: $("#mensaje").val(),
  };

  let dataTosend = JSON.stringify(MyData);
  $.ajax({
    url: "https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "POST",
    data: MyData,
    datatype: "JSON",
    error: function (xhr, status) {
      alert("ha sucedido un problema, " + xhr.status);
    },
    complete: function (xhr, status) {
      alert("Petición realizada, " + xhr.status);
    },

    success: function (respuesta) {
      $("#resultado").empty();
      //$("#id").val("");
      $("#mensaje").val("");

      cargarMensajes();

      alert("Mensaje guardado exitósamente!!");
    },
  });
}

/**Funcion Actualizar */

function actualizarMensaje(){
    let MyData={
      id:$("#mensajeId").val(),
      messagetext:$("#mensaje").val(),
      
    };
  
    console.log(MyData);
    let dataTosend = JSON.stringify(MyData);
    $.ajax({
  
      url:"https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
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
          $("#mensaje").val("");
                  
          cargarMensajes();
  
        alert("El Mensaje se ha actualizado Exitósamente!!")
        limpiarFormularioJq()
        
      }
  
    });
  
  }

  /**Borado del mensaje */
  function borrarMensaje(idElemento) {
    let myData = {
      id:idElemento
    };
  
    let dataTosend=JSON.stringify(myData);
    $.ajax({
      url: "https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
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
        cargarMensajes();
        alert("Mensaje eliminado correctamente!")
  
      }
  
    });
  }

  /**Filtrado por ID */
  function consultaPorId(campoId){
    if(campoId.val() == ""){
        alert('Campo ID no puede estar vacio !!!')
    }
    else{
        var id = campoId.val()
        $.ajax(
            {
                url: 'https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+id,
                type: 'GET',
                dataType: 'json',
                success: function(json){
                    $("#resultado").empty();
                    if(json.items.length==0){
                        alert("Campo ID no encontrado")
                        campoId.val("")
                    }
                    else{
                        tabla = "<table class='table table-striped table-dark'><tr><th>ID<th>DESCIPCION DEL MENSAJE" 
                    total = 0;
                    filas = ""
                    for (let i = 0; i < json.items.length; i++) {
                        filas += "<tr>"
                        filas += "<td>" + json.items[i].id 
                        filas += "<td>" + json.items[i].messagetext
                       
                    }
                    $("#resultado").append(tabla + filas);
                    console.log(json)
                    }
                    
                },
                complete: function(xhr, status){
                    alert('peticion realizada, ' + xhr.status);
                    
                }, 
                error: function(xhr, status){
                    alert('ha sucedido un error, ' + xhr.status);
                    
              }
                
  
            }
            
        );
    }
  }
  