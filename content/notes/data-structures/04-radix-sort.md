---
title: "4. 链表应用：基数排序"
chapter_title: "链表应用：基数排序"
weight: 4

date: 2026-07-18T13:10:00+08:00
lastmod: 2026-07-18T15:13:00+08:00

categories: ["数据结构"]
tags: ["链表", "基数排序"]
description: "链表应用：基数排序学习笔记。"
---

## 基数排序(radix sort)

基数排序（Radix Sort）是一种非比较型的排序算法，它通过逐位比较元素的每一位（从最低位到最高位）来实现排序。基数排序的核心思想是将整数按位数切割成不同的数字，然后按每个位数分别进行排序。基数排序的时间复杂度为 O(n \* k)，其中 n 是列表长度，k 是最大数字的位数。

```C++
int maxbit(int data[], int n) //辅助函数，求数据的最大位数
{
    int maxData = data[0];              ///< 最大数
    /// 先求出最大数，再求其位数，这样有原先依次每个数判断其位数，稍微优化点。
    for (int i = 1; i < n; ++i)
    {
        if (maxData < data[i])
            maxData = data[i];
    }
    int d = 1;
    int p = 10;
    while (maxData >= p)
    {
        //p *= 10; // Maybe overflow
        maxData /= 10;
        ++d;
    }
    return d;
}
template<class T>
void chain<T>::radixSort(int d)  // d为最大位数
{
    // 创建并初始化10个箱子（0-9）
    chainNode<T>** bottom, **top;
    bottom = new chainNode<T>* [10];
    top = new chainNode<T>* [10];

    int radix = 1;  // 当前处理的位数：1,10,100,...

    // 进行d次分配和收集
    for (int i = 0; i < d; i++) {
        // 初始化箱子
        for (int b = 0; b < 10; b++)
            bottom[b] = NULL;

        // 把链表的节点分配到箱子
        for (; firstNode != NULL; firstNode = firstNode->next) {
            // 计算当前位的数字
            int theBin = (firstNode->element / radix) % 10;

            if (bottom[theBin] == NULL)  // 箱子为空
                bottom[theBin] = top[theBin] = firstNode;
            else {  // 箱子不空
                top[theBin]->next = firstNode;
                top[theBin] = firstNode;
            }
        }

        // 把箱子中的节点收集到有序链表中
        chainNode<T>* y = NULL;
        for (int theBin = 0; theBin < 10; theBin++) {
            if (bottom[theBin] != NULL) {
                if (y == NULL)  // 第一个非空箱子
                    firstNode = bottom[theBin];
                else  // 不是第一个非空箱子
                    y->next = bottom[theBin];
                y = top[theBin];
            }
        }
        if (y != NULL)
            y->next = NULL;

        radix *= 10;  // 处理下一位
    }

    delete[] top;
    delete[] bottom;
}
/*基数排序实则是对所要排序的所有数的每一位数字使用箱子排序*/
```
