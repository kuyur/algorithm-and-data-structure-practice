# Background

There is a matrix panel, holding a light in every cell.

Here are the rules of Lights Out Game:
* There are two statuses, `on` and `off`, for each light. Let's mark `on` as `1`, and `off` as `0`.
* We can touch the cell to toggle the status of light. However, the status of adjacent lights also will be toggled at the same time.
* You can touch only one cell a time. One touching is calculated as 1 step. 

For example, consider that we have a matrix panel now:

    0 0 0 0 0
    0 1 1 0 0
    0 0 0 0 0

If we touch the cell`[1, 2]` (row-index=1, column-index=2, indexes are 0-based.), the matrix will become:

    0 0 1 0 0
    0 0 0 1 0
    0 0 1 0 0

Because (the touched cell is marked as ❶):

    0 0 0 0 0     0 0 0 0 0     0 0 1 0 0
    0 1 1 0 0  →  0 1 ❶ 0 0  →  0 0 0 1 0
    0 0 0 0 0     0 0 0 0 0     0 0 1 0 0

You can refer to https://en.wikipedia.org/wiki/Lights_Out_(game) for more detail.

# Question
Given a matrix panel with some lights on, find out the solution with minimum steps to turn off all lights. If there is no solution, return null.

For example, given a matrix panel:

    0 0 0 0 1
    0 0 0 0 0
    0 0 1 0 0
    0 0 0 0 0

One possible solution (with 4 steps) is:

    [1, 4] → [2, 3] → [2, 4] → [3, 4]

# Hint

The order of steps is not important actually. Even we disrupt the order, it still is a valid solution, e.g.:

    [2, 3] → [2, 4] → [1, 4] → [3, 4]

The solution can be represented in another matrix:

    0 0 0 0 0
    0 0 0 0 1
    0 0 0 1 1
    0 0 0 0 1

# Answer

## English
It is a Linear algebra mathematical problem actually.

## Chinese
这实际上是一道线性代数数学题。但要正确将问题转换成线性代数题，需要一点群论知识。

显然，消灯是点灯的逆过程。因此我们考察问题的时候，可以从一个空白矩阵开始。不妨以4x5矩阵为例。

完全消灯状态，记为S<sup>0</sup>. 矩阵是：

    0 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0

`按下单元格[1, 1]`, 矩阵会变成

    0 1 0 0 0
    1 1 1 0 0
    0 1 0 0 0
    0 0 0 0 0

`按下单元格[1, 1]` 这个操作，实际上会将五个单元格 `[0, 1]`, `[1, 0]`, `[1, 1]`, `[1, 2]`, `[2, 1]` 的状态反置。那么`按下单元格[1, 1]` 这个操作，本身也可以表达为一个矩阵， 我们使用行列序号作为下标，记这个矩阵为O<sub>11</sub>：

    0 1 0 0 0
    1 1 1 0 0
    0 1 0 0 0
    0 0 0 0 0

我们把 `将操作应用到前一个状态` 记为点灯加法(+)，例如S<sup>0</sup>+O<sub>11</sub>+O<sub>22</sub> = S<sup>2</sup>:

    0 0 0 0 0     0 1 0 0 0     0 0 0 0 0     0 1 0 0 0
    0 0 0 0 0  +  1 1 1 0 0  +  0 0 1 0 0  =  1 1 0 0 0
    0 0 0 0 0     0 1 0 0 0     0 1 1 1 0     0 0 1 1 0
    0 0 0 0 0     0 0 0 0 0     0 0 1 0 0     0 0 1 0 0

在物理上，状态矩阵S<sup>0</sup>和操作矩阵O<sub>11</sub>或O<sub>22</sub>中的0,1代表着不同的物理意思。但我们可以很快就能看到，它们在数学上是同一的。

我们知道，操作矩阵中的`1`，代表的是将对应位置的状态反置。  
显然：

    x + 0 = x
    x + 0 + 0 = x
    x + 1 = !x
    x + 1 + 1 = x
    x + 1 + 1 + 1 = x + 1 = !x
    x + 1 + 0 = x + 0 + 1 = x + 1 = !x

