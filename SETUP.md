# SETUP
## homebrew
Linuxの依存パッケージをインストールするツール
[このサイト](https://brew.sh/index_ja)を参考にインストール

## asdf
各プロジェクトの実行環境を切り替えるツール
プロジェクト直下の `.tool-versions` で利用する実行環境のバージョンを指定することで、
実行時にランタイムのバージョンを指定したバージョンにすることができます。

インストールは以下の二つのコマンドを実行してください。
```
brew install asdf
```
```
echo -e "\n. $(brew --prefix asdf)/asdf.sh" >> ~/.bashrc
```

## nodejsのインストール
homebrew でNode.js 14.xをインストールします。

```
brew install node@14
```

### [参考]WSL2上でCypressを起動するための設定
#### Cypressが依存しているモジュールをインストール(OS共通)
[Cypressの公式に記載](https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies)の依存が足りていないっぽいので、インストール
```
sudo apt-get update
sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

この時点では、まだエラーが出る
```
[23789:0403/122546.200592:ERROR:bus.cc(392)] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: そのようなファイルやディレクトリはありません
[23789:0403/122546.202397:ERROR:bus.cc(392)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
[23789:0403/122546.202603:ERROR:bus.cc(392)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
[23960:0403/122546.285140:ERROR:gpu_init.cc(453)] Passthrough is not supported, GL is swiftshader, ANGLE is
[23789:0403/122546.406824:ERROR:bus.cc(392)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
[23789:0403/122546.427243:ERROR:bus.cc(392)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
```

#### D-Busのセットアップ
上記ログの以下の部分を解消する
```
Failed to connect to socket /var/run/dbus/system_bus_socket: そのようなファイルやディレクトリはありません
```

dbusをインストール

```
sudo apt-get install dbus
```

bash起動時(Ubuntuにログイン時)に自動で起動するために、.bashrcに以下を追加
```
sudo /etc/init.d/dbus start &> /dev/null
```

このままだとパスワードの入力が求められてbashが起動しないので回避。

以下コマンドを入力するとneonが立ち上がるので、
```
sudo visudo -f /etc/sudoers.d/dbus
```

以下の `<your_username>` の部分を書き換えて保存(Ctrl + o -> Enter -> Ctrl + x)
```
<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus
```


#### X-serverの設定
Windows側の設定

WSL2ではWindowsのブラウザを直接立ち上げることはできないようなので、Xサーバーが必要です。
今回はこのXサーバーの一つである、VcXsrcを**Windows側に**インストールします。

[ここからダウンロード](https://sourceforge.net/projects/vcxsrv/)したインストーラーをダブルクリック。
オプションなどの設定は[こちらの記事](https://qiita.com/ryoi084/items/0dff11134592d0bb895c)が参考になる

インストールが終わったら、Windowsのメニューを開いて`XLaunch` を起動
オプションは以下の通りに設定
- Multiple windows
- Start no client
- Extra settings
  - Clipboard: チェック
  - Primary Selection: チェック
  - Native opengl: チェックを外す
  - Disable access control: チェックを外す
  - Additional parameters for VcXsrc: `-ac`

Windows起動時に常にXLaunchを起動するために、
Save configurationを押し、エクスプローラのアドレス部分に `%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` を貼り付けて保存。


WSL側に`DISPLAY`環境変数(これによって、どのXサーバーを使えば良いかを識別する)を設定し、dbusを起動する。
(前述のdbusとかぶっているが、なぜか↑のやつがないとうまくいかない。)
`.bashrc` の末尾に以下を設定

```
export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"
eval "$(dbus-launch --sh-syntax)" || echo ".bashrc: error executing dbus-launch" >&2
```

