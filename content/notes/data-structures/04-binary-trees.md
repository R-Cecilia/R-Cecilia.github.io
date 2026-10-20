---
title: "8. 树与二叉树：定义、性质与节点"
chapter_title: "树与二叉树：定义、性质与节点"
weight: 8

date: 2026-08-01T13:10:00+08:00
lastmod: 2026-08-01T15:13:00+08:00

categories: ["数据结构"]
tags: ["树", "二叉树", "节点"]
description: "树与二叉树：定义、性质与节点学习笔记。"
url: "/post/26summer-w6-二叉树/"
---

## 树的基本定义

- 一棵树t是一个非空的有限元素集合，其中一个元素为根(root)，其余的元素组成t的子树(subtree)。
- 树中没有子代的元素称为叶子(leaf)。
- 一棵树的高度(height)或者深度(depth)是树中级(level)的个数。
- 一个元素的度(degree of an element)是指其孩子的个数。一棵树的度(degree of a tree)是指其元素的度的最大值。

## 二叉树

### 基本定义

- 定义: 一个二叉树(binary tree)t是有限个元素的集合(可以为空)。当二叉树非空时，其中一个元素称为根，余下的元素杯划分为两棵二叉树，分别称为t的左子树和右子树。
  注:
- 二叉树的每个元素恰好有两棵子树(其中一个或者两个可能为空)，而树的每一个元素可以有任意数量的子树。
- 在二叉树中，每个元素的子树都是有序的，也就是说，有左子树和右子树之分。而树的子树是无序的。

### 二叉树的特性

- 一棵二叉树有n个元素，n>0，它有n-1条边。
- 一棵二叉树的高度为h。h>=0，它最少有h个元素，最多有2^h^-1个元素。
- 一棵二叉树的元素有n个，n>0，它的高度最大为n，最小为[log~2~(n+1)]，(向上取整)。
  当高度为h的二叉树有2^h^-1个元素时，称其为满二叉树(full binary tree)。
  对高度为h的满二叉树的元素，从第一层到最后一层，在每一层中从左至右，顺序编号，从1到2^h^-1。
  假设从满二叉树中删除k个其编号为2^h^-i元素,1<=i<=k<2^h^，所得到的二叉树被称为完全二叉树(complete binary tree)。

- 对于完全二叉树，设其一个元素的编号为i，1<=i<=n。有以下关系成立:
  1. 如果i=1，则该元素为二叉树的根。若i>1，则其父节点的编号为[i/2]，(向下取整)。
  2. 如果2i>n，则该元素无左子树。否则，该元素的左子树的编号为2i。
  3. 如果2i+1>n，则该元素无右子树。否则，该元素的右子树的编号为2i+1。

### 链表描述

如果用数组描述二叉树，会面临空间大量浪费的情况。所以，我们一般用链表来描述二叉树。

```C++
/*链表二叉树的节点结构*/
template<class T>
struct binaryTreeNode
{
    T element;
    binaryTreeNode<T> *leftChild,*rightChild;

    binaryTreeNode()
    {
        leftChild=rigthChild=NULL;
    }
    binaryTreeNode(const T& theElment)
    {
        element(theElement);//带有一个参数，用来初始化element。
        leftChild=rigthChild=NULL;
    }
    binaryTreeNode(const T& theElement,binaryTreeNode* theLeftChild,binaryTreeNode* theRigthChild)
    {
        element(theElement);
        leftChild=theLeftChild;
        rightChild=theRightChild;
    }
};
```

### 二叉树常用操作

- 确定高度
- 确定元素数目
- 复制
- 显示或打印二叉树
- 确定两棵二叉树是否相等
- 删除整棵树
  这些操作可以通过有步骤地遍历二叉树来完成。在二叉树的遍历中，每个元素仅被访问一次。访问一个元素，意味着可以对该元素进行任何操作。
