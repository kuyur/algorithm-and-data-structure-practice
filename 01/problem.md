# Question

Input: an array holding numbers.  
Output: k-th smallest value inside the array. Ignore the value if it is duplicated.

# Answer

Use max heap. Implement sift-down heapify and sift-up heapify. The capacity of the heap can be limited at k.

Actually, all the smallest values before k-th are evaluated inside heap.

If input array contains many duplicated numbers, we can add an additional map to accelerate the insert operation.

Time consumed: consider the count of the array is `n`, the consumed time will be `nlog(k)`.

# Code

    // make a test array
    var arr = [];
    for (var i = 0; i < 10000; ++i) {
      arr[i] = Math.floor(Math.random() * 10000);
    }

    var heap = new Heap(1000);
    for (var i = 0; i < 10000; ++i) {
      heap.insert(arr[i]);
    }

    console.log(heap.getTop());