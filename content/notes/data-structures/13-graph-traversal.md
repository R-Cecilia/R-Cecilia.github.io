---
title: "13. 图的遍历：BFS 与 DFS"
chapter_title: "图的遍历：BFS 与 DFS"
weight: 13

date: 2026-08-09T13:10:00+08:00
lastmod: 2026-08-09T15:13:00+08:00

categories: ["数据结构"]
tags: ["图", "BFS", "DFS"]
description: "图的遍历：BFS 与 DFS学习笔记。"
---

## 图的遍历

从一个顶点开始搜索所有可以达到的顶点。常用的两种搜索方法:广度优先搜索(breadth first research.BFS)和深度优先搜索(depth first research)。

### 广度优先搜索

从一个顶点开始，搜索所有可到达的顶点的方法叫做广度优先搜索。这种搜索方法可由队列实现。
图的BFS和二叉树的层次遍历相似。

```C++
virtual void bfs(int v,int reach[],int label)
{//广度优先搜索。reach[i]用来标记从顶点v可到达的所有顶点
    arrayQueue<int> q[10];
    reach[v]=label;
    q.push(v);
        while(!q.empty())
        {
            //从队列中删除一个标记过的顶点
            int w=q.front();
            q.pop();

        //标记所有没有到达的邻接于顶点w的顶点
        vertexIterator<T> *iw=iterator;
        int u;
        while(u=iw->next()!=0)
        //访问顶点w的每一个相邻的顶点
            if(reach[u]==0)
            {//u是一个没有到达过的顶点
                q.push(u);
                reach[u]=label; //做到达标记
            }

        delete iw;
    }
}
```

### 深度优先搜索

深度优先搜索代码和二叉树的前序遍历很相似。
下面是公有方法graph::dfs和保护方法graph::rDfs的代码。
它假设 `graph<T>::reach` 和 `graph<T>::label` 是类 `graph` 的静态数据成员。

```C++
void dfs(int v,int reach[],int label)
{//深度优先搜索.reach[i]用来标记所有邻接于顶点v可到达的顶点
    graph<T>::reach=reach;
    graph<T>::label=label;
    rDfs(v);
}

void rDfs(int v)
{//深度优先搜索递归方法
    reach[v]=label;
    vertexIterator<T>* iv=iterator(v);
    int u;
    while((u=iv->next())!=0)
        //访问与v相邻的顶点
        if(reach[u]==0)
            rDfs(u);    //u是一个没有到达过的顶点
    delete iv;
}
```
