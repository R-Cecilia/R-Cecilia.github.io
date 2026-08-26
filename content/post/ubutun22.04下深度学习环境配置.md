---
title: "深度学习环境配置"

date: 2025-05-20T11:10:00+08:00
lastmod: 2025-05-20T11:10:00+08:00

categories: ["深度学习"]
tags: ["linux", "深度学习"]
description: "介绍了在已经安装Windows11的电脑的基础上，如何安装Ubuntu 22.04 linux操作系统。同时，在Linux系统内配置有关深度学习的相关环境。"
cover: /images/cover11.webp
---

# Ubuntu 22.04 下深度学习环境配置

## 1.在有windows系统的电脑上安装ubutun22.04

详细操作请参见
[Windows11 安装 Ubuntu 避坑指南](https://www.bilibili.com/video/BV1Cc41127B9/?share_source=copy_web&vd_source=8ca63954bd3b95dd3d36411d35afcf01)(安装ubutun的详细步骤)
**注意： 观看视频前请阅读一下内容**
多利用AI（推荐deepseek）解决问题，下面的教程都是我根据自己在ds上的对话总结的。

1. 视频中不是每一节的内容都需要你去做，相信你自己有能力分辨哪些内容需要去做。如果不清楚，请在群里提问。
2. 磁盘分区这一步请至少分出150G的磁盘空间，不然基础环境配置的空间会不够。(环境大概占用70G的空间)
3. 提前备份好自己重要的各种文件，在安装过程中可能存在个人操作失误的风险，所以请当心。
4. 新系统内可以自行安装QQ/微信等软件，详细操作询问deepseek即可。

## 2.安装英伟达显卡驱动

**注意:该教程以Nvidia 5060显卡为例，其他显卡请询问deepseek按其内容进行操作**
1打开终端，先确保能搜到新驱动：

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa -y
sudo apt update
```

2安装nvidia-driver-570-open：

```bash
sudo apt install nvidia-driver-570-open
```

3重启电脑：

```bash
sudo reboot
```

重启后，可以用 nvidia-smi 验证。

## 3.更新内核

请在终端中依次执行以下命令，完成内核和系统组件的更新：

更新软件包列表：

```bash
sudo apt update
```

升级所有系统组件（包括内核）：

```bash
sudo apt upgrade -y
```

这个命令会自动将你的内核更新到 Ubuntu 22.04 官方源里的最新版本（比如 5.15 或 6.x）。

完成更新后，一定要重启电脑：

```bash
sudo reboot
```

重启后，可以用 uname -r 命令确认内核版本是否已成功升级。

## 4.安装CUDA

1.下载并添加 CUDA 仓库
打开终端，依次执行以下命令。这里我们采用最稳妥的官方本地仓库方式。

```bash
# 1. 下载并安装仓库优先级文件
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600

# 2. 下载 CUDA 12.8 的本地仓库安装包
wget https://developer.download.nvidia.com/compute/cuda/12.8.1/local_installers/cuda-repo-ubuntu2204-12-8-local_12.8.1-570.124.06-1_amd64.deb

# 3. 安装本地仓库包
sudo dpkg -i cuda-repo-ubuntu2204-12-8-local_12.8.1-570.124.06-1_amd64.deb

# 4. 导入仓库的 GPG 密钥
sudo cp /var/cuda-repo-ubuntu2204-12-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
```

2. 安装 CUDA 工具包
   更新软件列表，然后只安装工具包，跳过驱动部分。

```bash
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-8
```

注意：这里是 cuda-toolkit-12-8，不是 cuda。后者会试图再装一次驱动，可能和你的 open 驱动冲突。3. 配置环境变量
安装完需要把 CUDA 路径告诉系统。

```bash
echo 'export PATH=/usr/local/cuda-12.8/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-12.8/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

4. 重启并验证

```bash
sudo reboot
```

重启后打开终端，验证安装是否成功：

```bash
nvcc --version
```

如果看到类似 release 12.8 的版本信息，CUDA 就算安装成功了

## 5.安装CUDNN

1. 安装 cuDNN
   根据你已安装的 CUDA 12.8 和 Ubuntu 22.04，我们直接安装对应的 cuDNN 9.x 版本。

在终端中依次执行以下命令：

```bash
# 1. 安装 cuDNN（CUDA 12 版本）
sudo apt-get -y install cudnn9-cuda-12
# 注意：如果你之前曾按照 CUDA 安装指南添加过网络仓库，此步骤可顺利完成。
# 如果提示找不到包，请参照下方的“故障排查”手动添加仓库。
```

故障排查（遇到“找不到包”错误时执行）：

```bash
# 添加 CUDA 网络仓库（如果之前未操作）
wget https://developer.download.nvidia.com/compute/cudnn/9.8.0/local_installers/cudnn-local-repo-ubuntu2204-9.8.0_1.0-1_amd64.deb
sudo dpkg -i cudnn-local-repo-ubuntu2204-9.8.0_1.0-1_amd64.deb
sudo cp /var/cudnn-local-repo-*/cudnn-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
```

然后重新执行安装命令

```bash
sudo apt-get -y install cudnn9-cuda-12
```

2. 验证 cuDNN 安装
   安装完成后，可以通过查看版本文件来验证：

```bash
# 方法1：查看头文件中的版本号
cat /usr/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
```

如果屏幕上输出了类似 # define CUDNN_MAJOR 9 的信息，就说明 cuDNN 安装成功了。

## 6.安装TenorRT

1. 安装 pip
   直接在终端里执行：

```bash
sudo apt update
sudo apt install python3-pip -y
```

2. 验证安装
   装完之后，检查一下是否安装成功：

```bash
python3 -m pip --version
看到显示版本号（例如 pip 25.x from ...）就没问题了。
```

3. 继续安装 TensorRT
   pip 装好后，就可以继续执行之前的两步了：

```bash
# 升级 pip 和 wheel
python3 -m pip install --upgrade pip wheel

# 安装适配 CUDA 12.x 的 TensorRT
python3 -m pip install --upgrade tensorrt-cu12 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**这一步可能需要花费很长时间请待心等待**
提示：在 Ubuntu 系统里，我们习惯用 python3 -m pip 而不是直接敲 pip，这样可以确保 pip 对应到你正在使用的 Python 版本，避免权限和路径混乱。

### 4. 验证
把整段代码复制到终端里粘贴执行：

```bash
python3 -c "import tensorrt as trt; print('TensorRT 版本:', trt.__version__); assert trt.Builder(trt.Logger()); print('CUDA 初始化成功，TensorRT 安装无误！')"
```

回车后，如果看到类似下面的输出，就说明一切正常：

```text
TensorRT 版本: 10.x.x
CUDA 初始化成功，TensorRT 安装无误！
```

## 7. 安装CONDA

1.下载安装包
使用清华镜像源下载会很快：

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

2.运行安装脚本

```bash
bash Miniconda3-latest-Linux-x86_64.sh
```

安装过程中注意：

按 Enter 或 Q 跳过用户协议

输入 yes 接受协议

确认安装位置（默认 ~/miniconda3 即可，直接回车）

关键一步：最后会问 Do you wish to update your shell profile to automatically initialize conda?，输入 yes，这样终端启动时会自动激活 conda

3.让配置生效

```bash
source ~/.bashrc
```

验证安装

```bash
conda --version
```

看到类似 conda 25.x.x 就说明安装成功了。

4.创建 PyTorch 专用环境

```bash
# 创建 Python 3.10 的环境，命名为 torch_env
conda create -n torch_env python=3.10 -y

# 激活这个环境
conda activate torch_env
```

终端提示符前出现 (torch_env) 就代表环境激活成功了。

**如果出现报错:**

```text
CondaToSNonInteractiveError: Terms of Service have not been accepted for the following channels. Please accept or remove them before proceeding:
    - https://repo.anaconda.com/pkgs/main
    - https://repo.anaconda.com/pkgs/r
```

运行下面这条命令就能一键同意：

```bash
conda tos accept
```

同意条款后，之前创建环境的命令应该就能顺利运行了：

```bash
conda create -n torch_env python=3.10 -y
conda activate torch_env
```

## 8.安装PyTorch

请确保你已经在之前创建好的 conda 环境中，如果不是，先执行：

```bash
conda activate torch_env
```

1. 使用 pip 安装 PyTorch（CUDA 12.8 支持）
   直接复制运行我给你的这一行，这里用的是 PyTorch 官方源，下载速度看网络状况，耐心等待即可。这是目前安装支持 RTX 5060 的 PyTorch 唯一正确的命令格式：

```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
```

2. 严格验证安装结果
   等待下载和解压完成后，输入下面代码测试。这一步很关键，一定要看到两个 True 才算环境完美打通：

```python
python3 -c "import torch; print('PyTorch 版本:', torch.__version__); print('CUDA 可用:', torch.cuda.is_available())"
```

## 9.安装Git

1. 安装 Git
   打开终端，运行：

```bash
sudo apt update
sudo apt install git -y
```

2. 验证安装

```bash
git --version
```

如果看到类似 git version 2.34.1 这样的版本号，就说明安装成功了。

## 10.项目的运行

**充分利用你的AI助手（推荐Deepseek）**
以第一个项目为例，提示词如下

```text
跑一个github项目，该怎么做，项目网址https://github.com/aparsoft/yolo-streamlit-detection-tracking
```

你需要做的只是换成你想要跑的项目，根据AI的回答，相信你能完成后续的项目运行。
**注意:从github上clone项目可能需要爬梯子，根据实际情况自行解决**
