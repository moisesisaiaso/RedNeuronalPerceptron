const parrafo1 = document.getElementById("puntos");
const parrafo2 = document.getElementById("pesosBias");
const iteracion = document.querySelector("h3");
const resultado = document.getElementById("resultado");

//*puntos
// const puntos = [
//     {
//         X1: 2,
//         X2: 1,
//         T: 1,
//     },
//     {
//         X1: 0,
//         X2: -1,
//         T: 1,
//     },
//     {
//         X1: -2,
//         X2: 1,
//         T: -1,
//     },
//     {
//         X1: 0,
//         X2: 2,
//         T: -1,
//     },
// ];

const puntos = [];
let nPuntos = parseInt(prompt("¿Cuantas entradas desea calcular?", 0));
let nCaracteristicas = parseInt(prompt("¿Cuantas caracteristicas se van a evaluar?", 0));

//* entrada de los grupos T
const gruposTArray = [];
let estado = undefined;
for (let i = 1; i <= 2; i++) {
    let grupoT = parseInt(prompt(`T se divide en dos grupos, ingrese el GRUPO ${i}`, 0));

    let positivoNegativo = grupoT >= 0 ? 1 : -1;
    if (estado === undefined || positivoNegativo === estado) {
        gruposTArray.push(grupoT);
    } else {
        if (estado === 1) {
            alert("Entrada incorrecta, el valor debe ser positivo vuela a intentarlo");
        } else {
            alert("Entrada incorrecta, el valor debe ser negativo vuela a intentarlo");
        }
        grupoT = undefined;
        i--;
    }
    if (i === 1) {
        if (grupoT >= 0) {
            alert("El siguiente grupo debe ser un número en negativo");
            estado = -1;
        } else if (grupoT < 0) {
            alert("El siguiente grupo debe ser un número en positivo");
            estado = 1;
        }
    }
}

let arrayPuntoStr = null;
let contar = 1;
do {
    //? entrada de puntos por string
    //esto se repite si la longitud de arrayPunto es diferente de 3, esto quiere decir que el array no ha sido obtenido correctamente por mal envio de los datos
    let punto = prompt(`Ingresa las características del punto ${contar} separadas por coma`);
    arrayPuntoStr = punto.split(","); // convirtiendolo a array

    if (arrayPuntoStr.length != nCaracteristicas) {
        arrayPuntoStr = null;
        contar--; // el contador se reinicia si los datos no fueron enviados correctamente, de esta forma no se cuenta esta iteración para añadir un punto al array de objetos
        alert("Ingrese correctamente los datos");
    } else {
        // si los datos se envian correctos se crea un objeto(un punto en el array)
        let arrayPuntoNum = arrayPuntoStr.map(Number); // convierte el array string a un array number
        const P = {};

        arrayPuntoNum.forEach((punto, i) => {
            P[`X${i + 1}`] = punto;
        });

        //^ mandando el objeto(P) al array puntos
        let t = parseInt(prompt("¿A qué grupo en T pertenece?", 0));
        P[`T`] = t;
        puntos.push(P);

        gruposTArray.push(t);
    }

    contar++;
} while (contar <= nPuntos);

console.log(puntos);

//*pesos
let arrayPesosStr = null;
let arrayPesosNum = null;
do {
    let Pesos = prompt("Ingrese los pesos por coma");
    arrayPesosStr = Pesos.split(",");

    if (arrayPesosStr.length != nCaracteristicas) {
        alert("Ingrese correctamente los datos");
        arrayPesosStr = null;
    } else {
        arrayPesosNum = arrayPesosStr.map(Number);
    }
} while (arrayPesosStr.length != nCaracteristicas);

let W = arrayPesosNum;

//* bias
let biass = parseFloat(prompt("Ingresa el BIAS", 0));
let BIAS = biass;

//^ imprimo pesos y BIAS
parrafo2.innerHTML = `
W(${W}) BIAS = ${BIAS}
`;

//? aprende
let aprende = 0;

console.log(
    "🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠 RED NEURONAL TIPO PERCEPTRÓN 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠"
);