有结论：

    结论1：奇数次的状态反置等于1次状态反置
    结论2：偶数次的状态反置等于0次状态反置

同时可推导出

     结论3：操作的顺序不影响结果(交换性)，影响结果的只能是1的个数(反置次数)的奇偶性

同时根据结论3，我们可以先将操作先叠加起来，再将这个复合操作应用到状态之上。我们将 `操作叠加` 记为操作叠加加法(⊕)。我们将很快就能看到，点灯加法(+)和操作叠加加法(⊕)在数学上也是同一的。

我们将上面点灯加法中的x去掉

    0 = 0
    0 ⊕ 0 = 0
    1 = 1
    1 ⊕ 1 = 0
    1 ⊕ 1 ⊕ 1 = 1
    1 ⊕ 0 = 0 ⊕ 1 = 1

这个叠加加法的数学本质是布尔异或运算(XOR)。1(反置)和0(不反置)对应着布尔值true和false。

    0 XOR 0 = 0
    1 XOR 0 = 1
    0 XOR 1 = 1
    1 XOR 1 = 0

例如O<sub>11</sub> ⊕ O<sub>22</sub> = O<sub>11+22</sub>：

    0 1 0 0 0      0 0 0 0 0     0 1 0 0 0
    1 1 1 0 0  ⊕  0 0 1 0 0  =  1 1 0 0 0
    0 1 0 0 0      0 1 1 1 0     0 0 1 1 0
    0 0 0 0 0      0 0 1 0 0     0 0 1 0 0

操作叠加加法(⊕)满足
* 交换律 O<sub>a</sub> ⊕ O<sub>b</sub> = O<sub>b</sub> ⊕ O<sub>a</sub>
* 结合律 O<sub>a</sub> ⊕ O<sub>b</sub> ⊕ O<sub>c</sub>= O<sub>a</sub> ⊕ (O<sub>b</sub> ⊕ O<sub>c</sub>)

另外还有 O<sub>a</sub> ⊕ O<sub>a</sub> = 0

我们回到点灯加法(+)上。  
显然S<sup>0</sup>+O<sub>11+22</sub> = S<sup>2</sup>

如果我们将O<sub>11+22</sub>应用到如下状态矩阵

    0 1 0 0 0
    0 1 0 0 0
    0 1 0 0 0
    0 1 0 0 0

我们可以求得新状态为

    0 1 0 0 0     0 1 0 0 0     0 0 0 0 0
    0 1 0 0 0  +  1 1 0 0 0  =  1 0 0 0 0
    0 1 0 0 0     0 0 1 1 0     0 1 1 1 0
    0 1 0 0 0     0 0 1 0 0     0 1 1 0 0

灯的状态的取值同样在数学上等同于布尔值，灭等于false，亮等于true。

    0(灭) + 0(不反置) = 0(灭)
    0(灭) + 1(反置) = 1(亮)
    1(亮) + 0(不反置) = 1(亮)
    1(亮) + 1(反置) = 0(灭)

因此点灯加法(+)同样是布尔异或运算。在数学上，点灯加法(+)和操作叠加加法(⊕)是全同的。我们可以将操作视为状态，将状态视为操作，因为：

* 任何状态都可视为在S<sup>0</sup>之上叠加一个复合操作得到的结果

而S<sup>0</sup>在群这个代数结构中被称为单位元。

群是由集合和一个二元运算构成的代数结构，需要满足四个性质：交换律，结合律，存在单位元和存在逆元。

显然，对我们这个矩阵布尔异或运算群，所有可能的布尔矩阵构成了元素集合，而二元运算就是矩阵布尔异或运算。单位元是S<sup>0</sup>，而逆元则是矩阵自身。

至此，我们完成了将问题转换成纯粹的数学问题。

下面，我们将+和⊕统一为+，都意味着矩阵布尔异或运算。将形似

    1 1 0 0 0
    1 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0

    0 1 0 0 0
    1 1 1 0 0
    0 1 0 0 0
    0 0 0 0 0

    0 1 1 1 0
    0 0 1 0 0
    0 0 0 0 0
    0 0 0 0 0
