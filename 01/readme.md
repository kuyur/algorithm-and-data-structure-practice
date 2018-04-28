# Question

Input: an array holding numbers.  
Output: k-th smallest value inside the array. Ignore the value if it is duplicated.

# Answer

Use max heap. Implement sift-down heapify and sift-up heapify. The capacity of the heap can be limited at k.

Actually, all the smallest values before k-th are evaluated inside heap.

If input array contains many duplicated numbers(e.g. after removing the duplicated numbers, the count reduces to 1% of original array), we can add an additional map to accelerate the insert operation.

Time consumed: consider the count of the array is `n`, the consumed time will be `nlog(k)`.

# Code

    // make a test array
    var arr = [];
    var n = 50000000;
    for (var i = 0; i < n; ++i) {
      arr[i] = Math.floor(Math.random() * n);
    }

    var k = 10000;

    var ts = new Date;
    var heap1 = new Heap(k);
    for (var i = 0; i < n; ++i) {
      heap1.insert(arr[i]);
    }
    console.log(heap1.getTop());
    console.log('time consumed: ' + (new Date - ts));

    var ts = new Date;
    var heap2 = new Heap(k, true);
    for (var i = 0; i < n; ++i) {
      heap2.insert(arr[i]);
    }
    console.log(heap2.getTop());
    console.log('time consumed: ' + (new Date - ts));

    // test result is correct or not
    var ts = new Date;
    arr.sort(function(a, b) {return a - b;});
    var newArr = [];
    var j = 0;
    for (var i = 0; i < n; ++i) {
      if (newArr[j - 1] !== arr[i]) {
        newArr[j] = arr[i];
        j++;
      }
    }
    console.log(newArr[k - 1]);
    console.log('time consumed: ' + (new Date - ts));