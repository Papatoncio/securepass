// Tema
const toggleBtn = document.getElementById("toggle-theme");

// Formulario
const form = document.getElementById("pass-form");
const password = document.getElementById("password");
const numChars = document.getElementById("num-chars");
const mayus = document.getElementById("mayus");
const minus = document.getElementById("minus");
const nums = document.getElementById("nums");
const specialChars = document.getElementById("special-chars");
const copyButton = document.getElementById("copy-button");
const passInput = document.getElementById("pass-input");

// Dialog
const dialog = document.getElementById("dialog");
const btnCerrar = document.getElementById("closeDialog");

// Opcional: carga tema desde localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  document.getElementById("moon").style.display = "none";
  document.getElementById("sun").style.display = "block";
} else {
  document.getElementById("moon").style.display = "block";
  document.getElementById("sun").style.display = "none";
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    document.getElementById("moon").style.display = "block";
    document.getElementById("sun").style.display = "none";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "block";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valido = true;

  if (
    !mayus.checked &&
    !minus.checked &&
    !nums.checked &&
    !specialChars.checked
  ) {
    valido = false;
  }

  if (!valido) {
    muestraDialog(
      "Alerta",
      "Debes seleccionar al menos un parámetro \npara la contraseña."
    );
    return;
  }

  let caracteres = construyeCadenaCaracteres();
  let longitud = numChars.value;

  const pass = generarPassword(longitud, caracteres);

  password.value = pass;
});

btnCerrar.addEventListener("click", () => {
  dialog.close();
});

function construyeCadenaCaracteres() {
  let caracteres = "";

  if (mayus.checked) {
    caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (minus.checked) {
    caracteres += "abcdefghijklmnopqrstuvwxyz";
  }

  if (nums.checked) {
    caracteres += "1234567890";
  }

  if (specialChars.checked) {
    caracteres += "!@#$%^&*()-_=+[]{};:";
  }

  return caracteres;
}

function generarPassword(longitud, caracteres) {
  let resultado = "";

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indice];
  }

  return resultado;
}

function copiarPassword() {
  const color = copyButton.style.color;

  if (password.value == "" || password == undefined) {
    copyButton.style.color = "red";
    setTimeout(() => {
      copyButton.style.color = color;
    }, 1000);
    muestraDialog("Alerta", "No se ha generado una contraseña para copiar.");
    return;
  }

  navigator.clipboard.writeText(password.value).then(() => {
    copyButton.style.color = "green";
    setTimeout(() => {
      copyButton.style.color = color;
    }, 1000);

    muestraDialog("Éxito", "La contraseña se ha copiado al portapapeles.");
  });
}

function muestraDialog(titulo, contenido) {
  const tagTitulo = dialog.getElementsByTagName("h3")[0];
  const tagContenido = dialog.getElementsByTagName("p")[0];

  tagTitulo.innerText = titulo;
  tagContenido.innerText = contenido;

  dialog.showModal();
}
