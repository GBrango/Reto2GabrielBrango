function traerInformacion(){
  $.ajax({
    url:"https://g9989ca3af8e71e-db202110301445.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type:"GET",
    datatype:"JSON",
    complete: function (xhr, status) {
        alert('Petición realizada, ' + xhr.status);
    },

    success:function(respuesta){
      ///creamos esta funcion para conocer la respuesta a la peticion
      console.log(respuesta);
      pintarRespuesta(respuesta.items)
    }
  });
}

function pintarRespuesta(items){
  //esta es la funcion que nos trae los resultados para mostrarlos
  //**Hacemos el ciclo para rellenar la tabla construida a traves de los datos capurados por el GET */
  let myTable = "<table>";
  for (i=0; i<items.length; i++) {
    myTable += "<tr>";
    myTable += "<td>"+items[i].id+"</td>";
    myTable += "<td>"+items[i].name+"</td>";
    myTable += "<td>"+items[i].email+"</td>";
    myTable += "<td>"+items[i].age+"</td>";

    myTable += "</tr>";//cerramos la tabla
  }
  myTable+="</table>";
  $("#resultado").append(myTable);
}
