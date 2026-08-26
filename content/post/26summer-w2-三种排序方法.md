---
title: "26summer-w2-三种基本排序方法"

date: 2025-07-06T13:10:00+08:00
lastmod: 2025-07-06T15:13:00+08:00

categories: ["排序算法"]
tags: ["选择排序", "冒泡排序", "插入排序"]
description: "选择排序、冒泡排序和插入排序"

cover: /images/cover15.webp
---

# 三种基本排序方法

## 1. 选择排序(selection sort)

选择排序（Selection Sort）是一种简单直观的排序算法。它的核心思想是“分治”中的选择思维：每次从未排序部分选出最小（或最大）的元素，放到已排序部分的末尾。

```C++
void selectionSort(int a[],int n)
{
    //从第 1 个元素开始遍历，直至倒数第 2 个元素
    for(int i=0;i<n-1;i++)
    {
        int min=i,temp=0;//事先假设最小值为第 i 个元素
        //从第 i+1 个元素开始遍历，查找真正的最小值
        for(int j=i+1;j<n;j++)
        {
            if(a[min]>a[j])
                min=j;
        }
        //如果最小值所在位置不为 i，交换最小值和第 i 个元素的位置
        if(min!=i)
        {
             temp=a[i];
             a[i]=a[min];
             a[min]=temp;
        }
    }
}

int main()
{
    int a[5]={1,3,2,0,5};
    int n=5;
    selectionSort(a,n);
    for(int i=0;i<n;i++)
        cout<<a[i]<<" "<<endl;
}
//时间复杂度	O(n²)，符合选择排序特性
//空间复杂度	O(1)，原地排序
```

## 2. 冒泡排序(bubble sort)

使用冒泡排序算法对 n 个数据进行排序，实现思路是：从待排序序列中找出一个最大值或最小值，这样的操作执行 n-1 次，最终就可以得到一个有序序列。

```C++
void bubbleSort(int a[],int n)
{
    int temp;
    // n 个元素，遍历 n-1 次
    for(int i=0;i<n-1;i++)
    {
        //bool swapped = false;  // 标记本轮是否交换(优化版本，对一次冒泡进行标记)
        // 从第 1 个元素开始遍历，遍历至 n-1-i
        for(int j=0;j<n-1-i;j++)
        {
            //比较 a[j] 和 a[j+1] 的大小
            if(a[j]>a[j+1])
            {
                //交换 2 个元素的位置
                temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
                //swapped = true;(这一轮冒泡有交换，标记为true)
            }
        }
        //if(swapped==false)(没有交换，说明已经有序，可以提前结束)
        //    break;
    }
}

int main()
{
    int a[5]={1,3,2,0,5};
    int n=5;
    bubbleSort(a,n);
    for(int i=0;i<n;i++)
        cout<<a[i]<<" "<<endl;
}
//时间复杂度	O(n²)，符合冒泡排序特性
//空间复杂度	O(1)，原地排序
```

## 3.插入排序(insertion sort)

插入排序算法的实现思路是：初始状态下，将待排序序列中的第一个元素看作是有序的子序列。从第二个元素开始，在不破坏子序列有序的前提下，将后续的每个元素插入到子序列中的适当位置。

#### 3.1 在有序数组中插入新元素

```C++
void insert(int a[],int &n,const int& x)
{//把x插入有序数组a[0:n-1]
    int i;
    for(i=n-1;i>=0&&x<a[i];i--)
    {
        a[i+1]=a[i]
    }
    a[i++]=x;
    n++;//数组a多了一个元素
}
```

#### 3.2 插入排序

```C++
void insertionSort(int a[],int n)
{
    int i;
    for(i=1;i<n;i++)
    {
        int t=a[i];
        insert(a,i,t);
    }
}
```
