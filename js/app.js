
//este se ejecuta para que primero se carge el codigo html y despues poder realizar todas las acciones necesarias
document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    

    //seleccionar los elementos de la interfaz (mail, asunto y mensaje)
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    //console.log(inputEmail);
    //console.log(inputAsunto);
    //console.log(inputMensaje);

    //asignamos eventos
    //evento blur es cuando el usuario sale de un campo de un formulario
    inputEmail.addEventListener('input', validar);

    inputAsunto.addEventListener('input', validar);

    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail )

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario()
        

    } )

    function enviarEmail(e){
        e.preventDefault()
        spinner.classList.add('flex')
        spinner.classList.remove('hidden');
        
        setTimeout(()=>{
            spinner.classList.remove('flex')
            spinner.classList.add('hidden');
            
            resetFormulario();

            //creando una alerta
            const alertaExito = document.createElement('p')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove()
            }, 3000);


        }, 3000)
    }

    function validar(e){
       
        //trim se utiliza para eliminar espacios en blanco
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail()
            return;
        } 
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido',e.target.parentElement )
            email[e.target.name] = '';
            comprobarEmail()
            return
        }
        
        limpiarAlerta(e.target.parentElement);

        //Asignamos los valores del formulario
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //comprobamos el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){
       
        limpiarAlerta(referencia);

        //generamos una alerta en HTML
        const error = document.createElement('p');
        error.textContent= mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        //inyectamos el error al formulario
        referencia.appendChild(error);
    }
    function limpiarAlerta (referencia){
         //comprobamos si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }


    function comprobarEmail(){
        
      if(Object.values(email).includes('')){
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return

      }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
    
    function resetFormulario(){
        //reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});