//^ Iterar
//falta resolver
let ii = 1;
while (aprende != puntos.length) {
    // mientras aprender no sea igual a la cantidad de puntos entonces debe seguir iterando, esto por que cuando aprender es igual a 0 significa que el peso y bias no es el indicado osea debe aprender, mientras que si aprende llega a la cantidad de puntos significa que el mismo peso y bias pasó por todos los puntos sin necesidad de aprender
    console.log(`
    /////////////////////////////////////
                ITERACIÓN ${ii}`);

    for (let i = 0; i < puntos.length; i++) {
        let p = puntos[i];

        //*C
        let c = 0;
        let sumaPW = 0;
        let caracteriArray = Object.entries(p);

        let tDelPuntoObjeto = 0;

        caracteriArray.forEach((propiedadArray, i) => {
            if (i < nCaracteristicas) {
                sumaPW += propiedadArray[1] * W[i];
            } else {
                sumaPW += BIAS;
                tDelPuntoObjeto = propiedadArray[1];
            }
        });

        c = sumaPW;

        // * a HARDLIMS

        let a = 0;
        gruposTArray.forEach((T) => {
            if (T >= 0) {
                T1 = T;
            } else {
                T2 = T;
            }
        });

        if (c >= 0) {
            a = T1;
        } else {
            a = T2;
        }

        console.log(`🚀 ---------------- P${i + 1} ----------------- 🤖`);
        console.log(`Hardlims(${c})`);
        console.log("T esperado: " + tDelPuntoObjeto + "    " + "resultado a: ", a);
        //? Comprobar si "a" es igual a "T"
        if (a === tDelPuntoObjeto) {
            console.log("No necesita aprender 🎉😎🤘🦾");
            aprende++;
            if (aprende === puntos.length) {
                break;
            }
        } else {
            console.log(`APRENDE 😥🤔🙄`);
            aprende = 0;

            //^ Error
            let e = tDelPuntoObjeto - a;

            //~ pesos nuevos
            const arrayP = [];
            const pesosNuevo = (e, caracteriArray, ...W) => {
                caracteriArray.forEach((propiedadArray, i) => {
                    if (i < nCaracteristicas) {
                        arrayP.push(W[i] + e * propiedadArray[1]);
                    }
                });

                return arrayP;
            };

            let Wn = pesosNuevo(e, caracteriArray, ...W);
            console.log("pesoPueba" + Wn);
            W = Wn;

            //~ Bias nuevo
            let BIASn = BIAS + e;
            BIAS = BIASn;
            console.log("Error: ", e);
            console.log(`Peso nuevo: (${Wn})`);
            console.log("Bias nuevo:", BIASn);
        }
    }

    ii++;
}

console.log(`
*************************************
-                             
- R = W(${W})    
-     BIAS = ${BIAS}   

*************************************`);

//? imprimiento en el body

//^ imprime puntos
parrafo1.innerHTML = `${puntos.map((P, i) => {
    return `P${i + 1}(${Object.entries(P).map((propiedadArray, i) => {
        if (i < nCaracteristicas) {
            return propiedadArray[1];
        }
    })}) T= ${P.T}   `;
})}`;
//Object.entries(P).map() es una forma de poder iterar un objeto, lo que hace es convertir las propiedades del objeto en un array es decir por cada propiedad nos crear un array donde su indice tiene como nombre la clave de la propiedad y su valor, es decir nos crear una colección de array
//^ N iteración
iteracion.innerHTML = ` ITERACIÓN ${ii - 1}`;

//^ imprime resultado
resultado.innerHTML = `R = Wn(${W}) 
|
BIASn = ${BIAS} 
`;

console.table(puntos);

//? Hora
const currentTime = () => {
    const el = document.querySelector("h1");
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = hh < 10 ? `0${hh}` : hh;
    mm = mm < 10 ? `0${mm}` : mm;
    ss = ss < 10 ? `0${ss}` : ss;

    let time = `${hh}:${mm}:${ss}`;
    el.innerHTML = time;
};
currentTime();
setInterval(() => currentTime(), 1000);

//? fondos aleatorios
const Background = ["img/Hoja.gif", "img/fondo1.gif", "img/giphy.gif"];

const cambiaFondo = (...fondo) => {
    let header = document.getElementById("fondos");
    let numAleatorio = Math.floor(Math.random() * fondo.length);
    header.style.backgroundImage = `url(${fondo[numAleatorio]})`;
};

cambiaFondo(...Background);

setInterval(() => cambiaFondo(...Background), 10000);
