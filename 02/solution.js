/**
 * @author kuyur@kuyur.info
 */

// lights out game, see https://en.wikipedia.org/wiki/Lights_Out_(game)
// It is a Linear algebra mathematical problem.
// rank(A) < rank(A|B), no solution
// rank(A) = rank(A|B) = n, 1 solution
// rank(A) = rank(A|B) < n, countless solutions
// see https://en.wikipedia.org/wiki/Augmented_matrix
// Gaussian elimination, see https://en.wikipedia.org/wiki/Gaussian_elimination

// execute bool XOR operation on each element in matrix to reduce coefficients.

/**
 * @param {number} m row count
 * @param {number} n column count
 * @param {Array.<Array.<number>>} matrix
 * @return {Array.<Array.<number>>}
 */
function findSolution(m, n, matrix) {
  var dimension = m * n;
  var extended_matrix = []; // dimension x (dimension + 1)
  var i, j;
  for (i = 0; i < dimension; i++) {
    var arr = [];
    for (j = 0; j < dimension + 1; j++) {
      arr[j] = 0;
    }
    extended_matrix[i] = arr;
  }
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      var index = i * n + j;
      extended_matrix[index][dimension] = matrix[i][j];
      var cells = findSiblings(i, j, m - 1, n - 1);
      cells.forEach(function(cell) {
        extended_matrix[index][cell.row * n + cell.column] = 1;
      });
    }
  }
  gaussian_elimination_part1(extended_matrix, dimension);
  var ranks = rank(extended_matrix, dimension);
  if (ranks.rank !== dimension || ranks.rank !== ranks.augmented) {
    return null;
  }
  gaussian_elimination_part2(extended_matrix, dimension);
  var solution = [];
  for (i = 0; i < m; i++) {
    solution[i] = [];
    for (j = 0; j < n; j++) {
      solution[i][j] = extended_matrix[i * n + j][dimension];
    }
  }
  return solution;
}

/**
 * @param {number} i 0-based row index
 * @param {number} j 0-based column index
 * @param {number} m 0-based max row index
 * @param {number} n 0-based max column index
 * @return {Array.<{row: number, column: number}>}
 */
function findSiblings(i, j, m, n) {
  var result = [{
    row: i,
    column: j
  }];
  var top = i - 1;
  if (top >= 0) {
    result.push({
      row: top,
      column: j
    });
  }
  var bottom = i + 1;
  if (bottom <= m) {
    result.push({
      row: bottom,
      column: j
    });
  }
  var left = j - 1;
  if (left >= 0) {
    result.push({
      row: i,
      column: left
    })
  }
  var right = j + 1;
  if (right <= n) {
    result.push({
      row: i,
      column: right
    })
  }
  return result;
};

/**
 * Gaussian elimination, part 1.
 * @param {Array} matrix extended matrix(augmented matrix).
 * @return {Array}
 */
function gaussian_elimination_part1(matrix, dimension) {
  var kth = 0;
  for (var i = 0; i < dimension; i++) {
    while (!matrix[i][kth] && kth < dimension) {
      for (var j = i + 1; j < dimension; j++) {
        if (matrix[j][kth]) {
          var temp = matrix[i];
          matrix[i] = matrix[j];
          matrix[j] = temp;
          break;
        }
      }
      if (matrix[i][kth]) {
        break;
      }
      kth++;
    }
    if (kth >= dimension) {
      break;
    }
    for (var k = i + 1; k < dimension; k++) {
      if (matrix[k][kth]) {
        for (var l = 0; l < dimension + 1; l++) {
          matrix[k][l] = matrix[k][l] ^ matrix[i][l];
        }
      }
    }
    kth++;
  }
};

/**
 * Gaussian elimination, part 2.
 * @param {Array} matrix extended matrix(augmented matrix).
 * @return {Array}
 */
function gaussian_elimination_part2(matrix, dimension) {
  var kth = dimension - 1;
  for (var i = dimension - 2; i >= 0; i--, kth--) {
    for (var j = dimension - 1; j >= kth; j--) {
      if (matrix[i][j]) {
        matrix[i][j] = matrix[i][j] ^ matrix[j][j];
        matrix[i][dimension] = matrix[i][dimension] ^ matrix[j][dimension];
      }
    }
  }
};

/**
 * Evaluate the rank of coefficient matrix(系数矩阵) and augmented matrix(增广矩阵).
 * @param {Array} matrix extended matrix (augmented matrix).
 * @param {number} dimension
 * @return {{
 *   'rank': number,
 *   'augmented': number
 * }}}
 */
function rank(matrix, dimension) {
  var extended = -1;
  for (var i = dimension - 1; i >= 0; i--) {
    var row = matrix[i];
    for (var j = dimension - 1; j >= 0; j--) {
      if (row[j]) {
        return {
          rank: i + 1,
          augmented: extended === -1 ? i + 1 : extended
        }
      }
      if (extended === -1 && row[dimension]) {
        extended = i + 1;
      }
    }
  }
  return {
    rank: 0,
    augmented: extended === -1 ? 0 : extended
  };
};
