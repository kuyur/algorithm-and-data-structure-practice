/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 * 
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 * 
 * Example:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {Array.<number>} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (!prices || prices.length <= 1) {
    return 0;
  }

  var maximum = 0;
  var accumulated = 0;
  var delta;
  for (var i = 1, length = prices.length; i < length; ++i) {
    delta = prices[i] - prices[i - 1];
    if (delta > 0) {
      accumulated += delta;
      maximum = Math.max(maximum, accumulated);
    } else if (delta === 0) {
      continue;
    } else {
      if (accumulated + delta < 0) {
        accumulated = 0;
      } else {
        accumulated += delta;
      }
    }
  }

  return maximum;
};
