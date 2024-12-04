const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Kiểm tra xem config.devServer có tồn tại hay không
    if (config.devServer) {
        config.devServer = {
            ...config.devServer,
            disableHostCheck: true,
        };
    }

    // Các cấu hình khác của Webpack (nếu có)
    return config;
};
