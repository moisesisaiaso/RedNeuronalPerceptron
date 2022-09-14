const p = document.getElementById("puntos");
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
let nPuntos = parseInt(prompt("¿Cuantos puntos deseas calcular?", 0));

let arrayPuntoStr = null;
let contar = 1;
do {
    //? entrada de puntos por string
    //esto se repite si la longitud de arrayPunto es diferente de 3, esto quiere decir que el array no ha sido obtenido correctamente por mal envio de los datos
    let punto = prompt("Ingresa el punto y T separados por espacios");
    arrayPuntoStr = punto.split(" "); // convirtiendolo a array

    if (arrayPuntoStr.length != 4) {
        arrayPuntoStr = null;
        contar = 1; // el contador se reinicia si los datos no fueron enviados correctamente, de esta forma no se cuenta esta iteración para añadir un punto al array de objetos
        alert("Ingrese correctamente los datos");
    } else {
        // si los datos se envian correctos se crea un objeto(un punto en el array)
        let arrayPuntoNum = arrayPuntoStr.map(Number); // convierte el array string a un array number
        const [X1, X2, X3, T] = arrayPuntoNum;

        const P = {
            X1,
            X2,
            X3,
            T,
        };

        //^ mandando el objeto(punto) al array puntos
        puntos.push(P);
    }

    contar++;
} while (contar <= nPuntos);

console.log(puntos);

//*pesos
let arrayPesosStr = null;
let arrayPesosNum = null;
do {
    let Pesos = prompt("Ingrese los pesos separados por un espacio");
    arrayPesosStr = Pesos.split(" ");

    if (arrayPesosStr.length != 3) {
        alert("Ingrese correctamente los datos");
        arrayPesosStr = null;
    } else {
        arrayPesosNum = arrayPesosStr.map(Number);
    }
} while (arrayPesosStr.length != 3);

let W = arrayPesosNum;

//* bias
let biass = parseFloat(prompt("Ingresa el BIAS", 0));
let BIAS = biass;

//^ imprimp pesos y BIAS
parrafo2.innerHTML = `
W(${W}) BIAS(${BIAS})
`;

//? aprende
let aprende = 0;

console.log(
    "🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠 RED NEURONAL TIPO PERCEPTRÓN 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠"
);

//^ Iterar
let ii = 1;
while (aprende != puntos.length) {
    console.log(`
    /////////////////////////////////////
                ITERACIÓN ${ii}`);

    for (i = 0; i < puntos.length; i++) {
        let p = puntos[i];
        const [W1, W2, W3] = W;
        //*C
        let c = p.X1 * W1 + p.X2 * W2 + p.X3 * W3 + BIAS;

        // * a HARDLIMS

        let a = 0;
        if (c >= 0) {
            a = 1;
        } else {
            a = -1;
        }

        console.log(`🚀 ---------------- P${i + 1} ----------------- 🤖`);
        console.log(`Hardlims(${c})`);
        console.log("T esperado: " + p.T + "    " + "resultado a: ", a);
        //? Comprobar si "a" es igual a "T"
        if (a === p.T) {
            console.log("No necesita aprender 🎉😎🤘🦾");
            aprende++;
            if (aprende === puntos.length) {
                break;
            }
        } else {
            console.log(`APRENDE 😥🤔🙄`);
            aprende = 0;

            //^ Error
            let e = p.T - a;

            //~ pesos nuevos
            const pesosNuevo = (W1, W2, W3, e, p) => {
                let Wn1 = W1 + e * p.X1;
                let Wn2 = W2 + e * p.X2;
                let Wn3 = W3 + e * p.X3;

                return [Wn1, Wn2, Wn3];
            };

            let Wn = pesosNuevo(W1, W2, W3, e, p);
            W = Wn;

            //~ Bias nuevo
            let BIASn = BIAS + e;
            BIAS = BIASn;
            console.log("Error: ", e);
            console.log(`Peso nuevo: (${Wn[0]} , ${Wn[1]}, ${Wn[2]})`);
            console.log("Bias nuevo:", BIASn);
        }
    }

    ii++;
}

console.log(`
*************************************
-                             
- R = W(${W[0]} , ${W[1]}, ${W[2]})    
-     BIAS = ${BIAS}   

*************************************`);

//^ imprime puntos
p.innerHTML = `${puntos.map((P, i) => {
    return `P${i + 1}(${P.X1},${P.X2}), ${P.X3}  T= ${P.T}  `;
})}`;

//^ N iteración
iteracion.innerHTML = ` ITERACIÓN ${ii - 1}`;

//^ imprime resultado
resultado.innerHTML = `R = Wn(${W[0]} , ${W[1]}, ${W[2]}) 
|
BIASn = ${BIAS} 
`;

console.table(puntos);

//Hora
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
