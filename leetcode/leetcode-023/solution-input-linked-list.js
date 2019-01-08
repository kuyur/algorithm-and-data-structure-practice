/**
 * min-heap class.
 * @author kuyur@kuyur.info
 * @param {number} capacity
 * @constructor
 */
var Heap = function(capacity) {
  this.array_ = [];
  this.count_ = 0;
  this.capacity_ = capacity || 127;
};

/**
 * @type {Array.<{val: number, next: {}}>}
 */
Heap.prototype.array_;

/**
 * @type {number}
 */
Heap.prototype.count_;

/**
 * @type {number}
 */
Heap.prototype.capacity_;

/**
 * Get parent node index.
 * @param {number} i
 * @return {number}
 */
Heap.prototype.getParentIndex_ = function(i) {
  if (i === 0) {
    return null;
  }
  return Math.floor((i - 1) / 2);
};

/**
 * @private
 */
Heap.prototype.upheapfiy_ = function() {
  if (this.count_ <= 1) {
    return;
  }

  var i = this.count_ - 1;
  var p = this.getParentIndex_(i);
  while (p != null) {
    if (this.array_[p].val > this.array_[i].val) {
      var m = this.array_[p];
      this.array_[p] = this.array_[i];
      this.array_[i] = m;
      i = p;
      p = this.getParentIndex_(i);
    } else {
      break;
    }
  }
};

/**
 * @private
 */
Heap.prototype.downheapify_ = function() {
  if (this.count_ <= 1) {
    return;
  }
  this.downheapifyImpl_(0);
};

/**
 * @private
 * @param {number} i
 */
Heap.prototype.downheapifyImpl_ = function(i) {
  var left = i * 2 + 1;
  if (left > this.count_ - 1) {
    return;
  }
  var right = i * 2 + 2;
  if (right <= this.count_ - 1) {
    if (this.array_[left].val > this.array_[right].val) {
      if (this.array_[i].val > this.array_[right].val) {
        var m = this.array_[i];
        this.array_[i] = this.array_[right];
        this.array_[right] = m;
        this.downheapifyImpl_(right);
      }
    } else {
      if (this.array_[i].val > this.array_[left].val) {
        var m = this.array_[i];
        this.array_[i] = this.array_[left];
        this.array_[left] = m;
        this.downheapifyImpl_(left);
      }
    }
  } else {
    if (this.array_[i].val > this.array_[left].val) {
      var m = this.array_[i];
      this.array_[i] = this.array_[left];
      this.array_[left] = m;
    }
  }
}

/**
 * Insert an element into heap, and execute heapify.
 * @param {{val: number, next: {}}} el
 */
Heap.prototype.insert = function(el) {
  if (typeof el !== 'object') {
    return;
  }

  if (this.count_ < this.capacity_) {
    this.array_[this.count_] = el;
    this.count_++;
    this.upheapfiy_();
  } else {
    if (el.val >= this.getTop().val) {
      var top = this.array_[0];
      this.array_[0] = el;
      this.downheapify_();
    }
  }
};

/**
 * Get the min element.
 * @return {{val: number, next: {}}}
 */
Heap.prototype.getTop = function() {
  return this.array_[0];
};

/**
 * Popup the top element and execute heapify.
 * @return {{val: number, next: {}}}
 */
Heap.prototype.pop = function() {
  if (this.count_ === 0) {
    return null;
  }

  var top = this.array_[0];
  if (this.count_ === 1) {
    this.array_ = [];
    this.count_ = 0;
  } else {
    this.array_[0] = this.array_[this.count_ - 1];
    this.array_[this.count_ - 1] = null; // only set to null. resetting length of array is not good.
    this.count_--;
    this.downheapify_();
  }

  return top;
};

/**
 * Get count of elements.
 * @return {boolean}
 */
Heap.prototype.getCount = function() {
  return this.count_;
};

/**
 * Get capacity of the heap.
 * @return {number}
 */
Heap.prototype.getCapacity = function() {
  return this.capacity_;
};

/**
 * Set capacity again.
 * @param {number} capacity
 */
Heap.prototype.setCapacity = function(capacity) {
  if (this.count_ > capacity) {
    return;
  }

  this.capacity_ = capacity
};

/**
 * Is heap full.
 * @return {boolean}
 */
Heap.prototype.isFull = function() {
  return this.count_ === this.capacity_;
};

/**
 * @param {Array.<ListNode>} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  var k = lists.length;
  if (k === 0) {
    return null;
  }
  if (k === 1) {
    return lists[0];
  }

  var heap1 = new Heap(k);
  var capacity = 0;
  for (var i = 0; i < k; ++i) {
    if (lists[i] != null) {
      heap1.insert(lists[i]);
      capacity++;
    }
  }
  heap1.setCapacity(capacity);

  if (heap1.getCount() === 0) {
    return null;
  }

  var result = heap1.getTop(), prev = {
    next: null
  };
  var top;
  while (top = heap1.getTop()) {
    prev.next = top;
    prev = top;
    if (top.next != null) {
      heap1.insert(top.next);
    } else {
      heap1.pop();
      heap1.setCapacity(--capacity);
    }
  }

  return result;
};

var n3 = {
  val: 2,
  next: null
};
var n2 = {
  val: 2,
  next: n3
};
var n1 = {
  val: 1,
  next: n2
};
var n6 = {
  val: 2,
  next: null
};
var n5 = {
  val: 1,
  next: n6
};
var n4 = {
  val: 1,
  next: n5
};
var input = [n1, n4];
console.log(JSON.stringify(mergeKLists(input), null, 2));
