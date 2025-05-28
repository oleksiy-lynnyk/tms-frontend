// src/types/common.ts

/**
 * Пагінована відповідь від бекенду
 * @template T – тип елементів у масиві content
 */
export interface Page<T> {
    /** Масив даних поточної сторінки */
    content: T[];
    /** Загальна кількість елементів у всьому наборі */
    totalElements: number;
    /** Загальна кількість сторінок */
    totalPages: number;
    /** Розмір сторінки (кількість елементів на сторінку) */
    size: number;
    /** Номер поточної сторінки (0-індекс) */
    number: number;
}

/**
 * DTO для виконання команди над ресурсом
 */
export interface ExecutionCommandDTO {
    /** Текст або ключ команди, яка виконується */
    command: string;
}

