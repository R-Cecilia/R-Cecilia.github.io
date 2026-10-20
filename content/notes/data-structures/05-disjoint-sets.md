---
title: "5. 并查集：等价类与集合合并"
chapter_title: "并查集：等价类与集合合并"
weight: 5

date: 2026-07-18T13:10:00+08:00
lastmod: 2026-07-18T15:13:00+08:00

categories: ["数据结构"]
tags: ["并查集", "等价类", "集合合并"]
description: "并查集：等价类与集合合并学习笔记。"
---

## 并查集

### 等价类的定义

在集合论中，如果在一个集合 S上定义了一个等价关系 ∼即满足自反性、对称性、传递性的关系），那么对于 S中的任意元素 a，a的等价类就是所有与 a等价的元素组成的集合，记作：
[a]={x∈S∣x∼a}
关键性质：集合S中的所有元素会被这些等价类完全划分（不相交且覆盖全集），这就是著名的“商集”概念。

### 等价类的分类

1. 离线等价类(offline equiralence class):

- 定义：在算法开始执行之前，所有的数据（元素个数、所有“等价对”关系）都已经完整地存储在内存中。算法读完所有数据后，一次性计算出所有的等价类划分。
- 核心数据结构：静态数组 + 深度优先搜索（DFS）/ 广度优先搜索（BFS），或者先读取全部数据再构建并查集。

2. 在线等价类(online equiralence class)

- 定义：算法运行的过程中，等价关系是逐步（动态）给出的。每给出一个新关系，程序必须立即更新当前元素所属的等价类，并能够随时回答“这两个元素当前是否等价？”这个问题。算法不知道未来还会输入什么关系。
- 核心数据结构：并查集（Union-Find）。它专门用来高效处理这种动态合并、即时查询的问题（近乎O(1)的时间复杂度）。

### 链表实现的并查集

```C++
// 链表节点
template<class T>
struct chainNode {
    T element;
    chainNode<T>* next;
    chainNode() : next(NULL) {}
    chainNode(const T& element) : element(element), next(NULL) {}
};

// 并查集类（链表实现）
template<class T>
class UnionFind {
private:
    chainNode<T>** head;    // head[i] 指向元素 i 所在链表的头结点
    chainNode<T>** tail;    // tail[i] 指向元素 i 所在链表的尾结点
    int* length;            // length[i] 记录以 i 为头结点的链表长度
    int capacity;           // 元素个数

public:
    // 构造函数：初始化 n 个元素，每个自成一个等价类
    UnionFind(int n) : capacity(n) {
        head = new chainNode<T>*[n + 1];
        tail = new chainNode<T>*[n + 1];
        length = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            head[i] = new chainNode<T>(i);
            tail[i] = head[i];
            length[i] = 1;
        }
    }

    // 析构函数：释放内存
    ~UnionFind() {
        for (int i = 1; i <= capacity; i++) {
            if (head[i] != NULL) {
                chainNode<T>* p = head[i];
                while (p != NULL) {
                    chainNode<T>* q = p;
                    p = p->next;
                    delete q;
                }
            }
        }
        delete[] head;
        delete[] tail;
        delete[] length;
    }

    // 查找：返回元素 x 所在链表的头结点（O(1)）
    chainNode<T>* find(int x) {
        return head[x];
    }

    // 合并：将 x 和 y 所在集合合并（短链并入长链）
    void unite(int x, int y) {
        chainNode<T>* headX = find(x);
        chainNode<T>* headY = find(y);

        if (headX == headY) return;  // 已在同一集合

        int rootX = headX->element;
        int rootY = headY->element;

        // 保证 rootX 是短链，rootY 是长链
        if (length[rootX] > length[rootY]) {
            chainNode<T>* tempHead = headX;
            headX = headY;
            headY = tempHead;

            int tempRoot = rootX;
            rootX = rootY;
            rootY = tempRoot;
        }

        // 将短链（rootX）接到长链（rootY）尾部
        tail[rootY]->next = headX;
        tail[rootY] = tail[rootX];

        // 遍历短链，更新所有元素的 head 指针
        chainNode<T>* p = headX;
        while (p != NULL) {
            head[p->element] = headY;
            p = p->next;
        }

        // 更新长度
        length[rootY] += length[rootX];
        length[rootX] = 0;
    }
};
```
