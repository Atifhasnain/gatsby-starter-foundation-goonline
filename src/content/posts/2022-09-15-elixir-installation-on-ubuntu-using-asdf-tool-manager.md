---
template: blog-post
title: Elixir Installation on Ubuntu Using ASDF Tool Manager
slug: /elixir-installation-using-asdf-on-ubuntu
date: 2022-09-16 00:15
description: Elixir, Ubuntu, ASDF Version Manager, Tool Manager
featuredImage: /assets/asdf_elixir.jpeg
---
### 1. Install Required Packages/Plugins:

```
sudo apt install git vim htop dnsutils dirmngr gpg curl gawk wkhtmltopdf inotify-tools -y
```

### 2. Download asdf:

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.2
```

### 3. Install asdf:

```
nano ~/.bashrc

. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash

bash
```

### 4. Install Nodejs Plugin:

```
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

asdf install nodejs 14.15.3
```

### 5. Install Erlang Plugin:

```
asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git

sudo apt-get -y install build-essential autoconf m4 libncurses5-dev libwxgtk3.0-gtk3-dev libwxgtk-webview3.0-gtk3-dev libgl1-mesa-dev libglu1-mesa-dev libpng-dev libssh-dev unixodbc-dev xsltproc fop libxml2-utils libncurses-dev openjdk-11-jdk

asdf install erlang 24.1.5
```

### \
6. Install Elixir Plugin:

```
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git

asdf install elixir 1.13.2
```

### \
7. App Deployment Steps:

```
mix deps.get

mix deps.compile

npm install --prefix assets

mix assets.deploy

mix phx.server
```