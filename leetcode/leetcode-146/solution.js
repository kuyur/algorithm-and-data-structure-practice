/**
 * Design a data structure that follows the constraints of a Least (Oldest) Recently Used (LRU) cache.
 *
 * Implement the LRUCache class:
 *
 * LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
 * int get(int key) Return the value of the key if the key exists, otherwise return -1.
 * void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
 * The functions get and put must each run in O(1) average time complexity.
 * 
 * Example:
 *
 * Input
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * Output
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 *
 * Explanation
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // cache is {1=1}
 * lRUCache.put(2, 2); // cache is {1=1, 2=2}
 * lRUCache.get(1);    // return 1
 * lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
 * lRUCache.get(2);    // returns -1 (not found)
 * lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
 * lRUCache.get(1);    // return -1 (not found)
 * lRUCache.get(3);    // return 3
 * lRUCache.get(4);    // return 4
 */

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity_ = capacity || 0;
  this.count_ = 0;
  this.map_ = {};
  this.head_ = {
    prev: null
  };
  this.tail_ = {
    next: null
  };

  this.head_.next = this.tail_;
  this.tail_.prev = this.head_;
};

/**
 * @type {number}
 */
LRUCache.prototype.capacity_;

/**
 * @type {number}
 */
LRUCache.prototype.count_;

/**
 * @type {Object}
 */
LRUCache.prototype.map_;

/**
 * @type {Object}
 */
LRUCache.prototype.head_;

/**
 * @type {Object}
 */
LRUCache.prototype.tail_;

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  var node = this.map_[key];
  if (!node) {
    return -1;
  }

  this.moveToLast_(node);

  return node.value;
};

LRUCache.prototype.moveToLast_ = function(node) {
  // update linking
  node.prev.next = node.next;
  node.next.prev = node.prev;

  // move to last
  if (this.tail_.prev !== node) {
    var prev = this.tail_.prev;
    prev.next = node;
    this.tail_.prev = node;
    node.prev = prev;
    node.next = this.tail_;
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  var node = this.map_[key];
  if (node) {
    node.value = value;
    this.moveToLast_(node);
    return;
  }

  if (this.count_ < this.capacity_) {
    node = {
      key: key,
      value: value
    };
    this.map_[key] = node;
    this.count_++;

    // insert into last
    var prev = this.tail_.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail_;
    this.tail_.prev = node;
  } else {
    var oldest = this.head_.next;
    if (oldest === this.tail_) { // capacity == 0
      return;
    }
    delete this.map_[oldest.key];

    // remove the linking of the oldest node
    var next = oldest.next;
    this.head_.next = next;
    next.prev = this.head_;

    node = {
      key: key,
      value: value
    };
    this.map_[key] = node;

    // insert into last
    var prev = this.tail_.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail_;
    this.tail_.prev = node;
  }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */