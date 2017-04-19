function Merge(parent, left, leftSize, right, rightSize) {
  let parentIdx = 0;
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < leftSize && rightIdx < rightSize) {
    if (left[leftIdx] <= right[rightIdx]) {
      parent[parentIdx] = left[leftIdx];
      parentIdx++;
      leftIdx++;
    } else {
      parent[parentIdx] = right[rightIdx];
      parentIdx++;
      rightIdx++;
    }
  }

  while (leftIdx < leftSize) {
    parent[parentIdx] = left[leftIdx];
    parentIdx++;
    leftIdx++;
  }

  while (rightIdx < rightSize) {
    parent[parentIdx] = right[rightIdx];
    parentIdx++;
    rightIdx++;
  }
}

function MergeSort (theArray, n) {
  let leftSize = 0;
  let rightSize = 0;
  let left = new Array();
  let right = new Array();

  if (n < 2) {
    return;
  }

  leftSize = Math.trunc(n / 2);
  rightSize = n - leftSize;

  for(let i = 0; i < leftSize; i++) {
    left.push(theArray[i]);
  }

  for(let i = 0; i < rightSize; i++) {
    right.push(theArray[i + leftSize]);
  }

  MergeSort(left, left.length);
  MergeSort(right, right.length);
  Merge(theArray, left, left.length, right, right.length);

  left = [];
  right = [];
}

let theArrayToSort = [3, 5, 9, 3, 2];

MergeSort(theArrayToSort, theArrayToSort.length);

console.log(theArrayToSort);
