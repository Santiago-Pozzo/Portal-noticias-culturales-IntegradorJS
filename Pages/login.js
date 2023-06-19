const loginForm = document.querySelector(".login");
const eMailInput = document.querySelector("#mail-input");
const passInput = document.querySelector("#pass-input");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
};

//Checkeo que la cuenta se valida
    //Checkear si el imput está vacío
    const isEmptyImput = (input) => {
        return !input.value.trim().length; 
    };

    //Checkeo si tengo la info en el localstorage
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

    const isMatchingPass = (input) => {
        let pass = "";
        for (let i = 0; i < users.length; i++) {
            if (eMailInput.value.trim() === users[i].email) {
                pass = users[i].pass;
                break;
            };      
        }; 
        return pass === input.value.trim();
    };   


    //Mostrar mensaje de error
    const showError = (input, msg) => {
        input.classList.add("imput-alert");
        
        const formField = input.parentNode;
        const errorMsg = formField.querySelector(".form-alertMsg");
        errorMsg.classList.remove("hidden");
        errorMsg.textContent = msg;        
    };

    //Entrada de datos correcta
    const succesInput = (input) => {
    input.classList.remove("imput-alert");
        
    const formField = input.parentNode;
    const errorMsg = formField.querySelector(".form-alertMsg");
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";
    };
    
const isValidAcount = () => {
    let valid = false;

    if (isEmptyImput(eMailInput)) {
        showError(eMailInput, "Ingrese su dirección de correo registrada");
        return;
    };
    if (isEmptyImput(passInput)) {
        showError(passInput, "Ingrese su contraseña");
        return;
    };

    if (!isRegisteredEMail(eMailInput)) {
        showError(eMailInput, "El mail ingresado no es válido");
        return;
    };

    if (!isMatchingPass(passInput)) {
        showError(passInput, "La contraseña ingresada no es válida");
        return;
    };

    succesInput(eMailInput);
    succesInput(passInput);

    valid = true;
    loginForm.reset;
    return valid;
};


//Logeo
const loginUser = (e) =>{
    e.preventDefault();
    if (isValidAcount()){
        const currentUser = users.find((user) => user.email === eMailInput.value.trim());
        saveToSessionStorage(currentUser);
        window.location.href = "../index.html";
    };

}

const init = () => {
    loginForm.addEventListener("submit", loginUser)
};

init();