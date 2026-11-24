import { useState } from "react";

// meses empiezan en 0
// dias de la semana inician en 0
// dia 0 es del el ultimo del mes anterior
const useCalendar = () => {
    // new Date(year, month, day)
    // set va a cambiar
    // es un metodo que va a retornar el metodo que queramos o lo que queramos ponerle
    // new Date() sin especificar devuelve la fecha actual, o sea el mes empezará en la fecha de hoy
    const [currentDate, setCurrentDate] = useState(new Date());

    // currentMonth debe estar dentro de goNextMonth de lo contrario no se actualiza pq no tiene estado
    // const currentMonth = currentDate.toLocaleDateString("es-MX", {
    //     month: "long",
    //     year: "numeric",
    // });

    const currentMonth = currentDate.toLocaleDateString("es-MX", {
        month: "long",
        year: "numeric",
    })


    // date
    const goNextMonth = () => {
        console.log("currentMonth: " + currentMonth);
        
        setCurrentDate(next => 
            new Date(next.getFullYear(), next.getMonth()+1)
        )};

    const lastDayMonth = currentDate.getDay();

    const goPreviousMonth = () => {
        setCurrentDate(previous => 
            new Date(previous.getFullYear(), previous.getMonth()-1)
        )};

    const getDaysForTheMonth = (month: number, year: number): number => {
        // console.log("metodo de getDaysForTheMonth" + " mes: " + month + "\n año: " + year);
        // console.log("last day month: " + lastDayMonth)
        // el cero regresa a septiembre y da los dias de septiembre
        const dateReturn = new Date(year, month+1, 0).getDate();
        // como currentDay toma octubre al ponerle 0 regresa un mes, entonces se debe sumar un mes para que sea noviembre y retroceda a octubre
        // console.log("dateReturndateReturn: " + new Date(year, month, 0).toDateString());
        // encerrar entre () new Date... funciona como un return
        return dateReturn;
    };

    

    const firstDayMonth = (fecha: Date): number => {
        // console.log("first day month: " + new Date(fecha.getFullYear(), fecha.getMonth(), 1).toDateString());
        return new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    };

    const array_currentDaysMonth = Array.from(
        {length: getDaysForTheMonth(currentDate.getMonth(), currentDate.getFullYear())}, 
        (_, index) => index+1
    );

    // const emptyCellsCount = (firstDayMonth(currentDate) + 6) % 7;
    const array_emptyCells = Array.from({length: (firstDayMonth(currentDate) + 6) % 7}, ()=>null);
    // const array_emptyCells = Array.from({length: firstDayMonth(currentDate)}, ()=>null);

    const calendarDays = [
        ...array_emptyCells,
        ...array_currentDaysMonth
    ];

    return{
        currentMonth,
        goNextMonth,
        getDaysForTheMonth, //
        currentDate,
        goPreviousMonth,
        // lastDayMonth,
        calendarDays
    };
};

 export default useCalendar;