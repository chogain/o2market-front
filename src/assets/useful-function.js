/* querySelector 함수 */
export const $ = (selector) => document.querySelector(selector);
export const $All = (selector) => document.querySelectorAll(selector);

/* 가격에 ,(쉼표) 삽입 */
export function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
