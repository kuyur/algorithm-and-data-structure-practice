/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 * Example:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 */

/**
 * @author kuyur@kuyur.info
 */

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
 * @type {Array.<{value: number, pos: *}>}
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
    if (this.array_[p].value > this.array_[i].value) {
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
    if (this.array_[left].value > this.array_[right].value) {
      if (this.array_[i].value > this.array_[right].value) {
        var m = this.array_[i];
        this.array_[i] = this.array_[right];
        this.array_[right] = m;
        this.downheapifyImpl_(right);
      }
    } else {
      if (this.array_[i].value > this.array_[left].value) {
        var m = this.array_[i];
        this.array_[i] = this.array_[left];
        this.array_[left] = m;
        this.downheapifyImpl_(left);
      }
    }
  } else {
    if (this.array_[i].value > this.array_[left].value) {
      var m = this.array_[i];
      this.array_[i] = this.array_[left];
      this.array_[left] = m;
    }
  }
}

/**
 * Insert an element into heap, and execute heapify.
 * @param {{value: number, pos: *}} el
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
    if (el.value >= this.getTop().value) {
      var top = this.array_[0];
      this.array_[0] = el;
      this.downheapify_();
    }
  }
};

/**
 * Get the min element.
 * @return {{value: number, pos: *}}
 */
Heap.prototype.getTop = function() {
  return this.array_[0];
};

/**
 * Popup the top element and execute heapify.
 * @return {{value: number, pos: *}}
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
 * @param {Array.<Array.<number>>} lists
 * @return {Array.<number>}
 */
var mergeKLists = function(lists) {
  var k = lists.length;
  if (k === 0) {
    return [];
  }
  if (k === 1) {
    return lists[0];
  }

  var heap1 = new Heap(k);
  var capacity = 0;
  for (var i = 0; i < k; ++i) {
    if (lists[i][0] != null) {
      heap1.insert({
        value: lists[i][0],
        pos: {
          index: 0,
          kth: i
        }
      });
      capacity++;
    }
  }
  heap1.setCapacity(capacity);

  var result = [];
  var j = 0;
  var top;
  var index, kth;
  while (top = heap1.getTop()) {
    result[j++] = top.value;
    index = top.pos.index;
    kth = top.pos.kth;
    if (lists[kth][index + 1] != null) {
      heap1.insert({
        value: lists[kth][index + 1],
        pos: {
          index: index + 1,
          kth: kth
        }
      });
    } else {
      heap1.pop();
      heap1.setCapacity(--capacity);
    }
  }

  return result;
};

console.log(mergeKLists([[1,4,5],[1,3,4],[2,6]]));
