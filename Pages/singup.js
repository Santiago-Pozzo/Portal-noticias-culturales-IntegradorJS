const singUpForm = document.querySelector(".singup-form");
const nameInput = document.querySelector("#name-input");
const lastNameInput = document.querySelector("#lastName-input");
const eMailImput = document.querySelector("#mail-input");
const passInput = document.querySelector("#pass-input");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveUserToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
}

//----------------Validar datos ingresados-----------------------
//Checkear si el imput está vacío
const isEmptyImput = (input) => {
    return !input.value.trim().length; 
};

//Checkea si la cantidad de caracteres está ok
const isBetwen = (input, min, max) =>{
    return input.value.length <= max && input.value.length >= min;
};

//Entrada de datos correcta
const succesInput = (input) => {
    input.classList.remove("imput-alert");
        
    const formField = input.parentNode;
    const errorMsg = formField.querySelector(".form-alertMsg");
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";
};

//Manejar errores
    //Mostrar mensaje de error
    const showError = (input, msg) => {
        input.classList.add("imput-alert");
        
        const formField = input.parentNode;
        const errorMsg = formField.querySelector(".form-alertMsg");
        errorMsg.classList.remove("hidden");
        errorMsg.textContent = msg;        
    };

//Validar input de nombre y apellido
    const checkTextImput = (input) => {
        let valid = false;

        const maxChar = 20;
        const minChar = 2;

        if (isEmptyImput(input)) {
            showError(input, "Este campo es obligatorio");
            return;
        };

        if (!isBetwen(input, minChar, maxChar)) {
            showError (input, `Este campo debe tener entre ${minChar} y ${maxChar} caracteres.`);
            return;
        };

        succesInput(input);
        valid = true;
        return valid;
    };

const validateNameInput = (e) => {
    checkTextImput(e.target);
};

//Validar imput de email
        const isRegisteredEMail = (input) => {
            let value = false;
            for (let i = 0; i < users.length; i++) {
                if (input.value.trim() === users[i].email) {
                    value = true;
                    return value;
                };      
            }; 
            return value;
        };

        const isValidEMail = (input) => {
            const re =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            return re.test(input.value.trim());
        };

    const checkMailImput = (input) => {
        let valid = false;

        if (isEmptyImput(input)) {
            showError(input, "Este campo es obligatorio");
            return;
        };

        if (!isValidEMail(input)) {
            showError(input, "Ingrese una dirección de e-mail válida");
            return;
        };

        if (isRegisteredEMail(input)) {
            showError(input, "Este email ya está registrado");
            return;
        };

        succesInput(input);
        valid = true;
        return valid;
    }

const validateEMailInput = (e) => {
    checkMailImput(e.target);
};

//Ingreso de password
        const isSecurePass = (input) => {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
            return re.test(input.value.trim());
        };

    const checkPassImput = (input) => {
        let valid = false;

        if (isEmptyImput(input)) {
            showError(input, "Este campo es obligatorio");
            return;
        };

        if (!isSecurePass(input)) {
            showError(input, 
                "La contraseña debe contener al menos 8 caracteres, una mínuscula, una mayúscula, un número y un símbolo");
            return;
        };

        succesInput(input);
        valid = true;
        return valid;
    };

const validatePassInput = (e) => {
    checkPassImput(e.target);
};


//Manejar envio de formulario 
const submitHandler = (e) => {
    e.preventDefault();

    let isValidForm = 
        checkTextImput(nameInput) &&
        checkTextImput(lastNameInput) &&
        checkMailImput(eMailImput) &&
        checkPassImput(passInput);

    if (isValidForm) {
        users.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: eMailImput.value,
            pass: passInput.value,
        }); 

        saveUserToLocalStorage();
        alert("Creaste exitosamente tu usuario");
        window.location.href = "login.html";
    };   
};

const init = () => {
    singUpForm.addEventListener("submit", submitHandler);
    nameInput.addEventListener("input", validateNameInput);
    lastNameInput.addEventListener("input", validateNameInput);
    eMailImput.addEventListener("input", validateEMailInput);
    passInput.addEventListener("input", validatePassInput);
};

init();

