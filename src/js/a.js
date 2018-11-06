/**
 * created by : heiye1991
 * created time: 2018-11-06
 * description:
 */
export function renderA(str) {
  console.log(str)
}
export function composeA() {
  let ul = document.createElement('ul');
  ul.innerHTML = `
    <li>1112</li>
    <li>222</li>
    <li>333</li>
  `
  return ul
}