之类的矩阵称为十字矩阵 (可以在数学上用条件约束进行严格定义)

问题：给定一个布尔矩阵S，是否存在有限个不同的十字矩阵通过 `+` 运算得到。(重复的十字矩阵显然是无意义的)

下面进行求解。不妨考察题目中的布尔矩阵：

    0 0 0 0 1
    0 0 0 0 0
    0 0 1 0 0
    0 0 0 0 0

对于这个4x5布尔矩阵群，每个单元格都对应着一个十字矩阵。它的十字矩阵的个数显然是4x5=20。如果有解，那么使用到的十字矩阵的个数必定小于或等于20(也即步数必定不会大于20)。

使用行列序号，记这些十字矩阵为S<sup>T00</sup>, S<sup>T01</sup>, S<sup>T02</sup>, ..., S<sup>T34</sup>

同样使用行列序号，将是否使用到对应的十字矩阵记为未知数：x<sub>00</sub>, x<sub>01</sub>, x<sub>02</sub>, ..., x<sub>34</sub>

因此有方程：

* x<sub>00</sub>*S<sup>T00</sup> + ... + x<sub>34</sub>*S<sup>T34</sup> = S

我们的任务就是求解出未知数组x<sub>00</sub>, x<sub>01</sub>, x<sub>02</sub>, ..., x<sub>34</sub>。而它们同样均为布尔值。

我们留意到，能影响S矩阵中特定单元格的值的十字矩阵是有限的，最多不超过5个。比如对 `单元格[0, 4]` ,能够影响到它的十字矩阵，只有S<sup>T03</sup>，S<sup>T04</sup>，S<sup>T14</sup>，也即

    0 0 1 1 1
    0 0 0 1 0
    0 0 0 0 0
    0 0 0 0 0

    0 0 0 1 1
    0 0 0 0 1
    0 0 0 0 0
    0 0 0 0 0

    0 0 0 0 1
    0 0 0 1 1
    0 0 0 0 1
    0 0 0 0 0

针对这一单元格，能得到方程 (这里的 + 全都是异或运算)
* x<sub>03</sub> + x<sub>04</sub> + x<sub>14</sub> = 1

同样，针对S矩阵的每一单元格，即使单元格值为0， 都能得到一条关于未知数组x<sub>00</sub>, x<sub>01</sub>, x<sub>02</sub>, ..., x<sub>34</sub>的方程。这样我们可以得到一个方程组：

* x<sub>00</sub> + x<sub>01</sub> + x<sub>11</sub> = 0
* x<sub>00</sub> + x<sub>01</sub> + x<sub>02</sub> + x<sub>11</sub> = 0
* ...
* x<sub>03</sub> + x<sub>04</sub> + x<sub>14</sub> = 1
* ...
* x<sub>12</sub> + x<sub>21</sub> + x<sub>22</sub> + x<sub>23</sub> + x<sub>32</sub>= 1
* ...
* x<sub>24</sub> + x<sub>33</sub> + x<sub>34</sub> = 0

这是一个20元1次方程组，非常适合计算机求解。

复习起线性代数，我们可以用通过将系数对齐，构造出增广矩阵来求解。通过高斯消元法，可以求得系数矩阵的秩和增广矩阵的秩(极大线性无关组的个数)来判定是否有解。在有解的情况下，进一步通过高斯消元法将系数矩阵化为单位矩阵(20阶)，即可求得未知数组x<sub>00</sub>, x<sub>01</sub>, x<sub>02</sub>, ..., x<sub>34</sub>的值。

因为方程组中的加法(+)是异或运算，在高斯消元的时候同样需要使用异或运算。

## 时间复杂度

如果矩阵的行数为m，列数为n，则时间复杂度为O((mn)<sup>3</sup>).

# Code
    var matrix = [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    var result = findSolution(4, 5, matrix);
    console.log(result);
    // [
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 1],
    //   [0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 1]
    // ]

    var matrix2 = [
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1]
    ];
    var result2 = findSolution(4, 5, matrix2);
    console.log(result2);
    // [
    //   [1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1]
    // ]
