// example data
const exampleArray = [10, 4, 100, 35, 31, 23, 443, 221, 342, 10, 12, 42];
const shit = ["function", null, function () { }, () => { }, 10, 100, {}];
const exampleArray2 = [
    [10, 4, "100", 35, "31", "23", 443, "221", "342", 10, 12, 42]
]

//object
function Point(x, y) {
    this.x = x;
    this.y = y;
}

//---------------FUNCIONES AUXILIARES --------------------------

function bubbleSort(array, operation) {

    array = cleanArray(array);

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < i; j++) { // A la vez que recorremos comprobamos los anteriores por si uno es menor que otro

            if (operation == '<' && array[i] < array[j]) {

                // Miramos los anteriores por si ha habido un cambio

                let correction = array[i]; // Las posiciones tiene que invertirse si se quiere ordenar
                array[i] = array[j];
                array[j] = correction;

            }
            else if (operation == '>' && array[i] >= array[j]) {

                // Miramos los anteriores por si ha habido un cambio

                let correction = array[i]; // hay que invertir las posiciones para el ordenamiento
                array[i] = array[j];
                array[j] = correction;

            }
        }

    }

    return array;
}

function cleanArray(array) {

    let newArray = [];

    for (let index = 0; index < array.length; index++) {
        if (typeof array[index] === 'string' || typeof array[index] === 'number') {
            // elimina el valor del array ya que no cumple los requisitos
            newArray.push(array[index])
        }
    }
    return newArray;
}


//-----------------------------------------------------------------------------------------------------
// Ejercicio 1: Encontrar un elemento dentro de un array

// Forma Lineal
function fourFoundFunctional(Array) {
    let valor = 0;

    for (let index in Array) {
        if (Array[index] == 4) {
            valor = Array[index];
            return `El elemento ${Array[index]} está en el indice: ${index} `;
        }
    }
}

//console.log(fourFoundFunctional(exampleArray))

// Modo de hacerlo mediante búsqueda binaria, no lineal

function binarySearch(value, array) {
    let first = 0;
    let position = -1;
    let found = false;
    let middleElement;

    //Necesita un array ordenado
    array = bubbleSort(array, '<')
    //definimos el ultimo elemento después por si hay algun elemento limpiado
    let last = array.length - 1;

    while (found === false && first <= last) {
        // asignamos el valor del elemento intermedio de las mitades redondeando el valor medio
        middleElement = Math.floor((first + last) / 2)
        //Hacemos 
        if (array[middleElement] === value) {
            found = true
            position = middleElement
        }
        // se modifican los intervalos mediante el mayor o el menor en funcion de si está por debajo o por encima
        array[middleElement] > value ? last = middleElement - 1 : first = middleElement + 1
    }
    return position
}


// console.log(binarySearch(221, exampleArray))

// -------------------------------------------------------------------
// Ejercicio 2: Limpiar el array shit con programación declarativa y retornar el string

let clear = shit.filter((value) => (typeof value === 'string'));


// console.log(clear)


//----------------------------
// Ejercicio 3: calcula la distancia entre dos puntos
// 
function calculaDistancia(a, b) {
    // Asignamos a una variable cálculo la diferencia entre el valor absoluto de los valores de los puntos
    // Comprobamos si es true el hecho de que sea tipo Point
    return (a instanceof Point && b instanceof Point) ? new Point((b.x - a.x), (b.y - a.y)) : null
}

let a = new Point(3, 5);
let b = new Point(5, 6);

// console.log(calculaDistancia(a,b));


// ---------------------------------------------------------------
// Ejercicio4: comparar valores de arrays

//----------------Versión chusta haciendo trampas con exampleArray2

// comparamos mapeando el primer array y luego dentro de éste el segundo
let compare = exampleArray.slice(0, exampleArray2[0].length).map((value, i) => {
    let compare2 = exampleArray2.map((value2) => {
        // Comparamos los valores
        return (value == value2[i] && value === value2[i])

    })
    // Devolvemos la matriz de comparaciones, true o false
    return compare2;
})

// console.log(compare)

// ---------------Versión para comparar arrays genéricos--------------


//Funcion para recorrer la matrix de forma recursiva y transformarla en array de una dimensión
const reloadMatrix = (matrix, internalResponse = []) => {
    //comprobar que ya es numero
    if (!Array.isArray(matrix)) {

        if (!typeof internalResponse === 'undefined') return internalResponse;
        else return 'Error trying to load matrix';
    }
    //seguir descomponiendo la matriz
    matrix.forEach((rhs) => {
        if (typeof rhs === 'number' || typeof rhs === 'string') internalResponse.push(rhs);
        return reloadMatrix(rhs, internalResponse);
    });
    return internalResponse;
}

//Funcion para comparar valores de dos arrays de una dimensión
function compareValue(arr, arr2) {
    let comparasao = []
    let i = 0;
    let flag = true;
    // Se insertan los valores de las comparaciones en el array comparasao, hasta que se recorra entero o
    // la bandera sea false
    while (i < arr.length && flag == true) {
        // Cambiamos bandera si el contenido no es igual, saliendo del bucle puesto que ya son distintos
        if (!arr2.includes(arr[i])) flag = false;
        else comparasao.push(arr.includes(arr2[i]));
        i++;
    } // Devolvemos tupla de valores, el array de comparaciones de valores y la bandera para determinar
    // si el contenido es o no igual
    return [comparasao, flag]
}
//Funcion principal, para mostrar los resultados de la comparación entre dos arrays
function compareArr(arr1, arr2) {
    // Ambos arrays de convierten a dimensión 1
    let array1 = reloadMatrix(arr1);
    let array2 = reloadMatrix(arr2);
    let res = [];
    // Se comparan las longitudes para determinar la primera condición entre igualdad, que tengan mismo tamaño
    if (array1.length == array2.length) {
        res = compareValue(array1, array2)
        //Una vez llamada a la comparación, se comprueba la bandera, si es true significa que tiene mismo contenido
        // si es false, se indica el indice de hasta dónde se es igual que corresponde con el tamaño truncado a propósito
        // del array comparasao
        res[1] === 'true' ? console.log('Mismo tamaño y mismo contenido') : console.log(`Mismo tamaño y mismo contenido hasta ${res[0].length}`)
        return res[0]
    } else {// Se tienen en cuenta las demás casuísticas una vez se sabe que el tamaño no es igual
        if (array1.length > array2.length) {
            res = compareValue(array2, array1)
            res[1] === 'true' ? console.log('Distinto tamaño y mismo contenido') : console.log(`Distinto tamaño y mismo contenido hasta ${res[0].length}`)
            return res[0]
        } else {
            res = compareValue(array1, array2)
            res[1] === 'true' ? console.log('Distinto tamaño y mismo contenido') : console.log(`Distinto tamaño y mismo contenido hasta ${res[0].length}`)
            return res[0]
        }
    }
}
console.log(compareArr(exampleArray, exampleArray2))