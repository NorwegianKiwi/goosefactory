/** Returns an array with the names of the direct names of a function
 *  (e.g. for the function a = (b, c) => {}
 *  getFunctionArgNames(a) will return ["b", "c"] ).
 *
 *  Credit: https://davidwalsh.name/javascript-arguments
 */
const getFunctionArgNames = (func) => {
    const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args
        .split(',')
        .map(function (arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        })
        .filter(function (arg) {
            return arg;
        });

};

/** Returns an array with the names of the INDIRECT names of the fields of a function's argument object
 *  (e.g. for the function a = ({c, d, e}) => {}
 *  getFunctionRefsNames(a) will return ["c", "d", "e"] (,
  */
const getFunctionRefsNames = (func, ref) => {
    const pattern = new RegExp(ref + "\\.([a-zA-Z0-9_]+)[\\,\\;]", 'g');
    const args = func.toString().match(pattern);
    return args && args.map( arg => arg.slice(ref.length + 1, arg.length - 1));
};

export default {
    getArgs: getFunctionArgNames,
    getRefs: getFunctionRefsNames,
};
