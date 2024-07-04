document.addEventListener('DOMContentLoaded', function() {
    const formularioCliente = document.getElementById('formularioCliente');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const cedulaInput = document.getElementById('cedula');
    const fechaInput = document.getElementById('fecha');
    const correoInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');
    const direccionInput = document.getElementById('direccion');

    cargarDatos();

    nombreInput.addEventListener('input', function() {
        validarCampo(nombreInput, /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Nombre debe contener solo letras ');
    });

    apellidoInput.addEventListener('input', function() {
        validarCampo(apellidoInput, /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Apellido debe contener solo letras');
    });

    cedulaInput.addEventListener('input', function() {
        validarCampo(cedulaInput, /^[0-9]{10}$/, 'Cédula debe contener exactamente 10 dígitos numéricos');
    });

    telefonoInput.addEventListener('input', function() {
        validarCampo(telefonoInput, /^[0-9]{10}$/, 'Teléfono debe contener exactamente 10 dígitos numéricos');
    });

    fechaInput.addEventListener('change', function() {
        const valor = fechaInput.value.trim();
        const fechaNacimiento = new Date(valor);
        const hoy = new Date();
        const edadMinima = 18;
        let edadActual = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edadActual--;
        }
        if (edadActual < edadMinima && valor !== '') {
            mostrarAdvertencia(fechaInput, 'Debe ser mayor de edad para registrarse');
        } else {
            limpiarAdvertencia(fechaInput);
        }
    });

    correoInput.addEventListener('input', function() {
        validarCampo(correoInput, /\S+@\S+\.\S+/, 'Correo electrónico no válido');
    });

    formularioCliente.addEventListener('submit', function(event) {
        event.preventDefault(); 
        guardarDatos(); 
        alert('Datos guardados');
    });

    function validarCampo(input, regex, mensaje) {
        const valor = input.value.trim();
        if (!regex.test(valor) && valor.length > 0) {
            mostrarAdvertencia(input, mensaje);
        } else {
            limpiarAdvertencia(input);
        }
    }

    function mostrarAdvertencia(input, mensaje) {
        const div = input.parentElement;
        let mensajeError = div.querySelector('small.error');

        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';

        input.style.borderColor = 'red';
    }

    function limpiarAdvertencia(input) {
        const div = input.parentElement;
        let mensajeError = div.querySelector('small.error');

        mensajeError.style.display = 'none';

        input.style.borderColor = '#dcdcdc';
    }

    function guardarDatos() {
        const datosCliente = {
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            cedula: cedulaInput.value,
            fecha: fechaInput.value,
            correo: correoInput.value,
            telefono: telefonoInput.value,
            direccion: direccionInput.value
        };

        localStorage.setItem('datosCliente', JSON.stringify(datosCliente));
    }

    function cargarDatos() {
        const datosCliente = JSON.parse(localStorage.getItem('datosCliente'));

        if (datosCliente) {
            nombreInput.value = datosCliente.nombre;
            apellidoInput.value = datosCliente.apellido;
            cedulaInput.value = datosCliente.cedula;
            fechaInput.value = datosCliente.fecha;
            correoInput.value = datosCliente.correo;
            telefonoInput.value = datosCliente.telefono;
            direccionInput.value = datosCliente.direccion;
        }
    }
});
