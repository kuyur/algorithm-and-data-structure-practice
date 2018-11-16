# Question
There is a non-empty array `arr` holding integers. The element count is `length`.  
Given two 0-based indexes P and Q, satisfying: `0 <= P < Q <= length - 1`.  
Let `Num_p = arr[P]`, `Num_q = arr[Q]`.  
If `Num_p != Num_q` and there is no number between `Math.min(Num_p, Nump_q)` and `Math.max(Num_p, Num_q)` existing in arr, then we call `Math.abs(P- Q)` as a `valid distance of sibling numbers`.

Evaluate the maximum `valid distance of sibling numbers` for this array.

```javascript
/**
 * Return maximum valid distance of sibling numbers for given array.
 * @param {Array.<number>} arr
 * @return {number}
 */
function solution(arr) {
  // implementation
}
```

For example, if there is an array `arr = [3, 5, 10, 1, -4, 10]`, the returned result should be 4. Because `arr[1]` is `5`, `arr[5]` is `10` and there is no number between 5 and 10 (a.k.a. 6, 7, 8, 9) existing in arr, So 4 (= 5 - 1) is a valid distance. It also is the maximum valid distance.

# Answer
