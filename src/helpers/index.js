const calcularTotalPagar = (cantidad, plazo) => {
    var total;

    //Mientras mayor la cantidad, menor el interés
    if(cantidad < 10000) {
        total = cantidad * 1.5;
    } else if(cantidad >= 10000 && cantidad < 25000) {
        total = cantidad * 1.4;
    } else if (cantidad >= 25000 && cantidad < 35000) {
        total = cantidad * 1.3;
    } else {
        total = cantidad * 1.2;
    }

    //Plazo - más plazo, más interés
    if(plazo === 6) {
        total *= 1.1;
    } else if(plazo === 12) {
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total;
}

export {
    calcularTotalPagar
}