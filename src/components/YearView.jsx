import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

const YearView = ({ date, onMonthClick, startOfWeek: weekStartsOn = 1 }) => {
    const year = date.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
    const realToday = new Date(); // La fecha real de hoy
    
    const weekDaysNames = weekStartsOn === 1 
        ? ['L','M','X','J','V','S','D']
        : ['D','L','M','X','J','V','S'];

    return (
        <div className="h-full overflow-y-auto p-6 bg-white/40 dark:bg-slate-900 no-scrollbar">
            <h2 className="text-5xl font-serif font-bold text-center mb-8 text-gray-800 dark:text-gray-100">{year}</h2>
            
            <div className="grid grid-cols-3 gap-8 pb-10"> 
                {months.map((monthDate, i) => {
                    const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn });
                    const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn });
                    const days = eachDayOfInterval({ start, end });

                    // Chequeamos si este mes es el mes actual real para colorear el título
                    const isCurrentMonth = isSameMonth(monthDate, realToday);

                    return (
                        <div 
                            key={i} 
                            onClick={() => onMonthClick(i)}
                            className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer h-[300px] flex flex-col"
                        >
                            <h3 className={`text-lg font-bold mb-3 text-center capitalize ${isCurrentMonth ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}`}>
                                {format(monthDate, 'MMMM', { locale: es })}
                            </h3>
                            
                            <div className="grid grid-cols-7 text-center gap-y-2 flex-1 content-start">
                                {weekDaysNames.map(d => (
                                    <span key={d} className="text-[10px] text-gray-300 dark:text-gray-500 font-bold">{d}</span>
                                ))}
                                {days.map((d, idx) => {
                                    // Comprobaciones
                                    const isToday = isSameDay(d, realToday); 
                                    const isMonthDay = isSameMonth(d, monthDate); // ¿Pertenece este día al mes que estamos pintando?

                                    return (
                                        <span key={idx} className={`
                                            text-[11px] flex items-center justify-center h-6 w-6 mx-auto rounded-full
                                            ${!isMonthDay ? 'text-transparent' : 'text-gray-600 dark:text-gray-400'}
                                            
                                            /* CORRECCIÓN AQUÍ: Solo pintamos de rojo si es hoy Y pertenece al mes */
                                            ${isToday && isMonthDay ? 'bg-red-500 text-white font-bold shadow-md' : ''}
                                        `}>
                                            {isMonthDay ? format(d, 'd') : ''}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default YearView;