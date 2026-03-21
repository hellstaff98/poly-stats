import path from 'path';
import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import {buildPlugins} from "./config/build/buildPlugins";
import {buildLoaders} from "./config/build/buildLoaders";
import {buildResolvers} from "./config/build/buildResolvers";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildPaths} from "./config/build/types/config";

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
}

const mode = 'development';
const isDev: boolean = mode == 'development';

const config: webpack.Configuration = buildWebpackConfig({
    mode: mode,
    paths: {
        entry: paths.entry,
        output: paths.output,
        html: paths.html
    },
    isDev: isDev,
});

export default config;