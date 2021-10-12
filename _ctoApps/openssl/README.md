<!-- PROJECT LOGO -->
<h3 align="center">OpenSSL WebApp</h3>

  <p align="center">
    User-friendly web app for the use of OpenSSL based on WebAssembly
    <br />
    <br />
    <a href="https://www.cryptool.org/en/cto/openssl">View</a>
    ·
    <a href="https://github.com/janeumnn/openssl-webapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/janeumnn/openssl-webapp/issues">Request Feature</a>
  </p>
</div>

## About The Project

This web app makes use of cryptographic methods with the help of the OpenSSL command line program. For this purpose, the web app implements the functions from the command line program in two different ways: in a GUI and as a command line interface.

It brings the OpenSSL toolkit into the browser as WebAssembly bytecode. The new web standard WebAssembly serves as a compilation target for languages like C/C++ and allows client-side execution in the browser. Compared to an interpreted language such as JavaScript, WebAssembly bytecode benefits from, among other things, near-native execution speed.

<p align="center">
<img src="https://user-images.githubusercontent.com/66623604/136856790-11361e5e-f5c2-419f-a4fd-78ddd4187174.png"  width="70%" height="70%">
</p>

### Built With

- [Emscripten](https://emscripten.org/)
- [React.js](https://reactjs.org/)
- [RxJs](https://rxjs.dev/)
- [Bootstrap](https://getbootstrap.com)

## Getting Started

### Prerequisites

- [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) (if using locally installed emsdk)
  ```sh
  # Activate PATH and other environment variables in the current terminal
  source /path/to/emsdk_env.sh
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/janeumnn/openssl-webapp.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage

- Run the app in development mode

  ```sh
  npm start
  ```

- Build the app to the build folder. It bundles the app with an individual webpack config, so that it outputs only single files for the use in CrypTool Online.

  ```sh
  npm run build:cto-app
  ```

- Run build script in order to compile OpenSSL with Emscripten

  - With locally installed emsdk

    ```sh
    npm run build:openssl
    ```

  - With emscripten/emsdk docker image
    ```sh
    npm run build:openssl:docker
    ```

## Contributing

Any contributions are **greatly appreciated**. If you have a suggestion that would make this better, please open an issue or fork the repository and create a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
