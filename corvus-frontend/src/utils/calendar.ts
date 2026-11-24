export type month = {
    numberMonth: number;
    nameMonth: string;
};

export const daysWeek: string[] = ["Lun", "Mar", "Mie", "Jue", "Sab", "Dom"];

export const getMonths = (year: number): month[] => {
    return Array.from({ length: 12 }, (_, index) => {
        const fecha = new Date(year, index, 1);

        return {
            numberMonth: index,
            nameMonth: new Intl.DateTimeFormat("es-MX", {
                month: "long",
            }).format(fecha),
        };
    });
};


export const obtenerDiasDelMes = (
    anio: number,
    mes: number
): number => {
    return new Date(anio, mes + 1, 0).getDate();
};

export const obtenerPrimerDia = (
    anio: number,
    mes: number
): number => {
    return new Date(anio, mes, 1).getDay();
};
