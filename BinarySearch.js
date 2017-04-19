/**
 * Performs a binary search on an array for a given value.
 * @param   {array}   arrayToSearch   the array to perform the search on
 * @param   {number}  x               the item to search for
 *
 * @returns {number}  the location of x
 */
function BinarySearch (arrayToSearch, x) {
  let low = 0;
  let high = arrayToSearch.length - 1;
  let mid;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arrayToSearch[mid] < x) {
      low = mid + 1;
    } else if (arrayToSearch[mid] > x) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
