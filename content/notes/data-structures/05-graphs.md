---
title: "11. 图：基本概念、性质与抽象接口"
chapter_title: "图：基本概念、性质与抽象接口"
weight: 11

date: 2026-08-09T13:10:00+08:00
lastmod: 2026-08-09T15:13:00+08:00

categories: ["数据结构"]
tags: ["图", "生成树", "抽象数据类型"]
description: "图：基本概念、性质与抽象接口学习笔记。"
url: "/post/26summer-w7-图/"
---

## 基本概念

图(graph)是一个用线或边连接在一起的的顶点或者节点的集合。
严格地说，图是有限集V和E的有序对，即G=(V,E)，其中V的元素称为顶点或节点，E的元素称为边。
每一条边连接两个不同的顶点，用元组(i,j)来表示，i和j是边所连接的两个顶点。

- 边带方向称为有向边(directed edge),反之称为无向边(undirected edge)。
- 当且仅当(i,j)是图的边，称顶点i和j是**邻接的(adjacent)**。边(i,j)**关联(incident)**于顶点i和j。
- 对于有向边(i,j)称其**关联至(incident to)**j，而**关联于(incident from)**i。节点i**邻接至(adjacent to)**j，节点j**邻接于(adjacent from)**i。
- 如果图的所有边都是无向边，则称图为**无向图(undirected graph)**，如果图的所有边都是有向边，则称图为**有向图(directed graph)**。

注意:根据定义有

- 一个图不能有重复的边。
- 一个图不可能包含形式为(i,i)的自连边，即环(loop)。

在图的一些应用中，要为每条边赋予一个表示成本的值，称其为**权**。此时，图被称为**加权无向图**或者**加权无向图**。
一个**网络(network)**经常指一个加权有向图或者加权无向图。

## 应用和更多概念

### 路径问题

- 一个顶点序列P=i~1~,i~2~,...,i~k~是有向图G=(V,E)的一条从i~1~到i~k~的路径，当且仅当对于每个j(1<=j<=k)，边(i~j~,i~j+1~)都在E中。
- 一条路径如果除了第一个顶点和最后一个顶点，其余所有顶点都不同，那么该路径称为一条简单路径(simple path)。
- 图或者有向图的每一条边都可以有长度，一条路径的长度是该路径所有的边长度之和。

### 生成树

设G=(V,E)是一个无向图。

- G是连通的(connected)，当且仅当G的每一对顶点之间之间都有一条路径。
- 如果H的顶点和边的集合分别是G的顶点和边的集合的子集，那么称图H是图G的子图(subgraph)。
- 一条始点和终点相同的简单路径被称为环路(cycle)。
- 没有环路的连通无向图是一颗树。
- 一个G的子图，包含G的所有顶点，且是一棵树，则称为G的生成树(spanning tree)
- 一个具有n个顶点的连通无向图，至少有n-1条边。因此，当连通网络的每一条链路的建设成本都相同时，任意一棵生成树的建设成本都可以将网络建设成本减至最小，并保证网络连通。
- 如果不同的链路有不同的建设成本，那么需要在一棵建设成本最小的生成树上建设链路。

## 特性

在一个无向图中，与一个顶点i相关联的边数称为该顶点的度(degree)d~i~。
特性1:设G=(V,E)是一个无向图，令n=V，e=E,则

- d~1~+d~2~+...+d~n~=2e
- 0<=e<=n(n-1)/2

一个具有n个顶点和n(n-1)/2个边的无向图是一个完全图。

设G是一个有向图。顶点i的入度(in-degree)是指关联至该顶点的边数。顶点i的出度(out-degree)是指关联于该顶点的边数。
特性2:设G=(V,E)是一个有向图。令n=V,e=E，则

- 0<=e<=n(n-1)
- d(in)=d(out)=e

一个具有n个顶点的完全有向图恰好包含n(n-1)条有向边。

## 抽象数据类型garph

```C++
//对于加权图，T是边上的权的数据类型；对于无权图，T是布尔类型。
template<class T>
class graph
{
    public:
        virtual ~graph(){}

    //ADT方法
        virtual int numberOfVertices() const=0; //返回图的顶点数目
        virtual int numbersOfEdges() const=0;   //返回图的边的数目
        virtual bool existsEdge(int,int) const=0;//返回某条边是否存在
        virtual void insertEdge(edge<T>*) = 0;  //插入一条边
        virtual void eraseEdge(int,int) = 0;    //删除边(i,j)
        virtual int degree(int) const = 0;  //返回顶点i的度。只用于无向图
        virtual int inDegree(int) const =0; //返回顶点的入度
        virtual int outDegree(int) const =0;    //返回顶点的出度

    //其他方法
        virtual bool directed() const =0;   //当且仅当为有向图时，返回True
        virtual bool weighted() const =0;   //当且仅当为加权图时，返回True
        virtual vertexIterator<T>* iterator(int) =0;    //访问指定顶点的相邻顶点
};
```

补充:

- 方法insertEdge的输入数据的类型是模板类edge。模板类edge是一个抽象类，他具有方法vertex1，vertex2，weight，这些方法分别返回一个边的第一个顶点、第二个顶点和边的权。
- 模板类vertexIiterator是一个抽象类，它只包含纯析构函数和纯虚方法。

```C++
    virtual int next()=0;   //返回一个与当前指针所指顶点相邻的顶点
    virtual int next(T&)=0; //返回一个与当前指针所指顶点相邻的顶点，且关联两顶点的边的权是T&
```
