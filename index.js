const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://web-app.remax.com.ve/ajax/inmuebles/general?ubicacion=San%20Crist%C3%B3bal%2C%20T%C3%A1chira%2C%20VEN&tipoInmueble=Casas%20o%20TownHouses&estatus=Activo&operacion=Venta&latitud=7.773667&longitud=-72.227598&per_page=500&page=2",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    // parsing the HTML source of the target web page with Cheerio
    //  const $ = cheerio.load(axiosResponse.data)
    const data = axiosResponse.data.response.data;
    data.forEach(element => {
        // console.log(element);
        axios.get('https://remax-1be58-default-rtdb.firebaseio.com/inmuebles/' + element.id + '.json')
            .then(function (response) {
                if (response.data)
                    console.log("encontrado")
                // console.log(response.data);
                else {
                    console.log("Guardando ")
                    axios.put('https://remax-1be58-default-rtdb.firebaseio.com/inmuebles/' + element.id + '.json', {
                        id: element.id,
                        creado: Date.now(),
                        titulo: element.tituloInmueble,
                        "tituloInmueble": element.tituloInmueble,
                        "imagenPrincipal": element.imagenPrincipal,
                        "idInmobiliaria": element.idInmobiliaria,
                        "inmobiliaria": element.inmobiliaria,
                        "idAgente": element.idAgente,
                        "agente": element.agente,
                        "tipoInmueble": element.tipoInmueble,
                        "urlVideo": element.urlVideo,
                        "urlTour360": element.urlTour360,
                        "nroFotos": element.nroFotos,
                        "estatus": element.estatus,
                        "exclusiva": element.exclusiva,
                        "codigoInmueblePublico": element.codigoInmueblePublico,
                        "latitud": element.latitud,
                        "longitud": element.longitud,
                        "url": element.url,
                        "imagenPrincipalDetalle": element.detallesInmuebles.imagenPrincipalDetalle,
                        "direccionDetallada": element.detallesInmuebles.direccionDetallada,
                        "urbanizacionZona": element.detallesInmuebles.urbanizacionZona,
                        "ciudadMunicipio": element.detallesInmuebles.ciudadMunicipio,
                        "precioReferencial": element.detallesInmuebles.precioReferencial,
                        "tipoMonedaReferencia": element.detallesInmuebles.tipoMonedaReferencia,
                        "precioPais": element.detallesInmuebles.precioPais,
                        "tipoMonedaPais": element.detallesInmuebles.tipoMonedaPais,
                        "tipoInmueble": element.detallesInmuebles.tipoInmueble,
                        "fechaIngreso": element.detallesInmuebles.fechaIngreso,
                        "fechaUltimaModificacion": element.detallesInmuebles.fechaUltimaModificacion,
                        "diasSistema": element.detallesInmuebles.diasSistema,
                        "nroVisitas": element.detallesInmuebles.nroVisitas,
                        "tipoOperacion": element.detallesInmuebles.tipoOperacion,
                        "tipoTransaccion": element.detallesInmuebles.tipoTransaccion,


                        "areaTerreno": element.detallesInmuebles.especificaciones.areaTerreno,
                        "areaConstruccion": element.detallesInmuebles.especificaciones.areaConstruccion,
                        "anioConstruccion": element.detallesInmuebles.especificaciones.anioConstruccion,
                        "nroHabitaciones": element.detallesInmuebles.especificaciones.nroHabitaciones,
                        "nroBanios": element.detallesInmuebles.especificaciones.nroBanios,
                        "nroHabitacionesServicio": element.detallesInmuebles.especificaciones.nroHabitacionesServicio,
                        "nroBaniosServicio": element.detallesInmuebles.especificaciones.nroBaniosServicio,
                        "nroEstacionamientos": element.detallesInmuebles.especificaciones.nroEstacionamientos,
                        "piso": element.detallesInmuebles.especificaciones.piso,
                        "pisosTotal": element.detallesInmuebles.especificaciones.pisosTotal,
                        "zonificacion": element.detallesInmuebles.especificaciones.zonificacion,


                    })
                    .then(function (response) {
                        console.log(response.statusText);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                  
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    });
}

performScraping()
